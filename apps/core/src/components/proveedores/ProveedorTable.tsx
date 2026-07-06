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

interface ProveedorTableProps {
  proveedores: any[];
  cargando: boolean;
  onEditar: (proveedor: any) => void;
  onDesactivar: (id: string) => void;
  onActivar: (id: string) => void;
}

export function ProveedorTable({
  proveedores,
  cargando,
  onEditar,
  onDesactivar,
  onActivar,
}: ProveedorTableProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);
  if (cargando) {
    return <TableSkeleton columns={6} rows={8} />;
  }

  if (proveedores.length === 0) {
    return (
      <p className="text-center py-12 text-gray-500">
        No se encontraron proveedores.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-center min-w-24">Contacto</TableHead>
            <TableHead className="text-center  min-w-24">Teléfono</TableHead>
            <TableHead className="text-center min-w-24">Email</TableHead>
            <TableHead className="text-center min-w-24">Insumos</TableHead>
            <TableHead className="text-center min-w-24">Compras</TableHead>
            <TableHead className="text-center min-w-24">Estado</TableHead>
            <TableHead className="text-right lg:text-center">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proveedores.map((p) => (
            <TableRow key={p.id} className={!p.activo ? "opacity-50" : ""}>
              <TableCell className="font-medium">{p.nombre}</TableCell>
              <TableCell className="text-center">{p.contacto || "—"}</TableCell>
              <TableCell className="text-center">{p.telefono || "—"}</TableCell>
              <TableCell className="text-center">{p.email || "—"}</TableCell>
              <TableCell className="text-center">
                {p._count?.insumos ?? 0}
              </TableCell>
              <TableCell className="text-center">
                {p._count?.compras ?? 0}
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
                      onClick={() => {
                        setItemADesactivar(p.id);
                        setConfirmOpen(true);
                      }}
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
