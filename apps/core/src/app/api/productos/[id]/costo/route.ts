import { NextRequest, NextResponse } from "next/server";
import { ProductoService } from "@/services/producto.service";
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const costo = await ProductoService.obtenerCostoActual(params.id);
    if (!costo) {
      return NextResponse.json(
        { success: false, error: "No se pudo calcular el costo" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: costo });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al calcular costo" },
      { status: 500 }
    );
  }
}
