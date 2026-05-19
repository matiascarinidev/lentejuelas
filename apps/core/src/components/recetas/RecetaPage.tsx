"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecetaTable } from "./RecetaTable";
import { RecetaForm } from "./RecetaForm";
import { RecetaDetalle } from "./RecetaDetalle";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useRecetas,
  crearReceta,
  duplicarReceta,
  toggleReceta,
} from "@/hooks/useRecetas";

export function RecetaPage() {
  const [formAbierto, setFormAbierto] = useState(false);
  const [recetaEditar, setRecetaEditar] = useState<any>(null);
  const [detalleId, setDetalleId] = useState<string | null>(null);
  const [productos, setProductos] = useState<any[]>([]);
  const [insumos, setInsumos] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);

  const { recetas, cargando, error, refetch } = useRecetas({
    activa: undefined,
  });

  useEffect(() => {
    fetch("/api/productos?limite=100")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProductos(j.data.productos);
      });
    fetch("/api/insumos?limite=200")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setInsumos(j.data.insumos);
      });
  }, []);

  const recetasBase = recetas.filter((r: any) => !r.recetaBaseId);

  const handleCrear = async (data: any) => {
    await crearReceta(data);
    refetch();
  };

  const handleEditar = async (data: any) => {
    if (!recetaEditar) return;
    await fetch(`/api/recetas/${recetaEditar.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setRecetaEditar(null);
    refetch();
  };

  const handleDuplicar = async (receta: any) => {
    if (!confirm(`¿Duplicar receta de "${receta.producto.nombre}"?`)) return;
    try {
      await duplicarReceta(
        receta.id,
        receta.productoId,
        receta.varianteNombre + " (copia)"
      );
      refetch();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDesactivarClick = (id: string) => {
    setItemADesactivar(id);
    setConfirmOpen(true);
  };

  const handleConfirmarDesactivar = async () => {
    if (!itemADesactivar) return;
    await toggleReceta(itemADesactivar, false);
    setItemADesactivar(null);
    refetch();
  };

  const handleActivar = async (id: string) => {
    await toggleReceta(id, true);
    refetch();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recetas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Todas las recetas, bases y variantes
          </p>
        </div>
        <Button
          onClick={() => {
            setRecetaEditar(null);
            setFormAbierto(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Receta
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <RecetaTable
        recetas={recetas}
        cargando={cargando}
        onVer={(receta) => setDetalleId(receta.id)}
        onEditar={(receta) => {
          setRecetaEditar(receta);
          setFormAbierto(true);
        }}
        onDuplicar={handleDuplicar}
        onDesactivar={handleDesactivarClick}
        onActivar={handleActivar}
      />

      <RecetaForm
        abierto={formAbierto}
        onClose={() => {
          setFormAbierto(false);
          setRecetaEditar(null);
        }}
        onSubmit={recetaEditar ? handleEditar : handleCrear}
        recetaEditar={recetaEditar}
        productos={productos}
        insumos={insumos}
        recetasBase={recetasBase}
      />

      {detalleId && (
        <RecetaDetalle
          recetaId={detalleId}
          abierto={!!detalleId}
          onClose={() => {
            setDetalleId(null);
            refetch();
          }}
          onEditar={(receta) => {
            setDetalleId(null);
            setRecetaEditar(receta);
            setFormAbierto(true);
          }}
          onDuplicar={(receta) => {
            setDetalleId(null);
            handleDuplicar(receta);
          }}
        />
      )}

      <ConfirmDialog
        abierto={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmarDesactivar}
        titulo="¿Desactivar receta?"
        descripcion="La receta se ocultará pero no se eliminará permanentemente."
        textoConfirmar="Desactivar"
        variante="destructive"
      />
    </div>
  );
}
