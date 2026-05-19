import { NextRequest, NextResponse } from "next/server";
import { ProveedorService } from "@/services/proveedor.service";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proveedor = await ProveedorService.activar(params.id);
    return NextResponse.json({ success: true, data: proveedor });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
    throw error;
  }
}
