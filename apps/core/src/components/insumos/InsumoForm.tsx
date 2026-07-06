"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputValidated } from "@/components/ui/input-validated";
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
import { TipoInsumo, UnidadMedida } from "@lentejuelas/shared";
import { InsumoResponse } from "@/types/insumo";

interface InsumoFormProps {
  abierto: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  insumo?: InsumoResponse | null;
  proveedores: { id: string; nombre: string }[];
}

export function InsumoForm({
  abierto,
  onClose,
  onSubmit,
  insumo,
  proveedores,
}: InsumoFormProps) {
  const [nombre, setNombre] = useState(insumo?.nombre || "");
  const [tipo, setTipo] = useState(insumo?.tipo || TipoInsumo.MATERIA_PRIMA);
  const [unidadBase, setUnidadBase] = useState(
    insumo?.unidadBase || UnidadMedida.GRAMOS
  );
  const [unidadCompra, setUnidadCompra] = useState(
    insumo?.unidadCompra || UnidadMedida.BOLSA
  );
  const [factorConversion, setFactorConversion] = useState(
    insumo?.factorConversion?.toString() || "1"
  );
  const [costoUnitario, setCostoUnitario] = useState(
    insumo?.costoUnitarioEstimado?.toString() || "0"
  );
  const [stockMinimo, setStockMinimo] = useState(
    insumo?.stockMinimo?.toString() || "0"
  );
  const [proveedorId, setProveedorId] = useState(insumo?.proveedorId || "");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (insumo) {
      setNombre(insumo.nombre);
      setTipo(insumo.tipo);
      setUnidadBase(insumo.unidadBase);
      setUnidadCompra(insumo.unidadCompra);
      setFactorConversion(insumo.factorConversion.toString());
      setCostoUnitario(insumo.costoUnitarioEstimado.toString());
      setStockMinimo(insumo.stockMinimo.toString());
      setProveedorId(insumo.proveedorId || "");
    }
  }, [insumo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await onSubmit({
        nombre,
        tipo,
        unidadBase,
        unidadCompra,
        factorConversion: parseFloat(factorConversion),
        costoUnitarioEstimado: parseFloat(costoUnitario),
        stockMinimo: parseFloat(stockMinimo),
        proveedorId:
          proveedorId === "__ninguno__" ? undefined : proveedorId || undefined,
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
          <DialogTitle>{insumo ? "Editar Insumo" : "Nuevo Insumo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <InputValidated
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <Select
                value={tipo}
                onValueChange={(value) => setTipo(value as TipoInsumo)}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TipoInsumo).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Proveedor</label>
              <Select value={proveedorId} onValueChange={setProveedorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sin proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_ninguno_">Sin proveedor</SelectItem>
                  {proveedores.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Unidad Base (recetas)
              </label>
              <Select
                value={unidadBase}
                onValueChange={(value) => setUnidadBase(value as UnidadMedida)}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UnidadMedida).map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Unidad Compra</label>
              <Select
                value={unidadCompra}
                onValueChange={(value) =>
                  setUnidadCompra(value as UnidadMedida)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UnidadMedida).map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Factor de Conversión (1 {unidadCompra} = {factorConversion || "?"}{" "}
              {unidadBase})
            </label>
            <InputValidated
              type="number"
              step="0.0001"
              min="0.0001"
              value={factorConversion}
              onChange={(e) => setFactorConversion(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ej: Si comprás harina por bolsa de 25kg y medís en gramos, el
              factor es 25000
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Costo Unitario Estimado (por {unidadBase}) — Opcional
              </label>
              <InputValidated
                type="number"
                step="0.0001"
                min="0"
                value={costoUnitario}
                onChange={(e) => setCostoUnitario(e.target.value)}
                placeholder="Se actualiza automáticamente al registrar compras"
              />
              <p className="text-xs text-gray-500 mt-1">
                Si comprás 1 {unidadCompra} de {factorConversion || "?"}{" "}
                {unidadBase} a $X, ingresá X / {factorConversion || "?"}. Ej:
                Paquete 400g a $2000 = 2000 / 400 = 5 $/g
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Stock Mínimo</label>
              <InputValidated
                type="number"
                step="0.001"
                min="0"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
