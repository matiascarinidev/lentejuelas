-- CreateEnum
CREATE TYPE "CategoriaProducto" AS ENUM ('CONGELADO', 'PANIFICADO', 'BEBIDA', 'FIAMBRE', 'LACTEO', 'GRANEL', 'ENVASADO', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoInsumo" AS ENUM ('MATERIA_PRIMA', 'ENVASE', 'ETIQUETA', 'OPERATIVO');

-- CreateEnum
CREATE TYPE "UnidadMedida" AS ENUM ('GRAMOS', 'KILOGRAMOS', 'MILILITROS', 'LITROS', 'UNIDAD', 'PAQUETE', 'BOLSA', 'CAJA');

-- CreateEnum
CREATE TYPE "TipoMovimientoStock" AS ENUM ('ENTRADA', 'SALIDA');

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" "CategoriaProducto" NOT NULL,
    "esProduccionPropia" BOOLEAN NOT NULL DEFAULT true,
    "precioVentaSugerido" DECIMAL(10,2) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stockActual" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "POSVentaItem" (
    "id" TEXT NOT NULL,

    CONSTRAINT "POSVentaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoPOSVentaItem" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "posVentaItemId" TEXT NOT NULL,

    CONSTRAINT "ProductoPOSVentaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComandaItem" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ComandaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoComandaItem" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "comandaItemId" TEXT NOT NULL,

    CONSTRAINT "ProductoComandaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItem" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receta" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "varianteNombre" TEXT,
    "recetaBaseId" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fechaVigenciaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVigenciaFin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecetaItem" (
    "id" TEXT NOT NULL,
    "recetaId" TEXT NOT NULL,
    "insumoId" TEXT NOT NULL,
    "cantidad" DECIMAL(10,3) NOT NULL,
    "unidad" "UnidadMedida" NOT NULL,
    "mermaPorcentaje" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "RecetaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoInsumo" NOT NULL,
    "unidadBase" "UnidadMedida" NOT NULL,
    "unidadCompra" "UnidadMedida" NOT NULL,
    "factorConversion" DECIMAL(10,4) NOT NULL,
    "costoUnitarioEstimado" DECIMAL(10,4) NOT NULL,
    "stockActual" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "stockMinimo" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "proveedorId" TEXT,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompraInsumo" (
    "id" TEXT NOT NULL,
    "proveedorId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompraInsumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompraInsumoItem" (
    "id" TEXT NOT NULL,
    "compraId" TEXT NOT NULL,
    "insumoId" TEXT NOT NULL,
    "cantidadCompra" DECIMAL(10,3) NOT NULL,
    "precioUnitario" DECIMAL(10,4) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "CompraInsumoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProduccionLote" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "recetaId" TEXT NOT NULL,
    "fechaProduccion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVencimiento" TIMESTAMP(3),
    "cantidadPlanificada" INTEGER NOT NULL,
    "cantidadReal" INTEGER NOT NULL,
    "costoTotalCalculado" DECIMAL(10,2) NOT NULL,
    "costoUnitarioFinal" DECIMAL(10,4) NOT NULL,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProduccionLote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimientoStock" (
    "id" TEXT NOT NULL,
    "tipo" "TipoMovimientoStock" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insumoId" TEXT,
    "productoId" TEXT,
    "cantidad" DECIMAL(10,3) NOT NULL,
    "unidad" "UnidadMedida" NOT NULL,
    "compraId" TEXT,
    "loteId" TEXT,
    "observacion" TEXT,

    CONSTRAINT "MovimientoStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GastoOperativo" (
    "id" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prorrateable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GastoOperativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivoAmortizable" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "valorAdquisicion" DECIMAL(10,2) NOT NULL,
    "vidaUtilMeses" INTEGER NOT NULL,
    "valorResidual" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivoAmortizable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidoItemToProducto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoItemToProducto_AB_unique" ON "_PedidoItemToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoItemToProducto_B_index" ON "_PedidoItemToProducto"("B");

-- AddForeignKey
ALTER TABLE "ProductoPOSVentaItem" ADD CONSTRAINT "ProductoPOSVentaItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoPOSVentaItem" ADD CONSTRAINT "ProductoPOSVentaItem_posVentaItemId_fkey" FOREIGN KEY ("posVentaItemId") REFERENCES "POSVentaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComandaItem" ADD CONSTRAINT "ProductoComandaItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComandaItem" ADD CONSTRAINT "ProductoComandaItem_comandaItemId_fkey" FOREIGN KEY ("comandaItemId") REFERENCES "ComandaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receta" ADD CONSTRAINT "Receta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receta" ADD CONSTRAINT "Receta_recetaBaseId_fkey" FOREIGN KEY ("recetaBaseId") REFERENCES "Receta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecetaItem" ADD CONSTRAINT "RecetaItem_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "Receta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecetaItem" ADD CONSTRAINT "RecetaItem_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insumo" ADD CONSTRAINT "Insumo_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraInsumo" ADD CONSTRAINT "CompraInsumo_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraInsumoItem" ADD CONSTRAINT "CompraInsumoItem_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "CompraInsumo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraInsumoItem" ADD CONSTRAINT "CompraInsumoItem_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduccionLote" ADD CONSTRAINT "ProduccionLote_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduccionLote" ADD CONSTRAINT "ProduccionLote_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "Receta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "CompraInsumo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "ProduccionLote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoItemToProducto" ADD CONSTRAINT "_PedidoItemToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "PedidoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoItemToProducto" ADD CONSTRAINT "_PedidoItemToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
