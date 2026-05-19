export interface ProductoVenta {
  id: string;
  nombre: string;
  categoria: string;
  precioVentaSugerido: number;
  esProduccionPropia: boolean;
  stockActual: number;
  unidadesPorPack: number | null;
}

export interface ItemVenta {
  productoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  esProductoPropio: boolean;
}
