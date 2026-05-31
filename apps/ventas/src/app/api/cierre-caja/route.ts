import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const ventas = await prisma.ventaPOS.findMany({
      where: { fecha: { gte: hoy, lt: manana } },
      include: { items: true, cliente: { select: { nombre: true } } },
      orderBy: { fecha: "asc" },
    });

    const totalPorMetodo = await prisma.ventaPOS.groupBy({
      by: ["metodoPago"],
      _sum: { total: true },
      where: { fecha: { gte: hoy, lt: manana } },
    });

    const totalGeneral = ventas.reduce((sum, v) => sum + Number(v.total), 0);
    const cantidadVentas = ventas.length;

    return NextResponse.json({
      success: true,
      data: {
        fecha: hoy.toISOString(),
        cantidadVentas,
        totalGeneral: Math.round(totalGeneral * 100) / 100,
        totalPorMetodo: totalPorMetodo.map((m) => ({
          metodo: m.metodoPago,
          total: Math.round(Number(m._sum.total || 0) * 100) / 100,
        })),
        ventas,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al generar cierre" },
      { status: 500 }
    );
  }
}
