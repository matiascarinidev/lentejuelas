"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, GitBranch, Pencil, Copy } from "lucide-react";
import { fetchReceta } from "@/hooks/useRecetas";

interface RecetaDetalleProps {
  recetaId: string;
  abierto: boolean;
  onClose: () => void;
  onEditar?: (receta: any) => void;
  onDuplicar?: (receta: any) => void;
}

export function RecetaDetalle({
  recetaId,
  abierto,
  onClose,
  onEditar,
  onDuplicar,
}: RecetaDetalleProps) {
  const [receta, setReceta] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (abierto && recetaId) {
      setCargando(true);
      fetchReceta(recetaId)
        .then(setReceta)
        .catch(() => setReceta(null))
        .finally(() => setCargando(false));
    }
  }, [abierto, recetaId]);

  if (!abierto) return null;

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {receta ? (
              <>
                {receta.producto.nombre}
                {receta.varianteNombre && (
                  <span className="text-gray-500 font-normal">
                    — {receta.varianteNombre}
                  </span>
                )}
              </>
            ) : (
              "Detalle de Receta"
            )}
          </DialogTitle>
        </DialogHeader>

        {cargando && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {!cargando && !receta && (
          <p className="text-center py-8 text-gray-500">
            Receta no encontrada.
          </p>
        )}

        {receta && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{receta.producto.categoria}</Badge>
                <Badge variant="secondary">
                  Rinde {receta.rendimientoBase}u
                </Badge>
                {receta.unidadesPorPack && (
                  <Badge className="bg-amber-100 text-amber-800">
                    Pack x{receta.unidadesPorPack}
                  </Badge>
                )}
                {receta.recetaBaseId && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <GitBranch className="h-3 w-3" />
                    Variante de: {receta.recetaBase?.producto.nombre}
                  </Badge>
                )}
                {!receta.activa && (
                  <Badge variant="destructive">Inactiva</Badge>
                )}
              </div>
              <div className="flex gap-2">
                {onEditar && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditar(receta)}
                  >
                    <Pencil className="mr-1 h-4 w-4" /> Editar
                  </Button>
                )}
                {onDuplicar && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDuplicar(receta)}
                  >
                    <Copy className="mr-1 h-4 w-4" /> Duplicar
                  </Button>
                )}
              </div>
            </div>

            {receta.itemsHeredados && receta.itemsHeredados.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Heredados de receta base
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {receta.itemsHeredados.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.insumo.nombre}</span>
                      <span className="text-gray-500">
                        {Number(item.cantidad).toFixed(2)} {item.unidad}
                        {Number(item.mermaPorcentaje) > 0 &&
                          ` (merma: ${item.mermaPorcentaje}%)`}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {receta.recetaBaseId
                    ? "Ingredientes propios adicionales"
                    : "Ingredientes"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {receta.items.length === 0 && (
                  <p className="text-sm text-gray-400">
                    {receta.recetaBaseId
                      ? "Sin ingredientes propios adicionales."
                      : "Sin ingredientes."}
                  </p>
                )}
                {receta.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.insumo.nombre}</span>
                    <span className="text-gray-500">
                      {Number(item.cantidad).toFixed(2)} {item.unidad}
                      {Number(item.mermaPorcentaje) > 0 &&
                        ` (merma: ${item.mermaPorcentaje}%)`}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {(receta.itemsPackaging?.length > 0 ||
              receta.itemsHeredadosPackaging?.length > 0) && (
              <Card className="border-amber-200 bg-amber-50/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-amber-800">
                    Packaging (por pack de {receta.unidadesPorPack}u)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {receta.itemsHeredadosPackaging?.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.insumo.nombre} (heredado)</span>
                      <span className="text-gray-500">
                        {Number(item.cantidad)} {item.unidad}
                      </span>
                    </div>
                  ))}
                  {receta.itemsPackaging?.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.insumo.nombre}</span>
                      <span className="text-gray-500">
                        {Number(item.cantidad)} {item.unidad}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Separator />

            <div className="rounded-lg bg-emerald-50 p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-900">
                  Costo total calculado
                </span>
                <span className="text-xl font-bold text-emerald-700">
                  ${receta.costoTotalCalculado?.toFixed(2) ?? "—"}
                </span>
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                Solo materia prima. Sin packaging, gastos operativos ni
                amortizaciones.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
