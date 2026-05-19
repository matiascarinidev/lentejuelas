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
  Pencil,
  Trash2,
  RotateCcw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { InsumoResponse } from "@/types/insumo";
import { TableSkeleton } from "../ui/table-skeleton";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface InsumoTableProps {
  insumos: InsumoResponse[];
  cargando: boolean;
  onEditar: (insumo: InsumoResponse) => void;
  onDesactivar: (id: string) => void;
  onActivar: (id: string) => void;
}

export function InsumoTable({
  insumos,
  cargando,
  onEditar,
  onDesactivar,
  onActivar,
}: InsumoTableProps) {
  if (cargando) {
    return <TableSkeleton columns={6} rows={8} />;
  }

  if (insumos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron insumos.
      </div>
    );
  }

  const tipoColorMap: Record<string, string> = {
    MATERIA_PRIMA: "bg-blue-100 text-blue-800",
    ENVASE: "bg-yellow-100 text-yellow-800",
    ETIQUETA: "bg-purple-100 text-purple-800",
    OPERATIVO: "bg-gray-100 text-gray-800",
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-center">Stock</TableHead>
          <TableHead className="text-center">Stock Mín.</TableHead>
          <TableHead className="text-right">Costo Unit.</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead className="text-center">Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {insumos.map((insumo) => {
          const stockBajo = Number(insumo.stockActual) <= Number(insumo.stockMinimo);
          return (
            <TableRow
              key={insumo.id}
              className={!insumo.activo ? "opacity-50" : ""}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {stockBajo && insumo.activo && (
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  )}
                  {insumo.nombre}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={tipoColorMap[insumo.tipo] || ""}>
                  {insumo.tipo.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={
                    stockBajo && insumo.activo
                      ? "text-amber-600 font-medium"
                      : ""
                  }
                >
                  {Number(insumo.stockActual).toFixed(2)} {insumo.unidadBase}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {Number(insumo.stockMinimo).toFixed(0)}
              </TableCell>
              <TableCell className="text-right">
                ${Number(insumo.costoUnitarioEstimado).toFixed(2)}
              </TableCell>
              <TableCell>{insumo.proveedor?.nombre || "—"}</TableCell>
              <TableCell className="text-center">
                <Badge variant={insumo.activo ? "default" : "destructive"}>
                  {insumo.activo ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditar(insumo)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {insumo.activo ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDesactivar(insumo.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onActivar(insumo.id)}
                    >
                      <RotateCcw className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <ConfirmDialog
                    abierto={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={async () => {
                      if (itemADesactivar) {
                        onDesactivar(itemADesactivar);
                        setItemADesactivar(null);
                      }
                    }}
                    titulo="¿Desactivar?"
                    descripcion="El elemento se ocultará pero no se eliminará permanentemente."
                    textoConfirmar="Desactivar"
                    variante="destructive"
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
