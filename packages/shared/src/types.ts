export enum TipoMovimientoStock {
  ENTRADA = "ENTRADA",
  SALIDA = "SALIDA",
}

export enum UnidadMedida {
  GRAMOS = "GRAMOS",
  KILOGRAMOS = "KILOGRAMOS",
  MILILITROS = "MILILITROS",
  LITROS = "LITROS",
  UNIDAD = "UNIDAD",
  PAQUETE = "PAQUETE",
  BOLSA = "BOLSA",
  CAJA = "CAJA",
  MAPLE = "MAPLE",
  MANOJO = "MANOJO",
  CABEZA = "CABEZA",
  ROLLO = "ROLLO",
}
export enum TipoInsumo {
  MATERIA_PRIMA = "MATERIA_PRIMA",
  ENVASE = "ENVASE",
  ETIQUETA = "ETIQUETA",
  OPERATIVO = "OPERATIVO",
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
