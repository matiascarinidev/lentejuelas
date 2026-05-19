import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const comanda = await MesaService.obtenerComanda(params.id);
  return NextResponse.json({ success: true, data: comanda });
}
