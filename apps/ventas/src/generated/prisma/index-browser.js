
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

exports.Prisma.ClienteScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  telefono: 'telefono',
  email: 'email',
  direccion: 'direccion',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PedidoScalarFieldEnum = {
  id: 'id',
  clienteId: 'clienteId',
  fecha: 'fecha',
  fechaEntrega: 'fechaEntrega',
  estado: 'estado',
  tipo: 'tipo',
  total: 'total',
  observacion: 'observacion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PedidoItemScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  pedidoId: 'pedidoId',
  productoId: 'productoId',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  subtotal: 'subtotal'
};

exports.Prisma.MesaScalarFieldEnum = {
  id: 'id',
  numero: 'numero',
  estado: 'estado',
  activo: 'activo'
};

exports.Prisma.ComandaScalarFieldEnum = {
  id: 'id',
  mesaId: 'mesaId',
  fechaApertura: 'fechaApertura',
  fechaCierre: 'fechaCierre',
  estado: 'estado',
  total: 'total',
  observacion: 'observacion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ComandaItemScalarFieldEnum = {
  id: 'id',
  comandaId: 'comandaId',
  productoId: 'productoId',
  nombre: 'nombre',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  subtotal: 'subtotal',
  esProductoPropio: 'esProductoPropio',
  estado: 'estado',
  createdAt: 'createdAt'
};

exports.Prisma.VentaPOSScalarFieldEnum = {
  id: 'id',
  clienteId: 'clienteId',
  fecha: 'fecha',
  total: 'total',
  metodoPago: 'metodoPago',
  observacion: 'observacion',
  createdAt: 'createdAt'
};

exports.Prisma.VentaPOSItemScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  ventaPOSId: 'ventaPOSId',
  productoId: 'productoId',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  subtotal: 'subtotal',
  esProductoPropio: 'esProductoPropio'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  usuario: 'usuario',
  accion: 'accion',
  entidad: 'entidad',
  entidadId: 'entidadId',
  antes: 'antes',
  despues: 'despues',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.EstadoPedido = exports.$Enums.EstadoPedido = {
  PENDIENTE: 'PENDIENTE',
  EN_PRODUCCION: 'EN_PRODUCCION',
  LISTO: 'LISTO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO'
};

exports.TipoPedido = exports.$Enums.TipoPedido = {
  STOCK: 'STOCK',
  ENCARGO: 'ENCARGO'
};

exports.EstadoMesa = exports.$Enums.EstadoMesa = {
  LIBRE: 'LIBRE',
  OCUPADA: 'OCUPADA',
  RESERVADA: 'RESERVADA'
};

exports.EstadoComanda = exports.$Enums.EstadoComanda = {
  ABIERTA: 'ABIERTA',
  CERRADA: 'CERRADA',
  CANCELADA: 'CANCELADA'
};

exports.EstadoItemComanda = exports.$Enums.EstadoItemComanda = {
  PENDIENTE: 'PENDIENTE',
  EN_PREPARACION: 'EN_PREPARACION',
  LISTO: 'LISTO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO'
};

exports.MetodoPago = exports.$Enums.MetodoPago = {
  EFECTIVO: 'EFECTIVO',
  TARJETA: 'TARJETA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  OTRO: 'OTRO'
};

exports.Prisma.ModelName = {
  Cliente: 'Cliente',
  Pedido: 'Pedido',
  PedidoItem: 'PedidoItem',
  Mesa: 'Mesa',
  Comanda: 'Comanda',
  ComandaItem: 'ComandaItem',
  VentaPOS: 'VentaPOS',
  VentaPOSItem: 'VentaPOSItem',
  AuditLog: 'AuditLog'
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
