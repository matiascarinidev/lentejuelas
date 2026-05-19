import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.comandaItem.findMany({
      where: {
        estado: { in: ["PENDIENTE", "EN_PREPARACION"] },
        comanda: { estado: "ABIERTA" },
      },
      include: {
        comanda: {
          include: {
            mesa: { select: { numero: true } },
          },
        },
      },
      orderBy: { comanda: { fechaApertura: "asc" } },
    });

    return NextResponse.json({
      success: true,
      data: items.map((item) => ({
        id: item.id,
        comandaId: item.comandaId,
        mesa: item.comanda.mesa.numero,
        productoId: item.productoId,
        cantidad: item.cantidad,
        estado: item.estado,
        tiempoTranscurrido:
          Date.now() - new Date(item.comanda.fechaApertura).getTime(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al cargar cocina" },
      { status: 500 }
    );
  }
}
