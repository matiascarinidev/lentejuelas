"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Loader2 } from "lucide-react";

export function PuntoEquilibrioCard() {
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/gastos-operativos?prorrateable=true")
        .then((r) => r.json())
        .catch(() => ({ success: false })),
      fetch("/api/gastos-operativos/activos")
        .then((r) => r.json())
        .catch(() => ({ success: false })),
      fetch("/api/produccion/dashboard")
        .then((r) => r.json())
        .catch(() => ({ success: false })),
    ])
      .then(([gastosRes, activosRes, prodRes]) => {
        const gastos = gastosRes.success ? gastosRes.data.gastos : [];
        const activos = activosRes.success ? activosRes.data.activos : [];

        const costosFijosMensuales = gastos.reduce(
          (sum: number, g: any) => sum + Number(g.monto),
          0
        );
        const amortizacionMensual = activos
          .filter((a: any) => a.activo)
          .reduce((sum: number, a: any) => sum + Number(a.costoPorTanda), 0);

        setData({
          costosFijosMensuales,
          amortizacionMensual,
          totalCostosFijos: costosFijosMensuales + amortizacionMensual,
        });
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">
            Punto de equilibrio mensual
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Cargá gastos operativos y activos amortizables para ver el cálculo.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Punto de equilibrio mensual</CardTitle>
        <TrendingUp className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Costos fijos mensuales</span>
          <span className="font-medium">
            ${data.totalCostosFijos.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="ml-4">Gastos operativos</span>
          <span>${data.costosFijosMensuales.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="ml-4">Amortizaciones</span>
          <span>${data.amortizacionMensual.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <p className="text-xs text-gray-500">
            Este valor mensual debe cubrirse con la ganancia bruta de las
            ventas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
