import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const comanda = await MesaService.cerrarComanda(params.id);
  return NextResponse.json({ success: true, data: comanda });
}
