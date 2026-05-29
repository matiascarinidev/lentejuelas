import { NextRequest, NextResponse } from "next/server";
import { StockService } from "@/services/stock.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resultado = await StockService.obtenerStockProductos({
      busqueda: searchParams.get("q") || undefined,
      propio: searchParams.has("propio")
        ? searchParams.get("propio") === "true"
        : undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "30"),
    });
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener stock" },
      { status: 500 }
    );
  }
}
