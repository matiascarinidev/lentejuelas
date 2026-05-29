import { NextRequest, NextResponse } from "next/server";
import { InsumoService } from "@/services/insumo.service";
import { corsResponse } from "@/lib/cors";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const insumo = await InsumoService.obtenerPorId(params.id);
    if (!insumo) {
      return NextResponse.json(
        { success: false, error: "Insumo no encontrado" },
        { status: 404 }
      );
    }
    return corsResponse({ success: true, data: insumo });
  } catch (error) {
    console.error("Error al obtener insumo:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener insumo" },
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
    const insumo = await InsumoService.actualizar(params.id, body);
    return NextResponse.json({ success: true, data: insumo });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Insumo no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar insumo:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar insumo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await InsumoService.desactivar(params.id);
    return NextResponse.json({ success: true, data: null });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Insumo no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al desactivar insumo:", error);
    return NextResponse.json(
      { success: false, error: "Error al desactivar insumo" },
      { status: 500 }
    );
  }
}
