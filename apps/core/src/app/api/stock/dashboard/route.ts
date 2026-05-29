import { NextResponse } from "next/server";
import { StockService } from "@/services/stock.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dashboard = await StockService.obtenerDashboard();
    return NextResponse.json({ success: true, data: dashboard });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener dashboard" },
      { status: 500 }
    );
  }
}
