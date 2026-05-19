/*
  Warnings:

  - You are about to drop the column `valorResidual` on the `ActivoAmortizable` table. All the data in the column will be lost.
  - You are about to drop the column `vidaUtilMeses` on the `ActivoAmortizable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ActivoAmortizable" DROP COLUMN "valorResidual",
DROP COLUMN "vidaUtilMeses",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "costoPorTanda" DECIMAL(10,4) NOT NULL DEFAULT 0,
ADD COLUMN     "tandasAcumuladas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "vidaUtilTandas" INTEGER NOT NULL DEFAULT 1000;

-- AlterTable
ALTER TABLE "GastoOperativo" ADD COLUMN     "costoPorHora" DECIMAL(10,2),
ADD COLUMN     "esManoDeObra" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProduccionLote" ADD COLUMN     "costoAmortizacion" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "costoMateriaPrima" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "costoOperativo" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "costoPackaging" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "horasProduccion" DECIMAL(4,1);

-- AlterTable
ALTER TABLE "Receta" ADD COLUMN     "rendimientoBase" INTEGER NOT NULL DEFAULT 1;
