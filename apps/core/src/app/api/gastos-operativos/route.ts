import { NextRequest, NextResponse } from "next/server";
import { GastosService } from "@/services/gastos.service";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      prorrateable: searchParams.has("prorrateable")
        ? searchParams.get("prorrateable") === "true"
        : undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "50"),
    };

    const resultado = await GastosService.listarOperativos(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar gastos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener gastos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.concepto || body.monto === undefined) {
      return NextResponse.json(
        { success: false, error: "Concepto y monto son requeridos" },
        { status: 400 }
      );
    }
    const gasto = await GastosService.crearOperativo(body);
    return NextResponse.json({ success: true, data: gasto }, { status: 201 });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear gasto" },
      { status: 500 }
    );
  }
}
