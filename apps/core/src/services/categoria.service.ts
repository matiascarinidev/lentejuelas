import { prisma } from "@/lib/prisma";

export class CategoriaService {
  static async listar(params?: { busqueda?: string; activo?: boolean }) {
    const where: any = {};
    if (params?.activo !== undefined) where.activo = params.activo;
    if (params?.busqueda)
      where.nombre = { contains: params.busqueda, mode: "insensitive" };
    return prisma.categoria.findMany({
      where,
      orderBy: { nombre: "asc" },
      include: { _count: { select: { productos: true } } },
    });
  }

  static async crear(nombre: string) {
    return prisma.categoria.create({ data: { nombre } });
  }

  static async actualizar(id: string, nombre: string) {
    return prisma.categoria.update({ where: { id }, data: { nombre } });
  }

  static async toggle(id: string, activo: boolean) {
    return prisma.categoria.update({ where: { id }, data: { activo } });
  }
}
