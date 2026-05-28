import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // body: { items: [{ productoId: string, cantidad: number }] }

    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, error: "items requerido" },
        { status: 400 }
      );
    }

    const resultados = [];

    for (const item of body.items) {
      const producto = await prisma.producto.findUnique({
        where: { id: item.productoId },
      });

      if (!producto) {
        return NextResponse.json(
          {
            success: false,
            error: `Producto ${item.productoId} no encontrado`,
          },
          { status: 404 }
        );
      }

      if (producto.stockActual < item.cantidad) {
        return NextResponse.json(
          {
            success: false,
            error: `Stock insuficiente para ${producto.nombre}: ${producto.stockActual} disponible, ${item.cantidad} solicitado`,
          },
          { status: 409 }
        );
      }

      await prisma.producto.update({
        where: { id: item.productoId },
        data: { stockActual: { decrement: item.cantidad } },
      });

      await prisma.movimientoStock.create({
        data: {
          tipo: "SALIDA",
          productoId: item.productoId,
          cantidad: item.cantidad,
          unidad: "UNIDAD",
          fecha: new Date(),
          observacion: `Venta desde POS/Comanda`,
        },
      });

      resultados.push({
        productoId: item.productoId,
        nombre: producto.nombre,
        stockAnterior: producto.stockActual,
        stockNuevo: producto.stockActual - item.cantidad,
      });
    }

    return NextResponse.json({ success: true, data: resultados });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
