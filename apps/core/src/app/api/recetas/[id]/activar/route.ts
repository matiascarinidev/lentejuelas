import { NextRequest, NextResponse } from "next/server";
import { RecetaService } from "@/services/receta.service";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const receta = await RecetaService.activar(params.id);
    return NextResponse.json({ success: true, data: receta });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Receta no encontrada" },
        { status: 404 }
      );
    }
    throw error;
  }
}
