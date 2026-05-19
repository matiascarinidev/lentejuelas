import { prisma } from "@/lib/prisma";

export class GastosService {
  static async listarOperativos(params?: {
    prorrateable?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const { prorrateable, pagina = 1, limite = 50 } = params || {};
    const where: any = {};
    if (prorrateable !== undefined) where.prorrateable = prorrateable;

    const [gastos, total] = await Promise.all([
      prisma.gastoOperativo.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      prisma.gastoOperativo.count({ where }),
    ]);

    return {
      gastos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async crearOperativo(data: {
    concepto: string;
    monto: number;
    prorrateable?: boolean;
    esManoDeObra?: boolean;
    costoPorHora?: number;
    fecha?: string;
  }) {
    return prisma.gastoOperativo.create({
      data: {
        concepto: data.concepto,
        monto: data.monto,
        prorrateable: data.prorrateable ?? false,
        esManoDeObra: data.esManoDeObra ?? false,
        costoPorHora: data.costoPorHora ?? null,
        fecha: data.fecha ? new Date(data.fecha) : new Date(),
      },
    });
  }

  static async actualizarOperativo(id: string, data: any) {
    return prisma.gastoOperativo.update({ where: { id }, data });
  }

  static async eliminarOperativo(id: string) {
    return prisma.gastoOperativo.delete({ where: { id } });
  }

  // Activos
  static async listarActivos(params?: {
    activo?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const { activo, pagina = 1, limite = 50 } = params || {};
    const where: any = {};
    if (activo !== undefined) where.activo = activo;

    const [activos, total] = await Promise.all([
      prisma.activoAmortizable.findMany({
        where,
        orderBy: { fechaInicio: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      prisma.activoAmortizable.count({ where }),
    ]);

    return {
      activos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async crearActivo(data: {
    descripcion: string;
    valorAdquisicion: number;
    vidaUtilTandas: number;
    fechaInicio?: string;
  }) {
    const costoPorTanda =
      data.vidaUtilTandas > 0 ? data.valorAdquisicion / data.vidaUtilTandas : 0;

    return prisma.activoAmortizable.create({
      data: {
        descripcion: data.descripcion,
        valorAdquisicion: data.valorAdquisicion,
        vidaUtilTandas: data.vidaUtilTandas,
        costoPorTanda: Math.round(costoPorTanda * 10000) / 10000,
        tandasAcumuladas: 0,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : new Date(),
      },
    });
  }

  static async actualizarActivo(id: string, data: any) {
    const updateData: any = { ...data };
    if (data.valorAdquisicion || data.vidaUtilTandas) {
      const activo = await prisma.activoAmortizable.findUnique({
        where: { id },
      });
      if (activo) {
        const valor = data.valorAdquisicion ?? Number(activo.valorAdquisicion);
        const vida = data.vidaUtilTandas ?? activo.vidaUtilTandas;
        updateData.costoPorTanda =
          vida > 0 ? Math.round((valor / vida) * 10000) / 10000 : 0;
      }
    }
    return prisma.activoAmortizable.update({ where: { id }, data: updateData });
  }

  static async toggleActivo(id: string, activo: boolean) {
    return prisma.activoAmortizable.update({ where: { id }, data: { activo } });
  }
}
