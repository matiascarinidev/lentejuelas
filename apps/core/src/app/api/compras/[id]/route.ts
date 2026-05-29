import { NextRequest, NextResponse } from "next/server";
import { CompraService } from "@/services/compra.service";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const compra = await CompraService.obtenerPorId(params.id);
    if (!compra) {
      return NextResponse.json(
        { success: false, error: "Compra no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: compra });
  } catch (error) {
    console.error("Error al obtener compra:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener compra" },
      { status: 500 }
    );
  }
}
