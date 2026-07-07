"use client";

import { useState, useEffect, useRef } from "react";
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
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Loader2, Calculator } from "lucide-react";
import { simularProduccion, registrarProduccion } from "@/hooks/useProduccion";

interface ProduccionFormProps {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productos: {
    id: string;
    nombre: string;
    categoria: string;
    esProduccionPropia: boolean;
  }[];
}

export function ProduccionForm({
  abierto,
  onClose,
  onSuccess,
  productos,
}: Readonly<ProduccionFormProps>) {
  const [productoId, setProductoId] = useState("");
  const [recetaId, setRecetaId] = useState("");
  const [factorManual, setFactorManual] = useState("");
  const [cantidadPlanificada, setCantidadPlanificada] = useState("");
  const [cantidadReal, setCantidadReal] = useState("");
  const [horasProduccion, setHorasProduccion] = useState("");
  const [fechaProduccion, setFechaProduccion] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [observacion, setObservacion] = useState("");
  const [simulando, setSimulando] = useState(false);
  const [simulacion, setSimulacion] = useState<any>(null);
  const [guardando, setGuardando] = useState(false);
  const [recetas, setRecetas] = useState<any[]>([]);
  const [rendimientoSeleccionado, setRendimientoSeleccionado] = useState<
    number | null
  >(null);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const [margenSeleccionado, setMargenSeleccionado] = useState(30);
  const [motivoMerma, setMotivoMerma] = useState("");
  useEffect(() => {
    if (productoId) {
      fetch(`/api/recetas?productoId=${productoId}&activa=true`)
        .then((r) => r.json())
        .then((j) => {
          if (j.success) {
            setRecetas(j.data.recetas);
            setRecetaId("");
            setSimulacion(null);
            setRendimientoSeleccionado(null);
          }
        });
    } else {
      setRecetas([]);
      setRendimientoSeleccionado(null);
    }
  }, [productoId]);

  useEffect(() => {
    if (rendimientoSeleccionado && factorManual && !cantidadPlanificada) {
      const calculada = Math.round(
        rendimientoSeleccionado * parseFloat(factorManual)
      );
      setCantidadPlanificada(calculada.toString());
    }
  }, [factorManual]);

  useEffect(() => {
    if (rendimientoSeleccionado && cantidadPlanificada) {
      const factor = (
        parseInt(cantidadPlanificada) / rendimientoSeleccionado
      ).toFixed(1);
      if (factor !== factorManual) {
        setFactorManual(factor);
      }
    }
  }, [cantidadPlanificada]);

  useEffect(() => {
    if (simulacion && resultadoRef.current) {
      resultadoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [simulacion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!abierto) return;
      if (e.key === "F9" && !simulando && recetaId && cantidadPlanificada) {
        e.preventDefault();
        handleSimular();
      }
      if (e.key === "F10" && simulacion?.stockSuficiente && !guardando) {
        e.preventDefault();
        handleProducir();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    abierto,
    simulando,
    simulacion,
    guardando,
    recetaId,
    cantidadPlanificada,
  ]);

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
      setSimulacion(null);
      alert(err.message);
    } finally {
      setSimulando(false);
    }
  };

  const handleProducir = async () => {
    if (!simulacion || !simulacion.stockSuficiente) return;
    const real = parseInt(cantidadReal) || parseInt(cantidadPlanificada);
    setGuardando(true);
    try {
      await registrarProduccion({
        productoId,
        recetaId,
        cantidadPlanificada: parseInt(cantidadPlanificada),
        cantidadReal: real,
        horasProduccion: horasProduccion
          ? parseFloat(horasProduccion)
          : undefined,
        fechaProduccion,
        fechaVencimiento: fechaVencimiento || undefined,
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

  useEffect(() => {
    if (!abierto) {
      setProductoId("");
      setRecetaId("");
      setFactorManual("");
      setCantidadPlanificada("");
      setCantidadReal("");
      setHorasProduccion("");
      setSimulacion(null);
      setRendimientoSeleccionado(null);
    }
  }, [abierto]);

  const productosPropios = productos.filter((p) => p.esProduccionPropia);
  const margenes = [30, 40, 50, 60, 70, 80];

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nueva Producción</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Producto</Label>
              <Select value={productoId} onValueChange={setProductoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {productosPropios.map((p) => (
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
                    setFactorManual("");
                    setCantidadPlanificada("");
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

          {rendimientoSeleccionado && rendimientoSeleccionado > 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  Factor multiplicador (paquetes de ingrediente principal)
                </Label>
                <Input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={factorManual}
                  onChange={(e) => {
                    setFactorManual(e.target.value);
                    const calculada = Math.round(
                      rendimientoSeleccionado *
                        parseFloat(e.target.value || "0")
                    );
                    setCantidadPlanificada(
                      calculada > 0 ? calculada.toString() : ""
                    );
                    setSimulacion(null);
                  }}
                  placeholder="Ej: 3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Receta base: {rendimientoSeleccionado} unidades por paquete.
                  {factorManual &&
                    ` Factor ${factorManual} = ${Math.round(rendimientoSeleccionado * parseFloat(factorManual))} unidades.`}
                </p>
              </div>
              <div>
                <Label>Cantidad planificada (unidades a producir)</Label>
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
              </div>
            </div>
          )}

          {(!rendimientoSeleccionado || rendimientoSeleccionado <= 1) && (
            <div>
              <Label>Cantidad planificada (unidades a producir)</Label>
              <Input
                type="number"
                min="1"
                value={cantidadPlanificada}
                onChange={(e) => {
                  setCantidadPlanificada(e.target.value);
                  setSimulacion(null);
                }}
                placeholder="Ej: 1"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
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
                placeholder="Para calcular mano de obra"
              />
            </div>
            <div>
              <Label>Fecha producción</Label>
              <Input
                type="date"
                value={fechaProduccion}
                onChange={(e) => setFechaProduccion(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="button"
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
                <Calculator className="mr-2 h-4 w-4" /> Simular producción (F9)
              </>
            )}
          </Button>

          {simulacion && (
            <div
              ref={resultadoRef}
              id="resultado-simulacion"
              className="space-y-4"
            >
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-emerald-900">
                      Costo total tanda
                    </span>
                    <span className="text-2xl font-bold text-emerald-700">
                      ${simulacion.costoTotal.toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-700">
                        Costo unitario producción (
                        {parseInt(cantidadPlanificada)}u)
                      </span>
                      <span className="text-sm font-semibold text-emerald-700">
                        ${simulacion.costoUnitario.toFixed(4)}
                      </span>
                    </div>
                    {simulacion.cantidadPacks > 0 && (
                      <>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-amber-700">
                            Packaging por pack ({simulacion.cantidadPacks}{" "}
                            packs)
                          </span>
                          <span className="text-sm font-semibold text-amber-700">
                            ${simulacion.costoPackagingPorPack.toFixed(2)}
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-900">
                            Costo por pack (
                            {Math.ceil(
                              parseInt(cantidadPlanificada) /
                                simulacion.cantidadPacks
                            )}
                            u)
                          </span>
                          <span className="text-lg font-bold text-emerald-900">
                            ${simulacion.costoPackCompleto.toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                    {cantidadReal &&
                      parseInt(cantidadReal) !==
                        parseInt(cantidadPlanificada) && (
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-amber-700">
                            Costo unitario real ({parseInt(cantidadReal)}u)
                          </span>
                          <span className="text-sm font-semibold text-amber-700">
                            $
                            {(
                              simulacion.costoTotal /
                              (parseInt(cantidadReal) || 1)
                            ).toFixed(4)}
                          </span>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex flex-col gap-2 justify-between items-center">
                      <span className="text-sm font-medium">Materia prima</span>
                      <span className="text-sm font-bold">
                        ${simulacion.costoMateriaPrima.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex flex-col gap-2 justify-between items-center">
                      <span className="flex flex-col items-center text-sm font-medium">
                        Packaging
                        {simulacion.cantidadPacks > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {simulacion.cantidadPacks} packs
                          </p>
                        )}
                      </span>
                      <span className="text-sm font-bold">
                        ${simulacion.costoPackaging.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex flex-col gap-2 justify-between items-center">
                      <span className="text-sm font-medium">Operativos</span>
                      <span className="text-sm font-bold">
                        ${simulacion.costoOperativo.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex flex-col gap-2 justify-between items-center">
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
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold">
                      Precio de venta sugerido
                    </h4>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs">Margen:</Label>
                      <Select
                        value={String(margenSeleccionado)}
                        onValueChange={(v) =>
                          setMargenSeleccionado(parseInt(v))
                        }
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
                        <div className="flex justify-between items-center">
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
                        <p className="text-xs text-emerald-600 mt-1">
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

              {/* Tabla de márgenes anterior — ELIMINAR las dos tablas viejas de márgenes que estaban acá */}

              {simulacion.stockSuficiente ? (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                  <CheckCircle className="h-3 w-3" /> Stock suficiente
                </Badge>
              ) : (
                <div className="space-y-2">
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1 w-fit"
                  >
                    <AlertTriangle className="h-3 w-3" /> Stock insuficiente
                  </Badge>
                  {simulacion.insumosFaltantes.map((f: any) => (
                    <p key={f.nombre} className="text-sm text-red-600">
                      Falta {f.nombre}: {f.falta} {f.unidad}
                    </p>
                  ))}
                </div>
              )}

              {simulacion.stockSuficiente && (
                <div className="space-y-3">
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Cantidad real producida</Label>
                      <Input
                        type="number"
                        min="0"
                        value={cantidadReal}
                        onChange={(e) => setCantidadReal(e.target.value)}
                        placeholder={cantidadPlanificada}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ingresá cuántas unidades salieron realmente.
                      </p>
                    </div>
                    <div>
                      <Label>Fecha vencimiento (opcional)</Label>
                      <Input
                        type="date"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                      />
                    </div>
                  </div>

                  {parseInt(cantidadReal) < parseInt(cantidadPlanificada) && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>
                          Merma real (
                          {parseInt(cantidadPlanificada) -
                            parseInt(cantidadReal)}{" "}
                          unidades)
                        </Label>
                        <Input
                          type="number"
                          value={
                            parseInt(cantidadPlanificada) -
                            parseInt(cantidadReal)
                          }
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Motivo de merma</Label>
                        <Select
                          value={motivoMerma}
                          onValueChange={setMotivoMerma}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar motivo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adherencia">
                              Adherencia al bowl
                            </SelectItem>
                            <SelectItem value="rotura">
                              Rotura en cocción
                            </SelectItem>
                            <SelectItem value="prueba">
                              Prueba de calidad
                            </SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Observación</Label>
                    <Textarea
                      value={observacion}
                      onChange={(e) => setObservacion(e.target.value)}
                      placeholder="Notas del lote..."
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          F9: Simular | F10: Confirmar | Esc: Cerrar
        </p>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {simulacion && simulacion.stockSuficiente && (
            <Button onClick={handleProducir} disabled={guardando}>
              {guardando ? "Registrando..." : "Confirmar producción (F10)"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
