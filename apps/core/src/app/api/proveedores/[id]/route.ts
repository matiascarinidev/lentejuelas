import { NextRequest, NextResponse } from "next/server";
import { ProveedorService } from "@/services/proveedor.service";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proveedor = await ProveedorService.obtenerPorId(params.id);
    if (!proveedor) {
      return NextResponse.json(
        { success: false, error: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: proveedor });
  } catch (error) {
    console.error("Error al obtener proveedor:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener proveedor" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const proveedor = await ProveedorService.actualizar(params.id, body);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ProveedorService.desactivar(params.id);
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error al desactivar proveedor:", error);
    return NextResponse.json(
      { success: false, error: "Error al desactivar proveedor" },
      { status: 500 }
    );
  }
}
