import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface CompraItemInput {
  insumoId: string;
  cantidadCompra: number;
  precioUnitario: number;
}

export interface CompraInput {
  proveedorId?: string | null;
  fecha?: string;
  items: CompraItemInput[];
  observacion?: string;
}
export class CompraService {
  static async listar(params?: {
    proveedorId?: string;
    desde?: string;
    hasta?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { proveedorId, desde, hasta, pagina = 1, limite = 20 } = params || {};

    const where: Prisma.CompraInsumoWhereInput = {};
    if (proveedorId) where.proveedorId = proveedorId;
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) where.fecha.lte = new Date(hasta);
    }

    const [compras, total] = await Promise.all([
      prisma.compraInsumo.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          proveedor: { select: { id: true, nombre: true } },
          items: {
            include: {
              insumo: {
                select: {
                  id: true,
                  nombre: true,
                  unidadBase: true,
                  unidadCompra: true,
                },
              },
            },
          },
        },
      }),
      prisma.compraInsumo.count({ where }),
    ]);

    return {
      compras,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    return prisma.compraInsumo.findUnique({
      where: { id },
      include: {
        proveedor: true,
        items: {
          include: {
            insumo: true,
          },
        },
        movimientos: {
          include: {
            insumo: { select: { id: true, nombre: true } },
          },
        },
      },
    });
  }

  static async registrar(data: CompraInput) {
    if (!data.items || data.items.length === 0) {
      throw new Error("La compra debe tener al menos un item");
    }

    const compra = await prisma.$transaction(async (tx) => {
      // 1. Calcular subtotales y total
      let total = 0;
      const itemsConSubtotal = data.items.map((item) => {
        const subtotal =
          Math.round(item.cantidadCompra * item.precioUnitario * 100) / 100;
        total += subtotal;
        return { ...item, subtotal };
      });
      total = Math.round(total * 100) / 100;

      // 2. Crear la compra
      const compra = await tx.compraInsumo.create({
        data: {
          proveedorId: data.proveedorId || null,
          fecha: data.fecha ? new Date(data.fecha) : new Date(),
          total,
          observacion: data.observacion,
          items: {
            create: itemsConSubtotal.map((item) => ({
              insumoId: item.insumoId,
              cantidadCompra: item.cantidadCompra,
              precioUnitario: item.precioUnitario,
              subtotal: item.subtotal,
            })),
          },
        },
        include: {
          proveedor: { select: { id: true, nombre: true } },
          items: { include: { insumo: true } },
        },
      });

      // 3. Actualizar stock y costo estimado de cada insumo
      const movimientos: Prisma.MovimientoStockCreateManyInput[] = [];

      for (const item of itemsConSubtotal) {
        const insumo = await tx.insumo.findUnique({
          where: { id: item.insumoId },
        });
        if (!insumo) continue;

        // Convertir cantidad de compra a unidad base
        const cantidadBase =
          item.cantidadCompra * Number(insumo.factorConversion);

        // Incrementar stock
        await tx.insumo.update({
          where: { id: item.insumoId },
          data: {
            stockActual: { increment: cantidadBase },
            // Actualizar costo estimado con el nuevo precio de compra
            costoUnitarioEstimado:
              item.precioUnitario / Number(insumo.factorConversion),
          },
        });

        // Movimiento de entrada
        movimientos.push({
          tipo: "ENTRADA",
          insumoId: item.insumoId,
          cantidad: cantidadBase,
          unidad: insumo.unidadBase,
          compraId: compra.id,
          fecha: compra.fecha,
          observacion: `Compra${compra.proveedor ? ` a ${compra.proveedor.nombre}` : ""} — ${item.cantidadCompra} ${insumo.unidadCompra} a $${item.precioUnitario} c/u`,
        });
      }

      if (movimientos.length > 0) {
        await tx.movimientoStock.createMany({ data: movimientos });
      }

      return compra;
    });

    return compra;
  }
}
