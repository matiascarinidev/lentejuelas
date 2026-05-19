import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "@/services/categoria.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorias = await CategoriaService.listar({
    busqueda: searchParams.get("q") || undefined,
    activo: searchParams.has("activo")
      ? searchParams.get("activo") === "true"
      : undefined,
  });
  return NextResponse.json({ success: true, data: categorias });
}

export async function POST(request: NextRequest) {
  const { nombre } = await request.json();
  if (!nombre)
    return NextResponse.json(
      { success: false, error: "Nombre requerido" },
      { status: 400 }
    );
  const categoria = await CategoriaService.crear(nombre);
  return NextResponse.json({ success: true, data: categoria }, { status: 201 });
}
