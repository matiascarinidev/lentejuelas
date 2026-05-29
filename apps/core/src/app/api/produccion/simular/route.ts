import { NextRequest, NextResponse } from "next/server";
import { ProduccionService } from "@/services/produccion.service";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productoId || !body.recetaId || !body.cantidadPlanificada) {
      return NextResponse.json(
        { success: false, error: "Producto, receta y cantidad son requeridos" },
        { status: 400 }
      );
    }

    const simulacion = await ProduccionService.simular(body);
    return NextResponse.json({ success: true, data: simulacion });
  } catch (error: any) {
    console.error("Error al simular:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al simular producción" },
      { status: 500 }
    );
  }
}
