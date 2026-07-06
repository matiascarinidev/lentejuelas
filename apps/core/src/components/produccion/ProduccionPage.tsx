"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Factory, DollarSign, Package, TrendingUp } from "lucide-react";
import { ProduccionLoteTabla } from "./ProduccionLoteTabla";
import { ProduccionForm } from "./ProduccionForm";
import { useProduccion } from "@/hooks/useProduccion";

export function ProduccionPage() {
  const [formAbierto, setFormAbierto] = useState(false);
  const [productos, setProductos] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);

  const { lotes, cargando, error, refetch } = useProduccion();

  useEffect(() => {
    fetch("/api/productos?limite=100&propio=true")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProductos(j.data.productos);
      });
    fetch("/api/produccion/dashboard")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setDashboard(j.data);
      });
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Producción</h1>
          <p className="text-sm text-gray-500 mt-1">
            Lotes, costos y movimiento de stock
          </p>
        </div>
        <Button onClick={() => setFormAbierto(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Producción
        </Button>
      </div>

      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Lotes totales
              </CardTitle>
              <Factory className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.totalLotes}</div>
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
                {dashboard.totalUnidadesProducidas}
              </div>
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
                ${Number(dashboard.costoTotalHistorico).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Stock prod. propios
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard.stockTotalProductosPropios}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <ProduccionLoteTabla
        lotes={lotes}
        cargando={cargando}
        onVer={(id) => {
          // Abrir detalle del lote
          fetch(`/api/produccion/${id}`)
            .then((r) => r.json())
            .then((j) => {
              if (j.success) {
                alert(
                  `Lote #${id.slice(-8)}\n` +
                    `Producto: ${j.data.producto.nombre}\n` +
                    `Cantidad: ${j.data.cantidadReal} unidades\n` +
                    `Costo total: $${Number(j.data.costoTotalCalculado).toFixed(2)}\n` +
                    `Costo unitario: $${Number(j.data.costoUnitarioFinal).toFixed(4)}\n` +
                    `Mat. prima: $${Number(j.data.costoMateriaPrima).toFixed(2)}\n` +
                    `Packaging: $${Number(j.data.costoPackaging).toFixed(2)}\n` +
                    `Operativo: $${Number(j.data.costoOperativo).toFixed(2)}\n` +
                    `Amortización: $${Number(j.data.costoAmortizacion).toFixed(2)}\n` +
                    (j.data.observacion ? `Obs: ${j.data.observacion}` : "")
                );
              }
            });
        }}
      />

      <ProduccionForm
        abierto={formAbierto}
        onClose={() => setFormAbierto(false)}
        onSuccess={() => refetch()}
        productos={productos}
      />
    </div>
  );
}
