import { NextResponse } from "next/server";
import { InsumoService } from "@/services/insumo.service";

export async function GET() {
  try {
    const insumos = await InsumoService.obtenerStockBajo();
    return NextResponse.json({ success: true, data: insumos });
  } catch (error) {
    console.error("Error al obtener stock bajo:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener stock bajo" },
      { status: 500 }
    );
  }
}
