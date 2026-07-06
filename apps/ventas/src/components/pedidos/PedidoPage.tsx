"use client";

import { useState, useEffect } from "react";
import { PedidoForm } from "./PedidoForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { printTicket } from "@/lib/printTicket";

export function PedidoPage() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [formAbierto, setFormAbierto] = useState(false);

  const fetchPedidos = async () => {
    const params = new URLSearchParams();
    if (filtroEstado && filtroEstado !== "TODOS")
      params.set("estado", filtroEstado);
    const res = await fetch(`/api/pedidos?${params}`);
    const json = await res.json();
    if (json.success) setPedidos(json.data.pedidos);
  };

  useEffect(() => {
    fetchPedidos();
  }, [filtroEstado]);

  const cambiarEstado = async (id: string, estado: string) => {
    await fetch(`/api/pedidos/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });

    if (estado === "LISTO") {
      const pedido = pedidos.find((p: any) => p.id === id);
      if (pedido) {
        printTicket({
          id: pedido.id,
          fecha: new Date().toISOString(),
          items: pedido.items.map((item: any) => ({
            productoId: item.productoId,
            nombre: item.nombre || undefined,
            cantidad: item.cantidad,
            precioUnitario: Number(item.precioUnitario),
            subtotal: Number(item.subtotal),
          })),
          total: Number(pedido.total),
          metodoPago: "PENDIENTE",
          cliente: pedido.cliente,
        });
      }
    }

    fetchPedidos();
  };

  const estadoColor: Record<string, string> = {
    PENDIENTE: "bg-amber-100 text-amber-800",
    EN_PRODUCCION: "bg-blue-100 text-blue-800",
    LISTO: "bg-green-100 text-green-800",
    ENTREGADO: "bg-gray-100 text-gray-800",
    CANCELADO: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <div className="flex flex-col gap-4 md:flex-row  md:items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Button onClick={() => setFormAbierto(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Pedido
        </Button>
      </div>
      <div className="w-full md:w-48">
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos</SelectItem>
            <SelectItem value="PENDIENTE">Pendiente</SelectItem>
            <SelectItem value="EN_PRODUCCION">En producción</SelectItem>
            <SelectItem value="LISTO">Listo</SelectItem>
            <SelectItem value="ENTREGADO">Entregado</SelectItem>
            <SelectItem value="CANCELADO">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <Card key={pedido.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-row gap-2 md:self-end">
                <Badge>{pedido.tipo}</Badge>
                <Badge className={estadoColor[pedido.estado]}>
                  {pedido.estado}
                </Badge>
              </div>
              <div className="flex flex-col gap-4 md:flex-row  md:items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {pedido.cliente.nombre}
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    {format(new Date(pedido.fecha), "dd/MM HH:mm", {
                      locale: es,
                    })}
                    {pedido.fechaEntrega &&
                      ` — Entrega: ${format(new Date(pedido.fechaEntrega), "dd/MM", { locale: es })}`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">
                    ${Number(pedido.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-3">
                {pedido.items.map((item: any) => (
                  <p key={item.id} className="text-sm text-gray-600">
                    {item.cantidad}x {item.nombre} — $
                    {Number(item.subtotal).toFixed(2)}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                {pedido.estado === "PENDIENTE" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cambiarEstado(pedido.id, "EN_PRODUCCION")}
                  >
                    Iniciar producción
                  </Button>
                )}
                {pedido.estado === "EN_PRODUCCION" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cambiarEstado(pedido.id, "LISTO")}
                  >
                    Marcar listo
                  </Button>
                )}
                {pedido.estado === "LISTO" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cambiarEstado(pedido.id, "ENTREGADO")}
                  >
                    Marcar entregado
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <PedidoForm
        abierto={formAbierto}
        onClose={() => setFormAbierto(false)}
        onSuccess={() => {
          setFormAbierto(false);
          fetchPedidos();
        }}
      />
    </div>
  );
}
