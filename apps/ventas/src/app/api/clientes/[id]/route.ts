import { NextRequest, NextResponse } from "next/server";
import { ClienteService } from "@/services/cliente.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cliente = await ClienteService.obtenerPorId(params.id);
  if (!cliente)
    return NextResponse.json(
      { success: false, error: "No encontrado" },
      { status: 404 }
    );
  return NextResponse.json({ success: true, data: cliente });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const cliente = await ClienteService.actualizar(params.id, body);
  return NextResponse.json({ success: true, data: cliente });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await ClienteService.desactivar(params.id);
  return NextResponse.json({ success: true, data: null });
}
