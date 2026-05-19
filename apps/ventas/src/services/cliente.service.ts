import { prisma } from "@/lib/prisma";

export class ClienteService {
  static async listar(params?: {
    busqueda?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { busqueda, pagina = 1, limite = 30 } = params || {};
    const where: any = { activo: true };
    if (busqueda) {
      where.OR = [
        { nombre: { contains: busqueda, mode: "insensitive" } },
        { telefono: { contains: busqueda } },
      ];
    }
    const [clientes, total] = await Promise.all([
      prisma.cliente.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: { _count: { select: { pedidos: true } } },
      }),
      prisma.cliente.count({ where }),
    ]);
    return {
      clientes,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    return prisma.cliente.findUnique({
      where: { id },
      include: {
        pedidos: { orderBy: { fecha: "desc" }, take: 10 },
      },
    });
  }

  static async crear(data: {
    nombre: string;
    telefono?: string;
    email?: string;
    direccion?: string;
  }) {
    return prisma.cliente.create({ data });
  }

  static async actualizar(id: string, data: any) {
    return prisma.cliente.update({ where: { id }, data });
  }

  static async desactivar(id: string) {
    return prisma.cliente.update({ where: { id }, data: { activo: false } });
  }
}
