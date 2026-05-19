import { NextRequest, NextResponse } from "next/server";
import { PedidoService } from "@/services/pedido.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const pedido = await PedidoService.cambiarEstado(params.id, body.estado);
  return NextResponse.json({ success: true, data: pedido });
}
