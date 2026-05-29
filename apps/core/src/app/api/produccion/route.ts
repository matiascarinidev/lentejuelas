import { NextRequest, NextResponse } from "next/server";
import { ProduccionService } from "@/services/produccion.service";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      productoId: searchParams.get("productoId") || undefined,
      desde: searchParams.get("desde") || undefined,
      hasta: searchParams.get("hasta") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "20"),
    };

    const resultado = await ProduccionService.listar(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar producción:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener producción" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productoId || !body.recetaId || !body.cantidadPlanificada) {
      return NextResponse.json(
        {
          success: false,
          error: "Producto, receta y cantidad planificada son requeridos",
        },
        { status: 400 }
      );
    }

    if (!body.cantidadReal) {
      body.cantidadReal = body.cantidadPlanificada;
    }

    const lote = await ProduccionService.producir(body);
    return NextResponse.json({ success: true, data: lote }, { status: 201 });
  } catch (error: any) {
    console.error("Error al producir lote:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error al registrar producción",
      },
      { status: 500 }
    );
  }
}
