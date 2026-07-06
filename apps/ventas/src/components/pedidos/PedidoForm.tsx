"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductoSelector } from "@/components/shared/ProductoSelector";
import { fetchCore } from "@/lib/api";

interface PedidoFormProps {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PedidoForm({ abierto, onClose, onSuccess }: PedidoFormProps) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [tipo, setTipo] = useState("STOCK");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [observacion, setObservacion] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetch("/api/clientes?limite=100")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setClientes(j.data.clientes);
      });
  }, []);

  const handleCrear = async () => {
    if (!clienteId || items.length === 0) return;
    setGuardando(true);
    try {
      // 1. Crear pedido en Ventas
      const resPedido = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId,
          tipo,
          fechaEntrega: fechaEntrega || undefined,
          items: items.map((i) => ({
            productoId: i.productoId,
            nombre: i.nombre || null,
            cantidad: i.cantidad,
            precioUnitario: i.precioUnitario,
          })),
          observacion: observacion || undefined,
        }),
      });

      const jsonPedido = await resPedido.json();
      if (!jsonPedido.success) throw new Error(jsonPedido.error);

      // 2. Si es ENCARGO, generar orden de producción en Core
      if (tipo === "ENCARGO") {
        for (const item of items) {
          await fetchCore("/produccion/desde-pedido", {
            method: "POST",
            body: JSON.stringify({
              pedidoId: jsonPedido.data.id,
              productoId: item.productoId,
              cantidad: item.cantidad,
            }),
          });
        }
      }
      if (tipo === "STOCK") {
        await fetchCore("/stock/descontar", {
          method: "POST",
          body: JSON.stringify({
            items: items.map((i) => ({
              productoId: i.productoId,
              cantidad: i.cantidad * (i.unidadesPorPack || 1),
            })),
          }),
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Cliente</Label>
            <Select value={clienteId} onValueChange={setClienteId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nombre} {c.telefono ? `(${c.telefono})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STOCK">Stock</SelectItem>
                  <SelectItem value="ENCARGO">Encargo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fecha de entrega</Label>
              <Input
                type="date"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Observación</Label>
            <Input
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
          </div>
          <div>
            <Label>Productos</Label>
            <ProductoSelector items={items} onChange={setItems} />
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleCrear}
            disabled={guardando || !clienteId || items.length === 0}
          >
            {guardando ? "Creando..." : "Crear pedido"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
