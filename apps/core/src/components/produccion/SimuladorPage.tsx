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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Loader2, TrendingUp } from "lucide-react";
import { simularProduccion } from "@/hooks/useProduccion";

export function SimuladorPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [recetas, setRecetas] = useState<any[]>([]);
  const [productoId, setProductoId] = useState("");
  const [recetaId, setRecetaId] = useState("");
  const [cantidadPlanificada, setCantidadPlanificada] = useState("");
  const [horasProduccion, setHorasProduccion] = useState("");
  const [rendimientoSeleccionado, setRendimientoSeleccionado] = useState<
    number | null
  >(null);
  const [simulando, setSimulando] = useState(false);
  const [simulacion, setSimulacion] = useState<any>(null);
  const [margenSeleccionado, setMargenSeleccionado] = useState(30);

  useEffect(() => {
    fetch("/api/productos?limite=100&propio=true")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProductos(j.data.productos);
      });
  }, []);

  useEffect(() => {
    if (productoId) {
      fetch(`/api/recetas?productoId=${productoId}&activa=true`)
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setRecetas(j.data.recetas);
          setRecetaId("");
          setSimulacion(null);
          setRendimientoSeleccionado(null);
        });
    } else {
      setRecetas([]);
      setRendimientoSeleccionado(null);
    }
  }, [productoId]);

  const handleSimular = async () => {
    if (!productoId || !recetaId || !cantidadPlanificada) return;
    setSimulando(true);
    try {
      const result = await simularProduccion({
        productoId,
        recetaId,
        cantidadPlanificada: parseInt(cantidadPlanificada),
        horasProduccion: horasProduccion
          ? parseFloat(horasProduccion)
          : undefined,
      });
      setSimulacion(result);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSimulando(false);
    }
  };

  const recetaSeleccionada = recetas.find((r) => r.id === recetaId);
  const margenes = [30, 40, 50, 60, 70, 80];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Simulador de costos</h1>
        <p className="text-sm text-gray-500 mt-1">
          Calculá costos sin registrar producción
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Producto</Label>
              <Select value={productoId} onValueChange={setProductoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {productos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {recetas.length > 0 && (
              <div>
                <Label>Receta</Label>
                <Select
                  value={recetaId}
                  onValueChange={(id) => {
                    setRecetaId(id);
                    const receta = recetas.find((r) => r.id === id);
                    setRendimientoSeleccionado(receta?.rendimientoBase ?? null);
                    setSimulacion(null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar receta" />
                  </SelectTrigger>
                  <SelectContent>
                    {recetas.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.varianteNombre
                          ? `${r.producto.nombre} — ${r.varianteNombre}`
                          : r.producto.nombre}
                        {r.rendimientoBase > 1 &&
                          ` (rinde ${r.rendimientoBase}u)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cantidad planificada (unidades)</Label>
              <Input
                type="number"
                min="1"
                value={cantidadPlanificada}
                onChange={(e) => {
                  setCantidadPlanificada(e.target.value);
                  setSimulacion(null);
                }}
                placeholder="Ej: 60"
              />
              {rendimientoSeleccionado && cantidadPlanificada && (
                <p className="text-xs text-gray-500 mt-1">
                  ={" "}
                  {(
                    parseInt(cantidadPlanificada) / rendimientoSeleccionado
                  ).toFixed(1)}{" "}
                  tandas de {rendimientoSeleccionado}u
                </p>
              )}
            </div>
            <div>
              <Label>Horas producción (opcional)</Label>
              <Input
                type="number"
                step="0.5"
                min="0"
                value={horasProduccion}
                onChange={(e) => {
                  setHorasProduccion(e.target.value);
                  setSimulacion(null);
                }}
                placeholder="Para mano de obra"
              />
            </div>
          </div>

          <Button
            onClick={handleSimular}
            disabled={simulando || !recetaId || !cantidadPlanificada}
            className="w-full"
          >
            {simulando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculando...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" /> Simular
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {simulacion && (
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <span className="font-bold text-lg text-emerald-900">
                  Costo total tanda
                </span>
                <span className="text-2xl font-bold text-emerald-700">
                  ${simulacion.costoTotal.toFixed(2)}
                </span>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-700">
                    Costo unitario producción
                  </span>
                  <span className="text-sm font-semibold">
                    ${simulacion.costoUnitario.toFixed(4)}
                  </span>
                </div>
                {simulacion.cantidadPacks > 0 && (
                  <>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-amber-700">
                        Packaging por pack
                      </span>
                      <span className="text-sm font-semibold">
                        ${simulacion.costoPackagingPorPack.toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm font-bold text-emerald-900">
                        Costo por pack
                      </span>
                      <span className="text-lg font-bold text-emerald-900">
                        ${simulacion.costoPackCompleto.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-3 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Materia prima</span>
                  <span className="text-sm font-bold">
                    ${simulacion.costoMateriaPrima.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-3 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Packaging</span>
                  <span className="text-sm font-bold">
                    ${simulacion.costoPackaging.toFixed(2)}
                  </span>
                </div>
                {simulacion.cantidadPacks > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {simulacion.cantidadPacks} packs
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-3 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Operativos</span>
                  <span className="text-sm font-bold">
                    ${simulacion.costoOperativo.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-3 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Amortización</span>
                  <span className="text-sm font-bold">
                    ${simulacion.costoAmortizacion.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-4  md:items-center justify-between mb-4">
                <h4 className="text-sm font-bold">Precio de venta sugerido</h4>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Margen:</Label>
                  <Select
                    value={String(margenSeleccionado)}
                    onValueChange={(v) => setMargenSeleccionado(parseInt(v))}
                  >
                    <SelectTrigger className="w-24 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {margenes.map((m) => (
                        <SelectItem key={m} value={String(m)}>
                          {m}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {simulacion.cantidadPacks > 0 ? (
                <div className="space-y-3">
                  <div className="rounded-lg bg-emerald-50 p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <span className="text-sm">
                        Pack de{" "}
                        {Math.ceil(
                          parseInt(cantidadPlanificada) /
                            simulacion.cantidadPacks
                        )}{" "}
                        unidades
                      </span>
                      <span className="text-xl font-bold text-emerald-700">
                        $
                        {(
                          simulacion.costoPackCompleto *
                          (1 + margenSeleccionado / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-center md:text-right text-emerald-600 mt-1">
                      Ganancia: $
                      {(
                        simulacion.costoPackCompleto *
                        (margenSeleccionado / 100)
                      ).toFixed(2)}{" "}
                      por pack
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        Precio unitario equivalente
                      </span>
                      <span className="text-lg font-bold text-gray-700">
                        $
                        {(
                          (simulacion.costoPackCompleto *
                            (1 + margenSeleccionado / 100)) /
                          Math.ceil(
                            parseInt(cantidadPlanificada) /
                              simulacion.cantidadPacks
                          )
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-emerald-50 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Precio por unidad</span>
                    <span className="text-xl font-bold text-emerald-700">
                      $
                      {(
                        (simulacion.costoUnitarioConPackaging ??
                          simulacion.costoUnitario) *
                        (1 + margenSeleccionado / 100)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">
                    Ganancia: $
                    {(
                      (simulacion.costoUnitarioConPackaging ??
                        simulacion.costoUnitario) *
                      (margenSeleccionado / 100)
                    ).toFixed(2)}{" "}
                    por unidad
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          {simulacion.detalleMateriaPrima &&
            simulacion.detalleMateriaPrima.length > 0 && (
              <Card>
                <CardContent className="pt-4">
                  <h4 className="text-sm font-bold mb-3">
                    Ingredientes necesarios (receta escalada ×
                    {simulacion.factorMultiplicador.toFixed(1)})
                  </h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500">
                      <span>Insumo</span>
                      <span className="text-right">Cantidad</span>
                      <span className="text-right">Costo Unit.</span>
                      <span className="text-right">Costo Total</span>
                    </div>

                    {simulacion.detalleMateriaPrima.map((item: any) => (
                      <div
                        key={item.insumoId}
                        className="grid grid-cols-4 gap-2 text-sm"
                      >
                        <span>{item.nombre}</span>
                        <span className="text-right">
                          {item.cantidadNecesaria.toFixed(0)}
                          <span className="hidden md:inline">
                            {item.unidad}
                          </span>
                          <span className="md:hidden">
                            {item.unidad.charAt(0)}
                          </span>
                        </span>
                        <span className="text-right text-gray-500">
                          ${item.costoUnitarioInsumo.toFixed(0)}
                        </span>
                        <span className="text-right font-medium">
                          ${item.costoTotalItem.toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {simulacion.detallePackaging &&
            simulacion.detallePackaging.length > 0 && (
              <Card>
                <CardContent className="pt-4">
                  <h4 className="text-sm font-bold mb-3">
                    Packaging necesario ({simulacion.cantidadPacks} packs)
                  </h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500">
                      <span>Insumo</span>

                      <span className="text-right">Cantidad</span>

                      <span className="text-right">Costo Unit.</span>
                      <span className="text-right">Costo Total</span>
                    </div>
                    {simulacion.detallePackaging.map((item: any) => (
                      <div
                        key={item.insumoId}
                        className="grid grid-cols-4 gap-2 text-sm"
                      >
                        <span>{item.nombre}</span>
                        <span className="text-right">
                          {item.cantidadNecesaria.toFixed(0)}
                          <span className="hidden md:inline">
                            {item.unidad}
                          </span>
                          <span className="md:hidden">
                            {item.unidad.charAt(0)}
                          </span>
                        </span>
                        <span className="text-right text-gray-500">
                          ${item.costoUnitarioInsumo.toFixed(0)}
                        </span>
                        <span className="text-right font-medium">
                          ${item.costoTotalItem.toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      )}
    </div>
  );
}
