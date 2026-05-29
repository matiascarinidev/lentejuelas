import { NextRequest, NextResponse } from "next/server";
import { CompraService } from "@/services/compra.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      proveedorId: searchParams.get("proveedorId") || undefined,
      desde: searchParams.get("desde") || undefined,
      hasta: searchParams.get("hasta") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "20"),
    };

    const resultado = await CompraService.listar(params);
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error al listar compras:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener compras" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Al menos un item es requerido" },
        { status: 400 }
      );
    }

    const compra = await CompraService.registrar(body);
    return NextResponse.json({ success: true, data: compra }, { status: 201 });
  } catch (error: any) {
    console.error("Error al registrar compra:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al registrar compra" },
      { status: 500 }
    );
  }
}
