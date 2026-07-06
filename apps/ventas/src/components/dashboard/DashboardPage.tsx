"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingCart,
  Coffee,
  Clock,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data);
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  const metodoColor: Record<string, string> = {
    EFECTIVO: "bg-green-100 text-green-800",
    TARJETA: "bg-blue-100 text-blue-800",
    TRANSFERENCIA: "bg-purple-100 text-purple-800",
    OTRO: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ventas hoy
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.ventasHoy || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Facturado hoy
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Number(data?.totalFacturado || 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Mesas ocupadas
            </CardTitle>
            <Coffee className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.mesasActivas || 0}</div>
          </CardContent>
        </Card>

        <Card
          className={
            data?.pedidosPendientes > 0 ? "border-amber-300 bg-amber-50" : ""
          }
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pedidos pendientes
            </CardTitle>
            <Clock
              className={`h-4 w-4 ${data?.pedidosPendientes > 0 ? "text-amber-500" : "text-gray-400"}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${data?.pedidosPendientes > 0 ? "text-amber-600" : ""}`}
            >
              {data?.pedidosPendientes || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Ventas por método de pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data?.totalPorMetodo?.map((m: any) => (
                <div
                  key={m.metodo}
                  className="flex justify-between items-center"
                >
                  <Badge className={metodoColor[m.metodo] || ""}>
                    {m.metodo}
                  </Badge>
                  <span className="font-medium">
                    ${Number(m.total).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Últimas ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data?.ultimasVentas?.map((v: any) => (
                <div key={v.id} className="flex justify-between text-sm">
                  <span>{v.cliente?.nombre || "Mostrador"}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">
                      {format(new Date(v.fecha), "HH:mm", { locale: es })}
                    </span>
                    <span className="font-medium">
                      ${Number(v.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
