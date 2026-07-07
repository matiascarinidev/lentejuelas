"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Coffee, X, PlusCircle, CheckCircle } from "lucide-react";
import { ComandaForm } from "./ComandaForm";
import { ProductoSelector } from "@/components/shared/ProductoSelector";
import { printTicket } from "@/lib/printTicket";
import { fetchCore } from "@/lib/api";

export function MesaPage() {
  const [mesas, setMesas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [comandaAbierta, setComandaAbierta] = useState<any>(null);
  const [formAbierto, setFormAbierto] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<any>(null);
  const [agregandoItems, setAgregandoItems] = useState(false);
  const [itemsAdicionales, setItemsAdicionales] = useState<any[]>([]);
  const [creando, setCreando] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const [itemsListosPrevios, setItemsListosPrevios] = useState(0);
  const [agregando, setAgregando] = useState(false);

  const fetchMesas = async () => {
    const res = await fetch("/api/mesas");
    const json = await res.json();
    if (json.success) setMesas(json.data);
    setCargando(false);
  };

  useEffect(() => {
    fetchMesas();
    const interval = setInterval(fetchMesas, 15000);
    return () => clearInterval(interval);
  }, []);

  // Notificación sonora cuando aparecen nuevos items listos
  useEffect(() => {
    const totalListos = mesas.reduce((sum: number, mesa: any) => {
      if (mesa.comandas?.length > 0) {
        return (
          sum +
          mesa.comandas[0].items?.filter((item: any) => item.estado === "LISTO")
            .length
        );
      }
      return sum;
    }, 0);

    if (totalListos > itemsListosPrevios && itemsListosPrevios >= 0) {
      try {
        const audio = new Audio("/notification.mp3");
        audio.play().catch(() => {});
      } catch {}
    }

    setItemsListosPrevios(totalListos);
  }, [mesas]);

  const crearMesa = async () => {
    setCreando(true);
    const numero = mesas.length + 1;
    const res = await fetch("/api/mesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero }),
    });
    if (res.ok) await fetchMesas();
    setCreando(false);
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

  const entregarItem = async (itemId: string) => {
    await fetch(`/api/cocina/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: "ENTREGADO" }),
    });

    if (comandaAbierta) {
      const res = await fetch(`/api/comandas/${comandaAbierta.id}`);
      const json = await res.json();
      if (json.success) setComandaAbierta(json.data);
    }
    fetchMesas();
  };

  const cerrarComanda = async () => {
    if (!comandaAbierta) return;
    setCerrando(true);

    await fetch(`/api/comandas/${comandaAbierta.id}/cerrar`, {
      method: "POST",
    });

    if (comandaAbierta.items?.length > 0) {
      const itemsParaDescontar = comandaAbierta.items.map((item: any) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
      }));

      await fetchCore("/stock/descontar", {
        method: "POST",
        body: JSON.stringify({ items: itemsParaDescontar }),
      });
    }

    printTicket({
      id: comandaAbierta.id,
      fecha: new Date().toISOString(),
      items: comandaAbierta.items.map((item: any) => ({
        productoId: item.productoId,
        nombre: item.nombre || undefined,
        cantidad: item.cantidad,
        precioUnitario: Number(item.precioUnitario),
        subtotal: Number(item.subtotal),
      })),
      total: Number(comandaAbierta.total),
      metodoPago: "EFECTIVO",
      mesa: comandaAbierta.mesa?.numero,
    });

    setComandaAbierta(null);
    setCerrando(false);
    fetchMesas();
  };

  const agregarItemsAComanda = async () => {
    if (!comandaAbierta || itemsAdicionales.length === 0) return;
    setAgregando(true);
    try {
      for (const item of itemsAdicionales) {
        const res = await fetch(`/api/comandas/${comandaAbierta.id}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productoId: item.productoId,
            nombre: item.nombre || null,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            requiereCocina: item.requiereCocina ?? false,
            esProductoPropio: item.esProductoPropio ?? true,
          }),
        });

        const json = await res.json();
        if (!json.success) {
          alert("Error al agregar item: " + json.error);
          return;
        }
      }

      setAgregandoItems(false);
      setItemsAdicionales([]);

      const res = await fetch(`/api/comandas/${comandaAbierta.id}`);
      const json = await res.json();
      if (json.success) setComandaAbierta(json.data);
      fetchMesas();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setAgregando(false);
    }
  };

  const todosEntregados = comandaAbierta?.items?.every(
    (item: any) => item.estado === "ENTREGADO" || item.estado === "CANCELADO"
  );

  const estadoColor: Record<string, string> = {
    LIBRE: "bg-green-100 text-green-800",
    OCUPADA: "bg-red-100 text-red-800",
    RESERVADA: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mesas</h1>
        <Button onClick={crearMesa} disabled={creando}>
          {creando ? (
            "Agregando..."
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Agregar Mesa
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4">
        {cargando
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-24" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          : mesas.map((mesa) => (
              <Card key={mesa.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Mesa #{mesa.numero}
                    </CardTitle>
                    <Badge className={estadoColor[mesa.estado] || ""}>
                      {mesa.estado}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {mesa.comandas?.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2 flex-wrap">
                        <p className="text-sm font-medium">Comanda activa</p>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {mesa.comandas[0].items?.filter(
                            (item: any) => item.estado === "LISTO"
                          ).length > 0 && (
                            <Badge className="bg-emerald-100 text-emerald-800 animate-pulse text-xs">
                              {
                                mesa.comandas[0].items.filter(
                                  (item: any) => item.estado === "LISTO"
                                ).length
                              }{" "}
                              listo
                            </Badge>
                          )}
                          {mesa.comandas[0].items?.filter(
                            (item: any) =>
                              item.estado === "PENDIENTE" ||
                              item.estado === "EN_PREPARACION"
                          ).length > 0 && (
                            <Badge className="text-xs bg-amber-100 text-amber-800">
                              {
                                mesa.comandas[0].items.filter(
                                  (item: any) =>
                                    item.estado === "PENDIENTE" ||
                                    item.estado === "EN_PREPARACION"
                                ).length
                              }{" "}
                              pendiente
                            </Badge>
                          )}
                          {mesa.comandas[0].items?.filter(
                            (item: any) => item.estado === "ENTREGADO"
                          ).length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {
                                mesa.comandas[0].items.filter(
                                  (item: any) => item.estado === "ENTREGADO"
                                ).length
                              }{" "}
                              entregado
                            </Badge>
                          )}
                        </div>
                      </div>
                      {mesa.comandas[0].items?.slice(0, 3).map((item: any) => (
                        <p key={item.id} className="text-sm text-gray-500">
                          {item.cantidad}x{" "}
                          {item.nombre || `Prod #${item.productoId.slice(-4)}`}
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verComanda(mesa)}
                        >
                          Ver
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        Sin comandas activas
                      </p>
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
        {creando && (
          <Card className="opacity-50">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        )}
      </div>

      <ComandaForm
        abierto={formAbierto}
        onClose={() => {
          setFormAbierto(false);
          setMesaSeleccionada(null);
        }}
        mesaId={mesaSeleccionada?.id || 0}
        mesaNumero={mesaSeleccionada?.numero || 0}
        onSuccess={fetchMesas}
      />

      {/* Dialog ver comanda detalle */}
      <Dialog
        open={!!comandaAbierta}
        onOpenChange={() => setComandaAbierta(null)}
      >
        <DialogContent className="max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Comanda — Mesa #{comandaAbierta?.mesa?.numero}
            </DialogTitle>
          </DialogHeader>
          {comandaAbierta && (
            <div className="space-y-4">
              <div className="space-y-2">
                {comandaAbierta.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm border-b pb-2"
                  >
                    <div>
                      <Badge
                        className={
                          item.estado === "LISTO"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.estado === "EN_PREPARACION"
                              ? "bg-blue-100 text-blue-800"
                              : item.estado === "ENTREGADO"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-amber-100 text-amber-800"
                        }
                      >
                        {item.estado === "LISTO"
                          ? "Listo"
                          : item.estado === "EN_PREPARACION"
                            ? "En preparación"
                            : item.estado === "ENTREGADO"
                              ? "Entregado"
                              : "Pendiente"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.cantidad}x{" "}
                        {item.nombre || `Prod #${item.productoId.slice(-4)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>${Number(item.subtotal).toFixed(2)}</span>
                      {item.estado === "LISTO" && item.esProductoPropio && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 h-7 text-xs"
                          onClick={() => entregarItem(item.id)}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" /> Entregar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${Number(comandaAbierta.total).toFixed(2)}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAgregandoItems(true)}
                >
                  <PlusCircle className="mr-1 h-4 w-4" /> Agregar items
                </Button>
                {todosEntregados ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={cerrarComanda}
                    disabled={cerrando}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {cerrando ? "Cerrando..." : "Cerrar y cobrar"}
                  </Button>
                ) : (
                  <p className="text-xs text-amber-600 self-center">
                    Entregá todos los items antes de cerrar
                  </p>
                )}
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
                    disabled={itemsAdicionales.length === 0 || agregando}
                  >
                    {agregando ? "Agregando..." : "Agregar items a comanda"}
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
