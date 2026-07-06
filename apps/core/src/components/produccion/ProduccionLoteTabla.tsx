"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Eye } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ProduccionLoteTablaProps {
  lotes: any[];
  cargando: boolean;
  onVer: (id: string) => void;
}

export function ProduccionLoteTabla({
  lotes,
  cargando,
  onVer,
}: ProduccionLoteTablaProps) {
  const [margenGlobal, setMargenGlobal] = useState(30);
  const margenes = [30, 40, 50, 60, 70, 80];

  if (cargando) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (lotes.length === 0) {
    return (
      <p className="text-center py-12 text-gray-500">
        No hay producción registrada.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs text-gray-500">Margen PV:</span>
        <Select
          value={String(margenGlobal)}
          onValueChange={(v) => setMargenGlobal(parseInt(v))}
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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lote</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-center">Planif.</TableHead>
              <TableHead className="text-center">Real</TableHead>
              <TableHead className="text-right min-w-28">Costo Total</TableHead>
              <TableHead className="text-right min-w-28">Costo Unit.</TableHead>
              <TableHead className="text-right min-w-28">Costo Pack</TableHead>
              <TableHead className="text-right min-w-36">
                PV Sug. ({margenGlobal}%)
              </TableHead>
              <TableHead className="text-center">Packs</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lotes.map((lote) => {
              const costoUnitario = Number(lote.costoUnitarioFinal);
              const unidadesPorPack = lote.receta?.unidadesPorPack || null;
              const costoPackagingTotal = Number(lote.costoPackaging || 0);
              const cantidadPacks = unidadesPorPack
                ? Math.floor(lote.cantidadReal / unidadesPorPack)
                : null;
              const costoPackagingPorPack =
                cantidadPacks && cantidadPacks > 0
                  ? costoPackagingTotal / cantidadPacks
                  : 0;
              const costoPack =
                cantidadPacks && unidadesPorPack
                  ? costoUnitario * unidadesPorPack + costoPackagingPorPack
                  : null;

              // Precio sugerido: si tiene pack, sobre el pack; si no, sobre la unidad
              const precioSugerido = costoPack
                ? costoPack * (1 + margenGlobal / 100)
                : costoUnitario * (1 + margenGlobal / 100);

              // Mostrar como "por pack" o "por unidad"
              const precioLabel = costoPack
                ? `$${precioSugerido.toFixed(2)}`
                : `$${precioSugerido.toFixed(2)}`;

              return (
                <TableRow key={lote.id}>
                  <TableCell className="font-mono text-xs">
                    #{lote.id.slice(-8)}
                  </TableCell>
                  <TableCell className="min-w-48 md:min-w-72">
                    <div>
                      {lote.producto?.nombre || "—"}
                      {lote.receta?.varianteNombre && (
                        <span className="text-gray-400 text-xs ml-1">
                          ({lote.receta.varianteNombre})
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {format(new Date(lote.fechaProduccion), "dd/MM/yy", {
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {lote.cantidadPlanificada}
                  </TableCell>
                  <TableCell className="text-center">
                    {lote.cantidadReal !== lote.cantidadPlanificada ? (
                      <Badge
                        variant="outline"
                        className="text-amber-600 border-amber-300"
                      >
                        {lote.cantidadReal}
                      </Badge>
                    ) : (
                      lote.cantidadReal
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${Number(lote.costoTotalCalculado).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${costoUnitario.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {costoPack !== null ? `$${costoPack.toFixed(2)}` : "—"}
                  </TableCell>
                  <TableCell className="text-right text-emerald-600 font-medium">
                    {precioLabel}
                    {costoPack ? (
                      <span className="text-xs text-gray-400 block">pack</span>
                    ) : (
                      <span className="text-xs text-gray-400 block">
                        unidad
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-500">
                    {cantidadPacks !== null ? cantidadPacks : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onVer(lote.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
