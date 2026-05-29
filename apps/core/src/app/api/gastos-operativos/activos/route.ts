import { NextRequest, NextResponse } from "next/server";
import { GastosService } from "@/services/gastos.service";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      activo: searchParams.has("activo")
        ? searchParams.get("activo") === "true"
        : undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "50"),
    };

    const resultado = await GastosService.listarActivos(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener activos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (
      !body.descripcion ||
      body.valorAdquisicion === undefined ||
      !body.vidaUtilTandas
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Descripción, valor y vida útil son requeridos",
        },
        { status: 400 }
      );
    }
    const activo = await GastosService.crearActivo(body);
    return NextResponse.json({ success: true, data: activo }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al crear activo" },
      { status: 500 }
    );
  }
}
