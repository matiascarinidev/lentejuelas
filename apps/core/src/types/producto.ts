export interface ProductoDTO {
  nombre: string;
  categoriaId?: string | null;
  esProduccionPropia: boolean;
  costoCompra?: number | null;
  margenGanancia?: number | null;
  precioVentaSugerido: number;
  precioVentaFinal?: number | null;
}

export interface ProductoResponse {
  id: string;
  nombre: string;
  categoriaId: string | null;
  categoria: {
    id: string;
    nombre: string;
  } | null;
  esProduccionPropia: boolean;
  costoCompra: number | null;
  margenGanancia: number | null;
  precioVentaSugerido: number;
  precioVentaFinal: number | null;
  stockActual: number;
  activo: boolean;
  recetas?: {
    id: string;
    activa: boolean;
    rendimientoBase: number;
    unidadesPorPack: number | null;
    varianteNombre: string | null;
    costoTotalCalculado?: number;
    costoUnitario?: number;
    costoPackCompleto?: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
