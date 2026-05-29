import { NextRequest, NextResponse } from "next/server";
import { ProductoService } from "@/services/producto.service";
import { ProductoDTO } from "@/types/producto";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      categoria: searchParams.get("categoria") || undefined,
      activo: searchParams.has("activo")
        ? searchParams.get("activo") === "true"
        : undefined,
      esProduccionPropia: searchParams.has("propio")
        ? searchParams.get("propio") === "true"
        : undefined,
      busqueda: searchParams.get("q") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "20"),
    };

    const resultado = await ProductoService.listar(params);

    return NextResponse.json(
      { success: true, data: resultado },
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3002",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener productos" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3002",
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProductoDTO = await request.json();

    if (!body.nombre || !body.categoriaId) {
      return NextResponse.json(
        { success: false, error: "Nombre y categoría son requeridos" },
        { status: 400 }
      );
    }

    const producto = await ProductoService.crear(body);
    return NextResponse.json(
      { success: true, data: producto },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3002",
        },
      }
    );
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear producto" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3002",
        },
      }
    );
  }
}
