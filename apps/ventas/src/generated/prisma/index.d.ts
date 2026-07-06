
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Pedido
 * 
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>
/**
 * Model PedidoItem
 * 
 */
export type PedidoItem = $Result.DefaultSelection<Prisma.$PedidoItemPayload>
/**
 * Model Mesa
 * 
 */
export type Mesa = $Result.DefaultSelection<Prisma.$MesaPayload>
/**
 * Model Comanda
 * 
 */
export type Comanda = $Result.DefaultSelection<Prisma.$ComandaPayload>
/**
 * Model ComandaItem
 * 
 */
export type ComandaItem = $Result.DefaultSelection<Prisma.$ComandaItemPayload>
/**
 * Model VentaPOS
 * 
 */
export type VentaPOS = $Result.DefaultSelection<Prisma.$VentaPOSPayload>
/**
 * Model VentaPOSItem
 * 
 */
export type VentaPOSItem = $Result.DefaultSelection<Prisma.$VentaPOSItemPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EstadoPedido: {
  PENDIENTE: 'PENDIENTE',
  EN_PRODUCCION: 'EN_PRODUCCION',
  LISTO: 'LISTO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO'
};

export type EstadoPedido = (typeof EstadoPedido)[keyof typeof EstadoPedido]


export const TipoPedido: {
  STOCK: 'STOCK',
  ENCARGO: 'ENCARGO'
};

export type TipoPedido = (typeof TipoPedido)[keyof typeof TipoPedido]


export const EstadoMesa: {
  LIBRE: 'LIBRE',
  OCUPADA: 'OCUPADA',
  RESERVADA: 'RESERVADA'
};

export type EstadoMesa = (typeof EstadoMesa)[keyof typeof EstadoMesa]


export const EstadoComanda: {
  ABIERTA: 'ABIERTA',
  CERRADA: 'CERRADA',
  CANCELADA: 'CANCELADA'
};

export type EstadoComanda = (typeof EstadoComanda)[keyof typeof EstadoComanda]


export const EstadoItemComanda: {
  PENDIENTE: 'PENDIENTE',
  EN_PREPARACION: 'EN_PREPARACION',
  LISTO: 'LISTO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO'
};

export type EstadoItemComanda = (typeof EstadoItemComanda)[keyof typeof EstadoItemComanda]


export const MetodoPago: {
  EFECTIVO: 'EFECTIVO',
  TARJETA: 'TARJETA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  OTRO: 'OTRO'
};

export type MetodoPago = (typeof MetodoPago)[keyof typeof MetodoPago]

}

export type EstadoPedido = $Enums.EstadoPedido

export const EstadoPedido: typeof $Enums.EstadoPedido

export type TipoPedido = $Enums.TipoPedido

export const TipoPedido: typeof $Enums.TipoPedido

export type EstadoMesa = $Enums.EstadoMesa

export const EstadoMesa: typeof $Enums.EstadoMesa

export type EstadoComanda = $Enums.EstadoComanda

export const EstadoComanda: typeof $Enums.EstadoComanda

export type EstadoItemComanda = $Enums.EstadoItemComanda

export const EstadoItemComanda: typeof $Enums.EstadoItemComanda

export type MetodoPago = $Enums.MetodoPago

export const MetodoPago: typeof $Enums.MetodoPago

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clientes
 * const clientes = await prisma.cliente.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clientes
   * const clientes = await prisma.cliente.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs>;

  /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedido.findMany()
    * ```
    */
  get pedido(): Prisma.PedidoDelegate<ExtArgs>;

  /**
   * `prisma.pedidoItem`: Exposes CRUD operations for the **PedidoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoItems
    * const pedidoItems = await prisma.pedidoItem.findMany()
    * ```
    */
  get pedidoItem(): Prisma.PedidoItemDelegate<ExtArgs>;

  /**
   * `prisma.mesa`: Exposes CRUD operations for the **Mesa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mesas
    * const mesas = await prisma.mesa.findMany()
    * ```
    */
  get mesa(): Prisma.MesaDelegate<ExtArgs>;

  /**
   * `prisma.comanda`: Exposes CRUD operations for the **Comanda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comandas
    * const comandas = await prisma.comanda.findMany()
    * ```
    */
  get comanda(): Prisma.ComandaDelegate<ExtArgs>;

  /**
   * `prisma.comandaItem`: Exposes CRUD operations for the **ComandaItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComandaItems
    * const comandaItems = await prisma.comandaItem.findMany()
    * ```
    */
  get comandaItem(): Prisma.ComandaItemDelegate<ExtArgs>;

  /**
   * `prisma.ventaPOS`: Exposes CRUD operations for the **VentaPOS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VentaPOS
    * const ventaPOS = await prisma.ventaPOS.findMany()
    * ```
    */
  get ventaPOS(): Prisma.VentaPOSDelegate<ExtArgs>;

  /**
   * `prisma.ventaPOSItem`: Exposes CRUD operations for the **VentaPOSItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VentaPOSItems
    * const ventaPOSItems = await prisma.ventaPOSItem.findMany()
    * ```
    */
  get ventaPOSItem(): Prisma.VentaPOSItemDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "cliente" | "pedido" | "pedidoItem" | "mesa" | "comanda" | "comandaItem" | "ventaPOS" | "ventaPOSItem" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>
        fields: Prisma.PedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido>
          }
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number
          }
        }
      }
      PedidoItem: {
        payload: Prisma.$PedidoItemPayload<ExtArgs>
        fields: Prisma.PedidoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findFirst: {
            args: Prisma.PedidoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          findMany: {
            args: Prisma.PedidoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          create: {
            args: Prisma.PedidoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          createMany: {
            args: Prisma.PedidoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>[]
          }
          delete: {
            args: Prisma.PedidoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          update: {
            args: Prisma.PedidoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          deleteMany: {
            args: Prisma.PedidoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoItemPayload>
          }
          aggregate: {
            args: Prisma.PedidoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoItem>
          }
          groupBy: {
            args: Prisma.PedidoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoItemCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoItemCountAggregateOutputType> | number
          }
        }
      }
      Mesa: {
        payload: Prisma.$MesaPayload<ExtArgs>
        fields: Prisma.MesaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MesaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MesaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          findFirst: {
            args: Prisma.MesaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MesaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          findMany: {
            args: Prisma.MesaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>[]
          }
          create: {
            args: Prisma.MesaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          createMany: {
            args: Prisma.MesaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MesaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>[]
          }
          delete: {
            args: Prisma.MesaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          update: {
            args: Prisma.MesaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          deleteMany: {
            args: Prisma.MesaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MesaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MesaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          aggregate: {
            args: Prisma.MesaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMesa>
          }
          groupBy: {
            args: Prisma.MesaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MesaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MesaCountArgs<ExtArgs>
            result: $Utils.Optional<MesaCountAggregateOutputType> | number
          }
        }
      }
      Comanda: {
        payload: Prisma.$ComandaPayload<ExtArgs>
        fields: Prisma.ComandaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComandaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComandaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          findFirst: {
            args: Prisma.ComandaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComandaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          findMany: {
            args: Prisma.ComandaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>[]
          }
          create: {
            args: Prisma.ComandaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          createMany: {
            args: Prisma.ComandaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComandaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>[]
          }
          delete: {
            args: Prisma.ComandaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          update: {
            args: Prisma.ComandaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          deleteMany: {
            args: Prisma.ComandaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComandaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComandaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaPayload>
          }
          aggregate: {
            args: Prisma.ComandaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComanda>
          }
          groupBy: {
            args: Prisma.ComandaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComandaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComandaCountArgs<ExtArgs>
            result: $Utils.Optional<ComandaCountAggregateOutputType> | number
          }
        }
      }
      ComandaItem: {
        payload: Prisma.$ComandaItemPayload<ExtArgs>
        fields: Prisma.ComandaItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComandaItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComandaItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          findFirst: {
            args: Prisma.ComandaItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComandaItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          findMany: {
            args: Prisma.ComandaItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>[]
          }
          create: {
            args: Prisma.ComandaItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          createMany: {
            args: Prisma.ComandaItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComandaItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>[]
          }
          delete: {
            args: Prisma.ComandaItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          update: {
            args: Prisma.ComandaItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          deleteMany: {
            args: Prisma.ComandaItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComandaItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComandaItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaItemPayload>
          }
          aggregate: {
            args: Prisma.ComandaItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComandaItem>
          }
          groupBy: {
            args: Prisma.ComandaItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComandaItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComandaItemCountArgs<ExtArgs>
            result: $Utils.Optional<ComandaItemCountAggregateOutputType> | number
          }
        }
      }
      VentaPOS: {
        payload: Prisma.$VentaPOSPayload<ExtArgs>
        fields: Prisma.VentaPOSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VentaPOSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VentaPOSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          findFirst: {
            args: Prisma.VentaPOSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VentaPOSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          findMany: {
            args: Prisma.VentaPOSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>[]
          }
          create: {
            args: Prisma.VentaPOSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          createMany: {
            args: Prisma.VentaPOSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VentaPOSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>[]
          }
          delete: {
            args: Prisma.VentaPOSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          update: {
            args: Prisma.VentaPOSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          deleteMany: {
            args: Prisma.VentaPOSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VentaPOSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VentaPOSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSPayload>
          }
          aggregate: {
            args: Prisma.VentaPOSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVentaPOS>
          }
          groupBy: {
            args: Prisma.VentaPOSGroupByArgs<ExtArgs>
            result: $Utils.Optional<VentaPOSGroupByOutputType>[]
          }
          count: {
            args: Prisma.VentaPOSCountArgs<ExtArgs>
            result: $Utils.Optional<VentaPOSCountAggregateOutputType> | number
          }
        }
      }
      VentaPOSItem: {
        payload: Prisma.$VentaPOSItemPayload<ExtArgs>
        fields: Prisma.VentaPOSItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VentaPOSItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VentaPOSItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          findFirst: {
            args: Prisma.VentaPOSItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VentaPOSItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          findMany: {
            args: Prisma.VentaPOSItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>[]
          }
          create: {
            args: Prisma.VentaPOSItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          createMany: {
            args: Prisma.VentaPOSItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VentaPOSItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>[]
          }
          delete: {
            args: Prisma.VentaPOSItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          update: {
            args: Prisma.VentaPOSItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          deleteMany: {
            args: Prisma.VentaPOSItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VentaPOSItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VentaPOSItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPOSItemPayload>
          }
          aggregate: {
            args: Prisma.VentaPOSItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVentaPOSItem>
          }
          groupBy: {
            args: Prisma.VentaPOSItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<VentaPOSItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.VentaPOSItemCountArgs<ExtArgs>
            result: $Utils.Optional<VentaPOSItemCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    pedidos: number
    ventasPOS: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | ClienteCountOutputTypeCountPedidosArgs
    ventasPOS?: boolean | ClienteCountOutputTypeCountVentasPOSArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountVentasPOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaPOSWhereInput
  }


  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    items: number
  }

  export type PedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PedidoCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
  }


  /**
   * Count Type MesaCountOutputType
   */

  export type MesaCountOutputType = {
    comandas: number
  }

  export type MesaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | MesaCountOutputTypeCountComandasArgs
  }

  // Custom InputTypes
  /**
   * MesaCountOutputType without action
   */
  export type MesaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MesaCountOutputType
     */
    select?: MesaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MesaCountOutputType without action
   */
  export type MesaCountOutputTypeCountComandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaWhereInput
  }


  /**
   * Count Type ComandaCountOutputType
   */

  export type ComandaCountOutputType = {
    items: number
  }

  export type ComandaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ComandaCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ComandaCountOutputType without action
   */
  export type ComandaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaCountOutputType
     */
    select?: ComandaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComandaCountOutputType without action
   */
  export type ComandaCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaItemWhereInput
  }


  /**
   * Count Type VentaPOSCountOutputType
   */

  export type VentaPOSCountOutputType = {
    items: number
  }

  export type VentaPOSCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | VentaPOSCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * VentaPOSCountOutputType without action
   */
  export type VentaPOSCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSCountOutputType
     */
    select?: VentaPOSCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VentaPOSCountOutputType without action
   */
  export type VentaPOSCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaPOSItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nombre: number
    telefono: number
    email: number
    direccion: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClienteMinAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    email?: true
    direccion?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: string
    nombre: string
    telefono: string | null
    email: string | null
    direccion: string | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pedidos?: boolean | Cliente$pedidosArgs<ExtArgs>
    ventasPOS?: boolean | Cliente$ventasPOSArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | Cliente$pedidosArgs<ExtArgs>
    ventasPOS?: boolean | Cliente$ventasPOSArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
      ventasPOS: Prisma.$VentaPOSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      telefono: string | null
      email: string | null
      direccion: string | null
      activo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends Cliente$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany"> | Null>
    ventasPOS<T extends Cliente$ventasPOSArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$ventasPOSArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */ 
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'String'>
    readonly nombre: FieldRef<"Cliente", 'String'>
    readonly telefono: FieldRef<"Cliente", 'String'>
    readonly email: FieldRef<"Cliente", 'String'>
    readonly direccion: FieldRef<"Cliente", 'String'>
    readonly activo: FieldRef<"Cliente", 'Boolean'>
    readonly createdAt: FieldRef<"Cliente", 'DateTime'>
    readonly updatedAt: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
  }

  /**
   * Cliente.pedidos
   */
  export type Cliente$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Cliente.ventasPOS
   */
  export type Cliente$ventasPOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    where?: VentaPOSWhereInput
    orderBy?: VentaPOSOrderByWithRelationInput | VentaPOSOrderByWithRelationInput[]
    cursor?: VentaPOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VentaPOSScalarFieldEnum | VentaPOSScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  export type PedidoAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type PedidoSumAggregateOutputType = {
    total: Decimal | null
  }

  export type PedidoMinAggregateOutputType = {
    id: string | null
    clienteId: string | null
    fecha: Date | null
    fechaEntrega: Date | null
    estado: $Enums.EstadoPedido | null
    tipo: $Enums.TipoPedido | null
    total: Decimal | null
    observacion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoMaxAggregateOutputType = {
    id: string | null
    clienteId: string | null
    fecha: Date | null
    fechaEntrega: Date | null
    estado: $Enums.EstadoPedido | null
    tipo: $Enums.TipoPedido | null
    total: Decimal | null
    observacion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoCountAggregateOutputType = {
    id: number
    clienteId: number
    fecha: number
    fechaEntrega: number
    estado: number
    tipo: number
    total: number
    observacion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PedidoAvgAggregateInputType = {
    total?: true
  }

  export type PedidoSumAggregateInputType = {
    total?: true
  }

  export type PedidoMinAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    fechaEntrega?: true
    estado?: true
    tipo?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoMaxAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    fechaEntrega?: true
    estado?: true
    tipo?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoCountAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    fechaEntrega?: true
    estado?: true
    tipo?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoMaxAggregateInputType
  }

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>
  }




  export type PedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[]
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum
    having?: PedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoCountAggregateInputType | true
    _avg?: PedidoAvgAggregateInputType
    _sum?: PedidoSumAggregateInputType
    _min?: PedidoMinAggregateInputType
    _max?: PedidoMaxAggregateInputType
  }

  export type PedidoGroupByOutputType = {
    id: string
    clienteId: string
    fecha: Date
    fechaEntrega: Date | null
    estado: $Enums.EstadoPedido
    tipo: $Enums.TipoPedido
    total: Decimal
    observacion: string | null
    createdAt: Date
    updatedAt: Date
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    fechaEntrega?: boolean
    estado?: boolean
    tipo?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Pedido$itemsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    fechaEntrega?: boolean
    estado?: boolean
    tipo?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectScalar = {
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    fechaEntrega?: boolean
    estado?: boolean
    tipo?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Pedido$itemsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedido"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      items: Prisma.$PedidoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clienteId: string
      fecha: Date
      fechaEntrega: Date | null
      estado: $Enums.EstadoPedido
      tipo: $Enums.TipoPedido
      total: Prisma.Decimal
      observacion: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pedido"]>
    composites: {}
  }

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> = $Result.GetResult<Prisma.$PedidoPayload, S>

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PedidoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PedidoCountAggregateInputType | true
    }

  export interface PedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido'], meta: { name: 'Pedido' } }
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoWithIdOnly = await prisma.pedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoFindManyArgs>(args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     * 
     */
    create<T extends PedidoCreateArgs>(args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoCreateManyArgs>(args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidoCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     * 
     */
    delete<T extends PedidoDeleteArgs>(args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoUpdateArgs>(args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoDeleteManyArgs>(args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoUpdateManyArgs>(args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoAggregateArgs>(args: Subset<T, PedidoAggregateArgs>): Prisma.PrismaPromise<GetPedidoAggregateType<T>>

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedido model
   */
  readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Pedido$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedido model
   */ 
  interface PedidoFieldRefs {
    readonly id: FieldRef<"Pedido", 'String'>
    readonly clienteId: FieldRef<"Pedido", 'String'>
    readonly fecha: FieldRef<"Pedido", 'DateTime'>
    readonly fechaEntrega: FieldRef<"Pedido", 'DateTime'>
    readonly estado: FieldRef<"Pedido", 'EstadoPedido'>
    readonly tipo: FieldRef<"Pedido", 'TipoPedido'>
    readonly total: FieldRef<"Pedido", 'Decimal'>
    readonly observacion: FieldRef<"Pedido", 'String'>
    readonly createdAt: FieldRef<"Pedido", 'DateTime'>
    readonly updatedAt: FieldRef<"Pedido", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedido.
     */
    data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
  }

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido createManyAndReturn
   */
  export type PedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedido.
     */
    data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
    /**
     * Choose, which Pedido to update.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
  }

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedido to update in case it exists.
     */
    where: PedidoWhereUniqueInput
    /**
     * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
     */
    create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
    /**
     * In case the Pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
  }

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter which Pedido to delete.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput
  }

  /**
   * Pedido.items
   */
  export type Pedido$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    cursor?: PedidoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
  }


  /**
   * Model PedidoItem
   */

  export type AggregatePedidoItem = {
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  export type PedidoItemAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type PedidoItemSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type PedidoItemMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    pedidoId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type PedidoItemMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    pedidoId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type PedidoItemCountAggregateOutputType = {
    id: number
    nombre: number
    pedidoId: number
    productoId: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    _all: number
  }


  export type PedidoItemAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type PedidoItemSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type PedidoItemMinAggregateInputType = {
    id?: true
    nombre?: true
    pedidoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type PedidoItemMaxAggregateInputType = {
    id?: true
    nombre?: true
    pedidoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type PedidoItemCountAggregateInputType = {
    id?: true
    nombre?: true
    pedidoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    _all?: true
  }

  export type PedidoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItem to aggregate.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoItems
    **/
    _count?: true | PedidoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoItemMaxAggregateInputType
  }

  export type GetPedidoItemAggregateType<T extends PedidoItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoItem[P]>
      : GetScalarType<T[P], AggregatePedidoItem[P]>
  }




  export type PedidoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoItemWhereInput
    orderBy?: PedidoItemOrderByWithAggregationInput | PedidoItemOrderByWithAggregationInput[]
    by: PedidoItemScalarFieldEnum[] | PedidoItemScalarFieldEnum
    having?: PedidoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoItemCountAggregateInputType | true
    _avg?: PedidoItemAvgAggregateInputType
    _sum?: PedidoItemSumAggregateInputType
    _min?: PedidoItemMinAggregateInputType
    _max?: PedidoItemMaxAggregateInputType
  }

  export type PedidoItemGroupByOutputType = {
    id: string
    nombre: string | null
    pedidoId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal
    subtotal: Decimal
    _count: PedidoItemCountAggregateOutputType | null
    _avg: PedidoItemAvgAggregateOutputType | null
    _sum: PedidoItemSumAggregateOutputType | null
    _min: PedidoItemMinAggregateOutputType | null
    _max: PedidoItemMaxAggregateOutputType | null
  }

  type GetPedidoItemGroupByPayload<T extends PedidoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoItemGroupByOutputType[P]>
        }
      >
    >


  export type PedidoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    pedidoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>

  export type PedidoItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    pedidoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoItem"]>

  export type PedidoItemSelectScalar = {
    id?: boolean
    nombre?: boolean
    pedidoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
  }

  export type PedidoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PedidoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoItem"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string | null
      pedidoId: string
      productoId: string
      cantidad: number
      precioUnitario: Prisma.Decimal
      subtotal: Prisma.Decimal
    }, ExtArgs["result"]["pedidoItem"]>
    composites: {}
  }

  type PedidoItemGetPayload<S extends boolean | null | undefined | PedidoItemDefaultArgs> = $Result.GetResult<Prisma.$PedidoItemPayload, S>

  type PedidoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PedidoItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PedidoItemCountAggregateInputType | true
    }

  export interface PedidoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoItem'], meta: { name: 'PedidoItem' } }
    /**
     * Find zero or one PedidoItem that matches the filter.
     * @param {PedidoItemFindUniqueArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoItemFindUniqueArgs>(args: SelectSubset<T, PedidoItemFindUniqueArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PedidoItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PedidoItemFindUniqueOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PedidoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoItemFindFirstArgs>(args?: SelectSubset<T, PedidoItemFindFirstArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PedidoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindFirstOrThrowArgs} args - Arguments to find a PedidoItem
     * @example
     * // Get one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PedidoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany()
     * 
     * // Get first 10 PedidoItems
     * const pedidoItems = await prisma.pedidoItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoItemWithIdOnly = await prisma.pedidoItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoItemFindManyArgs>(args?: SelectSubset<T, PedidoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PedidoItem.
     * @param {PedidoItemCreateArgs} args - Arguments to create a PedidoItem.
     * @example
     * // Create one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.create({
     *   data: {
     *     // ... data to create a PedidoItem
     *   }
     * })
     * 
     */
    create<T extends PedidoItemCreateArgs>(args: SelectSubset<T, PedidoItemCreateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PedidoItems.
     * @param {PedidoItemCreateManyArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoItemCreateManyArgs>(args?: SelectSubset<T, PedidoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PedidoItems and returns the data saved in the database.
     * @param {PedidoItemCreateManyAndReturnArgs} args - Arguments to create many PedidoItems.
     * @example
     * // Create many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PedidoItems and only return the `id`
     * const pedidoItemWithIdOnly = await prisma.pedidoItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoItemCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PedidoItem.
     * @param {PedidoItemDeleteArgs} args - Arguments to delete one PedidoItem.
     * @example
     * // Delete one PedidoItem
     * const PedidoItem = await prisma.pedidoItem.delete({
     *   where: {
     *     // ... filter to delete one PedidoItem
     *   }
     * })
     * 
     */
    delete<T extends PedidoItemDeleteArgs>(args: SelectSubset<T, PedidoItemDeleteArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PedidoItem.
     * @param {PedidoItemUpdateArgs} args - Arguments to update one PedidoItem.
     * @example
     * // Update one PedidoItem
     * const pedidoItem = await prisma.pedidoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoItemUpdateArgs>(args: SelectSubset<T, PedidoItemUpdateArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PedidoItems.
     * @param {PedidoItemDeleteManyArgs} args - Arguments to filter PedidoItems to delete.
     * @example
     * // Delete a few PedidoItems
     * const { count } = await prisma.pedidoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoItemDeleteManyArgs>(args?: SelectSubset<T, PedidoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoItems
     * const pedidoItem = await prisma.pedidoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoItemUpdateManyArgs>(args: SelectSubset<T, PedidoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PedidoItem.
     * @param {PedidoItemUpsertArgs} args - Arguments to update or create a PedidoItem.
     * @example
     * // Update or create a PedidoItem
     * const pedidoItem = await prisma.pedidoItem.upsert({
     *   create: {
     *     // ... data to create a PedidoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoItem we want to update
     *   }
     * })
     */
    upsert<T extends PedidoItemUpsertArgs>(args: SelectSubset<T, PedidoItemUpsertArgs<ExtArgs>>): Prisma__PedidoItemClient<$Result.GetResult<Prisma.$PedidoItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PedidoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemCountArgs} args - Arguments to filter PedidoItems to count.
     * @example
     * // Count the number of PedidoItems
     * const count = await prisma.pedidoItem.count({
     *   where: {
     *     // ... the filter for the PedidoItems we want to count
     *   }
     * })
    **/
    count<T extends PedidoItemCountArgs>(
      args?: Subset<T, PedidoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoItemAggregateArgs>(args: Subset<T, PedidoItemAggregateArgs>): Prisma.PrismaPromise<GetPedidoItemAggregateType<T>>

    /**
     * Group by PedidoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoItemGroupByArgs['orderBy'] }
        : { orderBy?: PedidoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoItem model
   */
  readonly fields: PedidoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoItem model
   */ 
  interface PedidoItemFieldRefs {
    readonly id: FieldRef<"PedidoItem", 'String'>
    readonly nombre: FieldRef<"PedidoItem", 'String'>
    readonly pedidoId: FieldRef<"PedidoItem", 'String'>
    readonly productoId: FieldRef<"PedidoItem", 'String'>
    readonly cantidad: FieldRef<"PedidoItem", 'Int'>
    readonly precioUnitario: FieldRef<"PedidoItem", 'Decimal'>
    readonly subtotal: FieldRef<"PedidoItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * PedidoItem findUnique
   */
  export type PedidoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findUniqueOrThrow
   */
  export type PedidoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem findFirst
   */
  export type PedidoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findFirstOrThrow
   */
  export type PedidoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItem to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoItems.
     */
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem findMany
   */
  export type PedidoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter, which PedidoItems to fetch.
     */
    where?: PedidoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoItems to fetch.
     */
    orderBy?: PedidoItemOrderByWithRelationInput | PedidoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoItems.
     */
    cursor?: PedidoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoItems.
     */
    skip?: number
    distinct?: PedidoItemScalarFieldEnum | PedidoItemScalarFieldEnum[]
  }

  /**
   * PedidoItem create
   */
  export type PedidoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoItem.
     */
    data: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
  }

  /**
   * PedidoItem createMany
   */
  export type PedidoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoItem createManyAndReturn
   */
  export type PedidoItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PedidoItems.
     */
    data: PedidoItemCreateManyInput | PedidoItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoItem update
   */
  export type PedidoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoItem.
     */
    data: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
    /**
     * Choose, which PedidoItem to update.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem updateMany
   */
  export type PedidoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoItems.
     */
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyInput>
    /**
     * Filter which PedidoItems to update
     */
    where?: PedidoItemWhereInput
  }

  /**
   * PedidoItem upsert
   */
  export type PedidoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoItem to update in case it exists.
     */
    where: PedidoItemWhereUniqueInput
    /**
     * In case the PedidoItem found by the `where` argument doesn't exist, create a new PedidoItem with this data.
     */
    create: XOR<PedidoItemCreateInput, PedidoItemUncheckedCreateInput>
    /**
     * In case the PedidoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoItemUpdateInput, PedidoItemUncheckedUpdateInput>
  }

  /**
   * PedidoItem delete
   */
  export type PedidoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
    /**
     * Filter which PedidoItem to delete.
     */
    where: PedidoItemWhereUniqueInput
  }

  /**
   * PedidoItem deleteMany
   */
  export type PedidoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoItems to delete
     */
    where?: PedidoItemWhereInput
  }

  /**
   * PedidoItem without action
   */
  export type PedidoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoItem
     */
    select?: PedidoItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoItemInclude<ExtArgs> | null
  }


  /**
   * Model Mesa
   */

  export type AggregateMesa = {
    _count: MesaCountAggregateOutputType | null
    _avg: MesaAvgAggregateOutputType | null
    _sum: MesaSumAggregateOutputType | null
    _min: MesaMinAggregateOutputType | null
    _max: MesaMaxAggregateOutputType | null
  }

  export type MesaAvgAggregateOutputType = {
    id: number | null
    numero: number | null
  }

  export type MesaSumAggregateOutputType = {
    id: number | null
    numero: number | null
  }

  export type MesaMinAggregateOutputType = {
    id: number | null
    numero: number | null
    estado: $Enums.EstadoMesa | null
    activo: boolean | null
  }

  export type MesaMaxAggregateOutputType = {
    id: number | null
    numero: number | null
    estado: $Enums.EstadoMesa | null
    activo: boolean | null
  }

  export type MesaCountAggregateOutputType = {
    id: number
    numero: number
    estado: number
    activo: number
    _all: number
  }


  export type MesaAvgAggregateInputType = {
    id?: true
    numero?: true
  }

  export type MesaSumAggregateInputType = {
    id?: true
    numero?: true
  }

  export type MesaMinAggregateInputType = {
    id?: true
    numero?: true
    estado?: true
    activo?: true
  }

  export type MesaMaxAggregateInputType = {
    id?: true
    numero?: true
    estado?: true
    activo?: true
  }

  export type MesaCountAggregateInputType = {
    id?: true
    numero?: true
    estado?: true
    activo?: true
    _all?: true
  }

  export type MesaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesa to aggregate.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mesas
    **/
    _count?: true | MesaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MesaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MesaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MesaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MesaMaxAggregateInputType
  }

  export type GetMesaAggregateType<T extends MesaAggregateArgs> = {
        [P in keyof T & keyof AggregateMesa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMesa[P]>
      : GetScalarType<T[P], AggregateMesa[P]>
  }




  export type MesaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MesaWhereInput
    orderBy?: MesaOrderByWithAggregationInput | MesaOrderByWithAggregationInput[]
    by: MesaScalarFieldEnum[] | MesaScalarFieldEnum
    having?: MesaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MesaCountAggregateInputType | true
    _avg?: MesaAvgAggregateInputType
    _sum?: MesaSumAggregateInputType
    _min?: MesaMinAggregateInputType
    _max?: MesaMaxAggregateInputType
  }

  export type MesaGroupByOutputType = {
    id: number
    numero: number
    estado: $Enums.EstadoMesa
    activo: boolean
    _count: MesaCountAggregateOutputType | null
    _avg: MesaAvgAggregateOutputType | null
    _sum: MesaSumAggregateOutputType | null
    _min: MesaMinAggregateOutputType | null
    _max: MesaMaxAggregateOutputType | null
  }

  type GetMesaGroupByPayload<T extends MesaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MesaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MesaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MesaGroupByOutputType[P]>
            : GetScalarType<T[P], MesaGroupByOutputType[P]>
        }
      >
    >


  export type MesaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    estado?: boolean
    activo?: boolean
    comandas?: boolean | Mesa$comandasArgs<ExtArgs>
    _count?: boolean | MesaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mesa"]>

  export type MesaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    estado?: boolean
    activo?: boolean
  }, ExtArgs["result"]["mesa"]>

  export type MesaSelectScalar = {
    id?: boolean
    numero?: boolean
    estado?: boolean
    activo?: boolean
  }

  export type MesaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | Mesa$comandasArgs<ExtArgs>
    _count?: boolean | MesaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MesaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MesaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesa"
    objects: {
      comandas: Prisma.$ComandaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numero: number
      estado: $Enums.EstadoMesa
      activo: boolean
    }, ExtArgs["result"]["mesa"]>
    composites: {}
  }

  type MesaGetPayload<S extends boolean | null | undefined | MesaDefaultArgs> = $Result.GetResult<Prisma.$MesaPayload, S>

  type MesaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MesaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MesaCountAggregateInputType | true
    }

  export interface MesaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mesa'], meta: { name: 'Mesa' } }
    /**
     * Find zero or one Mesa that matches the filter.
     * @param {MesaFindUniqueArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MesaFindUniqueArgs>(args: SelectSubset<T, MesaFindUniqueArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Mesa that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MesaFindUniqueOrThrowArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MesaFindUniqueOrThrowArgs>(args: SelectSubset<T, MesaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Mesa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindFirstArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MesaFindFirstArgs>(args?: SelectSubset<T, MesaFindFirstArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Mesa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindFirstOrThrowArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MesaFindFirstOrThrowArgs>(args?: SelectSubset<T, MesaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Mesas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mesas
     * const mesas = await prisma.mesa.findMany()
     * 
     * // Get first 10 Mesas
     * const mesas = await prisma.mesa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mesaWithIdOnly = await prisma.mesa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MesaFindManyArgs>(args?: SelectSubset<T, MesaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Mesa.
     * @param {MesaCreateArgs} args - Arguments to create a Mesa.
     * @example
     * // Create one Mesa
     * const Mesa = await prisma.mesa.create({
     *   data: {
     *     // ... data to create a Mesa
     *   }
     * })
     * 
     */
    create<T extends MesaCreateArgs>(args: SelectSubset<T, MesaCreateArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Mesas.
     * @param {MesaCreateManyArgs} args - Arguments to create many Mesas.
     * @example
     * // Create many Mesas
     * const mesa = await prisma.mesa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MesaCreateManyArgs>(args?: SelectSubset<T, MesaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mesas and returns the data saved in the database.
     * @param {MesaCreateManyAndReturnArgs} args - Arguments to create many Mesas.
     * @example
     * // Create many Mesas
     * const mesa = await prisma.mesa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mesas and only return the `id`
     * const mesaWithIdOnly = await prisma.mesa.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MesaCreateManyAndReturnArgs>(args?: SelectSubset<T, MesaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Mesa.
     * @param {MesaDeleteArgs} args - Arguments to delete one Mesa.
     * @example
     * // Delete one Mesa
     * const Mesa = await prisma.mesa.delete({
     *   where: {
     *     // ... filter to delete one Mesa
     *   }
     * })
     * 
     */
    delete<T extends MesaDeleteArgs>(args: SelectSubset<T, MesaDeleteArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Mesa.
     * @param {MesaUpdateArgs} args - Arguments to update one Mesa.
     * @example
     * // Update one Mesa
     * const mesa = await prisma.mesa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MesaUpdateArgs>(args: SelectSubset<T, MesaUpdateArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Mesas.
     * @param {MesaDeleteManyArgs} args - Arguments to filter Mesas to delete.
     * @example
     * // Delete a few Mesas
     * const { count } = await prisma.mesa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MesaDeleteManyArgs>(args?: SelectSubset<T, MesaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mesas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mesas
     * const mesa = await prisma.mesa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MesaUpdateManyArgs>(args: SelectSubset<T, MesaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mesa.
     * @param {MesaUpsertArgs} args - Arguments to update or create a Mesa.
     * @example
     * // Update or create a Mesa
     * const mesa = await prisma.mesa.upsert({
     *   create: {
     *     // ... data to create a Mesa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mesa we want to update
     *   }
     * })
     */
    upsert<T extends MesaUpsertArgs>(args: SelectSubset<T, MesaUpsertArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Mesas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaCountArgs} args - Arguments to filter Mesas to count.
     * @example
     * // Count the number of Mesas
     * const count = await prisma.mesa.count({
     *   where: {
     *     // ... the filter for the Mesas we want to count
     *   }
     * })
    **/
    count<T extends MesaCountArgs>(
      args?: Subset<T, MesaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MesaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mesa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MesaAggregateArgs>(args: Subset<T, MesaAggregateArgs>): Prisma.PrismaPromise<GetMesaAggregateType<T>>

    /**
     * Group by Mesa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MesaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MesaGroupByArgs['orderBy'] }
        : { orderBy?: MesaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MesaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMesaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mesa model
   */
  readonly fields: MesaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mesa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MesaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comandas<T extends Mesa$comandasArgs<ExtArgs> = {}>(args?: Subset<T, Mesa$comandasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mesa model
   */ 
  interface MesaFieldRefs {
    readonly id: FieldRef<"Mesa", 'Int'>
    readonly numero: FieldRef<"Mesa", 'Int'>
    readonly estado: FieldRef<"Mesa", 'EstadoMesa'>
    readonly activo: FieldRef<"Mesa", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Mesa findUnique
   */
  export type MesaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa findUniqueOrThrow
   */
  export type MesaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa findFirst
   */
  export type MesaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesas.
     */
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa findFirstOrThrow
   */
  export type MesaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesas.
     */
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa findMany
   */
  export type MesaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesas to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa create
   */
  export type MesaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The data needed to create a Mesa.
     */
    data: XOR<MesaCreateInput, MesaUncheckedCreateInput>
  }

  /**
   * Mesa createMany
   */
  export type MesaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mesas.
     */
    data: MesaCreateManyInput | MesaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesa createManyAndReturn
   */
  export type MesaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Mesas.
     */
    data: MesaCreateManyInput | MesaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesa update
   */
  export type MesaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The data needed to update a Mesa.
     */
    data: XOR<MesaUpdateInput, MesaUncheckedUpdateInput>
    /**
     * Choose, which Mesa to update.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa updateMany
   */
  export type MesaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mesas.
     */
    data: XOR<MesaUpdateManyMutationInput, MesaUncheckedUpdateManyInput>
    /**
     * Filter which Mesas to update
     */
    where?: MesaWhereInput
  }

  /**
   * Mesa upsert
   */
  export type MesaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The filter to search for the Mesa to update in case it exists.
     */
    where: MesaWhereUniqueInput
    /**
     * In case the Mesa found by the `where` argument doesn't exist, create a new Mesa with this data.
     */
    create: XOR<MesaCreateInput, MesaUncheckedCreateInput>
    /**
     * In case the Mesa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MesaUpdateInput, MesaUncheckedUpdateInput>
  }

  /**
   * Mesa delete
   */
  export type MesaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter which Mesa to delete.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa deleteMany
   */
  export type MesaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesas to delete
     */
    where?: MesaWhereInput
  }

  /**
   * Mesa.comandas
   */
  export type Mesa$comandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    where?: ComandaWhereInput
    orderBy?: ComandaOrderByWithRelationInput | ComandaOrderByWithRelationInput[]
    cursor?: ComandaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandaScalarFieldEnum | ComandaScalarFieldEnum[]
  }

  /**
   * Mesa without action
   */
  export type MesaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
  }


  /**
   * Model Comanda
   */

  export type AggregateComanda = {
    _count: ComandaCountAggregateOutputType | null
    _avg: ComandaAvgAggregateOutputType | null
    _sum: ComandaSumAggregateOutputType | null
    _min: ComandaMinAggregateOutputType | null
    _max: ComandaMaxAggregateOutputType | null
  }

  export type ComandaAvgAggregateOutputType = {
    mesaId: number | null
    total: Decimal | null
  }

  export type ComandaSumAggregateOutputType = {
    mesaId: number | null
    total: Decimal | null
  }

  export type ComandaMinAggregateOutputType = {
    id: string | null
    mesaId: number | null
    fechaApertura: Date | null
    fechaCierre: Date | null
    estado: $Enums.EstadoComanda | null
    total: Decimal | null
    observacion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComandaMaxAggregateOutputType = {
    id: string | null
    mesaId: number | null
    fechaApertura: Date | null
    fechaCierre: Date | null
    estado: $Enums.EstadoComanda | null
    total: Decimal | null
    observacion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComandaCountAggregateOutputType = {
    id: number
    mesaId: number
    fechaApertura: number
    fechaCierre: number
    estado: number
    total: number
    observacion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComandaAvgAggregateInputType = {
    mesaId?: true
    total?: true
  }

  export type ComandaSumAggregateInputType = {
    mesaId?: true
    total?: true
  }

  export type ComandaMinAggregateInputType = {
    id?: true
    mesaId?: true
    fechaApertura?: true
    fechaCierre?: true
    estado?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComandaMaxAggregateInputType = {
    id?: true
    mesaId?: true
    fechaApertura?: true
    fechaCierre?: true
    estado?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComandaCountAggregateInputType = {
    id?: true
    mesaId?: true
    fechaApertura?: true
    fechaCierre?: true
    estado?: true
    total?: true
    observacion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComandaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comanda to aggregate.
     */
    where?: ComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandaOrderByWithRelationInput | ComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comandas
    **/
    _count?: true | ComandaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComandaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComandaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComandaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComandaMaxAggregateInputType
  }

  export type GetComandaAggregateType<T extends ComandaAggregateArgs> = {
        [P in keyof T & keyof AggregateComanda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComanda[P]>
      : GetScalarType<T[P], AggregateComanda[P]>
  }




  export type ComandaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaWhereInput
    orderBy?: ComandaOrderByWithAggregationInput | ComandaOrderByWithAggregationInput[]
    by: ComandaScalarFieldEnum[] | ComandaScalarFieldEnum
    having?: ComandaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComandaCountAggregateInputType | true
    _avg?: ComandaAvgAggregateInputType
    _sum?: ComandaSumAggregateInputType
    _min?: ComandaMinAggregateInputType
    _max?: ComandaMaxAggregateInputType
  }

  export type ComandaGroupByOutputType = {
    id: string
    mesaId: number
    fechaApertura: Date
    fechaCierre: Date | null
    estado: $Enums.EstadoComanda
    total: Decimal
    observacion: string | null
    createdAt: Date
    updatedAt: Date
    _count: ComandaCountAggregateOutputType | null
    _avg: ComandaAvgAggregateOutputType | null
    _sum: ComandaSumAggregateOutputType | null
    _min: ComandaMinAggregateOutputType | null
    _max: ComandaMaxAggregateOutputType | null
  }

  type GetComandaGroupByPayload<T extends ComandaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComandaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComandaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComandaGroupByOutputType[P]>
            : GetScalarType<T[P], ComandaGroupByOutputType[P]>
        }
      >
    >


  export type ComandaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesaId?: boolean
    fechaApertura?: boolean
    fechaCierre?: boolean
    estado?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    items?: boolean | Comanda$itemsArgs<ExtArgs>
    _count?: boolean | ComandaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comanda"]>

  export type ComandaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesaId?: boolean
    fechaApertura?: boolean
    fechaCierre?: boolean
    estado?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comanda"]>

  export type ComandaSelectScalar = {
    id?: boolean
    mesaId?: boolean
    fechaApertura?: boolean
    fechaCierre?: boolean
    estado?: boolean
    total?: boolean
    observacion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComandaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    items?: boolean | Comanda$itemsArgs<ExtArgs>
    _count?: boolean | ComandaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComandaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
  }

  export type $ComandaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comanda"
    objects: {
      mesa: Prisma.$MesaPayload<ExtArgs>
      items: Prisma.$ComandaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mesaId: number
      fechaApertura: Date
      fechaCierre: Date | null
      estado: $Enums.EstadoComanda
      total: Prisma.Decimal
      observacion: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["comanda"]>
    composites: {}
  }

  type ComandaGetPayload<S extends boolean | null | undefined | ComandaDefaultArgs> = $Result.GetResult<Prisma.$ComandaPayload, S>

  type ComandaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComandaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComandaCountAggregateInputType | true
    }

  export interface ComandaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comanda'], meta: { name: 'Comanda' } }
    /**
     * Find zero or one Comanda that matches the filter.
     * @param {ComandaFindUniqueArgs} args - Arguments to find a Comanda
     * @example
     * // Get one Comanda
     * const comanda = await prisma.comanda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComandaFindUniqueArgs>(args: SelectSubset<T, ComandaFindUniqueArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Comanda that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComandaFindUniqueOrThrowArgs} args - Arguments to find a Comanda
     * @example
     * // Get one Comanda
     * const comanda = await prisma.comanda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComandaFindUniqueOrThrowArgs>(args: SelectSubset<T, ComandaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Comanda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaFindFirstArgs} args - Arguments to find a Comanda
     * @example
     * // Get one Comanda
     * const comanda = await prisma.comanda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComandaFindFirstArgs>(args?: SelectSubset<T, ComandaFindFirstArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Comanda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaFindFirstOrThrowArgs} args - Arguments to find a Comanda
     * @example
     * // Get one Comanda
     * const comanda = await prisma.comanda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComandaFindFirstOrThrowArgs>(args?: SelectSubset<T, ComandaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Comandas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comandas
     * const comandas = await prisma.comanda.findMany()
     * 
     * // Get first 10 Comandas
     * const comandas = await prisma.comanda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comandaWithIdOnly = await prisma.comanda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComandaFindManyArgs>(args?: SelectSubset<T, ComandaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Comanda.
     * @param {ComandaCreateArgs} args - Arguments to create a Comanda.
     * @example
     * // Create one Comanda
     * const Comanda = await prisma.comanda.create({
     *   data: {
     *     // ... data to create a Comanda
     *   }
     * })
     * 
     */
    create<T extends ComandaCreateArgs>(args: SelectSubset<T, ComandaCreateArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Comandas.
     * @param {ComandaCreateManyArgs} args - Arguments to create many Comandas.
     * @example
     * // Create many Comandas
     * const comanda = await prisma.comanda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComandaCreateManyArgs>(args?: SelectSubset<T, ComandaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comandas and returns the data saved in the database.
     * @param {ComandaCreateManyAndReturnArgs} args - Arguments to create many Comandas.
     * @example
     * // Create many Comandas
     * const comanda = await prisma.comanda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comandas and only return the `id`
     * const comandaWithIdOnly = await prisma.comanda.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComandaCreateManyAndReturnArgs>(args?: SelectSubset<T, ComandaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Comanda.
     * @param {ComandaDeleteArgs} args - Arguments to delete one Comanda.
     * @example
     * // Delete one Comanda
     * const Comanda = await prisma.comanda.delete({
     *   where: {
     *     // ... filter to delete one Comanda
     *   }
     * })
     * 
     */
    delete<T extends ComandaDeleteArgs>(args: SelectSubset<T, ComandaDeleteArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Comanda.
     * @param {ComandaUpdateArgs} args - Arguments to update one Comanda.
     * @example
     * // Update one Comanda
     * const comanda = await prisma.comanda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComandaUpdateArgs>(args: SelectSubset<T, ComandaUpdateArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Comandas.
     * @param {ComandaDeleteManyArgs} args - Arguments to filter Comandas to delete.
     * @example
     * // Delete a few Comandas
     * const { count } = await prisma.comanda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComandaDeleteManyArgs>(args?: SelectSubset<T, ComandaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comandas
     * const comanda = await prisma.comanda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComandaUpdateManyArgs>(args: SelectSubset<T, ComandaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comanda.
     * @param {ComandaUpsertArgs} args - Arguments to update or create a Comanda.
     * @example
     * // Update or create a Comanda
     * const comanda = await prisma.comanda.upsert({
     *   create: {
     *     // ... data to create a Comanda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comanda we want to update
     *   }
     * })
     */
    upsert<T extends ComandaUpsertArgs>(args: SelectSubset<T, ComandaUpsertArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaCountArgs} args - Arguments to filter Comandas to count.
     * @example
     * // Count the number of Comandas
     * const count = await prisma.comanda.count({
     *   where: {
     *     // ... the filter for the Comandas we want to count
     *   }
     * })
    **/
    count<T extends ComandaCountArgs>(
      args?: Subset<T, ComandaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComandaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comanda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComandaAggregateArgs>(args: Subset<T, ComandaAggregateArgs>): Prisma.PrismaPromise<GetComandaAggregateType<T>>

    /**
     * Group by Comanda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComandaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComandaGroupByArgs['orderBy'] }
        : { orderBy?: ComandaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComandaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComandaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comanda model
   */
  readonly fields: ComandaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comanda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComandaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mesa<T extends MesaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesaDefaultArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Comanda$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Comanda$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comanda model
   */ 
  interface ComandaFieldRefs {
    readonly id: FieldRef<"Comanda", 'String'>
    readonly mesaId: FieldRef<"Comanda", 'Int'>
    readonly fechaApertura: FieldRef<"Comanda", 'DateTime'>
    readonly fechaCierre: FieldRef<"Comanda", 'DateTime'>
    readonly estado: FieldRef<"Comanda", 'EstadoComanda'>
    readonly total: FieldRef<"Comanda", 'Decimal'>
    readonly observacion: FieldRef<"Comanda", 'String'>
    readonly createdAt: FieldRef<"Comanda", 'DateTime'>
    readonly updatedAt: FieldRef<"Comanda", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comanda findUnique
   */
  export type ComandaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter, which Comanda to fetch.
     */
    where: ComandaWhereUniqueInput
  }

  /**
   * Comanda findUniqueOrThrow
   */
  export type ComandaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter, which Comanda to fetch.
     */
    where: ComandaWhereUniqueInput
  }

  /**
   * Comanda findFirst
   */
  export type ComandaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter, which Comanda to fetch.
     */
    where?: ComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandaOrderByWithRelationInput | ComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comandas.
     */
    cursor?: ComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comandas.
     */
    distinct?: ComandaScalarFieldEnum | ComandaScalarFieldEnum[]
  }

  /**
   * Comanda findFirstOrThrow
   */
  export type ComandaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter, which Comanda to fetch.
     */
    where?: ComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandaOrderByWithRelationInput | ComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comandas.
     */
    cursor?: ComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comandas.
     */
    distinct?: ComandaScalarFieldEnum | ComandaScalarFieldEnum[]
  }

  /**
   * Comanda findMany
   */
  export type ComandaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where?: ComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandaOrderByWithRelationInput | ComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comandas.
     */
    cursor?: ComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    distinct?: ComandaScalarFieldEnum | ComandaScalarFieldEnum[]
  }

  /**
   * Comanda create
   */
  export type ComandaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * The data needed to create a Comanda.
     */
    data: XOR<ComandaCreateInput, ComandaUncheckedCreateInput>
  }

  /**
   * Comanda createMany
   */
  export type ComandaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comandas.
     */
    data: ComandaCreateManyInput | ComandaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comanda createManyAndReturn
   */
  export type ComandaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Comandas.
     */
    data: ComandaCreateManyInput | ComandaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comanda update
   */
  export type ComandaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * The data needed to update a Comanda.
     */
    data: XOR<ComandaUpdateInput, ComandaUncheckedUpdateInput>
    /**
     * Choose, which Comanda to update.
     */
    where: ComandaWhereUniqueInput
  }

  /**
   * Comanda updateMany
   */
  export type ComandaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comandas.
     */
    data: XOR<ComandaUpdateManyMutationInput, ComandaUncheckedUpdateManyInput>
    /**
     * Filter which Comandas to update
     */
    where?: ComandaWhereInput
  }

  /**
   * Comanda upsert
   */
  export type ComandaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * The filter to search for the Comanda to update in case it exists.
     */
    where: ComandaWhereUniqueInput
    /**
     * In case the Comanda found by the `where` argument doesn't exist, create a new Comanda with this data.
     */
    create: XOR<ComandaCreateInput, ComandaUncheckedCreateInput>
    /**
     * In case the Comanda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComandaUpdateInput, ComandaUncheckedUpdateInput>
  }

  /**
   * Comanda delete
   */
  export type ComandaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
    /**
     * Filter which Comanda to delete.
     */
    where: ComandaWhereUniqueInput
  }

  /**
   * Comanda deleteMany
   */
  export type ComandaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comandas to delete
     */
    where?: ComandaWhereInput
  }

  /**
   * Comanda.items
   */
  export type Comanda$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    where?: ComandaItemWhereInput
    orderBy?: ComandaItemOrderByWithRelationInput | ComandaItemOrderByWithRelationInput[]
    cursor?: ComandaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandaItemScalarFieldEnum | ComandaItemScalarFieldEnum[]
  }

  /**
   * Comanda without action
   */
  export type ComandaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comanda
     */
    select?: ComandaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaInclude<ExtArgs> | null
  }


  /**
   * Model ComandaItem
   */

  export type AggregateComandaItem = {
    _count: ComandaItemCountAggregateOutputType | null
    _avg: ComandaItemAvgAggregateOutputType | null
    _sum: ComandaItemSumAggregateOutputType | null
    _min: ComandaItemMinAggregateOutputType | null
    _max: ComandaItemMaxAggregateOutputType | null
  }

  export type ComandaItemAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type ComandaItemSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type ComandaItemMinAggregateOutputType = {
    id: string | null
    comandaId: string | null
    productoId: string | null
    nombre: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
    esProductoPropio: boolean | null
    estado: $Enums.EstadoItemComanda | null
    createdAt: Date | null
  }

  export type ComandaItemMaxAggregateOutputType = {
    id: string | null
    comandaId: string | null
    productoId: string | null
    nombre: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
    esProductoPropio: boolean | null
    estado: $Enums.EstadoItemComanda | null
    createdAt: Date | null
  }

  export type ComandaItemCountAggregateOutputType = {
    id: number
    comandaId: number
    productoId: number
    nombre: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    esProductoPropio: number
    estado: number
    createdAt: number
    _all: number
  }


  export type ComandaItemAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type ComandaItemSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type ComandaItemMinAggregateInputType = {
    id?: true
    comandaId?: true
    productoId?: true
    nombre?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
    estado?: true
    createdAt?: true
  }

  export type ComandaItemMaxAggregateInputType = {
    id?: true
    comandaId?: true
    productoId?: true
    nombre?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
    estado?: true
    createdAt?: true
  }

  export type ComandaItemCountAggregateInputType = {
    id?: true
    comandaId?: true
    productoId?: true
    nombre?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
    estado?: true
    createdAt?: true
    _all?: true
  }

  export type ComandaItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComandaItem to aggregate.
     */
    where?: ComandaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaItems to fetch.
     */
    orderBy?: ComandaItemOrderByWithRelationInput | ComandaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComandaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComandaItems
    **/
    _count?: true | ComandaItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComandaItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComandaItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComandaItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComandaItemMaxAggregateInputType
  }

  export type GetComandaItemAggregateType<T extends ComandaItemAggregateArgs> = {
        [P in keyof T & keyof AggregateComandaItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComandaItem[P]>
      : GetScalarType<T[P], AggregateComandaItem[P]>
  }




  export type ComandaItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaItemWhereInput
    orderBy?: ComandaItemOrderByWithAggregationInput | ComandaItemOrderByWithAggregationInput[]
    by: ComandaItemScalarFieldEnum[] | ComandaItemScalarFieldEnum
    having?: ComandaItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComandaItemCountAggregateInputType | true
    _avg?: ComandaItemAvgAggregateInputType
    _sum?: ComandaItemSumAggregateInputType
    _min?: ComandaItemMinAggregateInputType
    _max?: ComandaItemMaxAggregateInputType
  }

  export type ComandaItemGroupByOutputType = {
    id: string
    comandaId: string
    productoId: string
    nombre: string | null
    cantidad: number
    precioUnitario: Decimal
    subtotal: Decimal
    esProductoPropio: boolean
    estado: $Enums.EstadoItemComanda
    createdAt: Date
    _count: ComandaItemCountAggregateOutputType | null
    _avg: ComandaItemAvgAggregateOutputType | null
    _sum: ComandaItemSumAggregateOutputType | null
    _min: ComandaItemMinAggregateOutputType | null
    _max: ComandaItemMaxAggregateOutputType | null
  }

  type GetComandaItemGroupByPayload<T extends ComandaItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComandaItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComandaItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComandaItemGroupByOutputType[P]>
            : GetScalarType<T[P], ComandaItemGroupByOutputType[P]>
        }
      >
    >


  export type ComandaItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comandaId?: boolean
    productoId?: boolean
    nombre?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
    estado?: boolean
    createdAt?: boolean
    comanda?: boolean | ComandaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandaItem"]>

  export type ComandaItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comandaId?: boolean
    productoId?: boolean
    nombre?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
    estado?: boolean
    createdAt?: boolean
    comanda?: boolean | ComandaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandaItem"]>

  export type ComandaItemSelectScalar = {
    id?: boolean
    comandaId?: boolean
    productoId?: boolean
    nombre?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
    estado?: boolean
    createdAt?: boolean
  }

  export type ComandaItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comanda?: boolean | ComandaDefaultArgs<ExtArgs>
  }
  export type ComandaItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comanda?: boolean | ComandaDefaultArgs<ExtArgs>
  }

  export type $ComandaItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComandaItem"
    objects: {
      comanda: Prisma.$ComandaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comandaId: string
      productoId: string
      nombre: string | null
      cantidad: number
      precioUnitario: Prisma.Decimal
      subtotal: Prisma.Decimal
      esProductoPropio: boolean
      estado: $Enums.EstadoItemComanda
      createdAt: Date
    }, ExtArgs["result"]["comandaItem"]>
    composites: {}
  }

  type ComandaItemGetPayload<S extends boolean | null | undefined | ComandaItemDefaultArgs> = $Result.GetResult<Prisma.$ComandaItemPayload, S>

  type ComandaItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComandaItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComandaItemCountAggregateInputType | true
    }

  export interface ComandaItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComandaItem'], meta: { name: 'ComandaItem' } }
    /**
     * Find zero or one ComandaItem that matches the filter.
     * @param {ComandaItemFindUniqueArgs} args - Arguments to find a ComandaItem
     * @example
     * // Get one ComandaItem
     * const comandaItem = await prisma.comandaItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComandaItemFindUniqueArgs>(args: SelectSubset<T, ComandaItemFindUniqueArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComandaItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComandaItemFindUniqueOrThrowArgs} args - Arguments to find a ComandaItem
     * @example
     * // Get one ComandaItem
     * const comandaItem = await prisma.comandaItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComandaItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ComandaItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComandaItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemFindFirstArgs} args - Arguments to find a ComandaItem
     * @example
     * // Get one ComandaItem
     * const comandaItem = await prisma.comandaItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComandaItemFindFirstArgs>(args?: SelectSubset<T, ComandaItemFindFirstArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComandaItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemFindFirstOrThrowArgs} args - Arguments to find a ComandaItem
     * @example
     * // Get one ComandaItem
     * const comandaItem = await prisma.comandaItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComandaItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ComandaItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComandaItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComandaItems
     * const comandaItems = await prisma.comandaItem.findMany()
     * 
     * // Get first 10 ComandaItems
     * const comandaItems = await prisma.comandaItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comandaItemWithIdOnly = await prisma.comandaItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComandaItemFindManyArgs>(args?: SelectSubset<T, ComandaItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComandaItem.
     * @param {ComandaItemCreateArgs} args - Arguments to create a ComandaItem.
     * @example
     * // Create one ComandaItem
     * const ComandaItem = await prisma.comandaItem.create({
     *   data: {
     *     // ... data to create a ComandaItem
     *   }
     * })
     * 
     */
    create<T extends ComandaItemCreateArgs>(args: SelectSubset<T, ComandaItemCreateArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComandaItems.
     * @param {ComandaItemCreateManyArgs} args - Arguments to create many ComandaItems.
     * @example
     * // Create many ComandaItems
     * const comandaItem = await prisma.comandaItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComandaItemCreateManyArgs>(args?: SelectSubset<T, ComandaItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComandaItems and returns the data saved in the database.
     * @param {ComandaItemCreateManyAndReturnArgs} args - Arguments to create many ComandaItems.
     * @example
     * // Create many ComandaItems
     * const comandaItem = await prisma.comandaItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComandaItems and only return the `id`
     * const comandaItemWithIdOnly = await prisma.comandaItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComandaItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ComandaItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComandaItem.
     * @param {ComandaItemDeleteArgs} args - Arguments to delete one ComandaItem.
     * @example
     * // Delete one ComandaItem
     * const ComandaItem = await prisma.comandaItem.delete({
     *   where: {
     *     // ... filter to delete one ComandaItem
     *   }
     * })
     * 
     */
    delete<T extends ComandaItemDeleteArgs>(args: SelectSubset<T, ComandaItemDeleteArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComandaItem.
     * @param {ComandaItemUpdateArgs} args - Arguments to update one ComandaItem.
     * @example
     * // Update one ComandaItem
     * const comandaItem = await prisma.comandaItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComandaItemUpdateArgs>(args: SelectSubset<T, ComandaItemUpdateArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComandaItems.
     * @param {ComandaItemDeleteManyArgs} args - Arguments to filter ComandaItems to delete.
     * @example
     * // Delete a few ComandaItems
     * const { count } = await prisma.comandaItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComandaItemDeleteManyArgs>(args?: SelectSubset<T, ComandaItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComandaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComandaItems
     * const comandaItem = await prisma.comandaItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComandaItemUpdateManyArgs>(args: SelectSubset<T, ComandaItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComandaItem.
     * @param {ComandaItemUpsertArgs} args - Arguments to update or create a ComandaItem.
     * @example
     * // Update or create a ComandaItem
     * const comandaItem = await prisma.comandaItem.upsert({
     *   create: {
     *     // ... data to create a ComandaItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComandaItem we want to update
     *   }
     * })
     */
    upsert<T extends ComandaItemUpsertArgs>(args: SelectSubset<T, ComandaItemUpsertArgs<ExtArgs>>): Prisma__ComandaItemClient<$Result.GetResult<Prisma.$ComandaItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComandaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemCountArgs} args - Arguments to filter ComandaItems to count.
     * @example
     * // Count the number of ComandaItems
     * const count = await prisma.comandaItem.count({
     *   where: {
     *     // ... the filter for the ComandaItems we want to count
     *   }
     * })
    **/
    count<T extends ComandaItemCountArgs>(
      args?: Subset<T, ComandaItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComandaItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComandaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComandaItemAggregateArgs>(args: Subset<T, ComandaItemAggregateArgs>): Prisma.PrismaPromise<GetComandaItemAggregateType<T>>

    /**
     * Group by ComandaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComandaItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComandaItemGroupByArgs['orderBy'] }
        : { orderBy?: ComandaItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComandaItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComandaItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComandaItem model
   */
  readonly fields: ComandaItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComandaItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComandaItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comanda<T extends ComandaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComandaDefaultArgs<ExtArgs>>): Prisma__ComandaClient<$Result.GetResult<Prisma.$ComandaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComandaItem model
   */ 
  interface ComandaItemFieldRefs {
    readonly id: FieldRef<"ComandaItem", 'String'>
    readonly comandaId: FieldRef<"ComandaItem", 'String'>
    readonly productoId: FieldRef<"ComandaItem", 'String'>
    readonly nombre: FieldRef<"ComandaItem", 'String'>
    readonly cantidad: FieldRef<"ComandaItem", 'Int'>
    readonly precioUnitario: FieldRef<"ComandaItem", 'Decimal'>
    readonly subtotal: FieldRef<"ComandaItem", 'Decimal'>
    readonly esProductoPropio: FieldRef<"ComandaItem", 'Boolean'>
    readonly estado: FieldRef<"ComandaItem", 'EstadoItemComanda'>
    readonly createdAt: FieldRef<"ComandaItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComandaItem findUnique
   */
  export type ComandaItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter, which ComandaItem to fetch.
     */
    where: ComandaItemWhereUniqueInput
  }

  /**
   * ComandaItem findUniqueOrThrow
   */
  export type ComandaItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter, which ComandaItem to fetch.
     */
    where: ComandaItemWhereUniqueInput
  }

  /**
   * ComandaItem findFirst
   */
  export type ComandaItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter, which ComandaItem to fetch.
     */
    where?: ComandaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaItems to fetch.
     */
    orderBy?: ComandaItemOrderByWithRelationInput | ComandaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComandaItems.
     */
    cursor?: ComandaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComandaItems.
     */
    distinct?: ComandaItemScalarFieldEnum | ComandaItemScalarFieldEnum[]
  }

  /**
   * ComandaItem findFirstOrThrow
   */
  export type ComandaItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter, which ComandaItem to fetch.
     */
    where?: ComandaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaItems to fetch.
     */
    orderBy?: ComandaItemOrderByWithRelationInput | ComandaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComandaItems.
     */
    cursor?: ComandaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComandaItems.
     */
    distinct?: ComandaItemScalarFieldEnum | ComandaItemScalarFieldEnum[]
  }

  /**
   * ComandaItem findMany
   */
  export type ComandaItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter, which ComandaItems to fetch.
     */
    where?: ComandaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaItems to fetch.
     */
    orderBy?: ComandaItemOrderByWithRelationInput | ComandaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComandaItems.
     */
    cursor?: ComandaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaItems.
     */
    skip?: number
    distinct?: ComandaItemScalarFieldEnum | ComandaItemScalarFieldEnum[]
  }

  /**
   * ComandaItem create
   */
  export type ComandaItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ComandaItem.
     */
    data: XOR<ComandaItemCreateInput, ComandaItemUncheckedCreateInput>
  }

  /**
   * ComandaItem createMany
   */
  export type ComandaItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComandaItems.
     */
    data: ComandaItemCreateManyInput | ComandaItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComandaItem createManyAndReturn
   */
  export type ComandaItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComandaItems.
     */
    data: ComandaItemCreateManyInput | ComandaItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComandaItem update
   */
  export type ComandaItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ComandaItem.
     */
    data: XOR<ComandaItemUpdateInput, ComandaItemUncheckedUpdateInput>
    /**
     * Choose, which ComandaItem to update.
     */
    where: ComandaItemWhereUniqueInput
  }

  /**
   * ComandaItem updateMany
   */
  export type ComandaItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComandaItems.
     */
    data: XOR<ComandaItemUpdateManyMutationInput, ComandaItemUncheckedUpdateManyInput>
    /**
     * Filter which ComandaItems to update
     */
    where?: ComandaItemWhereInput
  }

  /**
   * ComandaItem upsert
   */
  export type ComandaItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ComandaItem to update in case it exists.
     */
    where: ComandaItemWhereUniqueInput
    /**
     * In case the ComandaItem found by the `where` argument doesn't exist, create a new ComandaItem with this data.
     */
    create: XOR<ComandaItemCreateInput, ComandaItemUncheckedCreateInput>
    /**
     * In case the ComandaItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComandaItemUpdateInput, ComandaItemUncheckedUpdateInput>
  }

  /**
   * ComandaItem delete
   */
  export type ComandaItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
    /**
     * Filter which ComandaItem to delete.
     */
    where: ComandaItemWhereUniqueInput
  }

  /**
   * ComandaItem deleteMany
   */
  export type ComandaItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComandaItems to delete
     */
    where?: ComandaItemWhereInput
  }

  /**
   * ComandaItem without action
   */
  export type ComandaItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaItem
     */
    select?: ComandaItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaItemInclude<ExtArgs> | null
  }


  /**
   * Model VentaPOS
   */

  export type AggregateVentaPOS = {
    _count: VentaPOSCountAggregateOutputType | null
    _avg: VentaPOSAvgAggregateOutputType | null
    _sum: VentaPOSSumAggregateOutputType | null
    _min: VentaPOSMinAggregateOutputType | null
    _max: VentaPOSMaxAggregateOutputType | null
  }

  export type VentaPOSAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type VentaPOSSumAggregateOutputType = {
    total: Decimal | null
  }

  export type VentaPOSMinAggregateOutputType = {
    id: string | null
    clienteId: string | null
    fecha: Date | null
    total: Decimal | null
    metodoPago: $Enums.MetodoPago | null
    observacion: string | null
    createdAt: Date | null
  }

  export type VentaPOSMaxAggregateOutputType = {
    id: string | null
    clienteId: string | null
    fecha: Date | null
    total: Decimal | null
    metodoPago: $Enums.MetodoPago | null
    observacion: string | null
    createdAt: Date | null
  }

  export type VentaPOSCountAggregateOutputType = {
    id: number
    clienteId: number
    fecha: number
    total: number
    metodoPago: number
    observacion: number
    createdAt: number
    _all: number
  }


  export type VentaPOSAvgAggregateInputType = {
    total?: true
  }

  export type VentaPOSSumAggregateInputType = {
    total?: true
  }

  export type VentaPOSMinAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    total?: true
    metodoPago?: true
    observacion?: true
    createdAt?: true
  }

  export type VentaPOSMaxAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    total?: true
    metodoPago?: true
    observacion?: true
    createdAt?: true
  }

  export type VentaPOSCountAggregateInputType = {
    id?: true
    clienteId?: true
    fecha?: true
    total?: true
    metodoPago?: true
    observacion?: true
    createdAt?: true
    _all?: true
  }

  export type VentaPOSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VentaPOS to aggregate.
     */
    where?: VentaPOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOS to fetch.
     */
    orderBy?: VentaPOSOrderByWithRelationInput | VentaPOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VentaPOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VentaPOS
    **/
    _count?: true | VentaPOSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VentaPOSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VentaPOSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VentaPOSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VentaPOSMaxAggregateInputType
  }

  export type GetVentaPOSAggregateType<T extends VentaPOSAggregateArgs> = {
        [P in keyof T & keyof AggregateVentaPOS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVentaPOS[P]>
      : GetScalarType<T[P], AggregateVentaPOS[P]>
  }




  export type VentaPOSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaPOSWhereInput
    orderBy?: VentaPOSOrderByWithAggregationInput | VentaPOSOrderByWithAggregationInput[]
    by: VentaPOSScalarFieldEnum[] | VentaPOSScalarFieldEnum
    having?: VentaPOSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VentaPOSCountAggregateInputType | true
    _avg?: VentaPOSAvgAggregateInputType
    _sum?: VentaPOSSumAggregateInputType
    _min?: VentaPOSMinAggregateInputType
    _max?: VentaPOSMaxAggregateInputType
  }

  export type VentaPOSGroupByOutputType = {
    id: string
    clienteId: string | null
    fecha: Date
    total: Decimal
    metodoPago: $Enums.MetodoPago
    observacion: string | null
    createdAt: Date
    _count: VentaPOSCountAggregateOutputType | null
    _avg: VentaPOSAvgAggregateOutputType | null
    _sum: VentaPOSSumAggregateOutputType | null
    _min: VentaPOSMinAggregateOutputType | null
    _max: VentaPOSMaxAggregateOutputType | null
  }

  type GetVentaPOSGroupByPayload<T extends VentaPOSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VentaPOSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VentaPOSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VentaPOSGroupByOutputType[P]>
            : GetScalarType<T[P], VentaPOSGroupByOutputType[P]>
        }
      >
    >


  export type VentaPOSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    total?: boolean
    metodoPago?: boolean
    observacion?: boolean
    createdAt?: boolean
    cliente?: boolean | VentaPOS$clienteArgs<ExtArgs>
    items?: boolean | VentaPOS$itemsArgs<ExtArgs>
    _count?: boolean | VentaPOSCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ventaPOS"]>

  export type VentaPOSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    total?: boolean
    metodoPago?: boolean
    observacion?: boolean
    createdAt?: boolean
    cliente?: boolean | VentaPOS$clienteArgs<ExtArgs>
  }, ExtArgs["result"]["ventaPOS"]>

  export type VentaPOSSelectScalar = {
    id?: boolean
    clienteId?: boolean
    fecha?: boolean
    total?: boolean
    metodoPago?: boolean
    observacion?: boolean
    createdAt?: boolean
  }

  export type VentaPOSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | VentaPOS$clienteArgs<ExtArgs>
    items?: boolean | VentaPOS$itemsArgs<ExtArgs>
    _count?: boolean | VentaPOSCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VentaPOSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | VentaPOS$clienteArgs<ExtArgs>
  }

  export type $VentaPOSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VentaPOS"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs> | null
      items: Prisma.$VentaPOSItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clienteId: string | null
      fecha: Date
      total: Prisma.Decimal
      metodoPago: $Enums.MetodoPago
      observacion: string | null
      createdAt: Date
    }, ExtArgs["result"]["ventaPOS"]>
    composites: {}
  }

  type VentaPOSGetPayload<S extends boolean | null | undefined | VentaPOSDefaultArgs> = $Result.GetResult<Prisma.$VentaPOSPayload, S>

  type VentaPOSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VentaPOSFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VentaPOSCountAggregateInputType | true
    }

  export interface VentaPOSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VentaPOS'], meta: { name: 'VentaPOS' } }
    /**
     * Find zero or one VentaPOS that matches the filter.
     * @param {VentaPOSFindUniqueArgs} args - Arguments to find a VentaPOS
     * @example
     * // Get one VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VentaPOSFindUniqueArgs>(args: SelectSubset<T, VentaPOSFindUniqueArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VentaPOS that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VentaPOSFindUniqueOrThrowArgs} args - Arguments to find a VentaPOS
     * @example
     * // Get one VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VentaPOSFindUniqueOrThrowArgs>(args: SelectSubset<T, VentaPOSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VentaPOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSFindFirstArgs} args - Arguments to find a VentaPOS
     * @example
     * // Get one VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VentaPOSFindFirstArgs>(args?: SelectSubset<T, VentaPOSFindFirstArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VentaPOS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSFindFirstOrThrowArgs} args - Arguments to find a VentaPOS
     * @example
     * // Get one VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VentaPOSFindFirstOrThrowArgs>(args?: SelectSubset<T, VentaPOSFindFirstOrThrowArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VentaPOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findMany()
     * 
     * // Get first 10 VentaPOS
     * const ventaPOS = await prisma.ventaPOS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ventaPOSWithIdOnly = await prisma.ventaPOS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VentaPOSFindManyArgs>(args?: SelectSubset<T, VentaPOSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VentaPOS.
     * @param {VentaPOSCreateArgs} args - Arguments to create a VentaPOS.
     * @example
     * // Create one VentaPOS
     * const VentaPOS = await prisma.ventaPOS.create({
     *   data: {
     *     // ... data to create a VentaPOS
     *   }
     * })
     * 
     */
    create<T extends VentaPOSCreateArgs>(args: SelectSubset<T, VentaPOSCreateArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VentaPOS.
     * @param {VentaPOSCreateManyArgs} args - Arguments to create many VentaPOS.
     * @example
     * // Create many VentaPOS
     * const ventaPOS = await prisma.ventaPOS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VentaPOSCreateManyArgs>(args?: SelectSubset<T, VentaPOSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VentaPOS and returns the data saved in the database.
     * @param {VentaPOSCreateManyAndReturnArgs} args - Arguments to create many VentaPOS.
     * @example
     * // Create many VentaPOS
     * const ventaPOS = await prisma.ventaPOS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VentaPOS and only return the `id`
     * const ventaPOSWithIdOnly = await prisma.ventaPOS.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VentaPOSCreateManyAndReturnArgs>(args?: SelectSubset<T, VentaPOSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VentaPOS.
     * @param {VentaPOSDeleteArgs} args - Arguments to delete one VentaPOS.
     * @example
     * // Delete one VentaPOS
     * const VentaPOS = await prisma.ventaPOS.delete({
     *   where: {
     *     // ... filter to delete one VentaPOS
     *   }
     * })
     * 
     */
    delete<T extends VentaPOSDeleteArgs>(args: SelectSubset<T, VentaPOSDeleteArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VentaPOS.
     * @param {VentaPOSUpdateArgs} args - Arguments to update one VentaPOS.
     * @example
     * // Update one VentaPOS
     * const ventaPOS = await prisma.ventaPOS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VentaPOSUpdateArgs>(args: SelectSubset<T, VentaPOSUpdateArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VentaPOS.
     * @param {VentaPOSDeleteManyArgs} args - Arguments to filter VentaPOS to delete.
     * @example
     * // Delete a few VentaPOS
     * const { count } = await prisma.ventaPOS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VentaPOSDeleteManyArgs>(args?: SelectSubset<T, VentaPOSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VentaPOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VentaPOS
     * const ventaPOS = await prisma.ventaPOS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VentaPOSUpdateManyArgs>(args: SelectSubset<T, VentaPOSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VentaPOS.
     * @param {VentaPOSUpsertArgs} args - Arguments to update or create a VentaPOS.
     * @example
     * // Update or create a VentaPOS
     * const ventaPOS = await prisma.ventaPOS.upsert({
     *   create: {
     *     // ... data to create a VentaPOS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VentaPOS we want to update
     *   }
     * })
     */
    upsert<T extends VentaPOSUpsertArgs>(args: SelectSubset<T, VentaPOSUpsertArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VentaPOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSCountArgs} args - Arguments to filter VentaPOS to count.
     * @example
     * // Count the number of VentaPOS
     * const count = await prisma.ventaPOS.count({
     *   where: {
     *     // ... the filter for the VentaPOS we want to count
     *   }
     * })
    **/
    count<T extends VentaPOSCountArgs>(
      args?: Subset<T, VentaPOSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VentaPOSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VentaPOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VentaPOSAggregateArgs>(args: Subset<T, VentaPOSAggregateArgs>): Prisma.PrismaPromise<GetVentaPOSAggregateType<T>>

    /**
     * Group by VentaPOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VentaPOSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VentaPOSGroupByArgs['orderBy'] }
        : { orderBy?: VentaPOSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VentaPOSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVentaPOSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VentaPOS model
   */
  readonly fields: VentaPOSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VentaPOS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VentaPOSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends VentaPOS$clienteArgs<ExtArgs> = {}>(args?: Subset<T, VentaPOS$clienteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends VentaPOS$itemsArgs<ExtArgs> = {}>(args?: Subset<T, VentaPOS$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VentaPOS model
   */ 
  interface VentaPOSFieldRefs {
    readonly id: FieldRef<"VentaPOS", 'String'>
    readonly clienteId: FieldRef<"VentaPOS", 'String'>
    readonly fecha: FieldRef<"VentaPOS", 'DateTime'>
    readonly total: FieldRef<"VentaPOS", 'Decimal'>
    readonly metodoPago: FieldRef<"VentaPOS", 'MetodoPago'>
    readonly observacion: FieldRef<"VentaPOS", 'String'>
    readonly createdAt: FieldRef<"VentaPOS", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VentaPOS findUnique
   */
  export type VentaPOSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOS to fetch.
     */
    where: VentaPOSWhereUniqueInput
  }

  /**
   * VentaPOS findUniqueOrThrow
   */
  export type VentaPOSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOS to fetch.
     */
    where: VentaPOSWhereUniqueInput
  }

  /**
   * VentaPOS findFirst
   */
  export type VentaPOSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOS to fetch.
     */
    where?: VentaPOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOS to fetch.
     */
    orderBy?: VentaPOSOrderByWithRelationInput | VentaPOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VentaPOS.
     */
    cursor?: VentaPOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VentaPOS.
     */
    distinct?: VentaPOSScalarFieldEnum | VentaPOSScalarFieldEnum[]
  }

  /**
   * VentaPOS findFirstOrThrow
   */
  export type VentaPOSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOS to fetch.
     */
    where?: VentaPOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOS to fetch.
     */
    orderBy?: VentaPOSOrderByWithRelationInput | VentaPOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VentaPOS.
     */
    cursor?: VentaPOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VentaPOS.
     */
    distinct?: VentaPOSScalarFieldEnum | VentaPOSScalarFieldEnum[]
  }

  /**
   * VentaPOS findMany
   */
  export type VentaPOSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOS to fetch.
     */
    where?: VentaPOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOS to fetch.
     */
    orderBy?: VentaPOSOrderByWithRelationInput | VentaPOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VentaPOS.
     */
    cursor?: VentaPOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOS.
     */
    skip?: number
    distinct?: VentaPOSScalarFieldEnum | VentaPOSScalarFieldEnum[]
  }

  /**
   * VentaPOS create
   */
  export type VentaPOSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * The data needed to create a VentaPOS.
     */
    data: XOR<VentaPOSCreateInput, VentaPOSUncheckedCreateInput>
  }

  /**
   * VentaPOS createMany
   */
  export type VentaPOSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VentaPOS.
     */
    data: VentaPOSCreateManyInput | VentaPOSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VentaPOS createManyAndReturn
   */
  export type VentaPOSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VentaPOS.
     */
    data: VentaPOSCreateManyInput | VentaPOSCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VentaPOS update
   */
  export type VentaPOSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * The data needed to update a VentaPOS.
     */
    data: XOR<VentaPOSUpdateInput, VentaPOSUncheckedUpdateInput>
    /**
     * Choose, which VentaPOS to update.
     */
    where: VentaPOSWhereUniqueInput
  }

  /**
   * VentaPOS updateMany
   */
  export type VentaPOSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VentaPOS.
     */
    data: XOR<VentaPOSUpdateManyMutationInput, VentaPOSUncheckedUpdateManyInput>
    /**
     * Filter which VentaPOS to update
     */
    where?: VentaPOSWhereInput
  }

  /**
   * VentaPOS upsert
   */
  export type VentaPOSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * The filter to search for the VentaPOS to update in case it exists.
     */
    where: VentaPOSWhereUniqueInput
    /**
     * In case the VentaPOS found by the `where` argument doesn't exist, create a new VentaPOS with this data.
     */
    create: XOR<VentaPOSCreateInput, VentaPOSUncheckedCreateInput>
    /**
     * In case the VentaPOS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VentaPOSUpdateInput, VentaPOSUncheckedUpdateInput>
  }

  /**
   * VentaPOS delete
   */
  export type VentaPOSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
    /**
     * Filter which VentaPOS to delete.
     */
    where: VentaPOSWhereUniqueInput
  }

  /**
   * VentaPOS deleteMany
   */
  export type VentaPOSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VentaPOS to delete
     */
    where?: VentaPOSWhereInput
  }

  /**
   * VentaPOS.cliente
   */
  export type VentaPOS$clienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    where?: ClienteWhereInput
  }

  /**
   * VentaPOS.items
   */
  export type VentaPOS$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    where?: VentaPOSItemWhereInput
    orderBy?: VentaPOSItemOrderByWithRelationInput | VentaPOSItemOrderByWithRelationInput[]
    cursor?: VentaPOSItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VentaPOSItemScalarFieldEnum | VentaPOSItemScalarFieldEnum[]
  }

  /**
   * VentaPOS without action
   */
  export type VentaPOSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOS
     */
    select?: VentaPOSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSInclude<ExtArgs> | null
  }


  /**
   * Model VentaPOSItem
   */

  export type AggregateVentaPOSItem = {
    _count: VentaPOSItemCountAggregateOutputType | null
    _avg: VentaPOSItemAvgAggregateOutputType | null
    _sum: VentaPOSItemSumAggregateOutputType | null
    _min: VentaPOSItemMinAggregateOutputType | null
    _max: VentaPOSItemMaxAggregateOutputType | null
  }

  export type VentaPOSItemAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type VentaPOSItemSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type VentaPOSItemMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    ventaPOSId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
    esProductoPropio: boolean | null
  }

  export type VentaPOSItemMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    ventaPOSId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
    esProductoPropio: boolean | null
  }

  export type VentaPOSItemCountAggregateOutputType = {
    id: number
    nombre: number
    ventaPOSId: number
    productoId: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    esProductoPropio: number
    _all: number
  }


  export type VentaPOSItemAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type VentaPOSItemSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type VentaPOSItemMinAggregateInputType = {
    id?: true
    nombre?: true
    ventaPOSId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
  }

  export type VentaPOSItemMaxAggregateInputType = {
    id?: true
    nombre?: true
    ventaPOSId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
  }

  export type VentaPOSItemCountAggregateInputType = {
    id?: true
    nombre?: true
    ventaPOSId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    esProductoPropio?: true
    _all?: true
  }

  export type VentaPOSItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VentaPOSItem to aggregate.
     */
    where?: VentaPOSItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOSItems to fetch.
     */
    orderBy?: VentaPOSItemOrderByWithRelationInput | VentaPOSItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VentaPOSItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOSItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOSItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VentaPOSItems
    **/
    _count?: true | VentaPOSItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VentaPOSItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VentaPOSItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VentaPOSItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VentaPOSItemMaxAggregateInputType
  }

  export type GetVentaPOSItemAggregateType<T extends VentaPOSItemAggregateArgs> = {
        [P in keyof T & keyof AggregateVentaPOSItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVentaPOSItem[P]>
      : GetScalarType<T[P], AggregateVentaPOSItem[P]>
  }




  export type VentaPOSItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaPOSItemWhereInput
    orderBy?: VentaPOSItemOrderByWithAggregationInput | VentaPOSItemOrderByWithAggregationInput[]
    by: VentaPOSItemScalarFieldEnum[] | VentaPOSItemScalarFieldEnum
    having?: VentaPOSItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VentaPOSItemCountAggregateInputType | true
    _avg?: VentaPOSItemAvgAggregateInputType
    _sum?: VentaPOSItemSumAggregateInputType
    _min?: VentaPOSItemMinAggregateInputType
    _max?: VentaPOSItemMaxAggregateInputType
  }

  export type VentaPOSItemGroupByOutputType = {
    id: string
    nombre: string | null
    ventaPOSId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal
    subtotal: Decimal
    esProductoPropio: boolean
    _count: VentaPOSItemCountAggregateOutputType | null
    _avg: VentaPOSItemAvgAggregateOutputType | null
    _sum: VentaPOSItemSumAggregateOutputType | null
    _min: VentaPOSItemMinAggregateOutputType | null
    _max: VentaPOSItemMaxAggregateOutputType | null
  }

  type GetVentaPOSItemGroupByPayload<T extends VentaPOSItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VentaPOSItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VentaPOSItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VentaPOSItemGroupByOutputType[P]>
            : GetScalarType<T[P], VentaPOSItemGroupByOutputType[P]>
        }
      >
    >


  export type VentaPOSItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ventaPOSId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
    ventaPOS?: boolean | VentaPOSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ventaPOSItem"]>

  export type VentaPOSItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ventaPOSId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
    ventaPOS?: boolean | VentaPOSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ventaPOSItem"]>

  export type VentaPOSItemSelectScalar = {
    id?: boolean
    nombre?: boolean
    ventaPOSId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    esProductoPropio?: boolean
  }

  export type VentaPOSItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ventaPOS?: boolean | VentaPOSDefaultArgs<ExtArgs>
  }
  export type VentaPOSItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ventaPOS?: boolean | VentaPOSDefaultArgs<ExtArgs>
  }

  export type $VentaPOSItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VentaPOSItem"
    objects: {
      ventaPOS: Prisma.$VentaPOSPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string | null
      ventaPOSId: string
      productoId: string
      cantidad: number
      precioUnitario: Prisma.Decimal
      subtotal: Prisma.Decimal
      esProductoPropio: boolean
    }, ExtArgs["result"]["ventaPOSItem"]>
    composites: {}
  }

  type VentaPOSItemGetPayload<S extends boolean | null | undefined | VentaPOSItemDefaultArgs> = $Result.GetResult<Prisma.$VentaPOSItemPayload, S>

  type VentaPOSItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VentaPOSItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VentaPOSItemCountAggregateInputType | true
    }

  export interface VentaPOSItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VentaPOSItem'], meta: { name: 'VentaPOSItem' } }
    /**
     * Find zero or one VentaPOSItem that matches the filter.
     * @param {VentaPOSItemFindUniqueArgs} args - Arguments to find a VentaPOSItem
     * @example
     * // Get one VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VentaPOSItemFindUniqueArgs>(args: SelectSubset<T, VentaPOSItemFindUniqueArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VentaPOSItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VentaPOSItemFindUniqueOrThrowArgs} args - Arguments to find a VentaPOSItem
     * @example
     * // Get one VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VentaPOSItemFindUniqueOrThrowArgs>(args: SelectSubset<T, VentaPOSItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VentaPOSItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemFindFirstArgs} args - Arguments to find a VentaPOSItem
     * @example
     * // Get one VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VentaPOSItemFindFirstArgs>(args?: SelectSubset<T, VentaPOSItemFindFirstArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VentaPOSItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemFindFirstOrThrowArgs} args - Arguments to find a VentaPOSItem
     * @example
     * // Get one VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VentaPOSItemFindFirstOrThrowArgs>(args?: SelectSubset<T, VentaPOSItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VentaPOSItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VentaPOSItems
     * const ventaPOSItems = await prisma.ventaPOSItem.findMany()
     * 
     * // Get first 10 VentaPOSItems
     * const ventaPOSItems = await prisma.ventaPOSItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ventaPOSItemWithIdOnly = await prisma.ventaPOSItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VentaPOSItemFindManyArgs>(args?: SelectSubset<T, VentaPOSItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VentaPOSItem.
     * @param {VentaPOSItemCreateArgs} args - Arguments to create a VentaPOSItem.
     * @example
     * // Create one VentaPOSItem
     * const VentaPOSItem = await prisma.ventaPOSItem.create({
     *   data: {
     *     // ... data to create a VentaPOSItem
     *   }
     * })
     * 
     */
    create<T extends VentaPOSItemCreateArgs>(args: SelectSubset<T, VentaPOSItemCreateArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VentaPOSItems.
     * @param {VentaPOSItemCreateManyArgs} args - Arguments to create many VentaPOSItems.
     * @example
     * // Create many VentaPOSItems
     * const ventaPOSItem = await prisma.ventaPOSItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VentaPOSItemCreateManyArgs>(args?: SelectSubset<T, VentaPOSItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VentaPOSItems and returns the data saved in the database.
     * @param {VentaPOSItemCreateManyAndReturnArgs} args - Arguments to create many VentaPOSItems.
     * @example
     * // Create many VentaPOSItems
     * const ventaPOSItem = await prisma.ventaPOSItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VentaPOSItems and only return the `id`
     * const ventaPOSItemWithIdOnly = await prisma.ventaPOSItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VentaPOSItemCreateManyAndReturnArgs>(args?: SelectSubset<T, VentaPOSItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VentaPOSItem.
     * @param {VentaPOSItemDeleteArgs} args - Arguments to delete one VentaPOSItem.
     * @example
     * // Delete one VentaPOSItem
     * const VentaPOSItem = await prisma.ventaPOSItem.delete({
     *   where: {
     *     // ... filter to delete one VentaPOSItem
     *   }
     * })
     * 
     */
    delete<T extends VentaPOSItemDeleteArgs>(args: SelectSubset<T, VentaPOSItemDeleteArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VentaPOSItem.
     * @param {VentaPOSItemUpdateArgs} args - Arguments to update one VentaPOSItem.
     * @example
     * // Update one VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VentaPOSItemUpdateArgs>(args: SelectSubset<T, VentaPOSItemUpdateArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VentaPOSItems.
     * @param {VentaPOSItemDeleteManyArgs} args - Arguments to filter VentaPOSItems to delete.
     * @example
     * // Delete a few VentaPOSItems
     * const { count } = await prisma.ventaPOSItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VentaPOSItemDeleteManyArgs>(args?: SelectSubset<T, VentaPOSItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VentaPOSItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VentaPOSItems
     * const ventaPOSItem = await prisma.ventaPOSItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VentaPOSItemUpdateManyArgs>(args: SelectSubset<T, VentaPOSItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VentaPOSItem.
     * @param {VentaPOSItemUpsertArgs} args - Arguments to update or create a VentaPOSItem.
     * @example
     * // Update or create a VentaPOSItem
     * const ventaPOSItem = await prisma.ventaPOSItem.upsert({
     *   create: {
     *     // ... data to create a VentaPOSItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VentaPOSItem we want to update
     *   }
     * })
     */
    upsert<T extends VentaPOSItemUpsertArgs>(args: SelectSubset<T, VentaPOSItemUpsertArgs<ExtArgs>>): Prisma__VentaPOSItemClient<$Result.GetResult<Prisma.$VentaPOSItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VentaPOSItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemCountArgs} args - Arguments to filter VentaPOSItems to count.
     * @example
     * // Count the number of VentaPOSItems
     * const count = await prisma.ventaPOSItem.count({
     *   where: {
     *     // ... the filter for the VentaPOSItems we want to count
     *   }
     * })
    **/
    count<T extends VentaPOSItemCountArgs>(
      args?: Subset<T, VentaPOSItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VentaPOSItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VentaPOSItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VentaPOSItemAggregateArgs>(args: Subset<T, VentaPOSItemAggregateArgs>): Prisma.PrismaPromise<GetVentaPOSItemAggregateType<T>>

    /**
     * Group by VentaPOSItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaPOSItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VentaPOSItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VentaPOSItemGroupByArgs['orderBy'] }
        : { orderBy?: VentaPOSItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VentaPOSItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVentaPOSItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VentaPOSItem model
   */
  readonly fields: VentaPOSItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VentaPOSItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VentaPOSItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ventaPOS<T extends VentaPOSDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VentaPOSDefaultArgs<ExtArgs>>): Prisma__VentaPOSClient<$Result.GetResult<Prisma.$VentaPOSPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VentaPOSItem model
   */ 
  interface VentaPOSItemFieldRefs {
    readonly id: FieldRef<"VentaPOSItem", 'String'>
    readonly nombre: FieldRef<"VentaPOSItem", 'String'>
    readonly ventaPOSId: FieldRef<"VentaPOSItem", 'String'>
    readonly productoId: FieldRef<"VentaPOSItem", 'String'>
    readonly cantidad: FieldRef<"VentaPOSItem", 'Int'>
    readonly precioUnitario: FieldRef<"VentaPOSItem", 'Decimal'>
    readonly subtotal: FieldRef<"VentaPOSItem", 'Decimal'>
    readonly esProductoPropio: FieldRef<"VentaPOSItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * VentaPOSItem findUnique
   */
  export type VentaPOSItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOSItem to fetch.
     */
    where: VentaPOSItemWhereUniqueInput
  }

  /**
   * VentaPOSItem findUniqueOrThrow
   */
  export type VentaPOSItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOSItem to fetch.
     */
    where: VentaPOSItemWhereUniqueInput
  }

  /**
   * VentaPOSItem findFirst
   */
  export type VentaPOSItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOSItem to fetch.
     */
    where?: VentaPOSItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOSItems to fetch.
     */
    orderBy?: VentaPOSItemOrderByWithRelationInput | VentaPOSItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VentaPOSItems.
     */
    cursor?: VentaPOSItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOSItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOSItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VentaPOSItems.
     */
    distinct?: VentaPOSItemScalarFieldEnum | VentaPOSItemScalarFieldEnum[]
  }

  /**
   * VentaPOSItem findFirstOrThrow
   */
  export type VentaPOSItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOSItem to fetch.
     */
    where?: VentaPOSItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOSItems to fetch.
     */
    orderBy?: VentaPOSItemOrderByWithRelationInput | VentaPOSItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VentaPOSItems.
     */
    cursor?: VentaPOSItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOSItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOSItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VentaPOSItems.
     */
    distinct?: VentaPOSItemScalarFieldEnum | VentaPOSItemScalarFieldEnum[]
  }

  /**
   * VentaPOSItem findMany
   */
  export type VentaPOSItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter, which VentaPOSItems to fetch.
     */
    where?: VentaPOSItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VentaPOSItems to fetch.
     */
    orderBy?: VentaPOSItemOrderByWithRelationInput | VentaPOSItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VentaPOSItems.
     */
    cursor?: VentaPOSItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VentaPOSItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VentaPOSItems.
     */
    skip?: number
    distinct?: VentaPOSItemScalarFieldEnum | VentaPOSItemScalarFieldEnum[]
  }

  /**
   * VentaPOSItem create
   */
  export type VentaPOSItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * The data needed to create a VentaPOSItem.
     */
    data: XOR<VentaPOSItemCreateInput, VentaPOSItemUncheckedCreateInput>
  }

  /**
   * VentaPOSItem createMany
   */
  export type VentaPOSItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VentaPOSItems.
     */
    data: VentaPOSItemCreateManyInput | VentaPOSItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VentaPOSItem createManyAndReturn
   */
  export type VentaPOSItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VentaPOSItems.
     */
    data: VentaPOSItemCreateManyInput | VentaPOSItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VentaPOSItem update
   */
  export type VentaPOSItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * The data needed to update a VentaPOSItem.
     */
    data: XOR<VentaPOSItemUpdateInput, VentaPOSItemUncheckedUpdateInput>
    /**
     * Choose, which VentaPOSItem to update.
     */
    where: VentaPOSItemWhereUniqueInput
  }

  /**
   * VentaPOSItem updateMany
   */
  export type VentaPOSItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VentaPOSItems.
     */
    data: XOR<VentaPOSItemUpdateManyMutationInput, VentaPOSItemUncheckedUpdateManyInput>
    /**
     * Filter which VentaPOSItems to update
     */
    where?: VentaPOSItemWhereInput
  }

  /**
   * VentaPOSItem upsert
   */
  export type VentaPOSItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * The filter to search for the VentaPOSItem to update in case it exists.
     */
    where: VentaPOSItemWhereUniqueInput
    /**
     * In case the VentaPOSItem found by the `where` argument doesn't exist, create a new VentaPOSItem with this data.
     */
    create: XOR<VentaPOSItemCreateInput, VentaPOSItemUncheckedCreateInput>
    /**
     * In case the VentaPOSItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VentaPOSItemUpdateInput, VentaPOSItemUncheckedUpdateInput>
  }

  /**
   * VentaPOSItem delete
   */
  export type VentaPOSItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
    /**
     * Filter which VentaPOSItem to delete.
     */
    where: VentaPOSItemWhereUniqueInput
  }

  /**
   * VentaPOSItem deleteMany
   */
  export type VentaPOSItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VentaPOSItems to delete
     */
    where?: VentaPOSItemWhereInput
  }

  /**
   * VentaPOSItem without action
   */
  export type VentaPOSItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaPOSItem
     */
    select?: VentaPOSItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaPOSItemInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    usuario: string | null
    accion: string | null
    entidad: string | null
    entidadId: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    usuario: string | null
    accion: string | null
    entidad: string | null
    entidadId: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    usuario: number
    accion: number
    entidad: number
    entidadId: number
    antes: number
    despues: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    usuario?: true
    accion?: true
    entidad?: true
    entidadId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    usuario?: true
    accion?: true
    entidad?: true
    entidadId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    usuario?: true
    accion?: true
    entidad?: true
    entidadId?: true
    antes?: true
    despues?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    usuario: string
    accion: string
    entidad: string
    entidadId: string
    antes: JsonValue | null
    despues: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    accion?: boolean
    entidad?: boolean
    entidadId?: boolean
    antes?: boolean
    despues?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    accion?: boolean
    entidad?: boolean
    entidadId?: boolean
    antes?: boolean
    despues?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    usuario?: boolean
    accion?: boolean
    entidad?: boolean
    entidadId?: boolean
    antes?: boolean
    despues?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      usuario: string
      accion: string
      entidad: string
      entidadId: string
      antes: Prisma.JsonValue | null
      despues: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly usuario: FieldRef<"AuditLog", 'String'>
    readonly accion: FieldRef<"AuditLog", 'String'>
    readonly entidad: FieldRef<"AuditLog", 'String'>
    readonly entidadId: FieldRef<"AuditLog", 'String'>
    readonly antes: FieldRef<"AuditLog", 'Json'>
    readonly despues: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    telefono: 'telefono',
    email: 'email',
    direccion: 'direccion',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const PedidoScalarFieldEnum: {
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

  export type PedidoScalarFieldEnum = (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum]


  export const PedidoItemScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    pedidoId: 'pedidoId',
    productoId: 'productoId',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    subtotal: 'subtotal'
  };

  export type PedidoItemScalarFieldEnum = (typeof PedidoItemScalarFieldEnum)[keyof typeof PedidoItemScalarFieldEnum]


  export const MesaScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    estado: 'estado',
    activo: 'activo'
  };

  export type MesaScalarFieldEnum = (typeof MesaScalarFieldEnum)[keyof typeof MesaScalarFieldEnum]


  export const ComandaScalarFieldEnum: {
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

  export type ComandaScalarFieldEnum = (typeof ComandaScalarFieldEnum)[keyof typeof ComandaScalarFieldEnum]


  export const ComandaItemScalarFieldEnum: {
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

  export type ComandaItemScalarFieldEnum = (typeof ComandaItemScalarFieldEnum)[keyof typeof ComandaItemScalarFieldEnum]


  export const VentaPOSScalarFieldEnum: {
    id: 'id',
    clienteId: 'clienteId',
    fecha: 'fecha',
    total: 'total',
    metodoPago: 'metodoPago',
    observacion: 'observacion',
    createdAt: 'createdAt'
  };

  export type VentaPOSScalarFieldEnum = (typeof VentaPOSScalarFieldEnum)[keyof typeof VentaPOSScalarFieldEnum]


  export const VentaPOSItemScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    ventaPOSId: 'ventaPOSId',
    productoId: 'productoId',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    subtotal: 'subtotal',
    esProductoPropio: 'esProductoPropio'
  };

  export type VentaPOSItemScalarFieldEnum = (typeof VentaPOSItemScalarFieldEnum)[keyof typeof VentaPOSItemScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    usuario: 'usuario',
    accion: 'accion',
    entidad: 'entidad',
    entidadId: 'entidadId',
    antes: 'antes',
    despues: 'despues',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EstadoPedido'
   */
  export type EnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido'>
    


  /**
   * Reference to a field of type 'EstadoPedido[]'
   */
  export type ListEnumEstadoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPedido[]'>
    


  /**
   * Reference to a field of type 'TipoPedido'
   */
  export type EnumTipoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPedido'>
    


  /**
   * Reference to a field of type 'TipoPedido[]'
   */
  export type ListEnumTipoPedidoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPedido[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EstadoMesa'
   */
  export type EnumEstadoMesaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoMesa'>
    


  /**
   * Reference to a field of type 'EstadoMesa[]'
   */
  export type ListEnumEstadoMesaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoMesa[]'>
    


  /**
   * Reference to a field of type 'EstadoComanda'
   */
  export type EnumEstadoComandaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoComanda'>
    


  /**
   * Reference to a field of type 'EstadoComanda[]'
   */
  export type ListEnumEstadoComandaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoComanda[]'>
    


  /**
   * Reference to a field of type 'EstadoItemComanda'
   */
  export type EnumEstadoItemComandaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoItemComanda'>
    


  /**
   * Reference to a field of type 'EstadoItemComanda[]'
   */
  export type ListEnumEstadoItemComandaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoItemComanda[]'>
    


  /**
   * Reference to a field of type 'MetodoPago'
   */
  export type EnumMetodoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MetodoPago'>
    


  /**
   * Reference to a field of type 'MetodoPago[]'
   */
  export type ListEnumMetodoPagoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MetodoPago[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: StringFilter<"Cliente"> | string
    nombre?: StringFilter<"Cliente"> | string
    telefono?: StringNullableFilter<"Cliente"> | string | null
    email?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    activo?: BoolFilter<"Cliente"> | boolean
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    pedidos?: PedidoListRelationFilter
    ventasPOS?: VentaPOSListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pedidos?: PedidoOrderByRelationAggregateInput
    ventasPOS?: VentaPOSOrderByRelationAggregateInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nombre?: StringFilter<"Cliente"> | string
    telefono?: StringNullableFilter<"Cliente"> | string | null
    email?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    activo?: BoolFilter<"Cliente"> | boolean
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    pedidos?: PedidoListRelationFilter
    ventasPOS?: VentaPOSListRelationFilter
  }, "id">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cliente"> | string
    nombre?: StringWithAggregatesFilter<"Cliente"> | string
    telefono?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    email?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    activo?: BoolWithAggregatesFilter<"Cliente"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    id?: StringFilter<"Pedido"> | string
    clienteId?: StringFilter<"Pedido"> | string
    fecha?: DateTimeFilter<"Pedido"> | Date | string
    fechaEntrega?: DateTimeNullableFilter<"Pedido"> | Date | string | null
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFilter<"Pedido"> | $Enums.TipoPedido
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Pedido"> | string | null
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    cliente?: XOR<ClienteRelationFilter, ClienteWhereInput>
    items?: PedidoItemListRelationFilter
  }

  export type PedidoOrderByWithRelationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    estado?: SortOrder
    tipo?: SortOrder
    total?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    items?: PedidoItemOrderByRelationAggregateInput
  }

  export type PedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    clienteId?: StringFilter<"Pedido"> | string
    fecha?: DateTimeFilter<"Pedido"> | Date | string
    fechaEntrega?: DateTimeNullableFilter<"Pedido"> | Date | string | null
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFilter<"Pedido"> | $Enums.TipoPedido
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Pedido"> | string | null
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    cliente?: XOR<ClienteRelationFilter, ClienteWhereInput>
    items?: PedidoItemListRelationFilter
  }, "id">

  export type PedidoOrderByWithAggregationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    estado?: SortOrder
    tipo?: SortOrder
    total?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PedidoCountOrderByAggregateInput
    _avg?: PedidoAvgOrderByAggregateInput
    _max?: PedidoMaxOrderByAggregateInput
    _min?: PedidoMinOrderByAggregateInput
    _sum?: PedidoSumOrderByAggregateInput
  }

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    OR?: PedidoScalarWhereWithAggregatesInput[]
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pedido"> | string
    clienteId?: StringWithAggregatesFilter<"Pedido"> | string
    fecha?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    fechaEntrega?: DateTimeNullableWithAggregatesFilter<"Pedido"> | Date | string | null
    estado?: EnumEstadoPedidoWithAggregatesFilter<"Pedido"> | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoWithAggregatesFilter<"Pedido"> | $Enums.TipoPedido
    total?: DecimalWithAggregatesFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableWithAggregatesFilter<"Pedido"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
  }

  export type PedidoItemWhereInput = {
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    id?: StringFilter<"PedidoItem"> | string
    nombre?: StringNullableFilter<"PedidoItem"> | string | null
    pedidoId?: StringFilter<"PedidoItem"> | string
    productoId?: StringFilter<"PedidoItem"> | string
    cantidad?: IntFilter<"PedidoItem"> | number
    precioUnitario?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    pedido?: XOR<PedidoRelationFilter, PedidoWhereInput>
  }

  export type PedidoItemOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    pedidoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PedidoItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PedidoItemWhereInput | PedidoItemWhereInput[]
    OR?: PedidoItemWhereInput[]
    NOT?: PedidoItemWhereInput | PedidoItemWhereInput[]
    nombre?: StringNullableFilter<"PedidoItem"> | string | null
    pedidoId?: StringFilter<"PedidoItem"> | string
    productoId?: StringFilter<"PedidoItem"> | string
    cantidad?: IntFilter<"PedidoItem"> | number
    precioUnitario?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    pedido?: XOR<PedidoRelationFilter, PedidoWhereInput>
  }, "id">

  export type PedidoItemOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    pedidoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    _count?: PedidoItemCountOrderByAggregateInput
    _avg?: PedidoItemAvgOrderByAggregateInput
    _max?: PedidoItemMaxOrderByAggregateInput
    _min?: PedidoItemMinOrderByAggregateInput
    _sum?: PedidoItemSumOrderByAggregateInput
  }

  export type PedidoItemScalarWhereWithAggregatesInput = {
    AND?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    OR?: PedidoItemScalarWhereWithAggregatesInput[]
    NOT?: PedidoItemScalarWhereWithAggregatesInput | PedidoItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PedidoItem"> | string
    nombre?: StringNullableWithAggregatesFilter<"PedidoItem"> | string | null
    pedidoId?: StringWithAggregatesFilter<"PedidoItem"> | string
    productoId?: StringWithAggregatesFilter<"PedidoItem"> | string
    cantidad?: IntWithAggregatesFilter<"PedidoItem"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalWithAggregatesFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
  }

  export type MesaWhereInput = {
    AND?: MesaWhereInput | MesaWhereInput[]
    OR?: MesaWhereInput[]
    NOT?: MesaWhereInput | MesaWhereInput[]
    id?: IntFilter<"Mesa"> | number
    numero?: IntFilter<"Mesa"> | number
    estado?: EnumEstadoMesaFilter<"Mesa"> | $Enums.EstadoMesa
    activo?: BoolFilter<"Mesa"> | boolean
    comandas?: ComandaListRelationFilter
  }

  export type MesaOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    activo?: SortOrder
    comandas?: ComandaOrderByRelationAggregateInput
  }

  export type MesaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    numero?: number
    AND?: MesaWhereInput | MesaWhereInput[]
    OR?: MesaWhereInput[]
    NOT?: MesaWhereInput | MesaWhereInput[]
    estado?: EnumEstadoMesaFilter<"Mesa"> | $Enums.EstadoMesa
    activo?: BoolFilter<"Mesa"> | boolean
    comandas?: ComandaListRelationFilter
  }, "id" | "numero">

  export type MesaOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    activo?: SortOrder
    _count?: MesaCountOrderByAggregateInput
    _avg?: MesaAvgOrderByAggregateInput
    _max?: MesaMaxOrderByAggregateInput
    _min?: MesaMinOrderByAggregateInput
    _sum?: MesaSumOrderByAggregateInput
  }

  export type MesaScalarWhereWithAggregatesInput = {
    AND?: MesaScalarWhereWithAggregatesInput | MesaScalarWhereWithAggregatesInput[]
    OR?: MesaScalarWhereWithAggregatesInput[]
    NOT?: MesaScalarWhereWithAggregatesInput | MesaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mesa"> | number
    numero?: IntWithAggregatesFilter<"Mesa"> | number
    estado?: EnumEstadoMesaWithAggregatesFilter<"Mesa"> | $Enums.EstadoMesa
    activo?: BoolWithAggregatesFilter<"Mesa"> | boolean
  }

  export type ComandaWhereInput = {
    AND?: ComandaWhereInput | ComandaWhereInput[]
    OR?: ComandaWhereInput[]
    NOT?: ComandaWhereInput | ComandaWhereInput[]
    id?: StringFilter<"Comanda"> | string
    mesaId?: IntFilter<"Comanda"> | number
    fechaApertura?: DateTimeFilter<"Comanda"> | Date | string
    fechaCierre?: DateTimeNullableFilter<"Comanda"> | Date | string | null
    estado?: EnumEstadoComandaFilter<"Comanda"> | $Enums.EstadoComanda
    total?: DecimalFilter<"Comanda"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Comanda"> | string | null
    createdAt?: DateTimeFilter<"Comanda"> | Date | string
    updatedAt?: DateTimeFilter<"Comanda"> | Date | string
    mesa?: XOR<MesaRelationFilter, MesaWhereInput>
    items?: ComandaItemListRelationFilter
  }

  export type ComandaOrderByWithRelationInput = {
    id?: SortOrder
    mesaId?: SortOrder
    fechaApertura?: SortOrder
    fechaCierre?: SortOrderInput | SortOrder
    estado?: SortOrder
    total?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mesa?: MesaOrderByWithRelationInput
    items?: ComandaItemOrderByRelationAggregateInput
  }

  export type ComandaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComandaWhereInput | ComandaWhereInput[]
    OR?: ComandaWhereInput[]
    NOT?: ComandaWhereInput | ComandaWhereInput[]
    mesaId?: IntFilter<"Comanda"> | number
    fechaApertura?: DateTimeFilter<"Comanda"> | Date | string
    fechaCierre?: DateTimeNullableFilter<"Comanda"> | Date | string | null
    estado?: EnumEstadoComandaFilter<"Comanda"> | $Enums.EstadoComanda
    total?: DecimalFilter<"Comanda"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Comanda"> | string | null
    createdAt?: DateTimeFilter<"Comanda"> | Date | string
    updatedAt?: DateTimeFilter<"Comanda"> | Date | string
    mesa?: XOR<MesaRelationFilter, MesaWhereInput>
    items?: ComandaItemListRelationFilter
  }, "id">

  export type ComandaOrderByWithAggregationInput = {
    id?: SortOrder
    mesaId?: SortOrder
    fechaApertura?: SortOrder
    fechaCierre?: SortOrderInput | SortOrder
    estado?: SortOrder
    total?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComandaCountOrderByAggregateInput
    _avg?: ComandaAvgOrderByAggregateInput
    _max?: ComandaMaxOrderByAggregateInput
    _min?: ComandaMinOrderByAggregateInput
    _sum?: ComandaSumOrderByAggregateInput
  }

  export type ComandaScalarWhereWithAggregatesInput = {
    AND?: ComandaScalarWhereWithAggregatesInput | ComandaScalarWhereWithAggregatesInput[]
    OR?: ComandaScalarWhereWithAggregatesInput[]
    NOT?: ComandaScalarWhereWithAggregatesInput | ComandaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comanda"> | string
    mesaId?: IntWithAggregatesFilter<"Comanda"> | number
    fechaApertura?: DateTimeWithAggregatesFilter<"Comanda"> | Date | string
    fechaCierre?: DateTimeNullableWithAggregatesFilter<"Comanda"> | Date | string | null
    estado?: EnumEstadoComandaWithAggregatesFilter<"Comanda"> | $Enums.EstadoComanda
    total?: DecimalWithAggregatesFilter<"Comanda"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableWithAggregatesFilter<"Comanda"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Comanda"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comanda"> | Date | string
  }

  export type ComandaItemWhereInput = {
    AND?: ComandaItemWhereInput | ComandaItemWhereInput[]
    OR?: ComandaItemWhereInput[]
    NOT?: ComandaItemWhereInput | ComandaItemWhereInput[]
    id?: StringFilter<"ComandaItem"> | string
    comandaId?: StringFilter<"ComandaItem"> | string
    productoId?: StringFilter<"ComandaItem"> | string
    nombre?: StringNullableFilter<"ComandaItem"> | string | null
    cantidad?: IntFilter<"ComandaItem"> | number
    precioUnitario?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"ComandaItem"> | boolean
    estado?: EnumEstadoItemComandaFilter<"ComandaItem"> | $Enums.EstadoItemComanda
    createdAt?: DateTimeFilter<"ComandaItem"> | Date | string
    comanda?: XOR<ComandaRelationFilter, ComandaWhereInput>
  }

  export type ComandaItemOrderByWithRelationInput = {
    id?: SortOrder
    comandaId?: SortOrder
    productoId?: SortOrder
    nombre?: SortOrderInput | SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    comanda?: ComandaOrderByWithRelationInput
  }

  export type ComandaItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComandaItemWhereInput | ComandaItemWhereInput[]
    OR?: ComandaItemWhereInput[]
    NOT?: ComandaItemWhereInput | ComandaItemWhereInput[]
    comandaId?: StringFilter<"ComandaItem"> | string
    productoId?: StringFilter<"ComandaItem"> | string
    nombre?: StringNullableFilter<"ComandaItem"> | string | null
    cantidad?: IntFilter<"ComandaItem"> | number
    precioUnitario?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"ComandaItem"> | boolean
    estado?: EnumEstadoItemComandaFilter<"ComandaItem"> | $Enums.EstadoItemComanda
    createdAt?: DateTimeFilter<"ComandaItem"> | Date | string
    comanda?: XOR<ComandaRelationFilter, ComandaWhereInput>
  }, "id">

  export type ComandaItemOrderByWithAggregationInput = {
    id?: SortOrder
    comandaId?: SortOrder
    productoId?: SortOrder
    nombre?: SortOrderInput | SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    _count?: ComandaItemCountOrderByAggregateInput
    _avg?: ComandaItemAvgOrderByAggregateInput
    _max?: ComandaItemMaxOrderByAggregateInput
    _min?: ComandaItemMinOrderByAggregateInput
    _sum?: ComandaItemSumOrderByAggregateInput
  }

  export type ComandaItemScalarWhereWithAggregatesInput = {
    AND?: ComandaItemScalarWhereWithAggregatesInput | ComandaItemScalarWhereWithAggregatesInput[]
    OR?: ComandaItemScalarWhereWithAggregatesInput[]
    NOT?: ComandaItemScalarWhereWithAggregatesInput | ComandaItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComandaItem"> | string
    comandaId?: StringWithAggregatesFilter<"ComandaItem"> | string
    productoId?: StringWithAggregatesFilter<"ComandaItem"> | string
    nombre?: StringNullableWithAggregatesFilter<"ComandaItem"> | string | null
    cantidad?: IntWithAggregatesFilter<"ComandaItem"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalWithAggregatesFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolWithAggregatesFilter<"ComandaItem"> | boolean
    estado?: EnumEstadoItemComandaWithAggregatesFilter<"ComandaItem"> | $Enums.EstadoItemComanda
    createdAt?: DateTimeWithAggregatesFilter<"ComandaItem"> | Date | string
  }

  export type VentaPOSWhereInput = {
    AND?: VentaPOSWhereInput | VentaPOSWhereInput[]
    OR?: VentaPOSWhereInput[]
    NOT?: VentaPOSWhereInput | VentaPOSWhereInput[]
    id?: StringFilter<"VentaPOS"> | string
    clienteId?: StringNullableFilter<"VentaPOS"> | string | null
    fecha?: DateTimeFilter<"VentaPOS"> | Date | string
    total?: DecimalFilter<"VentaPOS"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"VentaPOS"> | $Enums.MetodoPago
    observacion?: StringNullableFilter<"VentaPOS"> | string | null
    createdAt?: DateTimeFilter<"VentaPOS"> | Date | string
    cliente?: XOR<ClienteNullableRelationFilter, ClienteWhereInput> | null
    items?: VentaPOSItemListRelationFilter
  }

  export type VentaPOSOrderByWithRelationInput = {
    id?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    fecha?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    items?: VentaPOSItemOrderByRelationAggregateInput
  }

  export type VentaPOSWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VentaPOSWhereInput | VentaPOSWhereInput[]
    OR?: VentaPOSWhereInput[]
    NOT?: VentaPOSWhereInput | VentaPOSWhereInput[]
    clienteId?: StringNullableFilter<"VentaPOS"> | string | null
    fecha?: DateTimeFilter<"VentaPOS"> | Date | string
    total?: DecimalFilter<"VentaPOS"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"VentaPOS"> | $Enums.MetodoPago
    observacion?: StringNullableFilter<"VentaPOS"> | string | null
    createdAt?: DateTimeFilter<"VentaPOS"> | Date | string
    cliente?: XOR<ClienteNullableRelationFilter, ClienteWhereInput> | null
    items?: VentaPOSItemListRelationFilter
  }, "id">

  export type VentaPOSOrderByWithAggregationInput = {
    id?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    fecha?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    observacion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VentaPOSCountOrderByAggregateInput
    _avg?: VentaPOSAvgOrderByAggregateInput
    _max?: VentaPOSMaxOrderByAggregateInput
    _min?: VentaPOSMinOrderByAggregateInput
    _sum?: VentaPOSSumOrderByAggregateInput
  }

  export type VentaPOSScalarWhereWithAggregatesInput = {
    AND?: VentaPOSScalarWhereWithAggregatesInput | VentaPOSScalarWhereWithAggregatesInput[]
    OR?: VentaPOSScalarWhereWithAggregatesInput[]
    NOT?: VentaPOSScalarWhereWithAggregatesInput | VentaPOSScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VentaPOS"> | string
    clienteId?: StringNullableWithAggregatesFilter<"VentaPOS"> | string | null
    fecha?: DateTimeWithAggregatesFilter<"VentaPOS"> | Date | string
    total?: DecimalWithAggregatesFilter<"VentaPOS"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoWithAggregatesFilter<"VentaPOS"> | $Enums.MetodoPago
    observacion?: StringNullableWithAggregatesFilter<"VentaPOS"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VentaPOS"> | Date | string
  }

  export type VentaPOSItemWhereInput = {
    AND?: VentaPOSItemWhereInput | VentaPOSItemWhereInput[]
    OR?: VentaPOSItemWhereInput[]
    NOT?: VentaPOSItemWhereInput | VentaPOSItemWhereInput[]
    id?: StringFilter<"VentaPOSItem"> | string
    nombre?: StringNullableFilter<"VentaPOSItem"> | string | null
    ventaPOSId?: StringFilter<"VentaPOSItem"> | string
    productoId?: StringFilter<"VentaPOSItem"> | string
    cantidad?: IntFilter<"VentaPOSItem"> | number
    precioUnitario?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"VentaPOSItem"> | boolean
    ventaPOS?: XOR<VentaPOSRelationFilter, VentaPOSWhereInput>
  }

  export type VentaPOSItemOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    ventaPOSId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    ventaPOS?: VentaPOSOrderByWithRelationInput
  }

  export type VentaPOSItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VentaPOSItemWhereInput | VentaPOSItemWhereInput[]
    OR?: VentaPOSItemWhereInput[]
    NOT?: VentaPOSItemWhereInput | VentaPOSItemWhereInput[]
    nombre?: StringNullableFilter<"VentaPOSItem"> | string | null
    ventaPOSId?: StringFilter<"VentaPOSItem"> | string
    productoId?: StringFilter<"VentaPOSItem"> | string
    cantidad?: IntFilter<"VentaPOSItem"> | number
    precioUnitario?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"VentaPOSItem"> | boolean
    ventaPOS?: XOR<VentaPOSRelationFilter, VentaPOSWhereInput>
  }, "id">

  export type VentaPOSItemOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    ventaPOSId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    _count?: VentaPOSItemCountOrderByAggregateInput
    _avg?: VentaPOSItemAvgOrderByAggregateInput
    _max?: VentaPOSItemMaxOrderByAggregateInput
    _min?: VentaPOSItemMinOrderByAggregateInput
    _sum?: VentaPOSItemSumOrderByAggregateInput
  }

  export type VentaPOSItemScalarWhereWithAggregatesInput = {
    AND?: VentaPOSItemScalarWhereWithAggregatesInput | VentaPOSItemScalarWhereWithAggregatesInput[]
    OR?: VentaPOSItemScalarWhereWithAggregatesInput[]
    NOT?: VentaPOSItemScalarWhereWithAggregatesInput | VentaPOSItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VentaPOSItem"> | string
    nombre?: StringNullableWithAggregatesFilter<"VentaPOSItem"> | string | null
    ventaPOSId?: StringWithAggregatesFilter<"VentaPOSItem"> | string
    productoId?: StringWithAggregatesFilter<"VentaPOSItem"> | string
    cantidad?: IntWithAggregatesFilter<"VentaPOSItem"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalWithAggregatesFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolWithAggregatesFilter<"VentaPOSItem"> | boolean
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    usuario?: StringFilter<"AuditLog"> | string
    accion?: StringFilter<"AuditLog"> | string
    entidad?: StringFilter<"AuditLog"> | string
    entidadId?: StringFilter<"AuditLog"> | string
    antes?: JsonNullableFilter<"AuditLog">
    despues?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    usuario?: SortOrder
    accion?: SortOrder
    entidad?: SortOrder
    entidadId?: SortOrder
    antes?: SortOrderInput | SortOrder
    despues?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    usuario?: StringFilter<"AuditLog"> | string
    accion?: StringFilter<"AuditLog"> | string
    entidad?: StringFilter<"AuditLog"> | string
    entidadId?: StringFilter<"AuditLog"> | string
    antes?: JsonNullableFilter<"AuditLog">
    despues?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    usuario?: SortOrder
    accion?: SortOrder
    entidad?: SortOrder
    entidadId?: SortOrder
    antes?: SortOrderInput | SortOrder
    despues?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    usuario?: StringWithAggregatesFilter<"AuditLog"> | string
    accion?: StringWithAggregatesFilter<"AuditLog"> | string
    entidad?: StringWithAggregatesFilter<"AuditLog"> | string
    entidadId?: StringWithAggregatesFilter<"AuditLog"> | string
    antes?: JsonNullableWithAggregatesFilter<"AuditLog">
    despues?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ClienteCreateInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pedidos?: PedidoCreateNestedManyWithoutClienteInput
    ventasPOS?: VentaPOSCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutClienteInput
    ventasPOS?: VentaPOSUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUpdateManyWithoutClienteNestedInput
    ventasPOS?: VentaPOSUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUncheckedUpdateManyWithoutClienteNestedInput
    ventasPOS?: VentaPOSUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoCreateInput = {
    id?: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutPedidosInput
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateInput = {
    id?: string
    clienteId: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutPedidosNestedInput
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoCreateManyInput = {
    id?: string
    clienteId: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    pedido: PedidoCreateNestedOneWithoutItemsInput
  }

  export type PedidoItemUncheckedCreateInput = {
    id?: string
    nombre?: string | null
    pedidoId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pedido?: PedidoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PedidoItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    pedidoId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemCreateManyInput = {
    id?: string
    nombre?: string | null
    pedidoId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    pedidoId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type MesaCreateInput = {
    numero: number
    estado?: $Enums.EstadoMesa
    activo?: boolean
    comandas?: ComandaCreateNestedManyWithoutMesaInput
  }

  export type MesaUncheckedCreateInput = {
    id?: number
    numero: number
    estado?: $Enums.EstadoMesa
    activo?: boolean
    comandas?: ComandaUncheckedCreateNestedManyWithoutMesaInput
  }

  export type MesaUpdateInput = {
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
    comandas?: ComandaUpdateManyWithoutMesaNestedInput
  }

  export type MesaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
    comandas?: ComandaUncheckedUpdateManyWithoutMesaNestedInput
  }

  export type MesaCreateManyInput = {
    id?: number
    numero: number
    estado?: $Enums.EstadoMesa
    activo?: boolean
  }

  export type MesaUpdateManyMutationInput = {
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MesaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaCreateInput = {
    id?: string
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mesa: MesaCreateNestedOneWithoutComandasInput
    items?: ComandaItemCreateNestedManyWithoutComandaInput
  }

  export type ComandaUncheckedCreateInput = {
    id?: string
    mesaId: number
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ComandaItemUncheckedCreateNestedManyWithoutComandaInput
  }

  export type ComandaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mesa?: MesaUpdateOneRequiredWithoutComandasNestedInput
    items?: ComandaItemUpdateManyWithoutComandaNestedInput
  }

  export type ComandaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mesaId?: IntFieldUpdateOperationsInput | number
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ComandaItemUncheckedUpdateManyWithoutComandaNestedInput
  }

  export type ComandaCreateManyInput = {
    id?: string
    mesaId: number
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComandaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mesaId?: IntFieldUpdateOperationsInput | number
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemCreateInput = {
    id?: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
    comanda: ComandaCreateNestedOneWithoutItemsInput
  }

  export type ComandaItemUncheckedCreateInput = {
    id?: string
    comandaId: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
  }

  export type ComandaItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comanda?: ComandaUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ComandaItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comandaId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemCreateManyInput = {
    id?: string
    comandaId: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
  }

  export type ComandaItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    comandaId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaPOSCreateInput = {
    id?: string
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutVentasPOSInput
    items?: VentaPOSItemCreateNestedManyWithoutVentaPOSInput
  }

  export type VentaPOSUncheckedCreateInput = {
    id?: string
    clienteId?: string | null
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
    items?: VentaPOSItemUncheckedCreateNestedManyWithoutVentaPOSInput
  }

  export type VentaPOSUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutVentasPOSNestedInput
    items?: VentaPOSItemUpdateManyWithoutVentaPOSNestedInput
  }

  export type VentaPOSUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VentaPOSItemUncheckedUpdateManyWithoutVentaPOSNestedInput
  }

  export type VentaPOSCreateManyInput = {
    id?: string
    clienteId?: string | null
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
  }

  export type VentaPOSUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaPOSUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaPOSItemCreateInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    ventaPOS: VentaPOSCreateNestedOneWithoutItemsInput
  }

  export type VentaPOSItemUncheckedCreateInput = {
    id?: string
    nombre?: string | null
    ventaPOSId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
  }

  export type VentaPOSItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    ventaPOS?: VentaPOSUpdateOneRequiredWithoutItemsNestedInput
  }

  export type VentaPOSItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ventaPOSId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VentaPOSItemCreateManyInput = {
    id?: string
    nombre?: string | null
    ventaPOSId: string
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
  }

  export type VentaPOSItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VentaPOSItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ventaPOSId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuditLogCreateInput = {
    id?: string
    usuario?: string
    accion: string
    entidad: string
    entidadId: string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    usuario?: string
    accion: string
    entidad: string
    entidadId: string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    entidad?: StringFieldUpdateOperationsInput | string
    entidadId?: StringFieldUpdateOperationsInput | string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    entidad?: StringFieldUpdateOperationsInput | string
    entidadId?: StringFieldUpdateOperationsInput | string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    usuario?: string
    accion: string
    entidad: string
    entidadId: string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    entidad?: StringFieldUpdateOperationsInput | string
    entidadId?: StringFieldUpdateOperationsInput | string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    entidad?: StringFieldUpdateOperationsInput | string
    entidadId?: StringFieldUpdateOperationsInput | string
    antes?: NullableJsonNullValueInput | InputJsonValue
    despues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PedidoListRelationFilter = {
    every?: PedidoWhereInput
    some?: PedidoWhereInput
    none?: PedidoWhereInput
  }

  export type VentaPOSListRelationFilter = {
    every?: VentaPOSWhereInput
    some?: VentaPOSWhereInput
    none?: VentaPOSWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VentaPOSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type EnumTipoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPedido | EnumTipoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPedidoFilter<$PrismaModel> | $Enums.TipoPedido
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ClienteRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type PedidoItemListRelationFilter = {
    every?: PedidoItemWhereInput
    some?: PedidoItemWhereInput
    none?: PedidoItemWhereInput
  }

  export type PedidoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoCountOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    fechaEntrega?: SortOrder
    estado?: SortOrder
    tipo?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type PedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    fechaEntrega?: SortOrder
    estado?: SortOrder
    tipo?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoMinOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    fechaEntrega?: SortOrder
    estado?: SortOrder
    tipo?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }

  export type EnumTipoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPedido | EnumTipoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.TipoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoPedidoFilter<$PrismaModel>
    _max?: NestedEnumTipoPedidoFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PedidoRelationFilter = {
    is?: PedidoWhereInput
    isNot?: PedidoWhereInput
  }

  export type PedidoItemCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    pedidoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type PedidoItemAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type PedidoItemMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    pedidoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type PedidoItemMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    pedidoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type PedidoItemSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumEstadoMesaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMesa | EnumEstadoMesaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMesaFilter<$PrismaModel> | $Enums.EstadoMesa
  }

  export type ComandaListRelationFilter = {
    every?: ComandaWhereInput
    some?: ComandaWhereInput
    none?: ComandaWhereInput
  }

  export type ComandaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MesaCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    activo?: SortOrder
  }

  export type MesaAvgOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
  }

  export type MesaMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    activo?: SortOrder
  }

  export type MesaMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    estado?: SortOrder
    activo?: SortOrder
  }

  export type MesaSumOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
  }

  export type EnumEstadoMesaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMesa | EnumEstadoMesaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMesaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoMesa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoMesaFilter<$PrismaModel>
    _max?: NestedEnumEstadoMesaFilter<$PrismaModel>
  }

  export type EnumEstadoComandaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoComanda | EnumEstadoComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoComandaFilter<$PrismaModel> | $Enums.EstadoComanda
  }

  export type MesaRelationFilter = {
    is?: MesaWhereInput
    isNot?: MesaWhereInput
  }

  export type ComandaItemListRelationFilter = {
    every?: ComandaItemWhereInput
    some?: ComandaItemWhereInput
    none?: ComandaItemWhereInput
  }

  export type ComandaItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComandaCountOrderByAggregateInput = {
    id?: SortOrder
    mesaId?: SortOrder
    fechaApertura?: SortOrder
    fechaCierre?: SortOrder
    estado?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComandaAvgOrderByAggregateInput = {
    mesaId?: SortOrder
    total?: SortOrder
  }

  export type ComandaMaxOrderByAggregateInput = {
    id?: SortOrder
    mesaId?: SortOrder
    fechaApertura?: SortOrder
    fechaCierre?: SortOrder
    estado?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComandaMinOrderByAggregateInput = {
    id?: SortOrder
    mesaId?: SortOrder
    fechaApertura?: SortOrder
    fechaCierre?: SortOrder
    estado?: SortOrder
    total?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComandaSumOrderByAggregateInput = {
    mesaId?: SortOrder
    total?: SortOrder
  }

  export type EnumEstadoComandaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoComanda | EnumEstadoComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoComandaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoComanda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoComandaFilter<$PrismaModel>
    _max?: NestedEnumEstadoComandaFilter<$PrismaModel>
  }

  export type EnumEstadoItemComandaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoItemComanda | EnumEstadoItemComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoItemComandaFilter<$PrismaModel> | $Enums.EstadoItemComanda
  }

  export type ComandaRelationFilter = {
    is?: ComandaWhereInput
    isNot?: ComandaWhereInput
  }

  export type ComandaItemCountOrderByAggregateInput = {
    id?: SortOrder
    comandaId?: SortOrder
    productoId?: SortOrder
    nombre?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type ComandaItemAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type ComandaItemMaxOrderByAggregateInput = {
    id?: SortOrder
    comandaId?: SortOrder
    productoId?: SortOrder
    nombre?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type ComandaItemMinOrderByAggregateInput = {
    id?: SortOrder
    comandaId?: SortOrder
    productoId?: SortOrder
    nombre?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type ComandaItemSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type EnumEstadoItemComandaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoItemComanda | EnumEstadoItemComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoItemComandaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoItemComanda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoItemComandaFilter<$PrismaModel>
    _max?: NestedEnumEstadoItemComandaFilter<$PrismaModel>
  }

  export type EnumMetodoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoFilter<$PrismaModel> | $Enums.MetodoPago
  }

  export type ClienteNullableRelationFilter = {
    is?: ClienteWhereInput | null
    isNot?: ClienteWhereInput | null
  }

  export type VentaPOSItemListRelationFilter = {
    every?: VentaPOSItemWhereInput
    some?: VentaPOSItemWhereInput
    none?: VentaPOSItemWhereInput
  }

  export type VentaPOSItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VentaPOSCountOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
  }

  export type VentaPOSAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type VentaPOSMaxOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
  }

  export type VentaPOSMinOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    observacion?: SortOrder
    createdAt?: SortOrder
  }

  export type VentaPOSSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type EnumMetodoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel> | $Enums.MetodoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMetodoPagoFilter<$PrismaModel>
    _max?: NestedEnumMetodoPagoFilter<$PrismaModel>
  }

  export type VentaPOSRelationFilter = {
    is?: VentaPOSWhereInput
    isNot?: VentaPOSWhereInput
  }

  export type VentaPOSItemCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ventaPOSId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
  }

  export type VentaPOSItemAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type VentaPOSItemMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ventaPOSId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
  }

  export type VentaPOSItemMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ventaPOSId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    esProductoPropio?: SortOrder
  }

  export type VentaPOSItemSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    accion?: SortOrder
    entidad?: SortOrder
    entidadId?: SortOrder
    antes?: SortOrder
    despues?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    accion?: SortOrder
    entidad?: SortOrder
    entidadId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    accion?: SortOrder
    entidad?: SortOrder
    entidadId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PedidoCreateNestedManyWithoutClienteInput = {
    create?: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput> | PedidoCreateWithoutClienteInput[] | PedidoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutClienteInput | PedidoCreateOrConnectWithoutClienteInput[]
    createMany?: PedidoCreateManyClienteInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type VentaPOSCreateNestedManyWithoutClienteInput = {
    create?: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput> | VentaPOSCreateWithoutClienteInput[] | VentaPOSUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaPOSCreateOrConnectWithoutClienteInput | VentaPOSCreateOrConnectWithoutClienteInput[]
    createMany?: VentaPOSCreateManyClienteInputEnvelope
    connect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput> | PedidoCreateWithoutClienteInput[] | PedidoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutClienteInput | PedidoCreateOrConnectWithoutClienteInput[]
    createMany?: PedidoCreateManyClienteInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type VentaPOSUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput> | VentaPOSCreateWithoutClienteInput[] | VentaPOSUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaPOSCreateOrConnectWithoutClienteInput | VentaPOSCreateOrConnectWithoutClienteInput[]
    createMany?: VentaPOSCreateManyClienteInputEnvelope
    connect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PedidoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput> | PedidoCreateWithoutClienteInput[] | PedidoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutClienteInput | PedidoCreateOrConnectWithoutClienteInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutClienteInput | PedidoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PedidoCreateManyClienteInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutClienteInput | PedidoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutClienteInput | PedidoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type VentaPOSUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput> | VentaPOSCreateWithoutClienteInput[] | VentaPOSUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaPOSCreateOrConnectWithoutClienteInput | VentaPOSCreateOrConnectWithoutClienteInput[]
    upsert?: VentaPOSUpsertWithWhereUniqueWithoutClienteInput | VentaPOSUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VentaPOSCreateManyClienteInputEnvelope
    set?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    disconnect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    delete?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    connect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    update?: VentaPOSUpdateWithWhereUniqueWithoutClienteInput | VentaPOSUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VentaPOSUpdateManyWithWhereWithoutClienteInput | VentaPOSUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VentaPOSScalarWhereInput | VentaPOSScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput> | PedidoCreateWithoutClienteInput[] | PedidoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutClienteInput | PedidoCreateOrConnectWithoutClienteInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutClienteInput | PedidoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PedidoCreateManyClienteInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutClienteInput | PedidoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutClienteInput | PedidoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type VentaPOSUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput> | VentaPOSCreateWithoutClienteInput[] | VentaPOSUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaPOSCreateOrConnectWithoutClienteInput | VentaPOSCreateOrConnectWithoutClienteInput[]
    upsert?: VentaPOSUpsertWithWhereUniqueWithoutClienteInput | VentaPOSUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VentaPOSCreateManyClienteInputEnvelope
    set?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    disconnect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    delete?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    connect?: VentaPOSWhereUniqueInput | VentaPOSWhereUniqueInput[]
    update?: VentaPOSUpdateWithWhereUniqueWithoutClienteInput | VentaPOSUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VentaPOSUpdateManyWithWhereWithoutClienteInput | VentaPOSUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VentaPOSScalarWhereInput | VentaPOSScalarWhereInput[]
  }

  export type ClienteCreateNestedOneWithoutPedidosInput = {
    create?: XOR<ClienteCreateWithoutPedidosInput, ClienteUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPedidosInput
    connect?: ClienteWhereUniqueInput
  }

  export type PedidoItemCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type PedidoItemUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumEstadoPedidoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPedido
  }

  export type EnumTipoPedidoFieldUpdateOperationsInput = {
    set?: $Enums.TipoPedido
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ClienteUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<ClienteCreateWithoutPedidosInput, ClienteUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPedidosInput
    upsert?: ClienteUpsertWithoutPedidosInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutPedidosInput, ClienteUpdateWithoutPedidosInput>, ClienteUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoItemUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput> | PedidoItemCreateWithoutPedidoInput[] | PedidoItemUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoItemCreateOrConnectWithoutPedidoInput | PedidoItemCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoItemUpsertWithWhereUniqueWithoutPedidoInput | PedidoItemUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoItemCreateManyPedidoInputEnvelope
    set?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    disconnect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    delete?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    connect?: PedidoItemWhereUniqueInput | PedidoItemWhereUniqueInput[]
    update?: PedidoItemUpdateWithWhereUniqueWithoutPedidoInput | PedidoItemUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoItemUpdateManyWithWhereWithoutPedidoInput | PedidoItemUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutItemsInput = {
    create?: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItemsInput
    connect?: PedidoWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PedidoUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutItemsInput
    upsert?: PedidoUpsertWithoutItemsInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutItemsInput, PedidoUpdateWithoutItemsInput>, PedidoUncheckedUpdateWithoutItemsInput>
  }

  export type ComandaCreateNestedManyWithoutMesaInput = {
    create?: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput> | ComandaCreateWithoutMesaInput[] | ComandaUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandaCreateOrConnectWithoutMesaInput | ComandaCreateOrConnectWithoutMesaInput[]
    createMany?: ComandaCreateManyMesaInputEnvelope
    connect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
  }

  export type ComandaUncheckedCreateNestedManyWithoutMesaInput = {
    create?: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput> | ComandaCreateWithoutMesaInput[] | ComandaUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandaCreateOrConnectWithoutMesaInput | ComandaCreateOrConnectWithoutMesaInput[]
    createMany?: ComandaCreateManyMesaInputEnvelope
    connect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
  }

  export type EnumEstadoMesaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoMesa
  }

  export type ComandaUpdateManyWithoutMesaNestedInput = {
    create?: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput> | ComandaCreateWithoutMesaInput[] | ComandaUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandaCreateOrConnectWithoutMesaInput | ComandaCreateOrConnectWithoutMesaInput[]
    upsert?: ComandaUpsertWithWhereUniqueWithoutMesaInput | ComandaUpsertWithWhereUniqueWithoutMesaInput[]
    createMany?: ComandaCreateManyMesaInputEnvelope
    set?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    disconnect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    delete?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    connect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    update?: ComandaUpdateWithWhereUniqueWithoutMesaInput | ComandaUpdateWithWhereUniqueWithoutMesaInput[]
    updateMany?: ComandaUpdateManyWithWhereWithoutMesaInput | ComandaUpdateManyWithWhereWithoutMesaInput[]
    deleteMany?: ComandaScalarWhereInput | ComandaScalarWhereInput[]
  }

  export type ComandaUncheckedUpdateManyWithoutMesaNestedInput = {
    create?: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput> | ComandaCreateWithoutMesaInput[] | ComandaUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandaCreateOrConnectWithoutMesaInput | ComandaCreateOrConnectWithoutMesaInput[]
    upsert?: ComandaUpsertWithWhereUniqueWithoutMesaInput | ComandaUpsertWithWhereUniqueWithoutMesaInput[]
    createMany?: ComandaCreateManyMesaInputEnvelope
    set?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    disconnect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    delete?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    connect?: ComandaWhereUniqueInput | ComandaWhereUniqueInput[]
    update?: ComandaUpdateWithWhereUniqueWithoutMesaInput | ComandaUpdateWithWhereUniqueWithoutMesaInput[]
    updateMany?: ComandaUpdateManyWithWhereWithoutMesaInput | ComandaUpdateManyWithWhereWithoutMesaInput[]
    deleteMany?: ComandaScalarWhereInput | ComandaScalarWhereInput[]
  }

  export type MesaCreateNestedOneWithoutComandasInput = {
    create?: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MesaCreateOrConnectWithoutComandasInput
    connect?: MesaWhereUniqueInput
  }

  export type ComandaItemCreateNestedManyWithoutComandaInput = {
    create?: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput> | ComandaItemCreateWithoutComandaInput[] | ComandaItemUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: ComandaItemCreateOrConnectWithoutComandaInput | ComandaItemCreateOrConnectWithoutComandaInput[]
    createMany?: ComandaItemCreateManyComandaInputEnvelope
    connect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
  }

  export type ComandaItemUncheckedCreateNestedManyWithoutComandaInput = {
    create?: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput> | ComandaItemCreateWithoutComandaInput[] | ComandaItemUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: ComandaItemCreateOrConnectWithoutComandaInput | ComandaItemCreateOrConnectWithoutComandaInput[]
    createMany?: ComandaItemCreateManyComandaInputEnvelope
    connect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
  }

  export type EnumEstadoComandaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoComanda
  }

  export type MesaUpdateOneRequiredWithoutComandasNestedInput = {
    create?: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MesaCreateOrConnectWithoutComandasInput
    upsert?: MesaUpsertWithoutComandasInput
    connect?: MesaWhereUniqueInput
    update?: XOR<XOR<MesaUpdateToOneWithWhereWithoutComandasInput, MesaUpdateWithoutComandasInput>, MesaUncheckedUpdateWithoutComandasInput>
  }

  export type ComandaItemUpdateManyWithoutComandaNestedInput = {
    create?: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput> | ComandaItemCreateWithoutComandaInput[] | ComandaItemUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: ComandaItemCreateOrConnectWithoutComandaInput | ComandaItemCreateOrConnectWithoutComandaInput[]
    upsert?: ComandaItemUpsertWithWhereUniqueWithoutComandaInput | ComandaItemUpsertWithWhereUniqueWithoutComandaInput[]
    createMany?: ComandaItemCreateManyComandaInputEnvelope
    set?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    disconnect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    delete?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    connect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    update?: ComandaItemUpdateWithWhereUniqueWithoutComandaInput | ComandaItemUpdateWithWhereUniqueWithoutComandaInput[]
    updateMany?: ComandaItemUpdateManyWithWhereWithoutComandaInput | ComandaItemUpdateManyWithWhereWithoutComandaInput[]
    deleteMany?: ComandaItemScalarWhereInput | ComandaItemScalarWhereInput[]
  }

  export type ComandaItemUncheckedUpdateManyWithoutComandaNestedInput = {
    create?: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput> | ComandaItemCreateWithoutComandaInput[] | ComandaItemUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: ComandaItemCreateOrConnectWithoutComandaInput | ComandaItemCreateOrConnectWithoutComandaInput[]
    upsert?: ComandaItemUpsertWithWhereUniqueWithoutComandaInput | ComandaItemUpsertWithWhereUniqueWithoutComandaInput[]
    createMany?: ComandaItemCreateManyComandaInputEnvelope
    set?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    disconnect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    delete?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    connect?: ComandaItemWhereUniqueInput | ComandaItemWhereUniqueInput[]
    update?: ComandaItemUpdateWithWhereUniqueWithoutComandaInput | ComandaItemUpdateWithWhereUniqueWithoutComandaInput[]
    updateMany?: ComandaItemUpdateManyWithWhereWithoutComandaInput | ComandaItemUpdateManyWithWhereWithoutComandaInput[]
    deleteMany?: ComandaItemScalarWhereInput | ComandaItemScalarWhereInput[]
  }

  export type ComandaCreateNestedOneWithoutItemsInput = {
    create?: XOR<ComandaCreateWithoutItemsInput, ComandaUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ComandaCreateOrConnectWithoutItemsInput
    connect?: ComandaWhereUniqueInput
  }

  export type EnumEstadoItemComandaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoItemComanda
  }

  export type ComandaUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ComandaCreateWithoutItemsInput, ComandaUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ComandaCreateOrConnectWithoutItemsInput
    upsert?: ComandaUpsertWithoutItemsInput
    connect?: ComandaWhereUniqueInput
    update?: XOR<XOR<ComandaUpdateToOneWithWhereWithoutItemsInput, ComandaUpdateWithoutItemsInput>, ComandaUncheckedUpdateWithoutItemsInput>
  }

  export type ClienteCreateNestedOneWithoutVentasPOSInput = {
    create?: XOR<ClienteCreateWithoutVentasPOSInput, ClienteUncheckedCreateWithoutVentasPOSInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVentasPOSInput
    connect?: ClienteWhereUniqueInput
  }

  export type VentaPOSItemCreateNestedManyWithoutVentaPOSInput = {
    create?: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput> | VentaPOSItemCreateWithoutVentaPOSInput[] | VentaPOSItemUncheckedCreateWithoutVentaPOSInput[]
    connectOrCreate?: VentaPOSItemCreateOrConnectWithoutVentaPOSInput | VentaPOSItemCreateOrConnectWithoutVentaPOSInput[]
    createMany?: VentaPOSItemCreateManyVentaPOSInputEnvelope
    connect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
  }

  export type VentaPOSItemUncheckedCreateNestedManyWithoutVentaPOSInput = {
    create?: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput> | VentaPOSItemCreateWithoutVentaPOSInput[] | VentaPOSItemUncheckedCreateWithoutVentaPOSInput[]
    connectOrCreate?: VentaPOSItemCreateOrConnectWithoutVentaPOSInput | VentaPOSItemCreateOrConnectWithoutVentaPOSInput[]
    createMany?: VentaPOSItemCreateManyVentaPOSInputEnvelope
    connect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
  }

  export type EnumMetodoPagoFieldUpdateOperationsInput = {
    set?: $Enums.MetodoPago
  }

  export type ClienteUpdateOneWithoutVentasPOSNestedInput = {
    create?: XOR<ClienteCreateWithoutVentasPOSInput, ClienteUncheckedCreateWithoutVentasPOSInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVentasPOSInput
    upsert?: ClienteUpsertWithoutVentasPOSInput
    disconnect?: ClienteWhereInput | boolean
    delete?: ClienteWhereInput | boolean
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutVentasPOSInput, ClienteUpdateWithoutVentasPOSInput>, ClienteUncheckedUpdateWithoutVentasPOSInput>
  }

  export type VentaPOSItemUpdateManyWithoutVentaPOSNestedInput = {
    create?: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput> | VentaPOSItemCreateWithoutVentaPOSInput[] | VentaPOSItemUncheckedCreateWithoutVentaPOSInput[]
    connectOrCreate?: VentaPOSItemCreateOrConnectWithoutVentaPOSInput | VentaPOSItemCreateOrConnectWithoutVentaPOSInput[]
    upsert?: VentaPOSItemUpsertWithWhereUniqueWithoutVentaPOSInput | VentaPOSItemUpsertWithWhereUniqueWithoutVentaPOSInput[]
    createMany?: VentaPOSItemCreateManyVentaPOSInputEnvelope
    set?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    disconnect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    delete?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    connect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    update?: VentaPOSItemUpdateWithWhereUniqueWithoutVentaPOSInput | VentaPOSItemUpdateWithWhereUniqueWithoutVentaPOSInput[]
    updateMany?: VentaPOSItemUpdateManyWithWhereWithoutVentaPOSInput | VentaPOSItemUpdateManyWithWhereWithoutVentaPOSInput[]
    deleteMany?: VentaPOSItemScalarWhereInput | VentaPOSItemScalarWhereInput[]
  }

  export type VentaPOSItemUncheckedUpdateManyWithoutVentaPOSNestedInput = {
    create?: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput> | VentaPOSItemCreateWithoutVentaPOSInput[] | VentaPOSItemUncheckedCreateWithoutVentaPOSInput[]
    connectOrCreate?: VentaPOSItemCreateOrConnectWithoutVentaPOSInput | VentaPOSItemCreateOrConnectWithoutVentaPOSInput[]
    upsert?: VentaPOSItemUpsertWithWhereUniqueWithoutVentaPOSInput | VentaPOSItemUpsertWithWhereUniqueWithoutVentaPOSInput[]
    createMany?: VentaPOSItemCreateManyVentaPOSInputEnvelope
    set?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    disconnect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    delete?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    connect?: VentaPOSItemWhereUniqueInput | VentaPOSItemWhereUniqueInput[]
    update?: VentaPOSItemUpdateWithWhereUniqueWithoutVentaPOSInput | VentaPOSItemUpdateWithWhereUniqueWithoutVentaPOSInput[]
    updateMany?: VentaPOSItemUpdateManyWithWhereWithoutVentaPOSInput | VentaPOSItemUpdateManyWithWhereWithoutVentaPOSInput[]
    deleteMany?: VentaPOSItemScalarWhereInput | VentaPOSItemScalarWhereInput[]
  }

  export type VentaPOSCreateNestedOneWithoutItemsInput = {
    create?: XOR<VentaPOSCreateWithoutItemsInput, VentaPOSUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VentaPOSCreateOrConnectWithoutItemsInput
    connect?: VentaPOSWhereUniqueInput
  }

  export type VentaPOSUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<VentaPOSCreateWithoutItemsInput, VentaPOSUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VentaPOSCreateOrConnectWithoutItemsInput
    upsert?: VentaPOSUpsertWithoutItemsInput
    connect?: VentaPOSWhereUniqueInput
    update?: XOR<XOR<VentaPOSUpdateToOneWithWhereWithoutItemsInput, VentaPOSUpdateWithoutItemsInput>, VentaPOSUncheckedUpdateWithoutItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumEstadoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoFilter<$PrismaModel> | $Enums.EstadoPedido
  }

  export type NestedEnumTipoPedidoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPedido | EnumTipoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPedidoFilter<$PrismaModel> | $Enums.TipoPedido
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPedido | EnumEstadoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPedido[] | ListEnumEstadoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPedidoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPedidoFilter<$PrismaModel>
  }

  export type NestedEnumTipoPedidoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPedido | EnumTipoPedidoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoPedido[] | ListEnumTipoPedidoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoPedidoWithAggregatesFilter<$PrismaModel> | $Enums.TipoPedido
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoPedidoFilter<$PrismaModel>
    _max?: NestedEnumTipoPedidoFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEstadoMesaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMesa | EnumEstadoMesaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMesaFilter<$PrismaModel> | $Enums.EstadoMesa
  }

  export type NestedEnumEstadoMesaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMesa | EnumEstadoMesaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMesa[] | ListEnumEstadoMesaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMesaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoMesa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoMesaFilter<$PrismaModel>
    _max?: NestedEnumEstadoMesaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoComandaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoComanda | EnumEstadoComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoComandaFilter<$PrismaModel> | $Enums.EstadoComanda
  }

  export type NestedEnumEstadoComandaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoComanda | EnumEstadoComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoComanda[] | ListEnumEstadoComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoComandaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoComanda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoComandaFilter<$PrismaModel>
    _max?: NestedEnumEstadoComandaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoItemComandaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoItemComanda | EnumEstadoItemComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoItemComandaFilter<$PrismaModel> | $Enums.EstadoItemComanda
  }

  export type NestedEnumEstadoItemComandaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoItemComanda | EnumEstadoItemComandaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoItemComanda[] | ListEnumEstadoItemComandaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoItemComandaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoItemComanda
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoItemComandaFilter<$PrismaModel>
    _max?: NestedEnumEstadoItemComandaFilter<$PrismaModel>
  }

  export type NestedEnumMetodoPagoFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoFilter<$PrismaModel> | $Enums.MetodoPago
  }

  export type NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MetodoPago | EnumMetodoPagoFieldRefInput<$PrismaModel>
    in?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    notIn?: $Enums.MetodoPago[] | ListEnumMetodoPagoFieldRefInput<$PrismaModel>
    not?: NestedEnumMetodoPagoWithAggregatesFilter<$PrismaModel> | $Enums.MetodoPago
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMetodoPagoFilter<$PrismaModel>
    _max?: NestedEnumMetodoPagoFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PedidoCreateWithoutClienteInput = {
    id?: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutClienteInput = {
    id?: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PedidoItemUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutClienteInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput>
  }

  export type PedidoCreateManyClienteInputEnvelope = {
    data: PedidoCreateManyClienteInput | PedidoCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type VentaPOSCreateWithoutClienteInput = {
    id?: string
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
    items?: VentaPOSItemCreateNestedManyWithoutVentaPOSInput
  }

  export type VentaPOSUncheckedCreateWithoutClienteInput = {
    id?: string
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
    items?: VentaPOSItemUncheckedCreateNestedManyWithoutVentaPOSInput
  }

  export type VentaPOSCreateOrConnectWithoutClienteInput = {
    where: VentaPOSWhereUniqueInput
    create: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput>
  }

  export type VentaPOSCreateManyClienteInputEnvelope = {
    data: VentaPOSCreateManyClienteInput | VentaPOSCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type PedidoUpsertWithWhereUniqueWithoutClienteInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutClienteInput, PedidoUncheckedUpdateWithoutClienteInput>
    create: XOR<PedidoCreateWithoutClienteInput, PedidoUncheckedCreateWithoutClienteInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutClienteInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutClienteInput, PedidoUncheckedUpdateWithoutClienteInput>
  }

  export type PedidoUpdateManyWithWhereWithoutClienteInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutClienteInput>
  }

  export type PedidoScalarWhereInput = {
    AND?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    OR?: PedidoScalarWhereInput[]
    NOT?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    id?: StringFilter<"Pedido"> | string
    clienteId?: StringFilter<"Pedido"> | string
    fecha?: DateTimeFilter<"Pedido"> | Date | string
    fechaEntrega?: DateTimeNullableFilter<"Pedido"> | Date | string | null
    estado?: EnumEstadoPedidoFilter<"Pedido"> | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFilter<"Pedido"> | $Enums.TipoPedido
    total?: DecimalFilter<"Pedido"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Pedido"> | string | null
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
  }

  export type VentaPOSUpsertWithWhereUniqueWithoutClienteInput = {
    where: VentaPOSWhereUniqueInput
    update: XOR<VentaPOSUpdateWithoutClienteInput, VentaPOSUncheckedUpdateWithoutClienteInput>
    create: XOR<VentaPOSCreateWithoutClienteInput, VentaPOSUncheckedCreateWithoutClienteInput>
  }

  export type VentaPOSUpdateWithWhereUniqueWithoutClienteInput = {
    where: VentaPOSWhereUniqueInput
    data: XOR<VentaPOSUpdateWithoutClienteInput, VentaPOSUncheckedUpdateWithoutClienteInput>
  }

  export type VentaPOSUpdateManyWithWhereWithoutClienteInput = {
    where: VentaPOSScalarWhereInput
    data: XOR<VentaPOSUpdateManyMutationInput, VentaPOSUncheckedUpdateManyWithoutClienteInput>
  }

  export type VentaPOSScalarWhereInput = {
    AND?: VentaPOSScalarWhereInput | VentaPOSScalarWhereInput[]
    OR?: VentaPOSScalarWhereInput[]
    NOT?: VentaPOSScalarWhereInput | VentaPOSScalarWhereInput[]
    id?: StringFilter<"VentaPOS"> | string
    clienteId?: StringNullableFilter<"VentaPOS"> | string | null
    fecha?: DateTimeFilter<"VentaPOS"> | Date | string
    total?: DecimalFilter<"VentaPOS"> | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFilter<"VentaPOS"> | $Enums.MetodoPago
    observacion?: StringNullableFilter<"VentaPOS"> | string | null
    createdAt?: DateTimeFilter<"VentaPOS"> | Date | string
  }

  export type ClienteCreateWithoutPedidosInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ventasPOS?: VentaPOSCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutPedidosInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ventasPOS?: VentaPOSUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutPedidosInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutPedidosInput, ClienteUncheckedCreateWithoutPedidosInput>
  }

  export type PedidoItemCreateWithoutPedidoInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUncheckedCreateWithoutPedidoInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemCreateOrConnectWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemCreateManyPedidoInputEnvelope = {
    data: PedidoItemCreateManyPedidoInput | PedidoItemCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type ClienteUpsertWithoutPedidosInput = {
    update: XOR<ClienteUpdateWithoutPedidosInput, ClienteUncheckedUpdateWithoutPedidosInput>
    create: XOR<ClienteCreateWithoutPedidosInput, ClienteUncheckedCreateWithoutPedidosInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutPedidosInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutPedidosInput, ClienteUncheckedUpdateWithoutPedidosInput>
  }

  export type ClienteUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ventasPOS?: VentaPOSUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ventasPOS?: VentaPOSUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type PedidoItemUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    update: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
    create: XOR<PedidoItemCreateWithoutPedidoInput, PedidoItemUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoItemUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoItemWhereUniqueInput
    data: XOR<PedidoItemUpdateWithoutPedidoInput, PedidoItemUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoItemUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoItemScalarWhereInput
    data: XOR<PedidoItemUpdateManyMutationInput, PedidoItemUncheckedUpdateManyWithoutPedidoInput>
  }

  export type PedidoItemScalarWhereInput = {
    AND?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    OR?: PedidoItemScalarWhereInput[]
    NOT?: PedidoItemScalarWhereInput | PedidoItemScalarWhereInput[]
    id?: StringFilter<"PedidoItem"> | string
    nombre?: StringNullableFilter<"PedidoItem"> | string | null
    pedidoId?: StringFilter<"PedidoItem"> | string
    productoId?: StringFilter<"PedidoItem"> | string
    cantidad?: IntFilter<"PedidoItem"> | number
    precioUnitario?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"PedidoItem"> | Decimal | DecimalJsLike | number | string
  }

  export type PedidoCreateWithoutItemsInput = {
    id?: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutPedidosInput
  }

  export type PedidoUncheckedCreateWithoutItemsInput = {
    id?: string
    clienteId: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoCreateOrConnectWithoutItemsInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
  }

  export type PedidoUpsertWithoutItemsInput = {
    update: XOR<PedidoUpdateWithoutItemsInput, PedidoUncheckedUpdateWithoutItemsInput>
    create: XOR<PedidoCreateWithoutItemsInput, PedidoUncheckedCreateWithoutItemsInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutItemsInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutItemsInput, PedidoUncheckedUpdateWithoutItemsInput>
  }

  export type PedidoUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type PedidoUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaCreateWithoutMesaInput = {
    id?: string
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ComandaItemCreateNestedManyWithoutComandaInput
  }

  export type ComandaUncheckedCreateWithoutMesaInput = {
    id?: string
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ComandaItemUncheckedCreateNestedManyWithoutComandaInput
  }

  export type ComandaCreateOrConnectWithoutMesaInput = {
    where: ComandaWhereUniqueInput
    create: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput>
  }

  export type ComandaCreateManyMesaInputEnvelope = {
    data: ComandaCreateManyMesaInput | ComandaCreateManyMesaInput[]
    skipDuplicates?: boolean
  }

  export type ComandaUpsertWithWhereUniqueWithoutMesaInput = {
    where: ComandaWhereUniqueInput
    update: XOR<ComandaUpdateWithoutMesaInput, ComandaUncheckedUpdateWithoutMesaInput>
    create: XOR<ComandaCreateWithoutMesaInput, ComandaUncheckedCreateWithoutMesaInput>
  }

  export type ComandaUpdateWithWhereUniqueWithoutMesaInput = {
    where: ComandaWhereUniqueInput
    data: XOR<ComandaUpdateWithoutMesaInput, ComandaUncheckedUpdateWithoutMesaInput>
  }

  export type ComandaUpdateManyWithWhereWithoutMesaInput = {
    where: ComandaScalarWhereInput
    data: XOR<ComandaUpdateManyMutationInput, ComandaUncheckedUpdateManyWithoutMesaInput>
  }

  export type ComandaScalarWhereInput = {
    AND?: ComandaScalarWhereInput | ComandaScalarWhereInput[]
    OR?: ComandaScalarWhereInput[]
    NOT?: ComandaScalarWhereInput | ComandaScalarWhereInput[]
    id?: StringFilter<"Comanda"> | string
    mesaId?: IntFilter<"Comanda"> | number
    fechaApertura?: DateTimeFilter<"Comanda"> | Date | string
    fechaCierre?: DateTimeNullableFilter<"Comanda"> | Date | string | null
    estado?: EnumEstadoComandaFilter<"Comanda"> | $Enums.EstadoComanda
    total?: DecimalFilter<"Comanda"> | Decimal | DecimalJsLike | number | string
    observacion?: StringNullableFilter<"Comanda"> | string | null
    createdAt?: DateTimeFilter<"Comanda"> | Date | string
    updatedAt?: DateTimeFilter<"Comanda"> | Date | string
  }

  export type MesaCreateWithoutComandasInput = {
    numero: number
    estado?: $Enums.EstadoMesa
    activo?: boolean
  }

  export type MesaUncheckedCreateWithoutComandasInput = {
    id?: number
    numero: number
    estado?: $Enums.EstadoMesa
    activo?: boolean
  }

  export type MesaCreateOrConnectWithoutComandasInput = {
    where: MesaWhereUniqueInput
    create: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
  }

  export type ComandaItemCreateWithoutComandaInput = {
    id?: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
  }

  export type ComandaItemUncheckedCreateWithoutComandaInput = {
    id?: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
  }

  export type ComandaItemCreateOrConnectWithoutComandaInput = {
    where: ComandaItemWhereUniqueInput
    create: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput>
  }

  export type ComandaItemCreateManyComandaInputEnvelope = {
    data: ComandaItemCreateManyComandaInput | ComandaItemCreateManyComandaInput[]
    skipDuplicates?: boolean
  }

  export type MesaUpsertWithoutComandasInput = {
    update: XOR<MesaUpdateWithoutComandasInput, MesaUncheckedUpdateWithoutComandasInput>
    create: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    where?: MesaWhereInput
  }

  export type MesaUpdateToOneWithWhereWithoutComandasInput = {
    where?: MesaWhereInput
    data: XOR<MesaUpdateWithoutComandasInput, MesaUncheckedUpdateWithoutComandasInput>
  }

  export type MesaUpdateWithoutComandasInput = {
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MesaUncheckedUpdateWithoutComandasInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstadoMesaFieldUpdateOperationsInput | $Enums.EstadoMesa
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaItemUpsertWithWhereUniqueWithoutComandaInput = {
    where: ComandaItemWhereUniqueInput
    update: XOR<ComandaItemUpdateWithoutComandaInput, ComandaItemUncheckedUpdateWithoutComandaInput>
    create: XOR<ComandaItemCreateWithoutComandaInput, ComandaItemUncheckedCreateWithoutComandaInput>
  }

  export type ComandaItemUpdateWithWhereUniqueWithoutComandaInput = {
    where: ComandaItemWhereUniqueInput
    data: XOR<ComandaItemUpdateWithoutComandaInput, ComandaItemUncheckedUpdateWithoutComandaInput>
  }

  export type ComandaItemUpdateManyWithWhereWithoutComandaInput = {
    where: ComandaItemScalarWhereInput
    data: XOR<ComandaItemUpdateManyMutationInput, ComandaItemUncheckedUpdateManyWithoutComandaInput>
  }

  export type ComandaItemScalarWhereInput = {
    AND?: ComandaItemScalarWhereInput | ComandaItemScalarWhereInput[]
    OR?: ComandaItemScalarWhereInput[]
    NOT?: ComandaItemScalarWhereInput | ComandaItemScalarWhereInput[]
    id?: StringFilter<"ComandaItem"> | string
    comandaId?: StringFilter<"ComandaItem"> | string
    productoId?: StringFilter<"ComandaItem"> | string
    nombre?: StringNullableFilter<"ComandaItem"> | string | null
    cantidad?: IntFilter<"ComandaItem"> | number
    precioUnitario?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"ComandaItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"ComandaItem"> | boolean
    estado?: EnumEstadoItemComandaFilter<"ComandaItem"> | $Enums.EstadoItemComanda
    createdAt?: DateTimeFilter<"ComandaItem"> | Date | string
  }

  export type ComandaCreateWithoutItemsInput = {
    id?: string
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mesa: MesaCreateNestedOneWithoutComandasInput
  }

  export type ComandaUncheckedCreateWithoutItemsInput = {
    id?: string
    mesaId: number
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComandaCreateOrConnectWithoutItemsInput = {
    where: ComandaWhereUniqueInput
    create: XOR<ComandaCreateWithoutItemsInput, ComandaUncheckedCreateWithoutItemsInput>
  }

  export type ComandaUpsertWithoutItemsInput = {
    update: XOR<ComandaUpdateWithoutItemsInput, ComandaUncheckedUpdateWithoutItemsInput>
    create: XOR<ComandaCreateWithoutItemsInput, ComandaUncheckedCreateWithoutItemsInput>
    where?: ComandaWhereInput
  }

  export type ComandaUpdateToOneWithWhereWithoutItemsInput = {
    where?: ComandaWhereInput
    data: XOR<ComandaUpdateWithoutItemsInput, ComandaUncheckedUpdateWithoutItemsInput>
  }

  export type ComandaUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mesa?: MesaUpdateOneRequiredWithoutComandasNestedInput
  }

  export type ComandaUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mesaId?: IntFieldUpdateOperationsInput | number
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateWithoutVentasPOSInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pedidos?: PedidoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutVentasPOSInput = {
    id?: string
    nombre: string
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutVentasPOSInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutVentasPOSInput, ClienteUncheckedCreateWithoutVentasPOSInput>
  }

  export type VentaPOSItemCreateWithoutVentaPOSInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
  }

  export type VentaPOSItemUncheckedCreateWithoutVentaPOSInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
  }

  export type VentaPOSItemCreateOrConnectWithoutVentaPOSInput = {
    where: VentaPOSItemWhereUniqueInput
    create: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput>
  }

  export type VentaPOSItemCreateManyVentaPOSInputEnvelope = {
    data: VentaPOSItemCreateManyVentaPOSInput | VentaPOSItemCreateManyVentaPOSInput[]
    skipDuplicates?: boolean
  }

  export type ClienteUpsertWithoutVentasPOSInput = {
    update: XOR<ClienteUpdateWithoutVentasPOSInput, ClienteUncheckedUpdateWithoutVentasPOSInput>
    create: XOR<ClienteCreateWithoutVentasPOSInput, ClienteUncheckedCreateWithoutVentasPOSInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutVentasPOSInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutVentasPOSInput, ClienteUncheckedUpdateWithoutVentasPOSInput>
  }

  export type ClienteUpdateWithoutVentasPOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutVentasPOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedidos?: PedidoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type VentaPOSItemUpsertWithWhereUniqueWithoutVentaPOSInput = {
    where: VentaPOSItemWhereUniqueInput
    update: XOR<VentaPOSItemUpdateWithoutVentaPOSInput, VentaPOSItemUncheckedUpdateWithoutVentaPOSInput>
    create: XOR<VentaPOSItemCreateWithoutVentaPOSInput, VentaPOSItemUncheckedCreateWithoutVentaPOSInput>
  }

  export type VentaPOSItemUpdateWithWhereUniqueWithoutVentaPOSInput = {
    where: VentaPOSItemWhereUniqueInput
    data: XOR<VentaPOSItemUpdateWithoutVentaPOSInput, VentaPOSItemUncheckedUpdateWithoutVentaPOSInput>
  }

  export type VentaPOSItemUpdateManyWithWhereWithoutVentaPOSInput = {
    where: VentaPOSItemScalarWhereInput
    data: XOR<VentaPOSItemUpdateManyMutationInput, VentaPOSItemUncheckedUpdateManyWithoutVentaPOSInput>
  }

  export type VentaPOSItemScalarWhereInput = {
    AND?: VentaPOSItemScalarWhereInput | VentaPOSItemScalarWhereInput[]
    OR?: VentaPOSItemScalarWhereInput[]
    NOT?: VentaPOSItemScalarWhereInput | VentaPOSItemScalarWhereInput[]
    id?: StringFilter<"VentaPOSItem"> | string
    nombre?: StringNullableFilter<"VentaPOSItem"> | string | null
    ventaPOSId?: StringFilter<"VentaPOSItem"> | string
    productoId?: StringFilter<"VentaPOSItem"> | string
    cantidad?: IntFilter<"VentaPOSItem"> | number
    precioUnitario?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"VentaPOSItem"> | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFilter<"VentaPOSItem"> | boolean
  }

  export type VentaPOSCreateWithoutItemsInput = {
    id?: string
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutVentasPOSInput
  }

  export type VentaPOSUncheckedCreateWithoutItemsInput = {
    id?: string
    clienteId?: string | null
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
  }

  export type VentaPOSCreateOrConnectWithoutItemsInput = {
    where: VentaPOSWhereUniqueInput
    create: XOR<VentaPOSCreateWithoutItemsInput, VentaPOSUncheckedCreateWithoutItemsInput>
  }

  export type VentaPOSUpsertWithoutItemsInput = {
    update: XOR<VentaPOSUpdateWithoutItemsInput, VentaPOSUncheckedUpdateWithoutItemsInput>
    create: XOR<VentaPOSCreateWithoutItemsInput, VentaPOSUncheckedCreateWithoutItemsInput>
    where?: VentaPOSWhereInput
  }

  export type VentaPOSUpdateToOneWithWhereWithoutItemsInput = {
    where?: VentaPOSWhereInput
    data: XOR<VentaPOSUpdateWithoutItemsInput, VentaPOSUncheckedUpdateWithoutItemsInput>
  }

  export type VentaPOSUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutVentasPOSNestedInput
  }

  export type VentaPOSUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoCreateManyClienteInput = {
    id?: string
    fecha?: Date | string
    fechaEntrega?: Date | string | null
    estado?: $Enums.EstadoPedido
    tipo?: $Enums.TipoPedido
    total: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VentaPOSCreateManyClienteInput = {
    id?: string
    fecha?: Date | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago?: $Enums.MetodoPago
    observacion?: string | null
    createdAt?: Date | string
  }

  export type PedidoUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PedidoItemUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoPedidoFieldUpdateOperationsInput | $Enums.EstadoPedido
    tipo?: EnumTipoPedidoFieldUpdateOperationsInput | $Enums.TipoPedido
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaPOSUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VentaPOSItemUpdateManyWithoutVentaPOSNestedInput
  }

  export type VentaPOSUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VentaPOSItemUncheckedUpdateManyWithoutVentaPOSNestedInput
  }

  export type VentaPOSUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: EnumMetodoPagoFieldUpdateOperationsInput | $Enums.MetodoPago
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoItemCreateManyPedidoInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUncheckedUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PedidoItemUncheckedUpdateManyWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ComandaCreateManyMesaInput = {
    id?: string
    fechaApertura?: Date | string
    fechaCierre?: Date | string | null
    estado?: $Enums.EstadoComanda
    total?: Decimal | DecimalJsLike | number | string
    observacion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComandaUpdateWithoutMesaInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ComandaItemUpdateManyWithoutComandaNestedInput
  }

  export type ComandaUncheckedUpdateWithoutMesaInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ComandaItemUncheckedUpdateManyWithoutComandaNestedInput
  }

  export type ComandaUncheckedUpdateManyWithoutMesaInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaApertura?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCierre?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: EnumEstadoComandaFieldUpdateOperationsInput | $Enums.EstadoComanda
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observacion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemCreateManyComandaInput = {
    id?: string
    productoId: string
    nombre?: string | null
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
    estado?: $Enums.EstadoItemComanda
    createdAt?: Date | string
  }

  export type ComandaItemUpdateWithoutComandaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemUncheckedUpdateWithoutComandaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComandaItemUncheckedUpdateManyWithoutComandaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
    estado?: EnumEstadoItemComandaFieldUpdateOperationsInput | $Enums.EstadoItemComanda
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaPOSItemCreateManyVentaPOSInput = {
    id?: string
    nombre?: string | null
    productoId: string
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    esProductoPropio?: boolean
  }

  export type VentaPOSItemUpdateWithoutVentaPOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VentaPOSItemUncheckedUpdateWithoutVentaPOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VentaPOSItemUncheckedUpdateManyWithoutVentaPOSInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    esProductoPropio?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ClienteCountOutputTypeDefaultArgs instead
     */
    export type ClienteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClienteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PedidoCountOutputTypeDefaultArgs instead
     */
    export type PedidoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PedidoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MesaCountOutputTypeDefaultArgs instead
     */
    export type MesaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MesaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComandaCountOutputTypeDefaultArgs instead
     */
    export type ComandaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComandaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VentaPOSCountOutputTypeDefaultArgs instead
     */
    export type VentaPOSCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VentaPOSCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClienteDefaultArgs instead
     */
    export type ClienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClienteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PedidoDefaultArgs instead
     */
    export type PedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PedidoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PedidoItemDefaultArgs instead
     */
    export type PedidoItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PedidoItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MesaDefaultArgs instead
     */
    export type MesaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MesaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComandaDefaultArgs instead
     */
    export type ComandaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComandaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComandaItemDefaultArgs instead
     */
    export type ComandaItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComandaItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VentaPOSDefaultArgs instead
     */
    export type VentaPOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VentaPOSDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VentaPOSItemDefaultArgs instead
     */
    export type VentaPOSItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VentaPOSItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}