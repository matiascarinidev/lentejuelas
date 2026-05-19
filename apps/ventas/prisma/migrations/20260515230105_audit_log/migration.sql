-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('PENDIENTE', 'EN_PRODUCCION', 'LISTO', 'ENTREGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoPedido" AS ENUM ('STOCK', 'ENCARGO');

-- CreateEnum
CREATE TYPE "EstadoMesa" AS ENUM ('LIBRE', 'OCUPADA', 'RESERVADA');

-- CreateEnum
CREATE TYPE "EstadoComanda" AS ENUM ('ABIERTA', 'CERRADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoItemComanda" AS ENUM ('PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaEntrega" TIMESTAMP(3),
    "estado" "EstadoPedido" NOT NULL DEFAULT 'PENDIENTE',
    "tipo" "TipoPedido" NOT NULL DEFAULT 'STOCK',
    "total" DECIMAL(10,2) NOT NULL,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItem" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado" "EstadoMesa" NOT NULL DEFAULT 'LIBRE',
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comanda" (
    "id" TEXT NOT NULL,
    "mesaId" INTEGER NOT NULL,
    "fechaApertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaCierre" TIMESTAMP(3),
    "estado" "EstadoComanda" NOT NULL DEFAULT 'ABIERTA',
    "total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComandaItem" (
    "id" TEXT NOT NULL,
    "comandaId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "esProductoPropio" BOOLEAN NOT NULL DEFAULT true,
    "estado" "EstadoItemComanda" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "ComandaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentaPOS" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "metodoPago" "MetodoPago" NOT NULL DEFAULT 'EFECTIVO',
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentaPOS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentaPOSItem" (
    "id" TEXT NOT NULL,
    "ventaPOSId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "esProductoPropio" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "VentaPOSItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL DEFAULT 'sistema',
    "accion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" TEXT NOT NULL,
    "antes" JSONB,
    "despues" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comanda" ADD CONSTRAINT "Comanda_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComandaItem" ADD CONSTRAINT "ComandaItem_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "Comanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaPOS" ADD CONSTRAINT "VentaPOS_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaPOSItem" ADD CONSTRAINT "VentaPOSItem_ventaPOSId_fkey" FOREIGN KEY ("ventaPOSId") REFERENCES "VentaPOS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
