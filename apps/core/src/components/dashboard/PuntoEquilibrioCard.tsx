"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp } from "lucide-react";
import { CardSkeleton } from "../ui/card-skeleton";

export function PuntoEquilibrioCard() {
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/gastos-operativos?prorrateable=true").then((r) => r.json()),
      fetch("/api/gastos-operativos/activos").then((r) => r.json()), // Esta es la que falla
      fetch("/api/produccion/dashboard").then((r) => r.json()),
    ])
      .then(([gastosRes, activosRes, prodRes]) => {
        // ...
      })
      .finally(() => setCargando(false));
  }, []);
  if (cargando) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <CardSkeleton />
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
            ${data?.totalCostosFijos.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="ml-4">Gastos operativos</span>
          <span>${data?.costosFijosMensuales.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="ml-4">Amortizaciones</span>
          <span>${data?.amortizacionMensual.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <p className="text-xs text-gray-500">
            Este valor mensual debe cubrirse con la ganancia bruta de las
            ventas. Completá el cálculo con tu ganancia por pack en la
            simulación de producción.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
