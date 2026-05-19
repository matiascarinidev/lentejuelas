"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { POSForm } from "./POSForm";
import { Plus } from "lucide-react";

export function POSPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [formAbierto, setFormAbierto] = useState(false);
  useEffect(() => {
    fetch("/api/pos")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setVentas(j.data.ventas);
      });
  }, []);

  const metodoColor: Record<string, string> = {
    EFECTIVO: "bg-green-100 text-green-800",
    TARJETA: "bg-blue-100 text-blue-800",
    TRANSFERENCIA: "bg-purple-100 text-purple-800",
    OTRO: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Punto de Venta</h1>
        <Button onClick={() => setFormAbierto(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Venta
        </Button>
      </div>
      <div className="space-y-4">
        {ventas.map((venta) => (
          <Card key={venta.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {venta.cliente?.nombre || "Venta mostrador"}
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    {format(new Date(venta.fecha), "dd/MM HH:mm", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={metodoColor[venta.metodoPago]}>
                    {venta.metodoPago}
                  </Badge>
                  <span className="font-bold">
                    ${Number(venta.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {venta.items.map((item: any) => (
                <p key={item.id} className="text-sm text-gray-600">
                  {item.cantidad}x Prod #{item.productoId.slice(-4)} — $
                  {Number(item.subtotal).toFixed(2)}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <POSForm
        abierto={formAbierto}
        onClose={() => setFormAbierto(false)}
        onSuccess={() => {
          setFormAbierto(false);
          // refetch
          fetch("/api/pos")
            .then((r) => r.json())
            .then((j) => {
              if (j.success) setVentas(j.data.ventas);
            });
        }}
      />
    </div>
  );
}
