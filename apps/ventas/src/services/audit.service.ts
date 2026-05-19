import { prisma } from "@/lib/prisma";

export class AuditService {
  static async registrar(data: {
    usuario?: string;
    accion: string;
    entidad: string;
    entidadId: string;
    antes?: any;
    despues?: any;
  }) {
    return prisma.auditLog.create({
      data: {
        usuario: data.usuario || "sistema",
        accion: data.accion,
        entidad: data.entidad,
        entidadId: data.entidadId,
        antes: data.antes || undefined,
        despues: data.despues || undefined,
      },
    });
  }

  static async listar(params?: {
    entidad?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { entidad, pagina = 1, limite = 50 } = params || {};
    const where: any = {};
    if (entidad) where.entidad = entidad;
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      prisma.auditLog.count({ where }),
    ]);
    return {
      logs,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }
}
