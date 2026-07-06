"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { registrarCompra } from "@/hooks/useCompras";
interface CompraFormProps {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
  proveedores: { id: string; nombre: string }[];
}

interface ItemLocal {
  tempId: string;
  insumoId: string;
  cantidadCompra: string;
  precioUnitario: string;
}

export function CompraForm({
  abierto,
  onClose,
  onSuccess,
  proveedores,
}: CompraFormProps) {
  const [proveedorId, setProveedorId] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState<ItemLocal[]>([]);
  const [observacion, setObservacion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [insumosFiltrados, setInsumosFiltrados] = useState<any[]>([]);
  const [cargandoInsumos, setCargandoInsumos] = useState(false);

  useEffect(() => {
    if (!abierto) return;

    const cargarInsumos = async () => {
      setCargandoInsumos(true);
      try {
        const res = await fetch("/api/insumos?limite=200&activo=true");
        const json = await res.json();
        if (json.success) {
          setInsumosFiltrados(
            json.data.insumos.filter(
              (i: any) =>
                i.tipo === "MATERIA_PRIMA" ||
                i.tipo === "ENVASE" ||
                i.tipo === "ETIQUETA"
            )
          );
        }
      } catch {
        setInsumosFiltrados([]);
      } finally {
        setCargandoInsumos(false);
      }
    };

    cargarInsumos();
  }, [abierto]);

  const agregarItem = () => {
    setItems([
      ...items,
      {
        tempId: crypto.randomUUID(),
        insumoId: "",
        cantidadCompra: "",
        precioUnitario: "",
      },
    ]);
  };

  const actualizarItem = (
    tempId: string,
    campo: keyof ItemLocal,
    valor: string
  ) => {
    setItems(
      items.map((item) =>
        item.tempId === tempId ? { ...item, [campo]: valor } : item
      )
    );
  };

  const eliminarItem = (tempId: string) => {
    setItems(items.filter((item) => item.tempId !== tempId));
  };

  const cargarUltimoPrecio = async (tempId: string, insumoId: string) => {
    if (!insumoId) return;
    try {
      const res = await fetch(`/api/insumos/${insumoId}`);
      const json = await res.json();
      if (json.success && json.data?.compraItems?.length > 0) {
        const ultimaCompra = json.data.compraItems[0];
        const precio = Number(ultimaCompra.precioUnitario);
        setItems((prev) =>
          prev.map((item) =>
            item.tempId === tempId
              ? { ...item, precioUnitario: precio.toString() }
              : item
          )
        );
      }
    } catch {
      // silencioso
    }
  };

  const seleccionarInsumo = (tempId: string, insumoId: string) => {
    actualizarItem(tempId, "insumoId", insumoId);
    cargarUltimoPrecio(tempId, insumoId);
  };

  const calcularTotal = () => {
    return items.reduce((sum, item) => {
      const cant = parseFloat(item.cantidadCompra) || 0;
      const precio = parseFloat(item.precioUnitario) || 0;
      return sum + cant * precio;
    }, 0);
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setGuardando(true);
    try {
      await registrarCompra({
        proveedorId: proveedorId === "_sin_proveedor" ? null : proveedorId,
        fecha,
        items: items.map((i) => ({
          insumoId: i.insumoId,
          cantidadCompra: parseFloat(i.cantidadCompra),
          precioUnitario: parseFloat(i.precioUnitario),
        })),
        observacion: observacion || undefined,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const insumoSeleccionado = (insumoId: string) =>
    insumosFiltrados.find((i) => i.id === insumoId);

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Compra</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Proveedor (opcional)</Label>
              <Select value={proveedorId} onValueChange={setProveedorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sin proveedor — compra múltiple" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_sin_proveedor">Sin proveedor</SelectItem>
                  {proveedores.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fecha</Label>
              <Input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base">Items</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={agregarItem}
              >
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </div>

            {cargandoInsumos && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}

            {!cargandoInsumos && items.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">
                Agregá items a la compra.
              </p>
            )}

            {!cargandoInsumos &&
              items.map((item) => {
                const insumo = insumoSeleccionado(item.insumoId);
                const cantidad = parseFloat(item.cantidadCompra) || 0;
                const precio = parseFloat(item.precioUnitario) || 0;
                const subtotal = cantidad * precio;

                return (
                  <Card key={item.tempId}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                        <div className="md:col-span-5">
                          <Label className="text-xs">Insumo</Label>
                          <Select
                            value={item.insumoId}
                            onValueChange={(v) =>
                              seleccionarInsumo(item.tempId, v)
                            }
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {insumosFiltrados.map((i) => (
                                <SelectItem key={i.id} value={i.id}>
                                  {i.nombre} ({i.unidadCompra})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs">
                            Cantidad ({insumo?.unidadCompra || "—"})
                          </Label>
                          <Input
                            type="number"
                            step="0.001"
                            min="0.001"
                            value={item.cantidadCompra}
                            onChange={(e) =>
                              actualizarItem(
                                item.tempId,
                                "cantidadCompra",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs">Precio Unit.</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.precioUnitario}
                            onChange={(e) =>
                              actualizarItem(
                                item.tempId,
                                "precioUnitario",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs">Subtotal</Label>
                          <p className="text-sm font-medium py-2">
                            ${subtotal.toFixed(2)}
                          </p>
                        </div>
                        <div className="md:col-span-1">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => eliminarItem(item.tempId)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          {items.length > 0 && (
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-bold text-lg">Total</span>
              <span className="text-xl font-bold">
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
          )}

          <div>
            <Label>Observación</Label>
            <Textarea
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Notas de la compra..."
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              guardando ||
              items.length === 0 ||
              items.some(
                (i) => !i.insumoId || !i.cantidadCompra || !i.precioUnitario
              )
            }
          >
            {guardando ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Registrar Compra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
