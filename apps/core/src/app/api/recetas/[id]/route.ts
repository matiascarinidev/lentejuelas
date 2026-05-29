import { NextRequest, NextResponse } from "next/server";
import { RecetaService } from "@/services/receta.service";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const receta = await RecetaService.obtenerPorId(params.id);
    if (!receta) {
      return NextResponse.json(
        { success: false, error: "Receta no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: receta });
  } catch (error) {
    console.error("Error al obtener receta:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener receta" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const receta = await RecetaService.actualizar(params.id, body);
    return NextResponse.json({ success: true, data: receta });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Receta no encontrada" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar receta:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar receta" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await RecetaService.desactivar(params.id);
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error al desactivar receta:", error);
    return NextResponse.json(
      { success: false, error: "Error al desactivar receta" },
      { status: 500 }
    );
  }
}
