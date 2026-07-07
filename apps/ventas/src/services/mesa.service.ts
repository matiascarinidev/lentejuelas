import { prisma } from "@/lib/prisma";
import { AuditService } from "@/services/audit.service";
import { fetchCore } from "@/lib/api";

export class MesaService {
  static async listar() {
    return prisma.mesa.findMany({
      where: { activo: true },
      orderBy: { numero: "asc" },
      include: {
        comandas: {
          where: { estado: "ABIERTA" },
          include: { items: true },
        },
      },
    });
  }

  static async crear(data: { numero: number }) {
    return prisma.mesa.create({ data });
  }

  static async cambiarEstado(id: number, estado: string) {
    return prisma.mesa.update({
      where: { id },
      data: { estado: estado as any },
    });
  }

  static async abrirComanda(mesaId: number, observacion?: string) {
    const comanda = await prisma.comanda.create({
      data: { mesaId, observacion },
      include: { items: true },
    });

    await prisma.mesa.update({
      where: { id: mesaId },
      data: { estado: "OCUPADA" },
    });

    await AuditService.registrar({
      accion: "ABRIR_COMANDA",
      entidad: "Comanda",
      entidadId: comanda.id,
      despues: { mesaId, items: [] },
    });

    return comanda;
  }

  static async agregarItemComanda(
    comandaId: string,
    data: {
      productoId: string;
      nombre?: string | null;
      cantidad: number;
      precioUnitario: number;
      requiereCocina?: boolean;
      esProductoPropio?: boolean;
    }
  ) {
    if (data.esProductoPropio) {
      try {
        const res = await fetchCore(`/productos/${data.productoId}`);
        if (res.success) {
          const producto = res.data;
          const unidadesPorPack = producto.recetas?.[0]?.unidadesPorPack || 1;
          const stockNecesario = data.cantidad * unidadesPorPack;
          if (producto.stockActual < stockNecesario) {
            throw new Error(
              `Stock insuficiente: ${producto.nombre} tiene ${
                unidadesPorPack > 1
                  ? Math.floor(producto.stockActual / unidadesPorPack) +
                    " packs"
                  : producto.stockActual + " unidades"
              } disponibles.`
            );
          }
        }
      } catch (err: any) {
        if (err.message.includes("Stock insuficiente")) throw err;
      }
    }

    const subtotal =
      Math.round(data.cantidad * data.precioUnitario * 100) / 100;
    const estadoInicial = data.requiereCocina ? "PENDIENTE" : "ENTREGADO";

    await prisma.comandaItem.create({
      data: {
        comandaId,
        productoId: data.productoId,
        nombre: data.nombre || null,
        cantidad: data.cantidad,
        precioUnitario: data.precioUnitario,
        subtotal,
        esProductoPropio: data.esProductoPropio ?? true,
        estado: estadoInicial,
      },
    });

    const items = await prisma.comandaItem.findMany({ where: { comandaId } });
    const total = items.reduce((sum: number, i) => sum + Number(i.subtotal), 0);

    await prisma.comanda.update({
      where: { id: comandaId },
      data: { total: Math.round(total * 100) / 100 },
    });

    return items;
  }

  static async cerrarComanda(comandaId: string) {
    const comanda = await prisma.comanda.update({
      where: { id: comandaId },
      data: { estado: "CERRADA", fechaCierre: new Date() },
      include: { mesa: true, items: true },
    });

    await prisma.mesa.update({
      where: { id: comanda.mesaId },
      data: { estado: "LIBRE" },
    });

    if (comanda.items.length > 0) {
      await prisma.ventaPOS.create({
        data: {
          total: comanda.total,
          metodoPago: "EFECTIVO",
          observacion: `Venta por comanda mesa #${comanda.mesa.numero}`,
          items: {
            create: comanda.items.map((item) => ({
              productoId: item.productoId,
              nombre: item.nombre,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              subtotal: item.subtotal,
              esProductoPropio: item.esProductoPropio,
            })),
          },
        },
      });
    }

    await AuditService.registrar({
      accion: "CERRAR_COMANDA",
      entidad: "Comanda",
      entidadId: comandaId,
      antes: { estado: "ABIERTA" },
      despues: { estado: "CERRADA", total: Number(comanda.total) },
    });

    return comanda;
  }

  static async obtenerComanda(comandaId: string) {
    return prisma.comanda.findUnique({
      where: { id: comandaId },
      include: { mesa: true, items: true },
    });
  }
}
