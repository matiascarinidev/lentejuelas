import { NextRequest, NextResponse } from "next/server";
import { RecetaService } from "@/services/receta.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      productoId: searchParams.get("productoId") || undefined,
      activa: searchParams.has("activa")
        ? searchParams.get("activa") === "true"
        : undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "20"),
    };

    const resultado = await RecetaService.listar(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar recetas:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener recetas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productoId) {
      return NextResponse.json(
        { success: false, error: "Producto es requerido" },
        { status: 400 }
      );
    }

    // Si no es variante (no tiene recetaBaseId), necesita al menos un item
    if (!body.recetaBaseId && (!body.items || body.items.length === 0)) {
      return NextResponse.json(
        {
          success: false,
          error: "La receta base necesita al menos un ingrediente",
        },
        { status: 400 }
      );
    }

    const receta = await RecetaService.crear(body);
    return NextResponse.json({ success: true, data: receta }, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear receta:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al crear receta" },
      { status: 500 }
    );
  }
}
