import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const comanda = await MesaService.abrirComanda(body.mesaId, body.observacion);
  return NextResponse.json({ success: true, data: comanda }, { status: 201 });
}
