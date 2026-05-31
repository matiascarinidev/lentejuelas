import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const totalEfectivo = await prisma.ventaPOS.aggregate({
      _sum: { total: true },
      where: {
        fecha: { gte: hoy, lt: manana },
        metodoPago: "EFECTIVO",
      },
    });

    const efectivoEsperado = Number(totalEfectivo._sum.total || 0);
    const efectivoDeclarado = Number(body.efectivoDeclarado);
    const diferencia = efectivoDeclarado - efectivoEsperado;

    return NextResponse.json({
      success: true,
      data: {
        efectivoEsperado: Math.round(efectivoEsperado * 100) / 100,
        efectivoDeclarado,
        diferencia: Math.round(diferencia * 100) / 100,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error" },
      { status: 500 }
    );
  }
}
