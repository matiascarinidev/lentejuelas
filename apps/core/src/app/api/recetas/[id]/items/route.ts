import { NextRequest, NextResponse } from "next/server";
import { RecetaService } from "@/services/receta.service";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.insumoId || !body.cantidad || !body.unidad) {
      return NextResponse.json(
        { success: false, error: "Insumo, cantidad y unidad son requeridos" },
        { status: 400 }
      );
    }

    const item = await RecetaService.agregarItem(params.id, body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("Error al agregar item:", error);
    return NextResponse.json(
      { success: false, error: "Error al agregar item" },
      { status: 500 }
    );
  }
}
