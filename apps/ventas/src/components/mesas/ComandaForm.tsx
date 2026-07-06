"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductoSelector } from "@/components/shared/ProductoSelector";

interface ComandaFormProps {
  abierto: boolean;
  onClose: () => void;
  mesaId: number;
  mesaNumero: number;
  onSuccess: () => void;
}

export function ComandaForm({
  abierto,
  onClose,
  mesaId,
  mesaNumero,
  onSuccess,
}: ComandaFormProps) {
  const [observacion, setObservacion] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [guardando, setGuardando] = useState(false);

  const handleCrear = async () => {
    if (items.length === 0) return;
    setGuardando(true);
    try {
      const res = await fetch("/api/comandas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesaId, observacion: observacion || undefined }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      const comandaId = json.data.id;

      for (const item of items) {
        await fetch(`/api/comandas/${comandaId}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productoId: item.productoId,
            nombre: item.nombre || null,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            esProductoPropio: true,
          }),
        });
      }

      onSuccess();
      onClose();
      setItems([]);
      setObservacion("");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Abrir comanda — Mesa #{mesaNumero}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Observación (opcional)</Label>
            <Input
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: sin sal, bien cocido..."
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
            disabled={guardando || items.length === 0}
          >
            {guardando ? "Abriendo..." : "Abrir comanda"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
