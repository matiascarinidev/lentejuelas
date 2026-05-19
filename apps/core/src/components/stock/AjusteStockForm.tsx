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
import { Loader2 } from "lucide-react";

interface AjusteStockFormProps {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AjusteStockForm({
  abierto,
  onClose,
  onSuccess,
}: AjusteStockFormProps) {
  const [tipo, setTipo] = useState("INSUMO");
  const [itemId, setItemId] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [cantidadReal, setCantidadReal] = useState("");
  const [observacion, setObservacion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [stockActual, setStockActual] = useState<number | null>(null);

  useEffect(() => {
    if (tipo === "INSUMO") {
      fetch("/api/insumos?limite=200&activo=true")
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setItems(j.data.insumos);
        });
    } else {
      fetch("/api/productos?limite=200&activo=true")
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setItems(j.data.productos);
        });
    }
  }, [tipo]);

  useEffect(() => {
    const item = items.find((i) => i.id === itemId);
    setStockActual(item ? (item.stockActual ?? 0) : null);
    if (item) setCantidadReal(String(item.stockActual ?? 0));
  }, [itemId, items]);

  const handleAjustar = async () => {
    setGuardando(true);
    try {
      await fetch("/api/stock/ajustar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          tipo,
          cantidadReal: parseFloat(cantidadReal),
          observacion: observacion || undefined,
        }),
      });
      onSuccess();
      onClose();
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajuste Manual de Stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Tipo</Label>
            <Select
              value={tipo}
              onValueChange={(v) => {
                setTipo(v);
                setItemId("");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INSUMO">Insumo</SelectItem>
                <SelectItem value="PRODUCTO">Producto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{tipo === "INSUMO" ? "Insumo" : "Producto"}</Label>
            <Select value={itemId} onValueChange={setItemId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                {items.map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    {i.nombre} — Stock: {i.stockActual ?? 0}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {stockActual !== null && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock actual</Label>
                <Input value={stockActual} disabled />
              </div>
              <div>
                <Label>Nuevo stock real</Label>
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  value={cantidadReal}
                  onChange={(e) => setCantidadReal(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <Label>Observación</Label>
            <Input
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: conteo físico, merma detectada..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAjustar} disabled={guardando || !itemId}>
            {guardando ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Ajustar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
