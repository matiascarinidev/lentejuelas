import { NextRequest, NextResponse } from "next/server";
import { GastosService } from "@/services/gastos.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const gasto = await GastosService.actualizarOperativo(params.id, body);
    return NextResponse.json({ success: true, data: gasto });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar gasto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await GastosService.eliminarOperativo(params.id);
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    return NextResponse.json(
      { success: false, error: "Error al eliminar gasto" },
      { status: 500 }
    );
  }
}
