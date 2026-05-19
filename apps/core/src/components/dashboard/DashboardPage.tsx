"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Package,
  DollarSign,
  ShoppingCart,
  Factory,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PuntoEquilibrioCard } from "./PuntoEquilibrioCard";

export function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [predicciones, setPredicciones] = useState<any[]>([]);
  useEffect(() => {
    Promise.all([
      fetch("/api/produccion/dashboard").then((r) => r.json()),
      fetch("/api/stock/dashboard").then((r) => r.json()),
    ])
      .then(([prod, stock]) => {
        setData({
          produccion: prod.success ? prod.data : null,
          stock: stock.success ? stock.data : null,
        });
      })
      .finally(() => setCargando(false));
  }, []);
  useEffect(() => {
    fetch("/api/stock/prediccion")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setPredicciones(j.data);
      });
  }, []);
  if (cargando) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Producción total
            </CardTitle>
            <Factory className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.produccion?.totalLotes || 0}
            </div>
            <p className="text-xs text-gray-500">lotes producidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Unidades producidas
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.produccion?.totalUnidadesProducidas || 0}
            </div>
            <p className="text-xs text-gray-500">totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Costo total histórico
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Number(data?.produccion?.costoTotalHistorico || 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card
          className={
            data?.stock?.alertasStockBajo > 0
              ? "border-amber-300 bg-amber-50"
              : ""
          }
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Alertas stock bajo
            </CardTitle>
            <AlertTriangle
              className={`h-4 w-4 ${data?.stock?.alertasStockBajo > 0 ? "text-amber-500" : "text-gray-400"}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${data?.stock?.alertasStockBajo > 0 ? "text-amber-600" : ""}`}
            >
              {data?.stock?.alertasStockBajo || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Últimos lotes producidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.produccion?.ultimosLotes?.length > 0 ? (
              <div className="space-y-2">
                {data.produccion.ultimosLotes.map((lote: any) => (
                  <div key={lote.id} className="flex justify-between text-sm">
                    <span>{lote.producto.nombre}</span>
                    <span className="text-gray-500">
                      {format(new Date(lote.fechaProduccion), "dd/MM", {
                        locale: es,
                      })}
                      {" — "}
                      {lote.cantidadReal}u
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Sin producción registrada</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Últimos movimientos de stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.stock?.ultimosMovimientos?.length > 0 ? (
              <div className="space-y-2">
                {data.stock.ultimosMovimientos.map((mov: any) => (
                  <div key={mov.id} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          mov.tipo === "ENTRADA" ? "default" : "destructive"
                        }
                        className="text-xs"
                      >
                        {mov.tipo === "ENTRADA" ? "+" : "-"}
                      </Badge>
                      <span>{mov.itemNombre}</span>
                    </div>
                    <span className="text-gray-500">
                      {mov.cantidad} {mov.unidad}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Sin movimientos</p>
            )}
          </CardContent>
        </Card>
        {predicciones.filter((p) => p.estado !== "OK").length > 0 && (
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Predicción de stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {predicciones
                  .filter((p) => p.estado !== "OK")
                  .slice(0, 5)
                  .map((p) => (
                    <div key={p.id} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            p.estado === "CRITICO" ? "destructive" : "outline"
                          }
                        >
                          {p.estado}
                        </Badge>
                        <span>{p.nombre}</span>
                      </div>
                      <span className="text-gray-500">
                        {p.stockActual} {p.unidad}
                        {p.tandasRestantes !== null &&
                          ` — ${p.tandasRestantes} tandas`}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <PuntoEquilibrioCard />
        </div>
        <div className="col-span-2">
          {/* Últimos lotes y movimientos existentes */}
        </div>
      </div>
    </div>
  );
}
