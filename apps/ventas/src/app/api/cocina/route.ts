import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filtroEstado = searchParams.get("estado");

    const where: any = {
      comanda: { estado: "ABIERTA" },
    };

    if (filtroEstado) {
      where.estado = filtroEstado;
    } else {
      where.estado = { in: ["PENDIENTE", "EN_PREPARACION"] };
    }

    const items = await prisma.comandaItem.findMany({
      where,
      include: {
        comanda: {
          include: {
            mesa: { select: { numero: true } },
          },
        },
      },
    });

    // Filtrar solo productos que requieren cocina
    const itemsCocina = items.filter((item) => item.esProductoPropio);

    const itemsOrdenados = itemsCocina.sort((a, b) => {
      const tiempoA = Date.now() - new Date(a.createdAt).getTime();
      const tiempoB = Date.now() - new Date(b.createdAt).getTime();

      if (a.estado === "EN_PREPARACION" && b.estado !== "EN_PREPARACION")
        return -1;
      if (a.estado !== "EN_PREPARACION" && b.estado === "EN_PREPARACION")
        return 1;

      if (a.estado === "EN_PREPARACION" && b.estado === "EN_PREPARACION") {
        return tiempoB - tiempoA;
      }

      return tiempoB - tiempoA;
    });

    return NextResponse.json({
      success: true,
      data: itemsOrdenados.map((item) => ({
        id: item.id,
        comandaId: item.comandaId,
        mesa: item.comanda.mesa.numero,
        productoId: item.productoId,
        nombre: item.nombre,
        cantidad: item.cantidad,
        estado: item.estado,
        tiempoTranscurrido: Date.now() - new Date(item.createdAt).getTime(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al cargar cocina" },
      { status: 500 }
    );
  }
}
