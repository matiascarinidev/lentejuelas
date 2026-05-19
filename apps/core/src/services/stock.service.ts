import { prisma } from "@/lib/prisma";
import { UnidadMedida } from "@prisma/client";

export class StockService {
  static async obtenerStockInsumos(params?: {
    tipo?: string;
    busqueda?: string;
    stockBajo?: boolean;
    proveedorId?: string;
    pagina?: number;
    limite?: number;
  }) {
    const {
      tipo,
      busqueda,
      stockBajo,
      proveedorId,
      pagina = 1,
      limite = 30,
    } = params || {};
    const where: any = { activo: true };
    if (tipo) where.tipo = tipo;
    if (proveedorId) where.proveedorId = proveedorId;
    if (busqueda) where.nombre = { contains: busqueda, mode: "insensitive" };
    if (stockBajo)
      where.stockActual = { lte: prisma.insumo.fields.stockMinimo };

    const [insumos, total] = await Promise.all([
      prisma.insumo.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          proveedor: { select: { id: true, nombre: true } },
        },
      }),
      prisma.insumo.count({ where }),
    ]);

    return {
      items: insumos.map((i) => ({
        id: i.id,
        nombre: i.nombre,
        tipo: i.tipo,
        stockActual: Number(i.stockActual),
        stockMinimo: Number(i.stockMinimo),
        unidad: i.unidadBase,
        unidadCompra: i.unidadCompra,
        costoUnitario: Number(i.costoUnitarioEstimado),
        proveedor: i.proveedor?.nombre || null,
        stockBajo: Number(i.stockActual) <= Number(i.stockMinimo),
        valorStock: Number(i.stockActual) * Number(i.costoUnitarioEstimado),
      })),
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerStockProductos(params?: {
    busqueda?: string;
    propio?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const { busqueda, propio, pagina = 1, limite = 30 } = params || {};
    const where: any = { activo: true };
    if (busqueda) where.nombre = { contains: busqueda, mode: "insensitive" };
    if (propio !== undefined) where.esProduccionPropia = propio;

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          categoria: { select: { id: true, nombre: true } },
          recetas: {
            select: { unidadesPorPack: true },
            where: { activa: true },
            take: 1,
          },
        },
      }),
      prisma.producto.count({ where }),
    ]);

    return {
      items: productos.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria?.nombre || "Sin categoría",
        esProduccionPropia: p.esProduccionPropia,
        stockActual: p.stockActual,
        precioVentaSugerido: Number(p.precioVentaSugerido),
        valorStock: p.stockActual * Number(p.precioVentaSugerido),
        unidadesPorPack: p.recetas?.[0]?.unidadesPorPack || null,
        stockMostrar: p.recetas?.[0]?.unidadesPorPack
          ? `${p.stockActual} (${Math.floor(p.stockActual / p.recetas[0].unidadesPorPack)} packs de ${p.recetas[0].unidadesPorPack})`
          : `${p.stockActual}`,
      })),
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerMovimientos(params?: {
    tipo?: string;
    desde?: string;
    hasta?: string;
    insumoId?: string;
    productoId?: string;
    pagina?: number;
    limite?: number;
  }) {
    const {
      tipo,
      desde,
      hasta,
      insumoId,
      productoId,
      pagina = 1,
      limite = 50,
    } = params || {};
    const where: any = {};
    if (tipo) where.tipo = tipo;
    if (insumoId) where.insumoId = insumoId;
    if (productoId) where.productoId = productoId;
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) where.fecha.lte = new Date(hasta);
    }

    const [movimientos, total] = await Promise.all([
      prisma.movimientoStock.findMany({
        where,
        orderBy: { fecha: "desc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          insumo: { select: { id: true, nombre: true, unidadBase: true } },
          producto: { select: { id: true, nombre: true } },
          compra: { select: { id: true } },
          lote: { select: { id: true } },
        },
      }),
      prisma.movimientoStock.count({ where }),
    ]);

    return {
      movimientos: movimientos.map((m) => ({
        id: m.id,
        tipo: m.tipo,
        fecha: m.fecha.toISOString(),
        itemNombre: m.insumo?.nombre || m.producto?.nombre || "—",
        itemTipo: m.insumoId ? "Insumo" : "Producto",
        cantidad: Number(m.cantidad),
        unidad: m.unidad,
        observacion: m.observacion,
        compraId: m.compraId,
        loteId: m.loteId,
      })),
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerDashboard() {
    const [insumosStockBajo, movimientosHoy, ultimosMovimientos] =
      await Promise.all([
        prisma.insumo.count({
          where: {
            activo: true,
            stockActual: { lte: prisma.insumo.fields.stockMinimo },
          },
        }),
        prisma.movimientoStock.count({
          where: { fecha: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
        }),
        prisma.movimientoStock.findMany({
          orderBy: { fecha: "desc" },
          take: 10,
          include: {
            insumo: { select: { id: true, nombre: true } },
            producto: { select: { id: true, nombre: true } },
          },
        }),
      ]);

    const totalInsumosActivos = await prisma.insumo.count({
      where: { activo: true },
    });

    return {
      alertasStockBajo: insumosStockBajo,
      totalInsumosActivos,
      movimientosHoy,
      ultimosMovimientos: ultimosMovimientos.map((m) => ({
        id: m.id,
        tipo: m.tipo,
        fecha: m.fecha.toISOString(),
        itemNombre: m.insumo?.nombre || m.producto?.nombre || "—",
        cantidad: Number(m.cantidad),
        unidad: m.unidad,
      })),
    };
  }

  static async ajustarStock(data: {
    itemId: string;
    tipo: "INSUMO" | "PRODUCTO";
    cantidadReal: number;
    observacion?: string;
  }) {
    return prisma.$transaction(async (tx) => {
      let stockAnterior = 0;
      let unidad: UnidadMedida = UnidadMedida.UNIDAD;

      if (data.tipo === "INSUMO") {
        const insumo = await tx.insumo.findUnique({
          where: { id: data.itemId },
        });
        if (!insumo) throw new Error("Insumo no encontrado");
        stockAnterior = Number(insumo.stockActual);
        unidad = insumo.unidadBase;
        await tx.insumo.update({
          where: { id: data.itemId },
          data: { stockActual: data.cantidadReal },
        });
      } else {
        const producto = await tx.producto.findUnique({
          where: { id: data.itemId },
        });
        if (!producto) throw new Error("Producto no encontrado");
        stockAnterior = producto.stockActual;
        await tx.producto.update({
          where: { id: data.itemId },
          data: { stockActual: Math.round(data.cantidadReal) },
        });
      }

      const diferencia = data.cantidadReal - stockAnterior;

      await tx.movimientoStock.create({
        data: {
          tipo: diferencia >= 0 ? "ENTRADA" : "SALIDA",
          insumoId: data.tipo === "INSUMO" ? data.itemId : null,
          productoId: data.tipo === "PRODUCTO" ? data.itemId : null,
          cantidad: Math.abs(diferencia),
          unidad,
          fecha: new Date(),
          observacion: `Ajuste manual: ${data.observacion || "Conteo físico"} (anterior: ${stockAnterior}, nuevo: ${data.cantidadReal})`,
        },
      });

      return { stockAnterior, stockNuevo: data.cantidadReal, diferencia };
    });
  }
}
