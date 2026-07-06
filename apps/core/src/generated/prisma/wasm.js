
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CategoriaProductoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoriaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  categoriaId: 'categoriaId',
  esProduccionPropia: 'esProduccionPropia',
  costoCompra: 'costoCompra',
  margenGanancia: 'margenGanancia',
  precioVentaSugerido: 'precioVentaSugerido',
  precioVentaFinal: 'precioVentaFinal',
  stockActual: 'stockActual',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  categoriaProductoId: 'categoriaProductoId',
  pedidoItemId: 'pedidoItemId'
};

exports.Prisma.POSVentaItemScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.ProductoPOSVentaItemScalarFieldEnum = {
  id: 'id',
  productoId: 'productoId',
  posVentaItemId: 'posVentaItemId'
};

exports.Prisma.ComandaItemScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.ProductoComandaItemScalarFieldEnum = {
  id: 'id',
  productoId: 'productoId',
  comandaItemId: 'comandaItemId'
};

exports.Prisma.PedidoItemScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.RecetaScalarFieldEnum = {
  id: 'id',
  productoId: 'productoId',
  varianteNombre: 'varianteNombre',
  recetaBaseId: 'recetaBaseId',
  rendimientoBase: 'rendimientoBase',
  unidadesPorPack: 'unidadesPorPack',
  activa: 'activa',
  fechaVigenciaInicio: 'fechaVigenciaInicio',
  fechaVigenciaFin: 'fechaVigenciaFin',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecetaItemPackagingScalarFieldEnum = {
  id: 'id',
  recetaId: 'recetaId',
  insumoId: 'insumoId',
  cantidad: 'cantidad',
  unidad: 'unidad'
};

exports.Prisma.RecetaItemScalarFieldEnum = {
  id: 'id',
  recetaId: 'recetaId',
  insumoId: 'insumoId',
  cantidad: 'cantidad',
  unidad: 'unidad',
  mermaPorcentaje: 'mermaPorcentaje'
};

exports.Prisma.InsumoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  tipo: 'tipo',
  unidadBase: 'unidadBase',
  unidadCompra: 'unidadCompra',
  factorConversion: 'factorConversion',
  costoUnitarioEstimado: 'costoUnitarioEstimado',
  stockActual: 'stockActual',
  stockMinimo: 'stockMinimo',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  proveedorId: 'proveedorId'
};

exports.Prisma.ProveedorScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  contacto: 'contacto',
  telefono: 'telefono',
  email: 'email',
  activo: 'activo',
  createdAt: 'createdAt'
};

exports.Prisma.CompraInsumoScalarFieldEnum = {
  id: 'id',
  proveedorId: 'proveedorId',
  fecha: 'fecha',
  total: 'total',
  observacion: 'observacion',
  createdAt: 'createdAt'
};

exports.Prisma.CompraInsumoItemScalarFieldEnum = {
  id: 'id',
  compraId: 'compraId',
  insumoId: 'insumoId',
  cantidadCompra: 'cantidadCompra',
  precioUnitario: 'precioUnitario',
  subtotal: 'subtotal'
};

exports.Prisma.ProduccionLoteScalarFieldEnum = {
  id: 'id',
  productoId: 'productoId',
  recetaId: 'recetaId',
  fechaProduccion: 'fechaProduccion',
  fechaVencimiento: 'fechaVencimiento',
  cantidadPlanificada: 'cantidadPlanificada',
  cantidadReal: 'cantidadReal',
  horasProduccion: 'horasProduccion',
  costoTotalCalculado: 'costoTotalCalculado',
  costoUnitarioFinal: 'costoUnitarioFinal',
  costoMateriaPrima: 'costoMateriaPrima',
  costoPackaging: 'costoPackaging',
  costoOperativo: 'costoOperativo',
  costoAmortizacion: 'costoAmortizacion',
  observacion: 'observacion',
  createdAt: 'createdAt',
  mermaReal: 'mermaReal',
  motivoMerma: 'motivoMerma'
};

exports.Prisma.MovimientoStockScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  fecha: 'fecha',
  insumoId: 'insumoId',
  productoId: 'productoId',
  cantidad: 'cantidad',
  unidad: 'unidad',
  compraId: 'compraId',
  loteId: 'loteId',
  observacion: 'observacion'
};

exports.Prisma.GastoOperativoScalarFieldEnum = {
  id: 'id',
  concepto: 'concepto',
  monto: 'monto',
  fecha: 'fecha',
  prorrateable: 'prorrateable',
  esManoDeObra: 'esManoDeObra',
  costoPorHora: 'costoPorHora',
  createdAt: 'createdAt'
};

exports.Prisma.ActivoAmortizableScalarFieldEnum = {
  id: 'id',
  descripcion: 'descripcion',
  valorAdquisicion: 'valorAdquisicion',
  vidaUtilTandas: 'vidaUtilTandas',
  tandasAcumuladas: 'tandasAcumuladas',
  costoPorTanda: 'costoPorTanda',
  activo: 'activo',
  fechaInicio: 'fechaInicio',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UnidadMedida = exports.$Enums.UnidadMedida = {
  GRAMOS: 'GRAMOS',
  KILOGRAMOS: 'KILOGRAMOS',
  MILILITROS: 'MILILITROS',
  LITROS: 'LITROS',
  UNIDAD: 'UNIDAD',
  PAQUETE: 'PAQUETE',
  BOLSA: 'BOLSA',
  CAJA: 'CAJA',
  MAPLE: 'MAPLE',
  MANOJO: 'MANOJO',
  CABEZA: 'CABEZA',
  ROLLO: 'ROLLO'
};

exports.TipoInsumo = exports.$Enums.TipoInsumo = {
  MATERIA_PRIMA: 'MATERIA_PRIMA',
  ENVASE: 'ENVASE',
  ETIQUETA: 'ETIQUETA',
  OPERATIVO: 'OPERATIVO'
};

exports.TipoMovimientoStock = exports.$Enums.TipoMovimientoStock = {
  ENTRADA: 'ENTRADA',
  SALIDA: 'SALIDA'
};

exports.Prisma.ModelName = {
  CategoriaProducto: 'CategoriaProducto',
  Categoria: 'Categoria',
  Producto: 'Producto',
  POSVentaItem: 'POSVentaItem',
  ProductoPOSVentaItem: 'ProductoPOSVentaItem',
  ComandaItem: 'ComandaItem',
  ProductoComandaItem: 'ProductoComandaItem',
  PedidoItem: 'PedidoItem',
  Receta: 'Receta',
  RecetaItemPackaging: 'RecetaItemPackaging',
  RecetaItem: 'RecetaItem',
  Insumo: 'Insumo',
  Proveedor: 'Proveedor',
  CompraInsumo: 'CompraInsumo',
  CompraInsumoItem: 'CompraInsumoItem',
  ProduccionLote: 'ProduccionLote',
  MovimientoStock: 'MovimientoStock',
  GastoOperativo: 'GastoOperativo',
  ActivoAmortizable: 'ActivoAmortizable'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
