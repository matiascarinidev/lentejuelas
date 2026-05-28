import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    await prisma.$transaction(async (tx) => {
      await tx.recetaItem.deleteMany({ where: { recetaId: params.id } });

      if (body.items?.length > 0) {
        await tx.recetaItem.createMany({
          data: body.items.map((item: any) => ({
            recetaId: params.id,
            insumoId: item.insumoId,
            cantidad: item.cantidad,
            unidad: item.unidad,
            mermaPorcentaje: item.mermaPorcentaje || 0,
          })),
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al reemplazar items" },
      { status: 500 }
    );
  }
}
