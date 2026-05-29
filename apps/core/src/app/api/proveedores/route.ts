import { NextRequest, NextResponse } from "next/server";
import { ProveedorService } from "@/services/proveedor.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      busqueda: searchParams.get("q") || undefined,
      activo: searchParams.has("activo")
        ? searchParams.get("activo") === "true"
        : undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "50"),
    };

    const resultado = await ProveedorService.listar(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar proveedores:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener proveedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.nombre) {
      return NextResponse.json(
        { success: false, error: "El nombre es requerido" },
        { status: 400 }
      );
    }
    const proveedor = await ProveedorService.crear(body);
    return NextResponse.json(
      { success: true, data: proveedor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear proveedor" },
      { status: 500 }
    );
  }
}
