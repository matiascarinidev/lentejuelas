import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // body: { pedidoId: string, productoId: string, cantidad: number }

    if (!body.productoId || !body.cantidad) {
      return NextResponse.json(
        { success: false, error: "productoId y cantidad requeridos" },
        { status: 400 }
      );
    }

    // Buscar receta activa para ese producto
    const receta = await prisma.receta.findFirst({
      where: {
        productoId: body.productoId,
        activa: true,
      },
      orderBy: { fechaVigenciaInicio: "desc" },
    });

    if (!receta) {
      return NextResponse.json(
        { success: false, error: "No hay receta activa para este producto" },
        { status: 404 }
      );
    }

    // Crear lote de producción planificado
    const lote = await prisma.produccionLote.create({
      data: {
        productoId: body.productoId,
        recetaId: receta.id,
        cantidadPlanificada: body.cantidad,
        cantidadReal: 0,
        costoTotalCalculado: 0,
        costoUnitarioFinal: 0,
        observacion: `Pedido #${body.pedidoId || "manual"} — Pendiente de producción`,
      },
    });

    return NextResponse.json({ success: true, data: lote }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
