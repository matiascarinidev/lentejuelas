import { prisma } from "@/lib/prisma";
import { InsumoDTO } from "@/types/insumo";
import { Prisma } from "@prisma/client";

export class InsumoService {
  static async listar(params?: {
    tipo?: string;
    activo?: boolean;
    proveedorId?: string;
    busqueda?: string;
    stockBajo?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const {
      tipo,
      activo,
      proveedorId,
      busqueda,
      stockBajo,
      pagina = 1,
      limite = 20,
    } = params || {};

    const where: Prisma.InsumoWhereInput = {};

    if (tipo) where.tipo = tipo as any;
    if (activo !== undefined) where.activo = activo;
    if (proveedorId) where.proveedorId = proveedorId;
    if (busqueda) {
      where.nombre = { contains: busqueda, mode: "insensitive" };
    }
    if (stockBajo) {
      where.stockActual = { lte: prisma.insumo.fields.stockMinimo };
    }

    const [insumos, total] = await Promise.all([
      prisma.insumo.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          proveedor: { select: { id: true, nombre: true } },
          _count: { select: { recetaItems: true, compraItems: true } },
        },
      }),
      prisma.insumo.count({ where }),
    ]);

    return {
      insumos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    return prisma.insumo.findUnique({
      where: { id },
      include: {
        proveedor: true,
        recetaItems: {
          include: {
            receta: {
              include: { producto: { select: { id: true, nombre: true } } },
            },
          },
        },
        compraItems: {
          include: {
            compra: {
              include: { proveedor: { select: { id: true, nombre: true } } },
            },
          },
          orderBy: { compra: { fecha: "desc" } },
          take: 10,
        },
        movimientosStock: {
          orderBy: { fecha: "desc" },
          take: 20,
        },
      },
    });
  }

  static async crear(data: InsumoDTO) {
    return prisma.insumo.create({
      data: {
        nombre: data.nombre,
        tipo: data.tipo,
        unidadBase: data.unidadBase,
        unidadCompra: data.unidadCompra,
        factorConversion: data.factorConversion,
        costoUnitarioEstimado: data.costoUnitarioEstimado,
        stockMinimo: data.stockMinimo,
        proveedorId: data.proveedorId || null,
      },
      include: {
        proveedor: { select: { id: true, nombre: true } },
      },
    });
  }

  static async actualizar(id: string, data: Partial<InsumoDTO>) {
    return prisma.insumo.update({
      where: { id },
      data: {
        ...(data.nombre !== undefined && { nombre: data.nombre }),
        ...(data.tipo !== undefined && { tipo: data.tipo }),
        ...(data.unidadBase !== undefined && { unidadBase: data.unidadBase }),
        ...(data.unidadCompra !== undefined && {
          unidadCompra: data.unidadCompra,
        }),
        ...(data.factorConversion !== undefined && {
          factorConversion: data.factorConversion,
        }),
        ...(data.costoUnitarioEstimado !== undefined && {
          costoUnitarioEstimado: data.costoUnitarioEstimado,
        }),
        ...(data.stockMinimo !== undefined && {
          stockMinimo: data.stockMinimo,
        }),
        ...(data.proveedorId !== undefined && {
          proveedorId: data.proveedorId,
        }),
      },
    });
  }

  static async desactivar(id: string) {
    return prisma.insumo.update({
      where: { id },
      data: { activo: false },
    });
  }

  static async activar(id: string) {
    return prisma.insumo.update({
      where: { id },
      data: { activo: true },
    });
  }

  static async obtenerStockBajo() {
    return prisma.insumo.findMany({
      where: {
        activo: true,
        stockActual: { lte: prisma.insumo.fields.stockMinimo },
      },
      orderBy: { stockActual: "asc" },
    });
  }
}
