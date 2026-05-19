import { UnidadMedida } from "@lentejuelas/shared";

export interface RecetaItemDTO {
  insumoId: string;
  cantidad: number;
  unidad: UnidadMedida;
  mermaPorcentaje?: number;
}

export interface RecetaDTO {
  productoId: string;
  varianteNombre?: string | null;
  recetaBaseId?: string | null;
  rendimientoBase?: number;
  unidadesPorPack?: number | null;
  items: RecetaItemDTO[];
  itemsPackaging?: RecetaItemDTO[];
}

export interface RecetaItemResponse {
  id: string;
  recetaId: string;
  insumoId: string;
  cantidad: number;
  unidad: UnidadMedida;
  mermaPorcentaje: number;
  insumo: {
    id: string;
    nombre: string;
    tipo: string;
    unidadBase: UnidadMedida;
    costoUnitarioEstimado: number;
  };
}

export interface RecetaItemPackagingResponse {
  id: string;
  recetaId: string;
  insumoId: string;
  cantidad: number;
  unidad: UnidadMedida;
  insumo: {
    id: string;
    nombre: string;
    tipo: string;
    unidadBase: UnidadMedida;
    costoUnitarioEstimado: number;
  };
}

export interface RecetaResponse {
  id: string;
  productoId: string;
  producto: {
    id: string;
    nombre: string;
    categoria: { id: string; nombre: string };
  };
  varianteNombre: string | null;
  recetaBaseId: string | null;
  recetaBase: {
    id: string;
    varianteNombre: string | null;
    producto: {
      id: string;
      nombre: string;
      categoria: { id: string; nombre: string };
    };
  } | null;
  variantes: {
    id: string;
    varianteNombre: string | null;
    producto: {
      id: string;
      nombre: string;
      categoria: { id: string; nombre: string };
    };
  }[];
  rendimientoBase: number;
  unidadesPorPack: number | null;
  activa: boolean;
  fechaVigenciaInicio: string;
  items: RecetaItemResponse[];
  itemsPackaging: RecetaItemPackagingResponse[];
  itemsHeredados?: RecetaItemResponse[];
  itemsHeredadosPackaging?: RecetaItemPackagingResponse[];
  costoTotalCalculado?: number;
}
