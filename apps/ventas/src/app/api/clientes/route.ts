import { NextRequest, NextResponse } from "next/server";
import { ClienteService } from "@/services/cliente.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resultado = await ClienteService.listar({
      busqueda: searchParams.get("q") || undefined,
      pagina: parseInt(searchParams.get("pagina") || "1"),
      limite: parseInt(searchParams.get("limite") || "30"),
    });
    return NextResponse.json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error while listing clients:", error);
    return NextResponse.json(
      { success: false, error: "Error al listar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.nombre) {
      return NextResponse.json(
        { success: false, error: "Nombre requerido" },
        { status: 400 }
      );
    }
    const cliente = await ClienteService.crear(body);
    return NextResponse.json({ success: true, data: cliente }, { status: 201 });
  } catch (error) {
    console.error("Error while creating client:", error);
    throw error;
  }
}
