import { NextRequest, NextResponse } from "next/server";
import { ProductoService } from "@/services/producto.service";
import { corsResponse, handleOptions } from "@/lib/cors";
// GET /api/productos/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const costo = await ProductoService.obtenerCostoActual(params.id);
    if (!costo) {
      return NextResponse.json(
        { success: false, error: "No se pudo calcular el costo" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: costo });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al calcular costo" },
      { status: 500 }
    );
  }
}

// PATCH /api/productos/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const producto = await ProductoService.actualizar(params.id, body);
    return NextResponse.json({ success: true, data: producto });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}

// DELETE /api/productos/:id (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ProductoService.desactivar(params.id);
    return NextResponse.json({ success: true, data: null });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al desactivar producto:", error);
    return NextResponse.json(
      { success: false, error: "Error al desactivar producto" },
      { status: 500 }
    );
  }
}
