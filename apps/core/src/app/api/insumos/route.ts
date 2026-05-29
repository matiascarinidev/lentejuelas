import { NextRequest, NextResponse } from "next/server";
import { InsumoService } from "@/services/insumo.service";
import { corsResponse } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      tipo: searchParams.get("tipo") || undefined,
      activo: searchParams.has("activo")
        ? searchParams.get("activo") === "true"
        : undefined,
      proveedorId: searchParams.get("proveedorId") || undefined,
      busqueda: searchParams.get("q") || undefined,
      stockBajo: searchParams.get("stockBajo") === "true",
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "20"),
    };

    const resultado = await InsumoService.listar(params);
    return corsResponse({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar insumos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener insumos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nombre || !body.tipo || !body.unidadBase || !body.unidadCompra) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre, tipo, unidad base y unidad de compra son requeridos",
        },
        { status: 400 }
      );
    }

    if (!body.factorConversion || body.factorConversion <= 0) {
      return NextResponse.json(
        { success: false, error: "Factor de conversión debe ser mayor a 0" },
        { status: 400 }
      );
    }

    const insumo = await InsumoService.crear(body);
    return corsResponse({ success: true, data: insumo }, 201);
  } catch (error) {
    console.error("Error al crear insumo:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear insumo" },
      { status: 500 }
    );
  }
}
