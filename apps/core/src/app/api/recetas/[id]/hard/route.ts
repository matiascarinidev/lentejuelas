import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.receta.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al eliminar receta" },
      { status: 500 }
    );
  }
}
