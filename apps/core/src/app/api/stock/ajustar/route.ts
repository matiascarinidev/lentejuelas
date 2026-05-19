import { NextRequest, NextResponse } from "next/server";
import { StockService } from "@/services/stock.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.itemId || !body.tipo || body.cantidadReal === undefined) {
      return NextResponse.json(
        { success: false, error: "itemId, tipo y cantidadReal requeridos" },
        { status: 400 }
      );
    }
    const resultado = await StockService.ajustarStock(body);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
