import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalLotes = await prisma.produccionLote.count();

    const agregados = await prisma.produccionLote.aggregate({
      _sum: {
        cantidadReal: true,
        costoTotalCalculado: true,
      },
    });

    const ultimosLotes = await prisma.produccionLote.findMany({
      orderBy: { fechaProduccion: "desc" },
      take: 5,
      select: {
        id: true,
        cantidadReal: true,
        costoTotalCalculado: true,
        costoUnitarioFinal: true,
        fechaProduccion: true,
        producto: {
          select: { id: true, nombre: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalLotes,
        totalUnidadesProducidas: agregados._sum.cantidadReal || 0,
        costoTotalHistorico: agregados._sum.costoTotalCalculado || 0,
        stockTotalProductosPropios: 0,
        ultimosLotes,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
