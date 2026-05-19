import { prisma } from "@/lib/prisma";
import { RecetaDTO, RecetaItemDTO } from "@/types/receta";
import { Prisma, UnidadMedida } from "@prisma/client";

export class RecetaService {
  static async listar(params?: {
    productoId?: string;
    activa?: boolean;
    pagina?: number;
    limite?: number;
  }) {
    const { productoId, activa, pagina = 1, limite = 20 } = params || {};

    const where: Prisma.RecetaWhereInput = {};
    if (productoId) where.productoId = productoId;
    if (activa !== undefined) where.activa = activa;

    const [recetas, total] = await Promise.all([
      prisma.receta.findMany({
        where,
        orderBy: [{ producto: { nombre: "asc" } }, { varianteNombre: "asc" }],
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          producto: {
            select: {
              id: true,
              nombre: true,
              categoria: { select: { id: true, nombre: true } },
            },
          },
          recetaBase: {
            select: {
              id: true,
              varianteNombre: true,
              producto: { select: { id: true, nombre: true } },
            },
          },
          variantes: {
            select: {
              id: true,
              varianteNombre: true,
              producto: { select: { id: true, nombre: true } },
            },
          },
          _count: { select: { items: true } },
        },
      }),
      prisma.receta.count({ where }),
    ]);

    return {
      recetas,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  static async obtenerPorId(id: string) {
    const receta = await prisma.receta.findUnique({
      where: { id },
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        recetaBase: {
          select: {
            id: true,
            varianteNombre: true,
            producto: { select: { id: true, nombre: true } },
            items: {
              include: {
                insumo: {
                  select: {
                    id: true,
                    nombre: true,
                    tipo: true,
                    unidadBase: true,
                    costoUnitarioEstimado: true,
                  },
                },
              },
            },
            itemsPackaging: {
              include: {
                insumo: {
                  select: {
                    id: true,
                    nombre: true,
                    tipo: true,
                    unidadBase: true,
                    costoUnitarioEstimado: true,
                  },
                },
              },
            },
          },
        },
        variantes: {
          select: {
            id: true,
            varianteNombre: true,
            producto: { select: { id: true, nombre: true } },
          },
        },
        items: {
          include: {
            insumo: {
              select: {
                id: true,
                nombre: true,
                tipo: true,
                unidadBase: true,
                costoUnitarioEstimado: true,
              },
            },
          },
        },
        itemsPackaging: {
          include: {
            insumo: {
              select: {
                id: true,
                nombre: true,
                tipo: true,
                unidadBase: true,
                costoUnitarioEstimado: true,
              },
            },
          },
        },
      },
    });

    if (!receta) return null;

    const itemsPropios = receta.items;
    const itemsHeredados = receta.recetaBase?.items || [];
    const itemsPackPropios = receta.itemsPackaging;
    const itemsPackHeredados = receta.recetaBase?.itemsPackaging || [];
    const todosLosItems = [...itemsHeredados, ...itemsPropios];

    const costoTotal = todosLosItems.reduce((sum, item) => {
      const costoUnitario = Number(item.insumo.costoUnitarioEstimado);
      const cantidad = Number(item.cantidad);
      const merma = Number(item.mermaPorcentaje) || 0;
      return sum + costoUnitario * cantidad * (1 + merma / 100);
    }, 0);

    return {
      ...receta,
      itemsHeredados,
      itemsHeredadosPackaging: itemsPackHeredados,
      items: itemsPropios,
      itemsPackaging: itemsPackPropios,
      costoTotalCalculado: Math.round(costoTotal * 10000) / 10000,
    };
  }

  static async crear(
    data: RecetaDTO & {
      rendimientoBase?: number;
      unidadesPorPack?: number | null;
      itemsPackaging?: RecetaItemDTO[];
    }
  ) {
    if (data.recetaBaseId) {
      const baseExiste = await prisma.receta.findUnique({
        where: { id: data.recetaBaseId },
      });
      if (!baseExiste) throw new Error("La receta base especificada no existe");
    }

    return prisma.receta.create({
      data: {
        productoId: data.productoId,
        varianteNombre: data.varianteNombre || null,
        recetaBaseId: data.recetaBaseId || null,
        rendimientoBase: data.rendimientoBase || 1,
        unidadesPorPack: data.unidadesPorPack || null,
        items: {
          create: data.items.map((item) => ({
            insumoId: item.insumoId,
            cantidad: item.cantidad,
            unidad: item.unidad,
            mermaPorcentaje: item.mermaPorcentaje || 0,
          })),
        },
        itemsPackaging:
          data.itemsPackaging && data.itemsPackaging.length > 0
            ? {
                create: data.itemsPackaging.map((item) => ({
                  insumoId: item.insumoId,
                  cantidad: item.cantidad,
                  unidad: item.unidad,
                })),
              }
            : undefined,
      },
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        items: { include: { insumo: true } },
        itemsPackaging: { include: { insumo: true } },
      },
    });
  }
  static async actualizar(
    id: string,
    data: {
      varianteNombre?: string | null;
      activa?: boolean;
      rendimientoBase?: number;
      unidadesPorPack?: number | null;
    }
  ) {
    return prisma.receta.update({
      where: { id },
      data: {
        ...(data.varianteNombre !== undefined && {
          varianteNombre: data.varianteNombre,
        }),
        ...(data.activa !== undefined && { activa: data.activa }),
        ...(data.rendimientoBase !== undefined && {
          rendimientoBase: data.rendimientoBase,
        }),
        ...(data.unidadesPorPack !== undefined && {
          unidadesPorPack: data.unidadesPorPack,
        }),
      },
    });
  }

  static async agregarItem(recetaId: string, item: RecetaItemDTO) {
    return prisma.recetaItem.create({
      data: {
        recetaId,
        insumoId: item.insumoId,
        cantidad: item.cantidad,
        unidad: item.unidad as UnidadMedida,
        mermaPorcentaje: item.mermaPorcentaje || 0,
      },
      include: { insumo: true },
    });
  }

  static async actualizarItem(itemId: string, data: Partial<RecetaItemDTO>) {
    return prisma.recetaItem.update({
      where: { id: itemId },
      data: {
        insumoId: data.insumoId as string,
        ...(data.cantidad !== undefined && { cantidad: data.cantidad }),
        ...(data.unidad && { unidad: data.unidad }),
        ...(data.mermaPorcentaje !== undefined && {
          mermaPorcentaje: data.mermaPorcentaje,
        }),
      },
      include: { insumo: true },
    });
  }

  static async eliminarItem(itemId: string) {
    return prisma.recetaItem.delete({ where: { id: itemId } });
  }

  static async desactivar(id: string) {
    return prisma.receta.update({ where: { id }, data: { activa: false } });
  }

  static async activar(id: string) {
    return prisma.receta.update({ where: { id }, data: { activa: true } });
  }

  static async duplicar(
    id: string,
    nuevoProductoId: string,
    varianteNombre?: string
  ) {
    const original = await prisma.receta.findUnique({
      where: { id },
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        items: true,
      },
    });
    if (!original) throw new Error("Receta original no encontrada");

    return prisma.receta.create({
      data: {
        productoId: nuevoProductoId,
        varianteNombre: varianteNombre || original.varianteNombre,
        recetaBaseId: original.recetaBaseId,
        items: {
          create: original.items.map((item) => ({
            insumoId: item.insumoId,
            cantidad: item.cantidad,
            unidad: item.unidad,
            mermaPorcentaje: item.mermaPorcentaje,
          })),
        },
      },
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        items: { include: { insumo: true } },
      },
    });
  }
}
