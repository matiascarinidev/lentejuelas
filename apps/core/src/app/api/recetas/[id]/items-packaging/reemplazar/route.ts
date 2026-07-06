import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    await prisma.$transaction(async (tx: any) => {
      await tx.recetaItemPackaging.deleteMany({
        where: { recetaId: params.id },
      });

      if (body.items?.length > 0) {
        await tx.recetaItemPackaging.createMany({
          data: body.items.map((item: any) => ({
            recetaId: params.id,
            insumoId: item.insumoId,
            cantidad: item.cantidad,
            unidad: item.unidad,
          })),
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al reemplazar packaging" },
      { status: 500 }
    );
  }
}
