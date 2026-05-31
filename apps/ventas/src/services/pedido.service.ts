import { prisma } from "@/lib/prisma";
import { AuditService } from "@/services/audit.service";

export class PedidoService {
  static async listar(params?: {
    estado?: string;
    tipo?: string;
    clienteId?: string;
    pagina?: number;
    limite?: number;
  }) {
    const { estado, tipo, clienteId, pagina = 1, limite = 30 } = params || {};
    const where: any = {};
    if (estado) where.estado = estado;
    if (tipo) where.tipo = tipo;
    if (clienteId) where.clienteId = clienteId;

    const [pedidos, total] = await Promise.all([
      prisma.pedido.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          cliente: { select: { id: true, nombre: true, telefono: true } },
          items: true,
        },
      }),
      prisma.pedido.count({ where }),
    ]);

    return {
      pedidos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async crear(data: {
    clienteId: string;
    tipo: string;
    fechaEntrega?: string;
    items: { productoId: string; cantidad: number; precioUnitario: number }[];
    observacion?: string;
  }) {
    let total = 0;
    const itemsConSubtotal = data.items.map((item) => {
      const subtotal =
        Math.round(item.cantidad * item.precioUnitario * 100) / 100;
      total += subtotal;
      return { ...item, subtotal };
    });

    return prisma.pedido.create({
      data: {
        clienteId: data.clienteId,
        tipo: data.tipo as any,
        fechaEntrega: data.fechaEntrega ? new Date(data.fechaEntrega) : null,
        total: Math.round(total * 100) / 100,
        observacion: data.observacion,
        items: { create: itemsConSubtotal },
      },
      include: { cliente: true, items: true },
    });
  }

  static async cambiarEstado(id: string, estado: string) {
    const pedido = await prisma.pedido.update({
      where: { id },
      data: { estado: estado as any },
      include: { items: true, cliente: true },
    });

    if (estado === "ENTREGADO") {
      await prisma.ventaPOS.create({
        data: {
          clienteId: pedido.clienteId,
          total: pedido.total,
          metodoPago: "OTRO",
          observacion: `Venta automática por pedido #${pedido.id.slice(-8)}`,
          items: {
            create: pedido.items.map((item) => ({
              productoId: item.productoId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              subtotal: item.subtotal,
              esProductoPropio: true,
            })),
          },
        },
      });

      await AuditService.registrar({
        accion: "PEDIDO_ENTREGADO_A_VENTA",
        entidad: "Pedido",
        entidadId: id,
        despues: { estado: "ENTREGADO", total: Number(pedido.total) },
      });
    }

    return pedido;
  }
}
