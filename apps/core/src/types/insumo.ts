import { TipoInsumo, UnidadMedida } from "@lentejuelas/shared";

export interface InsumoDTO {
  nombre: string;
  tipo: TipoInsumo;
  unidadBase: UnidadMedida;
  unidadCompra: UnidadMedida;
  factorConversion: number;
  costoUnitarioEstimado: number;
  stockMinimo: number;
  proveedorId?: string;
}

export interface InsumoResponse {
  id: string;
  nombre: string;
  tipo: TipoInsumo;
  unidadBase: UnidadMedida;
  unidadCompra: UnidadMedida;
  factorConversion: number;
  costoUnitarioEstimado: number;
  stockActual: number;
  stockMinimo: number;
  activo: boolean;
  proveedorId: string | null;
  proveedor: { id: string; nombre: string } | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    recetaItems: number;
    compraItems: number;
  };
}
