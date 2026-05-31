import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const item = await MesaService.agregarItemComanda(params.id, body);
  return NextResponse.json({ success: true, data: item }, { status: 201 });
}
