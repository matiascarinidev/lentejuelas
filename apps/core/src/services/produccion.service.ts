import { prisma } from "@/lib/prisma";
import { ProduccionLoteDTO } from "@/types/produccion";
import { calcularCostoProduccion } from "@/lib/costos";
import { Prisma } from "@prisma/client";
import { UnidadMedida } from "@lentejuelas/shared";

export class ProduccionService {
  static async listar(params?: {
    productoId?: string;
    desde?: string;
    hasta?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { productoId, desde, hasta, pagina = 1, limite = 20 } = params || {};

    const where: Prisma.ProduccionLoteWhereInput = {};
    if (productoId) where.productoId = productoId;
    if (desde || hasta) {
      where.fechaProduccion = {};
      if (desde) where.fechaProduccion.gte = new Date(desde);
      if (hasta) where.fechaProduccion.lte = new Date(hasta);
    }

    const [lotes, total] = await Promise.all([
      prisma.produccionLote.findMany({
        where,
        orderBy: { fechaProduccion: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          producto: {
            select: {
              id: true,
              nombre: true,
              categoria: { select: { id: true, nombre: true } },
            },
          },
          receta: {
            select: {
              id: true,
              varianteNombre: true,
              recetaBaseId: true,
              rendimientoBase: true,
              unidadesPorPack: true,
            },
          },
          movimientos: {
            include: {
              insumo: { select: { id: true, nombre: true } },
            },
          },
        },
      }),
      prisma.produccionLote.count({ where }),
    ]);

    return {
      lotes,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    return prisma.produccionLote.findUnique({
      where: { id },
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        receta: {
          include: {
            items: {
              include: {
                insumo: { select: { id: true, nombre: true, tipo: true } },
              },
            },
            recetaBase: {
              include: {
                items: {
                  include: {
                    insumo: { select: { id: true, nombre: true, tipo: true } },
                  },
                },
              },
            },
          },
        },
        movimientos: {
          include: {
            insumo: { select: { id: true, nombre: true } },
            producto: { select: { id: true, nombre: true } },
          },
        },
      },
    });
  }

  static async simular(params: {
    productoId: string;
    recetaId: string;
    cantidadPlanificada: number;
    horasProduccion?: number;
  }) {
    return calcularCostoProduccion({
      recetaId: params.recetaId,
      productoId: params.productoId,
      cantidadPlanificada: params.cantidadPlanificada,
      horasProduccion: params.horasProduccion,
    });
  }

  static async producir(
    data: ProduccionLoteDTO & { horasProduccion?: number }
  ) {
    const cantidadReal = data.cantidadReal || data.cantidadPlanificada;

    const costo = await calcularCostoProduccion({
      recetaId: data.recetaId,
      productoId: data.productoId,
      cantidadPlanificada: data.cantidadPlanificada,
      horasProduccion: data.horasProduccion,
    });

    const costoUnitarioFinal =
      cantidadReal > 0 ? costo.costoTotal / cantidadReal : 0;

    const lote = await prisma.$transaction(async (tx) => {
      const lote = await tx.produccionLote.create({
        data: {
          productoId: data.productoId,
          recetaId: data.recetaId,
          cantidadPlanificada: data.cantidadPlanificada,
          cantidadReal,
          horasProduccion: data.horasProduccion || null,
          fechaProduccion: data.fechaProduccion
            ? new Date(data.fechaProduccion)
            : new Date(),
          fechaVencimiento: data.fechaVencimiento
            ? new Date(data.fechaVencimiento)
            : null,
          costoMateriaPrima: costo.costoMateriaPrima,
          costoPackaging: costo.costoPackaging,
          costoOperativo: costo.costoOperativo,
          costoAmortizacion: costo.costoAmortizacion,
          costoTotalCalculado: costo.costoTotal,
          costoUnitarioFinal: Math.round(costoUnitarioFinal * 10000) / 10000,
          observacion: data.observacion,
          mermaReal: data.mermaReal || 0,
          motivoMerma: data.motivoMerma || null,
        },
      });

      const movimientos: Prisma.MovimientoStockCreateManyInput[] = [];

      for (const item of costo.detalleMateriaPrima) {
        await tx.insumo.update({
          where: { id: item.insumoId },
          data: {
            stockActual: { decrement: item.cantidadNecesaria },
          },
        });

        movimientos.push({
          tipo: "SALIDA",
          insumoId: item.insumoId,
          cantidad: item.cantidadNecesaria,
          unidad: item.unidad as UnidadMedida,
          loteId: lote.id,
          fecha: new Date(),
          observacion: `Consumo lote #${lote.id.slice(-6)} - ${cantidadReal} unidades`,
        });
      }

      for (const item of costo.detallePackaging) {
        await tx.insumo.update({
          where: { id: item.insumoId },
          data: {
            stockActual: { decrement: item.cantidadNecesaria },
          },
        });

        movimientos.push({
          tipo: "SALIDA",
          insumoId: item.insumoId,
          cantidad: item.cantidadNecesaria,
          unidad: item.unidad as UnidadMedida,
          loteId: lote.id,
          fecha: new Date(),
          observacion: `Packaging lote #${lote.id.slice(-6)} - ${costo.cantidadPacks} packs`,
        });
      }

      await tx.producto.update({
        where: { id: data.productoId },
        data: {
          stockActual: { increment: cantidadReal },
        },
      });

      movimientos.push({
        tipo: "ENTRADA",
        productoId: data.productoId,
        cantidad: cantidadReal,
        unidad: "UNIDAD",
        loteId: lote.id,
        fecha: new Date(),
        observacion: `Producción lote #${lote.id.slice(-6)}`,
      });

      if (movimientos.length > 0) {
        await tx.movimientoStock.createMany({ data: movimientos });
      }

      // Incrementar contador de tandas en activos amortizables
      await tx.activoAmortizable.updateMany({
        where: { activo: true },
        data: {
          tandasAcumuladas: { increment: 1 },
        },
      });

      return lote;
    });

    return this.obtenerPorId(lote.id);
  }

  static async obtenerDashboard() {
    const [totalLotes, totalProducido, ultimosLotes, producto, lotesConPack] =
      await Promise.all([
        prisma.produccionLote.count(),
        prisma.produccionLote.aggregate({
          _sum: { cantidadReal: true, costoTotalCalculado: true },
        }),
        prisma.produccionLote.findMany({
          orderBy: { fechaProduccion: "desc" },
          take: 5,
          include: {
            producto: {
              select: {
                id: true,
                nombre: true,
                categoria: { select: { id: true, nombre: true } },
              },
            },
            receta: { select: { unidadesPorPack: true } },
          },
        }),
        prisma.producto.aggregate({
          _sum: { stockActual: true },
          where: { esProduccionPropia: true, activo: true },
        }),
        prisma.produccionLote.findMany({
          include: { receta: { select: { unidadesPorPack: true } } },
        }),
      ]);

    const totalPacks = lotesConPack.reduce((sum, lote) => {
      const up = lote.receta.unidadesPorPack;
      return up ? sum + Math.floor(lote.cantidadReal / up) : sum;
    }, 0);

    return {
      totalLotes,
      totalUnidadesProducidas: totalProducido._sum.cantidadReal || 0,
      costoTotalHistorico: totalProducido._sum.costoTotalCalculado || 0,
      stockTotalProductosPropios: producto._sum.stockActual || 0,
      totalPacks,
      ultimosLotes,
    };
  }
}
