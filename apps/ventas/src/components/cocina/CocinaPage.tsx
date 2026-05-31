"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChefHat, Timer, CheckCircle } from "lucide-react";

export function CocinaPage() {
  const [items, setItems] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cambiando, setCambiando] = useState<string | null>(null);
  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/cocina");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setCargando(false);
  }, []);

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, [fetchItems]);

  const cambiarEstado = async (id: string, estado: string) => {
    setCambiando(id);
    await fetch(`/api/cocina/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    setCambiando(null);
    fetchItems();
  };

  const getEstadoColor = (item: any) => {
    const minutos = item.tiempoTranscurrido / 60000;
    if (minutos > 15) return "border-red-500 bg-red-50";
    if (minutos > 10) return "border-amber-500 bg-amber-50";
    return "";
  };

  const estadoBadge: Record<string, string> = {
    PENDIENTE: "bg-amber-100 text-amber-800",
    EN_PREPARACION: "bg-blue-100 text-blue-800",
    LISTO: "bg-green-100 text-green-800",
  };

  if (cargando) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <ChefHat className="h-16 w-16 mb-4 text-gray-300" />
        <p className="text-lg font-medium">Cocina despejada</p>
        <p className="text-sm">No hay items pendientes</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cocina</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {items.length} pendientes
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className={getEstadoColor(item)}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Mesa {item.mesa}</CardTitle>
                  <Timer className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {Math.floor(item.tiempoTranscurrido / 60000)}min
                  </span>
                </div>
                <Badge className={estadoBadge[item.estado]}>
                  {item.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">
                  {item.cantidad}x #{item.productoId.slice(-4)}
                </p>
                <div className="flex gap-2">
                  {item.estado === "PENDIENTE" && (
                    <Button
                      size="sm"
                      onClick={() => cambiarEstado(item.id, "EN_PREPARACION")}
                      disabled={cambiando === item.id}
                    >
                      {cambiando === item.id ? "..." : "Preparar"}
                    </Button>
                  )}
                  {item.estado === "EN_PREPARACION" && (
                    <Button
                      size="sm"
                      onClick={() => cambiarEstado(item.id, "LISTO")}
                      disabled={cambiando === item.id}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {cambiando === item.id ? (
                        "..."
                      ) : (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4" /> Listo
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
