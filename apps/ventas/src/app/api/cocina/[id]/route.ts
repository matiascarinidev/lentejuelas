import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const item = await prisma.comandaItem.update({
      where: { id: params.id },
      data: { estado: body.estado },
    });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al actualizar" },
      { status: 500 }
    );
  }
}
