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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calculator, Package } from "lucide-react";

interface ProductoFormProps {
  abierto: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  producto?: any;
}

export function ProductoForm({
  abierto,
  onClose,
  onSubmit,
  producto,
}: ProductoFormProps) {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [esPropio, setEsPropio] = useState(true);
  const [costoCompra, setCostoCompra] = useState("");
  const [margen, setMargen] = useState("30");
  const [precioVentaSugerido, setPrecioVentaSugerido] = useState("");
  const [precioVentaFinal, setPrecioVentaFinal] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [costoProduccion, setCostoProduccion] = useState<any>(null);
  const [cargandoCosto, setCargandoCosto] = useState(false);
  const [margenPropio, setMargenPropio] = useState("30");

  useEffect(() => {
    fetch("/api/categorias?activo=true")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setCategorias(j.data);
      });
  }, []);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre || "");
      setCategoriaId(producto.categoriaId || producto.categoria?.id || "");
      setEsPropio(producto.esProduccionPropia);
      setCostoCompra(producto.costoCompra?.toString() || "");
      setMargen(producto.margenGanancia?.toString() || "30");
      setMargenPropio(producto.margenGanancia?.toString() || "30");
      setPrecioVentaSugerido(producto.precioVentaSugerido?.toString() || "");
      setPrecioVentaFinal(producto.precioVentaFinal?.toString() || "");
      setCostoProduccion(null);
    } else {
      setNombre("");
      setCategoriaId("");
      setEsPropio(true);
      setCostoCompra("");
      setMargen("30");
      setPrecioVentaSugerido("");
      setPrecioVentaFinal("");
      setCostoProduccion(null);
    }
  }, [producto, abierto]);

  // Calcular precio sugerido para productos de terceros
  useEffect(() => {
    if (!esPropio && costoCompra && margen) {
      const costo = parseFloat(costoCompra) || 0;
      const m = parseFloat(margen) || 0;
      setPrecioVentaSugerido((costo * (1 + m / 100)).toFixed(2));
    }
  }, [esPropio, costoCompra, margen]);

  // Cargar costo de producción para productos propios
  useEffect(() => {
    if (esPropio && producto?.id && abierto) {
      setCargandoCosto(true);
      fetch(`/api/productos/${producto.id}/costo`)
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setCostoProduccion(j.data);
        })
        .catch(() => setCostoProduccion(null))
        .finally(() => setCargandoCosto(false));
    } else if (esPropio && !producto?.id) {
      setCostoProduccion(null);
    }
  }, [esPropio, producto?.id, abierto]);
  //Calcular el precio sugerido cuando cambia el margen o el costo
  useEffect(() => {
    if (esPropio && costoProduccion) {
      const costoBase =
        costoProduccion.costoPackCompleto > 0 && costoProduccion.unidadesPorPack
          ? costoProduccion.costoPackCompleto
          : costoProduccion.costoUnitario;
      const m = parseFloat(margenPropio) || 0;
      setPrecioVentaSugerido((costoBase * (1 + m / 100)).toFixed(2));
    }
  }, [esPropio, costoProduccion, margenPropio]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await onSubmit({
        nombre,
        categoriaId: categoriaId || null,
        esProduccionPropia: esPropio,
        costoCompra: !esPropio ? parseFloat(costoCompra) : null,
        margenGanancia: esPropio
          ? parseFloat(margenPropio)
          : parseFloat(margen),
        precioVentaSugerido: parseFloat(precioVentaSugerido) || 0,
        precioVentaFinal: precioVentaFinal
          ? parseFloat(precioVentaFinal)
          : null,
      });
      onClose();
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {producto ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Categoría</Label>
            <Select value={categoriaId} onValueChange={setCategoriaId}>
              <SelectTrigger>
                <SelectValue placeholder="Sin categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_sin_categoria">Sin categoría</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="esPropio"
              checked={esPropio}
              onChange={(e) => setEsPropio(e.target.checked)}
              className="rounded border-gray-300 h-4 w-4"
            />
            <Label htmlFor="esPropio">Producción propia</Label>
          </div>

          {esPropio && producto?.id && cargandoCosto && (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculando costo de producción actual...
            </div>
          )}

          {esPropio && costoProduccion && (
            <>
              <div className="rounded-lg bg-blue-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Costo de producción actual
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">
                    Por unidad (x{costoProduccion.rendimientoBase}u):
                  </span>
                  <span className="font-medium text-blue-900">
                    ${costoProduccion.costoUnitario.toFixed(2)}
                  </span>
                </div>
                {costoProduccion.costoPackCompleto > 0 &&
                  costoProduccion.unidadesPorPack && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">
                        Por pack (x{costoProduccion.unidadesPorPack}u):
                      </span>
                      <span className="font-medium text-blue-900">
                        ${costoProduccion.costoPackCompleto.toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Margen de ganancia (%)</Label>
                  <Select
                    value={margenPropio}
                    onValueChange={(v) => setMargenPropio(v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[30, 40, 50, 60, 70, 80, 100].map((m) => (
                        <SelectItem key={m} value={String(m)}>
                          {m}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Precio de venta sugerido</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={precioVentaSugerido}
                    onChange={(e) => setPrecioVentaSugerido(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Calculado: costo + {margenPropio}% = $
                    {costoProduccion.costoPackCompleto > 0
                      ? (
                          costoProduccion.costoPackCompleto *
                          (1 + parseFloat(margenPropio) / 100)
                        ).toFixed(2) + " (pack)"
                      : (
                          costoProduccion.costoUnitario *
                          (1 + parseFloat(margenPropio) / 100)
                        ).toFixed(2) + " (unidad)"}
                  </p>
                </div>
              </div>
            </>
          )}

          {esPropio && !producto?.id && (
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
              <p>
                El costo de producción se calculará cuando el producto tenga una
                receta activa. Guardá el producto primero y luego creá su
                receta.
              </p>
            </div>
          )}

          {!esPropio && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Costo de compra</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={costoCompra}
                  onChange={(e) => setCostoCompra(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Margen (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={margen}
                  onChange={(e) => setMargen(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <Separator />

          <div>
            <Label>Precio de venta sugerido</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={precioVentaSugerido}
              onChange={(e) => setPrecioVentaSugerido(e.target.value)}
            />
            {!esPropio && (
              <p className="text-xs text-gray-500 mt-1">
                Calculado: costo + {margen}%
              </p>
            )}
            {esPropio && (
              <p className="text-xs text-gray-500 mt-1">
                Ingresá manualmente o usá el simulador para calcularlo.
              </p>
            )}
          </div>

          <div>
            <Label>Precio de venta final (precio de lista)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={precioVentaFinal}
              onChange={(e) => setPrecioVentaFinal(e.target.value)}
              placeholder="Precio real al que se vende"
            />
            <p className="text-xs text-gray-500 mt-1">
              Este es el precio que se muestra en el menú y se usa en Ventas.
            </p>
          </div>

          <DialogFooter className="flex flex-col gap-2">
            <Button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
