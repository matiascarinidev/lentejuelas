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
import { printTicket } from "@/lib/printTicket";

interface POSFormProps {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function POSForm({ abierto, onClose, onSuccess }: POSFormProps) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!abierto) return;
      if (e.key === "F8" && items.length > 0 && !guardando) {
        e.preventDefault();
        handleCrear();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          '[placeholder="Buscar producto..."]'
        );
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [abierto, items, guardando]);

  const handleCrear = async () => {
    if (items.length === 0) return;
    setGuardando(true);
    try {
      const resVenta = await fetch("/api/pos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: clienteId === "__mostrador" ? null : clienteId || null,
          metodoPago,
          items: items.map((i) => ({
            productoId: i.productoId,
            nombre: i.nombre || null,
            cantidad: i.cantidad,
            precioUnitario: i.precioUnitario,
            esProductoPropio: true,
          })),
          observacion: observacion || undefined,
        }),
      });
      if (!resVenta.ok) {
        const errorText = await resVenta.text();
        throw new Error(errorText || "Error al crear venta");
      }
      const jsonVenta = await resVenta.json();
      if (!jsonVenta.success) throw new Error(jsonVenta.error);

      const resStock = await fetchCore("/stock/descontar", {
        method: "POST",
        body: JSON.stringify({
          items: items.map((i) => ({
            productoId: i.productoId,
            cantidad: i.cantidad * (i.unidadesPorPack || 1),
          })),
        }),
      });

      if (!resStock.success) {
        console.error("No se pudo descontar stock:", resStock.error);
      }

      printTicket({
        id: jsonVenta.data.id,
        fecha: new Date().toISOString(),
        items: jsonVenta.data.items,
        total: jsonVenta.data.total,
        metodoPago,
        cliente: null,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const total = items.reduce(
    (sum, i) => sum + i.cantidad * i.precioUnitario,
    0
  );

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Venta — POS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cliente (opcional)</Label>
              <Select value={clienteId} onValueChange={setClienteId}>
                <SelectTrigger>
                  <SelectValue placeholder="Mostrador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__mostrador">Mostrador</SelectItem>
                  {clientes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Método de pago</Label>
              <Select value={metodoPago} onValueChange={setMetodoPago}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                  <SelectItem value="TARJETA">Tarjeta</SelectItem>
                  <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                  <SelectItem value="OTRO">Otro</SelectItem>
                </SelectContent>
              </Select>
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
          {items.length > 0 && (
            <div className="rounded-lg bg-emerald-50 p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-emerald-900">
                  Total a cobrar
                </span>
                <span className="text-2xl font-bold text-emerald-700">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-emerald-700 mt-1">
                Método: {metodoPago}
              </p>
            </div>
          )}
          <p className="text-xs text-gray-400 text-center">
            F8: Cobrar | Esc: Cerrar | Ctrl+B: Buscar producto
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleCrear}
            disabled={guardando || items.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {guardando ? "Cobrando..." : `Cobrar $${total.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
