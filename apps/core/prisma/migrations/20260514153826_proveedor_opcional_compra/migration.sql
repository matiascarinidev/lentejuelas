-- DropForeignKey
ALTER TABLE "CompraInsumo" DROP CONSTRAINT "CompraInsumo_proveedorId_fkey";

-- AlterTable
ALTER TABLE "CompraInsumo" ALTER COLUMN "proveedorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CompraInsumo" ADD CONSTRAINT "CompraInsumo_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
