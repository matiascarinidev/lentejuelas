import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "@/services/categoria.service";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoria = await CategoriaService.toggle(params.id, true);
  return NextResponse.json({ success: true, data: categoria });
}
