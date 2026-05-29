import { NextRequest, NextResponse } from "next/server";
import { InsumoService } from "@/services/insumo.service";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const insumo = await InsumoService.activar(params.id);
    return NextResponse.json({ success: true, data: insumo });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Insumo no encontrado" },
        { status: 404 }
      );
    }
    throw error;
  }
}
