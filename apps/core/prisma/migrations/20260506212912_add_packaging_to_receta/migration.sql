-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UnidadMedida" ADD VALUE 'MAPLE';
ALTER TYPE "UnidadMedida" ADD VALUE 'MANOJO';
ALTER TYPE "UnidadMedida" ADD VALUE 'CABEZA';

-- AlterTable
ALTER TABLE "Receta" ADD COLUMN     "unidadesPorPack" INTEGER;

-- CreateTable
CREATE TABLE "RecetaItemPackaging" (
    "id" TEXT NOT NULL,
    "recetaId" TEXT NOT NULL,
    "insumoId" TEXT NOT NULL,
    "cantidad" DECIMAL(10,3) NOT NULL,
    "unidad" "UnidadMedida" NOT NULL,

    CONSTRAINT "RecetaItemPackaging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecetaItemPackaging" ADD CONSTRAINT "RecetaItemPackaging_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "Receta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecetaItemPackaging" ADD CONSTRAINT "RecetaItemPackaging_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
