import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const mesa = await MesaService.cambiarEstado(
    parseInt(params.id),
    body.estado
  );
  return NextResponse.json({ success: true, data: mesa });
}
