import { NextRequest, NextResponse } from "next/server";
import { PedidoService } from "@/services/pedido.service";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resultado = await PedidoService.listar({
    estado: searchParams.get("estado") || undefined,
    tipo: searchParams.get("tipo") || undefined,
    clienteId: searchParams.get("clienteId") || undefined,
  });
  return NextResponse.json({ success: true, data: resultado });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const pedido = await PedidoService.crear(body);
  return NextResponse.json({ success: true, data: pedido }, { status: 201 });
}
