import { prisma } from "@/lib/prisma";

export class ProveedorService {
  static async listar(params?: {
    busqueda?: string;
    activo?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const { busqueda, activo, pagina = 1, limite = 50 } = params || {};

    const where: any = {};
    if (activo !== undefined) where.activo = activo;
    if (busqueda) where.nombre = { contains: busqueda, mode: "insensitive" };

    const [proveedores, total] = await Promise.all([
      prisma.proveedor.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          _count: { select: { insumos: true, compras: true } },
        },
      }),
      prisma.proveedor.count({ where }),
    ]);

    return {
      proveedores,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    return prisma.proveedor.findUnique({
      where: { id },
      include: {
        insumos: {
          select: {
            id: true,
            nombre: true,
            tipo: true,
            costoUnitarioEstimado: true,
          },
        },
        compras: { orderBy: { fecha: "desc" }, take: 10 },
      },
    });
  }

  static async crear(data: {
    nombre: string;
    contacto?: string;
    telefono?: string;
    email?: string;
  }) {
    return prisma.proveedor.create({ data });
  }

  static async actualizar(
    id: string,
    data: Partial<{
      nombre: string;
      contacto: string;
      telefono: string;
      email: string;
    }>
  ) {
    return prisma.proveedor.update({ where: { id }, data });
  }

  static async desactivar(id: string) {
    return prisma.proveedor.update({ where: { id }, data: { activo: false } });
  }

  static async activar(id: string) {
    return prisma.proveedor.update({ where: { id }, data: { activo: true } });
  }
}
