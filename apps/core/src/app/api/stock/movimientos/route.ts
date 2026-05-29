import { NextRequest, NextResponse } from "next/server";
import { StockService } from "@/services/stock.service";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resultado = await StockService.obtenerMovimientos({
      tipo: searchParams.get("tipo") || undefined,
      desde: searchParams.get("desde") || undefined,
      hasta: searchParams.get("hasta") || undefined,
      insumoId: searchParams.get("insumoId") || undefined,
      productoId: searchParams.get("productoId") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "50"),
    });
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener movimientos" },
      { status: 500 }
    );
  }
}
