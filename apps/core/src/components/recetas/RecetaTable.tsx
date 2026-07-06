"use client";

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
  Eye,
  Pencil,
  Copy,
  Trash2,
  RotateCcw,
  Loader2,
  GitBranch,
} from "lucide-react";

interface RecetaTableProps {
  recetas: any[];
  cargando: boolean;
  onVer: (receta: any) => void;
  onEditar: (receta: any) => void;
  onDuplicar: (receta: any) => void;
  onDesactivar: (id: string) => void;
  onActivar: (id: string) => void;
}

export function RecetaTable({
  recetas,
  cargando,
  onVer,
  onEditar,
  onDuplicar,
  onDesactivar,
  onActivar,
}: RecetaTableProps) {
  if (cargando) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (recetas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron recetas.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-48 md:min-w-64">Producto</TableHead>
            <TableHead className="text-center min-w-32">Variante</TableHead>
            <TableHead className="min-w-56 md:min-w-64 text-center">
              Receta Base
            </TableHead>
            <TableHead className="text-center min-w-24">Rinde</TableHead>
            <TableHead className="text-center  min-w-24">Pack</TableHead>
            <TableHead className="text-center min-w-24">Estado</TableHead>
            <TableHead className="text-center min-w-24">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recetas.map((receta) => (
            <TableRow
              key={receta.id}
              className={!receta.activa ? "opacity-50" : ""}
            >
              <TableCell className="font-medium">
                {receta.producto?.nombre || "—"}
              </TableCell>
              <TableCell className="text-center">
                {receta.varianteNombre ? (
                  <Badge variant="secondary">{receta.varianteNombre}</Badge>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                {receta.recetaBase ? (
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">
                      {receta.recetaBase.producto?.nombre}
                      {receta.recetaBase.varianteNombre
                        ? ` — ${receta.recetaBase.varianteNombre}`
                        : ""}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">{receta.rendimientoBase}u</Badge>
              </TableCell>
              <TableCell className="text-center">
                {receta.unidadesPorPack ? (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    x{receta.unidadesPorPack}
                  </Badge>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={receta.activa ? "default" : "destructive"}>
                  {receta.activa ? "Activa" : "Inactiva"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onVer(receta)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditar(receta)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicar(receta)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {receta.activa ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDesactivar(receta.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onActivar(receta.id)}
                    >
                      <RotateCcw className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
