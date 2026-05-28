import { NextRequest, NextResponse } from "next/server";
import { ProductoService } from "@/services/producto.service";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const producto = await ProductoService.activar(params.id);
    return NextResponse.json({ success: true, data: producto });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    throw error;
  }
}
