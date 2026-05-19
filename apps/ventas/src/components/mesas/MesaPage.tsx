"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Coffee, PlusCircle } from "lucide-react";
import { ComandaForm } from "./ComandaForm";
import { ProductoSelector } from "@/components/shared/ProductoSelector";
import { fetchCore } from "@/lib/api";

export function MesaPage() {
  const [mesas, setMesas] = useState<any[]>([]);
  const [comandaAbierta, setComandaAbierta] = useState<any>(null);
  const [formAbierto, setFormAbierto] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<any>(null);
  const [agregandoItems, setAgregandoItems] = useState(false);
  const [itemsAdicionales, setItemsAdicionales] = useState<any[]>([]);

  const fetchMesas = async () => {
    const res = await fetch("/api/mesas");
    const json = await res.json();
    if (json.success) setMesas(json.data);
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const crearMesa = async () => {
    const numero = mesas.length + 1;
    await fetch("/api/mesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero }),
    });
    fetchMesas();
  };

  const abrirComanda = (mesa: any) => {
    setMesaSeleccionada(mesa);
    setFormAbierto(true);
  };

  const verComanda = async (mesa: any) => {
    if (mesa.comandas?.length > 0) {
      const res = await fetch(`/api/comandas/${mesa.comandas[0].id}`);
      const json = await res.json();
      if (json.success) setComandaAbierta(json.data);
    }
  };

  const cerrarComanda = async () => {
    if (!comandaAbierta) return;

    await fetch(`/api/comandas/${comandaAbierta.id}/cerrar`, {
      method: "POST",
    });

    if (comandaAbierta.items?.length > 0) {
      // Obtener info de productos desde Core para saber unidadesPorPack
      const resProductos = await fetchCore("/productos?limite=100&activo=true");
      const productosCore = resProductos.success
        ? resProductos.data.productos
        : [];

      const itemsParaDescontar = comandaAbierta.items.map((item: any) => {
        const producto = productosCore.find(
          (p: any) => p.id === item.productoId
        );
        const unidadesPorPack = producto?.recetas?.[0]?.unidadesPorPack || 1;
        return {
          productoId: item.productoId,
          cantidad: item.cantidad * unidadesPorPack,
        };
      });

      await fetchCore("/stock/descontar", {
        method: "POST",
        body: JSON.stringify({ items: itemsParaDescontar }),
      });
    }

    setComandaAbierta(null);
    fetchMesas();
  };

  const agregarItemsAComanda = async () => {
    if (!comandaAbierta || itemsAdicionales.length === 0) return;
    for (const item of itemsAdicionales) {
      await fetch(`/api/comandas/${comandaAbierta.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          esProductoPropio: true,
        }),
      });
    }
    setAgregandoItems(false);
    setItemsAdicionales([]);
    const res = await fetch(`/api/comandas/${comandaAbierta.id}`);
    const json = await res.json();
    if (json.success) setComandaAbierta(json.data);
    fetchMesas();
  };

  const estadoColor: Record<string, string> = {
    LIBRE: "bg-green-100 text-green-800",
    OCUPADA: "bg-red-100 text-red-800",
    RESERVADA: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mesas</h1>
        <Button onClick={crearMesa}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {mesas.map((mesa) => (
          <Card key={mesa.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mesa #{mesa.numero}</CardTitle>
                <Badge className={estadoColor[mesa.estado] || ""}>
                  {mesa.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {mesa.comandas?.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Comanda activa</p>
                  {mesa.comandas[0].items?.slice(0, 3).map((item: any) => (
                    <p key={item.id} className="text-sm text-gray-500">
                      {item.cantidad}x Prod #{item.productoId.slice(-4)} — $
                      {Number(item.subtotal).toFixed(2)}
                    </p>
                  ))}
                  {mesa.comandas[0].items?.length > 3 && (
                    <p className="text-xs text-gray-400">
                      +{mesa.comandas[0].items.length - 3} items más
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-bold">
                      Total: ${Number(mesa.comandas[0].total).toFixed(2)}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => verComanda(mesa)}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Sin comandas activas</p>
                  {mesa.estado === "LIBRE" && (
                    <Button size="sm" onClick={() => abrirComanda(mesa)}>
                      <Coffee className="mr-1 h-4 w-4" /> Abrir comanda
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <ComandaForm
        abierto={formAbierto}
        onClose={() => {
          setFormAbierto(false);
          setMesaSeleccionada(null);
        }}
        mesaId={mesaSeleccionada?.id ?? 0}
        mesaNumero={mesaSeleccionada?.numero ?? 0}
        onSuccess={fetchMesas}
      />

      {/* Dialog ver comanda detalle */}
      <Dialog
        open={!!comandaAbierta}
        onOpenChange={() => setComandaAbierta(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Comanda — Mesa #{comandaAbierta?.mesa?.numero}
            </DialogTitle>
          </DialogHeader>
          {comandaAbierta && (
            <div className="space-y-4">
              <div className="space-y-2">
                {comandaAbierta.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.cantidad}x Prod #{item.productoId.slice(-4)}
                    </span>
                    <span>${Number(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${Number(comandaAbierta.total).toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAgregandoItems(true)}
                >
                  <PlusCircle className="mr-1 h-4 w-4" /> Agregar items
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={cerrarComanda}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Cerrar y cobrar
                </Button>
              </div>
              {agregandoItems && (
                <div className="space-y-3 border-t pt-3">
                  <ProductoSelector
                    items={itemsAdicionales}
                    onChange={setItemsAdicionales}
                  />
                  <Button
                    size="sm"
                    onClick={agregarItemsAComanda}
                    disabled={itemsAdicionales.length === 0}
                  >
                    Agregar a comanda
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
