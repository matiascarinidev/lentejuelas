export interface ProduccionLoteDTO {
  productoId: string;
  recetaId: string;
  cantidadPlanificada: number;
  cantidadReal: number;
  mermaReal?: number;
  motivoMerma?: string;
  fechaProduccion?: string;
  fechaVencimiento?: string;
  observacion?: string;
}

export interface ProduccionLoteResponse {
  id: string;
  productoId: string;
  producto: {
    id: string;
    nombre: string;
    categoria: { id: string; nombre: string };
  };
  recetaId: string;
  receta: {
    id: string;
    varianteNombre: string | null;
    recetaBaseId: string | null;
    rendimientoBase: number;
    unidadesPorPack: number | null;
  };
  fechaProduccion: string;
  fechaVencimiento: string | null;
  cantidadPlanificada: number;
  cantidadReal: number;
  horasProduccion: number | null;
  costoMateriaPrima: number;
  costoPackaging: number;
  costoOperativo: number;
  costoAmortizacion: number;
  costoTotalCalculado: number;
  costoUnitarioFinal: number;
  observacion: string | null;
  movimientos: {
    id: string;
    tipo: string;
    insumoId: string | null;
    insumo: { id: string; nombre: string } | null;
    producto: { id: string; nombre: string } | null;
    cantidad: number;
    unidad: string;
  }[];
  createdAt: string;
}

export interface CostoProduccionDesglose {
  costoMateriaPrima: number;
  costoPackaging: number;
  costoOperativoProrrateado: number;
  costoAmortizacionProrrateado: number;
  costoTotal: number;
  costoUnitario: number;
}
