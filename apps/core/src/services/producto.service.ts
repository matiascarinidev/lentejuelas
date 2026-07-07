import { prisma } from "@/lib/prisma";
import { ProductoDTO } from "@/types/producto";
import { calcularCostoProduccion } from "@/lib/costos";

export class ProductoService {
  static async listar(params?: {
    categoriaId?: string;
    activo?: boolean;
    esProduccionPropia?: boolean;
    busqueda?: string;
    pagina?: number;
    limite?: number;
  }) {
    const {
      categoriaId,
      activo,
      esProduccionPropia,
      busqueda,
      pagina = 1,
      limite = 20,
    } = params || {};
    const where: any = {};
    if (categoriaId) where.categoriaId = categoriaId;
    if (activo !== undefined) where.activo = activo;
    if (esProduccionPropia !== undefined)
      where.esProduccionPropia = esProduccionPropia;
    if (busqueda) where.nombre = { contains: busqueda, mode: "insensitive" };

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        orderBy: { nombre: "asc" },
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          categoria: { select: { id: true, nombre: true } },
          recetas: {
            where: { activa: true },
            take: 1,
          },
        },
      }),
      prisma.producto.count({ where }),
    ]);
    return {
      productos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        recetas: {
          where: { activa: true },
          take: 1,
        },
      },
    });

    if (!producto) return null;

    let costoUnitario: number | null = null;
    let costoPackCompleto: number | null = null;

    if (producto.esProduccionPropia && producto.recetas.length > 0) {
      const receta = producto.recetas[0];
      try {
        const simulacion = await calcularCostoProduccion({
          recetaId: receta.id,
          productoId: producto.id,
          cantidadPlanificada: receta.rendimientoBase,
          horasProduccion: undefined,
        });
        costoUnitario = simulacion.costoUnitario;
        costoPackCompleto = simulacion.costoPackCompleto;
      } catch {
        // Si falla la simulación, no mostramos costos
      }
    }

    return {
      ...producto,
      costoUnitario,
      costoPackCompleto,
    };
  }

  static async crear(data: ProductoDTO) {
    let precioVenta = data.precioVentaSugerido;
    if (!data.esProduccionPropia && data.costoCompra && data.margenGanancia) {
      precioVenta = data.costoCompra * (1 + data.margenGanancia / 100);
    }

    return prisma.producto.create({
      data: {
        nombre: data.nombre,
        categoriaId: data.categoriaId || null,
        esProduccionPropia: data.esProduccionPropia,
        requiereCocina: data.requiereCocina ?? false,
        costoCompra: data.costoCompra || null,
        margenGanancia: data.margenGanancia || null,
        precioVentaSugerido: Math.round(precioVenta * 100) / 100,
        precioVentaFinal: data.precioVentaFinal || null,
      },
      include: { categoria: true },
    });
  }

  static async actualizar(id: string, data: Partial<ProductoDTO>) {
    const updateData: any = {};
    if (data.nombre !== undefined) updateData.nombre = data.nombre;
    if (data.categoriaId !== undefined)
      updateData.categoriaId = data.categoriaId || null;
    if (data.esProduccionPropia !== undefined)
      updateData.esProduccionPropia = data.esProduccionPropia;
    if (data.requiereCocina !== undefined)
      updateData.requiereCocina = data.requiereCocina;
    if (data.costoCompra !== undefined)
      updateData.costoCompra = data.costoCompra;
    if (data.margenGanancia !== undefined)
      updateData.margenGanancia = data.margenGanancia;
    if (data.precioVentaSugerido !== undefined)
      updateData.precioVentaSugerido = data.precioVentaSugerido;
    if (data.precioVentaFinal !== undefined)
      updateData.precioVentaFinal = data.precioVentaFinal;

    if (
      !updateData.esProduccionPropia &&
      (data.costoCompra || data.margenGanancia)
    ) {
      const prod = await prisma.producto.findUnique({ where: { id } });
      const costo = data.costoCompra ?? Number(prod?.costoCompra ?? 0);
      const margen = data.margenGanancia ?? Number(prod?.margenGanancia ?? 30);
      updateData.precioVentaSugerido =
        Math.round(costo * (1 + margen / 100) * 100) / 100;
    }

    return prisma.producto.update({
      where: { id },
      data: updateData,
      include: { categoria: true },
    });
  }

  static async desactivar(id: string) {
    return prisma.producto.update({ where: { id }, data: { activo: false } });
  }

  static async activar(id: string) {
    return prisma.producto.update({ where: { id }, data: { activo: true } });
  }

  static async obtenerCostoActual(productoId: string) {
    const producto = await prisma.producto.findUnique({
      where: { id: productoId },
      include: {
        recetas: {
          where: { activa: true },
          take: 1,
        },
      },
    });

    if (
      !producto ||
      !producto.esProduccionPropia ||
      producto.recetas.length === 0
    ) {
      return null;
    }

    const receta = producto.recetas[0];
    const simulacion = await calcularCostoProduccion({
      recetaId: receta.id,
      productoId: producto.id,
      cantidadPlanificada: receta.rendimientoBase,
      horasProduccion: undefined,
    });

    return {
      costoUnitario: simulacion.costoUnitario,
      costoPackCompleto: simulacion.costoPackCompleto,
      unidadesPorPack: receta.unidadesPorPack,
      rendimientoBase: receta.rendimientoBase,
    };
  }
}
