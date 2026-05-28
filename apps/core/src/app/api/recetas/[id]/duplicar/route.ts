import { NextRequest, NextResponse } from "next/server";
import { RecetaService } from "@/services/receta.service";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.productoId) {
      return NextResponse.json(
        { success: false, error: "El ID del nuevo producto es requerido" },
        { status: 400 }
      );
    }

    const receta = await RecetaService.duplicar(
      params.id,
      body.productoId,
      body.varianteNombre
    );
    return NextResponse.json({ success: true, data: receta }, { status: 201 });
  } catch (error: any) {
    console.error("Error al duplicar receta:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al duplicar receta" },
      { status: 500 }
    );
  }
}
