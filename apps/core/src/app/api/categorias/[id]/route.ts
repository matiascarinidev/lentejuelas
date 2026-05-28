import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "@/services/categoria.service";
export const dynamic = "force-dynamic";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { nombre } = await request.json();
  const categoria = await CategoriaService.actualizar(params.id, nombre);
  return NextResponse.json({ success: true, data: categoria });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await CategoriaService.toggle(params.id, false);
  return NextResponse.json({ success: true, data: null });
}
