import { prisma } from "@/lib/prisma";

export interface DesgloseCostoItem {
  insumoId: string;
  nombre: string;
  tipo: string;
  cantidadNecesaria: number;
  unidad: string;
  costoUnitarioInsumo: number;
  costoTotalItem: number;
}

export interface ResultadoSimulacion {
  factorMultiplicador: number;
  cantidadPacks: number;
  costoMateriaPrima: number;
  costoPackaging: number;
  costoOperativo: number;
  costoAmortizacion: number;
  costoTotal: number;
  costoUnitario: number;
  costoUnitarioConPackaging: number | null; // esta es la línea a corregir
  costoPackagingPorPack: number;
  costoPackCompleto: number;
  detalleMateriaPrima: DesgloseCostoItem[];
  detallePackaging: DesgloseCostoItem[];
  stockSuficiente: boolean;
  insumosFaltantes: { nombre: string; falta: number; unidad: string }[];
  gastosOperativosAplicados: { concepto: string; montoProrrateado: number }[];
  amortizacionesAplicadas: { descripcion: string; costoPorTanda: number }[];
}
export async function calcularCostoProduccion(params: {
  recetaId: string;
  productoId: string;
  cantidadPlanificada: number;
  horasProduccion?: number;
}): Promise<ResultadoSimulacion> {
  const { recetaId, productoId, cantidadPlanificada, horasProduccion } = params;

  const receta = await prisma.receta.findUnique({
    where: { id: recetaId },
    include: {
      items: { include: { insumo: true } },
      itemsPackaging: { include: { insumo: true } },
      recetaBase: {
        include: {
          items: { include: { insumo: true } },
          itemsPackaging: { include: { insumo: true } },
        },
      },
    },
  });

  if (!receta) throw new Error("Receta no encontrada");

  const rendimientoBase = receta.rendimientoBase || 1;
  const factorMultiplicador = cantidadPlanificada / rendimientoBase;

  const itemsReceta = [...(receta.recetaBase?.items || []), ...receta.items];
  const itemsPack = [
    ...(receta.recetaBase?.itemsPackaging || []),
    ...receta.itemsPackaging,
  ];

  let costoMateriaPrima = 0;
  let costoPackaging = 0;
  const detalleMateriaPrima: DesgloseCostoItem[] = [];
  const detallePackaging: DesgloseCostoItem[] = [];
  const insumosFaltantes: { nombre: string; falta: number; unidad: string }[] =
    [];
  let stockSuficiente = true;

  // Materia prima: escala con factor multiplicador
  for (const item of itemsReceta) {
    const cantidadBase = Number(item.cantidad);
    const cantidadNecesaria =
      cantidadBase *
      factorMultiplicador *
      (1 + Number(item.mermaPorcentaje) / 100);
    const costoUnitario = Number(item.insumo.costoUnitarioEstimado);
    const stockActual = Number(item.insumo.stockActual);
    const costoTotalItem = cantidadNecesaria * costoUnitario;

    costoMateriaPrima += costoTotalItem;

    detalleMateriaPrima.push({
      insumoId: item.insumo.id,
      nombre: item.insumo.nombre,
      tipo: item.insumo.tipo,
      cantidadNecesaria: Math.round(cantidadNecesaria * 10000) / 10000,
      unidad: item.unidad,
      costoUnitarioInsumo: costoUnitario,
      costoTotalItem: Math.round(costoTotalItem * 10000) / 10000,
    });

    if (
      stockActual < cantidadNecesaria &&
      item.insumo.tipo === "MATERIA_PRIMA"
    ) {
      stockSuficiente = false;
      insumosFaltantes.push({
        nombre: item.insumo.nombre,
        falta: Math.round((cantidadNecesaria - stockActual) * 1000) / 1000,
        unidad: item.unidad,
      });
    }
  }

  // Packaging: escala por cantidad de packs
  const unidadesPorPack = receta.unidadesPorPack || 1;
  const cantidadPacks = Math.floor(cantidadPlanificada / unidadesPorPack);

  for (const item of itemsPack) {
    const cantidadNecesaria = Number(item.cantidad) * cantidadPacks;
    const costoUnitario = Number(item.insumo.costoUnitarioEstimado);
    const stockActual = Number(item.insumo.stockActual);
    const costoTotalItem = cantidadNecesaria * costoUnitario;

    costoPackaging += costoTotalItem;

    detallePackaging.push({
      insumoId: item.insumo.id,
      nombre: item.insumo.nombre,
      tipo: item.insumo.tipo,
      cantidadNecesaria: Math.round(cantidadNecesaria * 10000) / 10000,
      unidad: item.unidad,
      costoUnitarioInsumo: costoUnitario,
      costoTotalItem: Math.round(costoTotalItem * 10000) / 10000,
    });

    if (stockActual < cantidadNecesaria) {
      stockSuficiente = false;
      insumosFaltantes.push({
        nombre: item.insumo.nombre,
        falta: Math.round((cantidadNecesaria - stockActual) * 1000) / 1000,
        unidad: item.unidad,
      });
    }
  }

  // Gastos operativos prorrateables
  const gastosOperativos = await prisma.gastoOperativo.findMany({
    where: { prorrateable: true },
  });

  // Estimar tandas mensuales según producción histórica o un valor fijo
  const TANDAS_MENSUALES_ESTIMADAS = 100;

  let costoOperativo = 0;
  const gastosOperativosAplicados: {
    concepto: string;
    montoProrrateado: number;
  }[] = [];

  for (const gasto of gastosOperativos) {
    if (gasto.esManoDeObra && gasto.costoPorHora && horasProduccion) {
      const montoProrrateado = Number(gasto.costoPorHora) * horasProduccion;
      costoOperativo += montoProrrateado;
      gastosOperativosAplicados.push({
        concepto: gasto.concepto,
        montoProrrateado: Math.round(montoProrrateado * 100) / 100,
      });
    } else if (!gasto.esManoDeObra) {
      const montoProrrateado = Number(gasto.monto) / TANDAS_MENSUALES_ESTIMADAS;
      costoOperativo += montoProrrateado;
      gastosOperativosAplicados.push({
        concepto: gasto.concepto,
        montoProrrateado: Math.round(montoProrrateado * 100) / 100,
      });
    }
  }

  // Amortizaciones
  const activos = await prisma.activoAmortizable.findMany({
    where: { activo: true },
  });

  let costoAmortizacion = 0;
  const amortizacionesAplicadas: {
    descripcion: string;
    costoPorTanda: number;
  }[] = [];

  for (const activo of activos) {
    const costoPorTanda =
      Number(activo.costoPorTanda) ||
      Number(activo.valorAdquisicion) / activo.vidaUtilTandas;
    costoAmortizacion += costoPorTanda;
    amortizacionesAplicadas.push({
      descripcion: activo.descripcion,
      costoPorTanda: Math.round(costoPorTanda * 10000) / 10000,
    });
  }

  costoMateriaPrima = Math.round(costoMateriaPrima * 100) / 100;
  costoPackaging = Math.round(costoPackaging * 100) / 100;
  costoOperativo = Math.round(costoOperativo * 100) / 100;
  costoAmortizacion = Math.round(costoAmortizacion * 100) / 100;

  const costoTotal =
    costoMateriaPrima + costoPackaging + costoOperativo + costoAmortizacion;

  // Costo unitario sin packaging (producción pura)
  const costoUnitario =
    cantidadPlanificada > 0
      ? (costoMateriaPrima + costoOperativo + costoAmortizacion) /
        cantidadPlanificada
      : 0;

  // Costo del pack completo: producción de N unidades + packaging del pack
  const costoPackagingPorPack =
    cantidadPacks > 0 ? costoPackaging / cantidadPacks : 0;
  const costoPackCompleto =
    unidadesPorPack > 0
      ? costoUnitario * unidadesPorPack + costoPackagingPorPack
      : costoUnitario;

  // Si se vende por pack, no hay costo unitario con packaging,
  // solo costo del pack. Si no, el packaging va por unidad.
  const costoUnitarioConPackaging =
    unidadesPorPack > 1
      ? null // no aplica, se vende por pack
      : costoUnitario + costoPackagingPorPack;

  return {
    factorMultiplicador: Math.round(factorMultiplicador * 10000) / 10000,
    cantidadPacks,
    costoMateriaPrima,
    costoPackaging,
    costoOperativo,
    costoAmortizacion,
    costoTotal,
    costoUnitario: Math.round(costoUnitario * 10000) / 10000,
    costoUnitarioConPackaging:
      costoUnitarioConPackaging !== null
        ? Math.round(costoUnitarioConPackaging * 10000) / 10000
        : null,
    costoPackagingPorPack: Math.round(costoPackagingPorPack * 10000) / 10000,
    costoPackCompleto: Math.round(costoPackCompleto * 10000) / 10000,
    detalleMateriaPrima,
    detallePackaging,
    stockSuficiente,
    insumosFaltantes,
    gastosOperativosAplicados,
    amortizacionesAplicadas,
  };
}
