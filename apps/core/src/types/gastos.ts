export interface GastoOperativoDTO {
  concepto: string;
  monto: number;
  prorrateable: boolean;
  esManoDeObra: boolean;
  costoPorHora?: number | null;
  fecha?: string;
}

export interface ActivoAmortizableDTO {
  descripcion: string;
  valorAdquisicion: number;
  vidaUtilTandas: number;
  fechaInicio?: string;
}
