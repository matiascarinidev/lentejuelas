import { NextRequest, NextResponse } from "next/server";
import { StockService } from "@/services/stock.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resultado = await StockService.obtenerStockInsumos({
      tipo: searchParams.get("tipo") || undefined,
      busqueda: searchParams.get("q") || undefined,
      stockBajo: searchParams.get("stockBajo") === "true",
      proveedorId: searchParams.get("proveedorId") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "30"),
    });
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al obtener stock insumos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener stock" },
      { status: 500 }
    );
  }
}
