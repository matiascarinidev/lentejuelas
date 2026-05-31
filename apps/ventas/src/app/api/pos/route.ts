import { NextRequest, NextResponse } from "next/server";
import { POSService } from "@/services/pos.service";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resultado = await POSService.listar({
    desde: searchParams.get("desde") || undefined,
    hasta: searchParams.get("hasta") || undefined,
  });
  return NextResponse.json({ success: true, data: resultado });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const venta = await POSService.crearVenta(body);
  return NextResponse.json({ success: true, data: venta }, { status: 201 });
}
