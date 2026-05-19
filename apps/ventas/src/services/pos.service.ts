import { prisma } from "@/lib/prisma";
import { AuditService } from "@/services/audit.service";
export class POSService {
  static async crearVenta(data: {
    clienteId?: string;
    metodoPago?: string;
    items: {
      productoId: string;
      cantidad: number;
      precioUnitario: number;
      esProductoPropio?: boolean;
    }[];
    observacion?: string;
  }) {
    let total = 0;
    const itemsConSubtotal = data.items.map((item) => {
      const subtotal =
        Math.round(item.cantidad * item.precioUnitario * 100) / 100;
      total += subtotal;
      return { ...item, subtotal };
    });

    const venta = await prisma.ventaPOS.create({
      data: {
        clienteId: data.clienteId || null,
        metodoPago: (data.metodoPago as any) || "EFECTIVO",
        total: Math.round(total * 100) / 100,
        observacion: data.observacion,
        items: {
          create: itemsConSubtotal.map((i) => ({
            productoId: i.productoId,
            cantidad: i.cantidad,
            precioUnitario: i.precioUnitario,
            subtotal: i.subtotal,
            esProductoPropio: i.esProductoPropio ?? true,
          })),
        },
      },
      include: { items: true },
    });

    await AuditService.registrar({
      accion: "CREAR_VENTA",
      entidad: "VentaPOS",
      entidadId: venta.id,
      despues: { total: Number(venta.total), metodoPago: venta.metodoPago },
    });

    return venta;
  }

  static async listar(params?: {
    desde?: string;
    hasta?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { desde, hasta, pagina = 1, limite = 30 } = params || {};
    const where: any = {};
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) where.fecha.lte = new Date(hasta);
    }
    const [ventas, total] = await Promise.all([
      prisma.ventaPOS.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          cliente: { select: { id: true, nombre: true } },
          items: true,
        },
      }),
      prisma.ventaPOS.count({ where }),
    ]);
    return {
      ventas,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }
}
