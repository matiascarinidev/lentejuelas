import { NextRequest, NextResponse } from "next/server";
import { GastosService } from "@/services/gastos.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const activo = await GastosService.actualizarActivo(params.id, body);
    return NextResponse.json({ success: true, data: activo });
  } catch (error) {
    console.error("Error al actualizar activo:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar activo" },
      { status: 500 }
    );
  }
}
