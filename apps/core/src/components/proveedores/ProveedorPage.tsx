"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { ProveedorTable } from "./ProveedorTable";
import { ProveedorForm } from "./ProveedorForm";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useProveedores,
  crearProveedor,
  actualizarProveedor,
  desactivarProveedor,
  activarProveedor,
} from "@/hooks/useProveedores";

export function ProveedorPage() {
  const [busqueda, setBusqueda] = useState("");
  const [formAbierto, setFormAbierto] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);

  const { proveedores, cargando, error, refetch } = useProveedores({
    busqueda: busqueda || undefined,
  });

  const handleCrear = async (data: any) => {
    await crearProveedor(data);
    refetch();
  };

  const handleEditar = async (data: any) => {
    if (!proveedorEditar) return;
    await actualizarProveedor(proveedorEditar.id, data);
    setProveedorEditar(null);
    refetch();
  };

  const handleDesactivarClick = (id: string) => {
    setItemADesactivar(id);
    setConfirmOpen(true);
  };

  const handleConfirmarDesactivar = async () => {
    if (!itemADesactivar) return;
    await desactivarProveedor(itemADesactivar);
    setItemADesactivar(null);
    refetch();
  };

  const handleActivar = async (id: string) => {
    await activarProveedor(id);
    refetch();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proveedores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestión de proveedores de insumos
          </p>
        </div>
        <Button
          onClick={() => {
            setProveedorEditar(null);
            setFormAbierto(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar proveedores..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <ProveedorTable
        proveedores={proveedores}
        cargando={cargando}
        onEditar={(p) => {
          setProveedorEditar(p);
          setFormAbierto(true);
        }}
        onDesactivar={handleDesactivarClick}
        onActivar={handleActivar}
      />

      <ProveedorForm
        abierto={formAbierto}
        onClose={() => {
          setFormAbierto(false);
          setProveedorEditar(null);
        }}
        onSubmit={proveedorEditar ? handleEditar : handleCrear}
        proveedor={proveedorEditar}
      />

      <ConfirmDialog
        abierto={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmarDesactivar}
        titulo="¿Desactivar proveedor?"
        descripcion="El proveedor se ocultará de los listados pero no se eliminará permanentemente."
        textoConfirmar="Desactivar"
        variante="destructive"
      />
    </div>
  );
}
