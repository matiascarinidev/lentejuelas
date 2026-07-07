import { NextRequest, NextResponse } from "next/server";
import { MesaService } from "@/services/mesa.service";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const item = await MesaService.agregarItemComanda(params.id, {
      productoId: body.productoId,
      nombre: body.nombre || null,
      cantidad: body.cantidad,
      precioUnitario: body.precioUnitario,
      esProductoPropio: body.esProductoPropio ?? true,
    });
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    console.error("ERROR ITEMS:", error);
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
