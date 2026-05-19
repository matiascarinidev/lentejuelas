/*
  Warnings:

  - You are about to drop the column `categoria` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the `_PedidoItemToProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PedidoItemToProducto" DROP CONSTRAINT "_PedidoItemToProducto_A_fkey";

-- DropForeignKey
ALTER TABLE "_PedidoItemToProducto" DROP CONSTRAINT "_PedidoItemToProducto_B_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "categoria",
ADD COLUMN     "categoriaId" TEXT,
ADD COLUMN     "categoriaProductoId" TEXT,
ADD COLUMN     "costoCompra" DECIMAL(10,2),
ADD COLUMN     "margenGanancia" DECIMAL(5,2) DEFAULT 30,
ADD COLUMN     "pedidoItemId" TEXT;

-- DropTable
DROP TABLE "_PedidoItemToProducto";

-- DropEnum
DROP TYPE "CategoriaProducto";

-- CreateTable
CREATE TABLE "CategoriaProducto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriaProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaProducto_nombre_key" ON "CategoriaProducto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaProductoId_fkey" FOREIGN KEY ("categoriaProductoId") REFERENCES "CategoriaProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_pedidoItemId_fkey" FOREIGN KEY ("pedidoItemId") REFERENCES "PedidoItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
