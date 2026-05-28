import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const insumos = await prisma.insumo.findMany({
      where: { activo: true, tipo: "MATERIA_PRIMA" },
      include: {
        recetaItems: {
          include: {
            receta: {
              select: {
                rendimientoBase: true,
                producto: { select: { nombre: true } },
              },
            },
          },
        },
      },
    });

    const predicciones = insumos.map((insumo) => {
      const stockActual = Number(insumo.stockActual);
      const stockMinimo = Number(insumo.stockMinimo);
      let tandasRestantes: number | null = null;

      for (const item of insumo.recetaItems) {
        const cantidadPorTanda = Number(item.cantidad);
        if (cantidadPorTanda > 0) {
          const tandas = Math.floor(stockActual / cantidadPorTanda);
          if (tandasRestantes === null || tandas < tandasRestantes) {
            tandasRestantes = tandas;
          }
        }
      }

      return {
        id: insumo.id,
        nombre: insumo.nombre,
        stockActual,
        stockMinimo,
        unidad: insumo.unidadBase,
        tandasRestantes,
        estado:
          stockActual <= stockMinimo
            ? "CRITICO"
            : tandasRestantes !== null && tandasRestantes <= 3
              ? "BAJO"
              : "OK",
      };
    });

    return NextResponse.json({ success: true, data: predicciones });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error" },
      { status: 500 }
    );
  }
}
