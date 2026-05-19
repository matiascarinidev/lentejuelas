import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const [
      ventasHoy,
      totalFacturado,
      mesasActivas,
      pedidosPendientes,
      ultimasVentas,
      productosVendidos,
    ] = await Promise.all([
      prisma.ventaPOS.count({
        where: { fecha: { gte: hoy, lt: manana } },
      }),
      prisma.ventaPOS.aggregate({
        _sum: { total: true },
        where: { fecha: { gte: hoy, lt: manana } },
      }),
      prisma.mesa.count({
        where: { estado: "OCUPADA", activo: true },
      }),
      prisma.pedido.count({
        where: { estado: { in: ["PENDIENTE", "EN_PRODUCCION"] } },
      }),
      prisma.ventaPOS.findMany({
        orderBy: { fecha: "desc" },
        take: 5,
        include: {
          cliente: { select: { nombre: true } },
        },
      }),
      prisma.ventaPOSItem.groupBy({
        by: ["productoId"],
        _sum: { cantidad: true },
        orderBy: { _sum: { cantidad: "desc" } },
        take: 5,
        where: { ventaPOS: { fecha: { gte: hoy, lt: manana } } },
      }),
    ]);

    const totalPorMetodo = await prisma.ventaPOS.groupBy({
      by: ["metodoPago"],
      _sum: { total: true },
      where: { fecha: { gte: hoy, lt: manana } },
    });

    const comandasHoy = await prisma.comanda.count({
      where: {
        fechaApertura: { gte: hoy, lt: manana },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ventasHoy,
        totalFacturado: totalFacturado._sum.total || 0,
        mesasActivas,
        pedidosPendientes,
        comandasHoy,
        totalPorMetodo: totalPorMetodo.map((m) => ({
          metodo: m.metodoPago,
          total: m._sum.total || 0,
        })),
        ultimasVentas,
        productosVendidos,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al cargar dashboard" },
      { status: 500 }
    );
  }
}
