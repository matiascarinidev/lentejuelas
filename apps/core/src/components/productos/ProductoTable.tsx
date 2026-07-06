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
import { Pencil, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { TableSkeleton } from "../ui/table-skeleton";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface ProductoTableProps {
  productos: any[];
  cargando: boolean;
  onEditar: (producto: any) => void;
  onDesactivar: (id: string) => void;
  onActivar: (id: string) => void;
}

export function ProductoTable({
  productos,
  cargando,
  onEditar,
  onDesactivar,
  onActivar,
}: ProductoTableProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);
  if (cargando) {
    return <TableSkeleton columns={6} rows={8} />;
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-48 md:min-w-64">Nombre</TableHead>
            <TableHead className="text-center  min-w-24">Categoría</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-right min-w-32">Costo Prod.</TableHead>
            <TableHead className="text-center  min-w-32">PV Sugerido</TableHead>
            <TableHead className="text-right min-w-32">PV Final</TableHead>
            <TableHead className="text-center  min-w-36">Stock</TableHead>
            <TableHead className="text-center min-w-24">Estado</TableHead>
            <TableHead className="text-center min-w-24">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((p) => (
            <TableRow key={p.id} className={!p.activo ? "opacity-50" : ""}>
              <TableCell className="font-medium">{p.nombre}</TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">{p.categoria?.nombre || "—"}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={p.esProduccionPropia ? "default" : "outline"}>
                  {p.esProduccionPropia ? "Propio" : "Tercero"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {p.esProduccionPropia ? (
                  p.costoUnitario !== undefined ? (
                    <span className="text-xs">
                      ${Number(p.costoUnitario).toFixed(2)}/u
                      {p.costoPackCompleto > 0 && (
                        <span className="text-gray-400 block">
                          ${Number(p.costoPackCompleto).toFixed(2)}/pack
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Sin receta</span>
                  )
                ) : (
                  `$${Number(p.costoCompra || 0).toFixed(2)}`
                )}
              </TableCell>
              <TableCell className="text-center">
                ${Number(p.precioVentaSugerido).toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {p.precioVentaFinal
                  ? `$${Number(p.precioVentaFinal).toFixed(2)}`
                  : "—"}
              </TableCell>
              <TableCell className="text-center">
                {p.stockActual}
                {p.recetas?.[0]?.unidadesPorPack
                  ? ` (${Math.floor(p.stockActual / p.recetas[0].unidadesPorPack)} packs)`
                  : ""}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={p.activo ? "default" : "destructive"}>
                  {p.activo ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onEditar(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {p.activo ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDesactivar(p.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onActivar(p.id)}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
