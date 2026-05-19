import { prisma } from "@/lib/prisma";
import { AuditService } from "@/services/audit.service";
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
      data: {
        mesaId,
        observacion,
      },
      include: { items: true },
    });
    await AuditService.registrar({
      accion: "ABRIR_COMANDA",
      entidad: "Comanda",
      entidadId: comanda.id,
      despues: { mesaId, items: [] },
    });
    await prisma.mesa.update({
      where: { id: mesaId },
      data: { estado: "OCUPADA" },
    });

    return comanda;
  }

  static async agregarItemComanda(
    comandaId: string,
    data: {
      productoId: string;
      cantidad: number;
      precioUnitario: number;
      esProductoPropio?: boolean;
    }
  ) {
    if (data.esProductoPropio) {
      await this.verificarStockProducto(data);
    }

    const subtotal = this.calcularSubtotal(data.cantidad, data.precioUnitario);

    await prisma.comandaItem.create({
      data: {
        comandaId,
        productoId: data.productoId,
        cantidad: data.cantidad,
        precioUnitario: data.precioUnitario,
        subtotal,
        esProductoPropio: data.esProductoPropio ?? true,
      },
    });

    const items = await this.obtenerItemsComanda(comandaId);

    const total = this.calcularTotal(items);

    await prisma.comanda.update({
      where: { id: comandaId },
      data: { total },
    });

    return items;
  }

  private static async verificarStockProducto(data: {
    productoId: string;
    cantidad: number;
  }) {
    try {
      const res = await fetch(
        "http://localhost:3001/api/productos/" + data.productoId
      );
      const json = await res.json();
      if (json.success) {
        const producto = json.data;
        const unidadesPorPack = producto.recetas?.[0]?.unidadesPorPack || 1;
        const stockNecesario = data.cantidad * unidadesPorPack;
        if (producto.stockActual < stockNecesario) {
          throw new Error(
            `Stock insuficiente: ${producto.nombre} tiene ${
              unidadesPorPack > 1
                ? Math.floor(producto.stockActual / unidadesPorPack) + " packs"
                : producto.stockActual + " unidades"
            } disponibles. Necesitás ${data.cantidad}${
              unidadesPorPack > 1 ? " pack(s)" : ""
            }.`
          );
        }
      }
    } catch (err: any) {
      if (err.message.includes("Stock insuficiente")) throw err;
      // Si no puede consultar Core, permitir igual (offline)
    }
  }

  private static calcularSubtotal(
    cantidad: number,
    precioUnitario: number
  ): number {
    return Math.round(cantidad * precioUnitario * 100) / 100;
  }

  private static async obtenerItemsComanda(comandaId: string) {
    return prisma.comandaItem.findMany({
      where: { comandaId },
    });
  }

  private static calcularTotal(items: any[]): number {
    const total = items.reduce((sum, i) => sum + Number(i.subtotal), 0);
    return Math.round(total * 100) / 100;
  }

  static async cerrarComanda(comandaId: string) {
    const comanda = await prisma.comanda.update({
      where: { id: comandaId },
      data: { estado: "CERRADA", fechaCierre: new Date() },
      include: { mesa: true },
    });
    await AuditService.registrar({
      accion: "CERRAR_COMANDA",
      entidad: "Comanda",
      entidadId: comandaId,
      antes: { estado: "ABIERTA" },
      despues: { estado: "CERRADA", total: Number(comanda.total) },
    });
    await prisma.mesa.update({
      where: { id: comanda.mesaId },
      data: { estado: "LIBRE" },
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
