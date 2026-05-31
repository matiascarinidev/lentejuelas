import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";
export const dynamic = "force-dynamic";
export async function GET() {
  const mesas = await MesaService.listar();
  return NextResponse.json({ success: true, data: mesas });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const mesa = await MesaService.crear(body);
  return NextResponse.json({ success: true, data: mesa }, { status: 201 });
}
