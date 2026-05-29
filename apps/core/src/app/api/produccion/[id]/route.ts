import { NextRequest, NextResponse } from "next/server";
import { ProduccionService } from "@/services/produccion.service";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lote = await ProduccionService.obtenerPorId(params.id);
    if (!lote) {
      return NextResponse.json(
        { success: false, error: "Lote no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: lote });
  } catch (error) {
    console.error("Error al obtener lote:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener lote" },
      { status: 500 }
    );
  }
}
