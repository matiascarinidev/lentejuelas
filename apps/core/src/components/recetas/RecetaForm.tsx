"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { InputValidated } from "@/components/ui/input-validated";
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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Package, AlertCircle, Info } from "lucide-react";
import { UnidadMedida } from "@lentejuelas/shared";

interface RecetaFormProps {
  abierto: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  recetaEditar?: any;
  productos: {
    id: string;
    nombre: string;
    categoria: { id: string; nombre: string } | string;
    esProduccionPropia: boolean;
  }[];
  insumos: {
    id: string;
    nombre: string;
    tipo: string;
    unidadBase: string;
    costoUnitarioEstimado: number;
  }[];
  recetasBase: {
    id: string;
    producto: { id: string; nombre: string };
    varianteNombre: string | null;
  }[];
}

interface ItemLocal {
  tempId: string;
  insumoId: string;
  cantidad: string;
  unidad: UnidadMedida;
  mermaPorcentaje: string;
}

export function RecetaForm({
  abierto,
  onClose,
  onSubmit,
  recetaEditar,
  productos,
  insumos,
  recetasBase,
}: RecetaFormProps) {
  const esEdicion = !!recetaEditar;
  const [productoId, setProductoId] = useState("");
  const [varianteNombre, setVarianteNombre] = useState("");
  const [recetaBaseId, setRecetaBaseId] = useState("");
  const [rendimientoBase, setRendimientoBase] = useState("1");
  const [tienePackaging, setTienePackaging] = useState(false);
  const [unidadesPorPack, setUnidadesPorPack] = useState("");
  const [items, setItems] = useState<ItemLocal[]>([]);
  const [itemsPackaging, setItemsPackaging] = useState<ItemLocal[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [cargandoReceta, setCargandoReceta] = useState(false);

  const esVariante = recetaBaseId && recetaBaseId !== "_sin_base";
  const soloProduccionPropia = productos.filter((p) => p.esProduccionPropia);
  const insumosMateriaPrima = insumos.filter((i) => i.tipo === "MATERIA_PRIMA");
  const insumosPackaging = insumos.filter(
    (i) => i.tipo === "ENVASE" || i.tipo === "ETIQUETA"
  );

  const recetaBaseSeleccionada = recetasBase.find((r) => r.id === recetaBaseId);

  // Cargar datos de receta a editar
  useEffect(() => {
    if (!abierto || !recetaEditar) return;

    setCargandoReceta(true);
    fetch(`/api/recetas/${recetaEditar.id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          const r = j.data;
          setProductoId(r.productoId);
          setVarianteNombre(r.varianteNombre || "");
          setRecetaBaseId(r.recetaBaseId || "");
          setRendimientoBase(String(r.rendimientoBase || 1));
          setUnidadesPorPack(
            r.unidadesPorPack ? String(r.unidadesPorPack) : ""
          );
          setTienePackaging(!!r.unidadesPorPack);
          setItems(
            (r.items || []).map((i: any) => ({
              tempId: crypto.randomUUID(),
              insumoId: i.insumoId,
              cantidad: String(i.cantidad),
              unidad: i.unidad,
              mermaPorcentaje: String(i.mermaPorcentaje || 0),
            }))
          );
          setItemsPackaging(
            (r.itemsPackaging || []).map((i: any) => ({
              tempId: crypto.randomUUID(),
              insumoId: i.insumoId,
              cantidad: String(i.cantidad),
              unidad: i.unidad,
              mermaPorcentaje: "0",
            }))
          );
        }
      })
      .finally(() => setCargandoReceta(false));
  }, [abierto, recetaEditar]);

  // Reset al cerrar
  useEffect(() => {
    if (!abierto && !recetaEditar) {
      setProductoId("");
      setVarianteNombre("");
      setRecetaBaseId("");
      setRendimientoBase("1");
      setTienePackaging(false);
      setUnidadesPorPack("");
      setItems([]);
      setItemsPackaging([]);
    }
  }, [abierto]);

  const agregarItem = () => {
    setItems([
      ...items,
      {
        tempId: crypto.randomUUID(),
        insumoId: "",
        cantidad: "",
        unidad: UnidadMedida.GRAMOS,
        mermaPorcentaje: "0",
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

  const actualizarUnidadSegunInsumo = (
    tempId: string,
    insumoId: string,
    tipo: "ingrediente" | "packaging"
  ) => {
    const insumo = insumos.find((i) => i.id === insumoId);
    if (!insumo) return;

    const actualizar =
      tipo === "ingrediente"
        ? (fn: any) => setItems(fn)
        : (fn: any) => setItemsPackaging(fn);

    actualizar((prev: ItemLocal[]) =>
      prev.map((item) =>
        item.tempId === tempId
          ? { ...item, insumoId, unidad: insumo.unidadBase as UnidadMedida }
          : item
      )
    );
  };

  const agregarItemPackaging = () => {
    setItemsPackaging([
      ...itemsPackaging,
      {
        tempId: crypto.randomUUID(),
        insumoId: "",
        cantidad: "",
        unidad: UnidadMedida.UNIDAD,
        mermaPorcentaje: "0",
      },
    ]);
  };

  const actualizarItemPackaging = (
    tempId: string,
    campo: keyof ItemLocal,
    valor: string
  ) => {
    setItemsPackaging(
      itemsPackaging.map((item) =>
        item.tempId === tempId ? { ...item, [campo]: valor } : item
      )
    );
  };

  const eliminarItemPackaging = (tempId: string) => {
    setItemsPackaging(itemsPackaging.filter((item) => item.tempId !== tempId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productoId) return;

    setGuardando(true);
    try {
      const payload: any = {
        productoId,
        varianteNombre: varianteNombre || null,
        recetaBaseId:
          recetaBaseId && recetaBaseId !== "_sin_base" ? recetaBaseId : null,
        rendimientoBase: parseInt(rendimientoBase) || 1,
        items: items.map((item) => ({
          insumoId: item.insumoId,
          cantidad: parseFloat(item.cantidad),
          unidad: item.unidad,
          mermaPorcentaje: parseFloat(item.mermaPorcentaje) || 0,
        })),
      };

      if (tienePackaging && unidadesPorPack) {
        payload.unidadesPorPack = parseInt(unidadesPorPack);
        payload.itemsPackaging = itemsPackaging.map((item) => ({
          insumoId: item.insumoId,
          cantidad: parseFloat(item.cantidad),
          unidad: item.unidad,
        }));
      } else {
        payload.unidadesPorPack = null;
        payload.itemsPackaging = [];
      }

      await onSubmit(payload);
      onClose();
    } finally {
      setGuardando(false);
    }
  };

  const insumoSeleccionado = (insumoId: string) =>
    insumos.find((i) => i.id === insumoId);

  if (cargandoReceta) {
    return (
      <Dialog open={abierto} onOpenChange={onClose}>
        <DialogContent>
          <div className="flex justify-center py-8">
            <p className="text-gray-500">Cargando receta...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {esEdicion ? "Editar Receta" : "Nueva Receta"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Producto */}
          <div>
            <Label>Producto</Label>
            <Select value={productoId} onValueChange={setProductoId} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar producto" />
              </SelectTrigger>
              <SelectContent>
                {soloProduccionPropia.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.nombre} —{" "}
                    {typeof p.categoria === "object" && p.categoria !== null
                      ? p.categoria.nombre
                      : String(p.categoria || "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Receta base (variante) */}
          <div>
            <Label>Receta base (opcional — hereda ingredientes)</Label>
            <Select
              value={recetaBaseId}
              onValueChange={(v) => {
                setRecetaBaseId(v);
                if (v === "_sin_base") {
                  setVarianteNombre("");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sin receta base" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_sin_base">Sin receta base</SelectItem>
                {recetasBase
                  .filter((r) => r.producto.id !== productoId)
                  .map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.producto.nombre}
                      {r.varianteNombre ? ` — ${r.varianteNombre}` : ""}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {esVariante && recetaBaseSeleccionada && (
              <p className="text-xs text-gray-500 mt-1">
                Hereda ingredientes de: {recetaBaseSeleccionada.producto.nombre}
                {recetaBaseSeleccionada.varianteNombre
                  ? ` — ${recetaBaseSeleccionada.varianteNombre}`
                  : ""}
                . Podés agregar ingredientes propios adicionales abajo.
              </p>
            )}
          </div>

          {esVariante && (
            <div>
              <Label>Nombre de la variante (ej: "Limón", "Pack x4")</Label>
              <InputValidated
                value={varianteNombre}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setVarianteNombre(e.target.value)
                }
                placeholder="Limón"
              />
            </div>
          )}

          {/* Ingredientes: SIEMPRE visible */}
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">
                  {esVariante
                    ? "Ingredientes propios adicionales"
                    : "Ingredientes (materia prima)"}
                </Label>
                {esVariante && (
                  <p className="text-xs text-gray-500">
                    Estos se suman a los heredados de la receta base.
                  </p>
                )}
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={agregarItem}
              >
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </div>

            {!esVariante && items.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                La receta necesita al menos un ingrediente.
              </div>
            )}

            {esVariante && items.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                <Info className="h-4 w-4" />
                Sin ingredientes propios adicionales. Solo se usarán los
                heredados de la receta base.
              </div>
            )}

            {items.map((item) => {
              const insumo = insumoSeleccionado(item.insumoId);
              return (
                <Card key={item.tempId}>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-5">
                        <Label className="text-xs">Insumo</Label>
                        <Select
                          value={item.insumoId}
                          onValueChange={(v) =>
                            actualizarUnidadSegunInsumo(
                              item.tempId,
                              v,
                              "ingrediente"
                            )
                          }
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {insumosMateriaPrima.map((i) => (
                              <SelectItem key={i.id} value={i.id}>
                                {i.nombre} ({i.unidadBase})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Cantidad</Label>
                        <InputValidated
                          type="number"
                          step="0.001"
                          min="0.001"
                          value={item.cantidad}
                          onChange={(e: { target: { value: string } }) =>
                            actualizarItem(
                              item.tempId,
                              "cantidad",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Unidad</Label>
                        <Select
                          value={item.unidad}
                          onValueChange={(v) =>
                            actualizarItem(item.tempId, "unidad", v)
                          }
                        >
                          <SelectTrigger className="text-sm">
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
                      <div className="col-span-2">
                        <Label className="text-xs">Merma %</Label>
                        <InputValidated
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={item.mermaPorcentaje}
                          onChange={(e: { target: { value: string } }) =>
                            actualizarItem(
                              item.tempId,
                              "mermaPorcentaje",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-span-1">
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
                    {insumo && (
                      <p className="text-xs text-gray-500 mt-1">
                        Costo est.: $
                        {Number(insumo.costoUnitarioEstimado).toFixed(2)}/
                        {insumo.unidadBase}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rendimiento base (unidades que produce)</Label>
              <InputValidated
                type="number"
                min="1"
                value={rendimientoBase}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setRendimientoBase(e.target.value)
                }
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {esVariante
                  ? "Unidades totales que produce esta variante"
                  : "Ej: 20 medallones, 1 budín"}
              </p>
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tienePack"
                  checked={tienePackaging}
                  onChange={(e) => {
                    setTienePackaging(e.target.checked);
                    if (!e.target.checked) {
                      setUnidadesPorPack("");
                      setItemsPackaging([]);
                    }
                  }}
                  className="rounded border-gray-300 h-4 w-4"
                />
                <Label htmlFor="tienePack">Se vende en packs</Label>
              </div>
            </div>
          </div>

          {tienePackaging && (
            <div>
              <Label>Unidades por pack</Label>
              <InputValidated
                type="number"
                min="1"
                value={unidadesPorPack}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setUnidadesPorPack(e.target.value)
                }
                placeholder="Ej: 4"
              />
            </div>
          )}

          {/* Packaging */}
          {tienePackaging && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <Label className="text-base">
                      Packaging (por pack de {unidadesPorPack || "?"}u)
                    </Label>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={agregarItemPackaging}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Agregar
                  </Button>
                </div>

                {itemsPackaging.length === 0 && (
                  <p className="text-sm text-gray-400 py-4 text-center">
                    Sin packaging definido. Agregá etiquetas, bolsas, etc.
                  </p>
                )}

                {itemsPackaging.map((item) => {
                  const insumo = insumoSeleccionado(item.insumoId);
                  return (
                    <Card
                      key={item.tempId}
                      className="border-amber-200 bg-amber-50/30"
                    >
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-12 gap-3 items-end">
                          <div className="col-span-6">
                            <Label className="text-xs">
                              Insumo de packaging
                            </Label>
                            <Select
                              value={item.insumoId}
                              onValueChange={(v) =>
                                actualizarUnidadSegunInsumo(
                                  item.tempId,
                                  v,
                                  "packaging"
                                )
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {insumosPackaging.map((i) => (
                                  <SelectItem key={i.id} value={i.id}>
                                    {i.nombre} ({i.unidadBase})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-xs">Cantidad</Label>
                            <InputValidated
                              type="number"
                              step="0.001"
                              min="0.001"
                              value={item.cantidad}
                              onChange={(e) =>
                                actualizarItemPackaging(
                                  item.tempId,
                                  "cantidad",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="col-span-3">
                            <Label className="text-xs">Unidad</Label>
                            <Select
                              value={item.unidad}
                              onValueChange={(v) =>
                                actualizarItemPackaging(
                                  item.tempId,
                                  "unidad",
                                  v
                                )
                              }
                            >
                              <SelectTrigger className="text-sm">
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
                          <div className="col-span-1">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => eliminarItemPackaging(item.tempId)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        {insumo && (
                          <p className="text-xs text-gray-500 mt-1">
                            Costo est.: $
                            {Number(insumo.costoUnitarioEstimado).toFixed(2)}/
                            {insumo.unidadBase}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                guardando || !productoId || (!esVariante && items.length === 0)
              }
            >
              {guardando
                ? "Guardando..."
                : esEdicion
                  ? "Guardar cambios"
                  : "Crear receta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
