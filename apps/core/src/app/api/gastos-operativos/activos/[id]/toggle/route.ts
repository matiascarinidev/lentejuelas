import { NextRequest, NextResponse } from "next/server";
import { GastosService } from "@/services/gastos.service";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const activo = await GastosService.toggleActivo(params.id, body.activo);
    return NextResponse.json({ success: true, data: activo });
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    return NextResponse.json(
      { success: false, error: "Error al cambiar estado" },
      { status: 500 }
    );
  }
}
