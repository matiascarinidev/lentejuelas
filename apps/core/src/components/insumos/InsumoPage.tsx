"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { InsumoTable } from "./InsumoTable";
import { InsumoForm } from "./InsumoForm";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useInsumos,
  crearInsumo,
  actualizarInsumo,
  desactivarInsumo,
} from "@/hooks/useInsumos";
import { InsumoResponse } from "@/types/insumo";

export function InsumoPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("TODOS");
  const [formAbierto, setFormAbierto] = useState(false);
  const [insumoEditar, setInsumoEditar] = useState<InsumoResponse | null>(null);
  const [proveedores, setProveedores] = useState<
    { id: string; nombre: string }[]
  >([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);

  const { insumos, cargando, error, refetch } = useInsumos({
    busqueda: busqueda || undefined,
    tipo: filtroTipo === "TODOS" ? undefined : filtroTipo,
    activo: undefined,
  });

  useEffect(() => {
    fetch("/api/proveedores?limite=100")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProveedores(j.data.proveedores);
      })
      .catch(() => {});
  }, []);

  const handleCrear = async (data: any) => {
    await crearInsumo(data);
    refetch();
  };

  const handleEditar = async (data: any) => {
    if (!insumoEditar) return;
    await actualizarInsumo(insumoEditar.id, data);
    setInsumoEditar(null);
    refetch();
  };

  const handleDesactivarClick = (id: string) => {
    setItemADesactivar(id);
    setConfirmOpen(true);
  };

  const handleConfirmarDesactivar = async () => {
    if (!itemADesactivar) return;
    await desactivarInsumo(itemADesactivar);
    setItemADesactivar(null);
    refetch();
  };

  const abrirEdicion = (insumo: InsumoResponse) => {
    setInsumoEditar(insumo);
    setFormAbierto(true);
  };

  const cerrarForm = () => {
    setFormAbierto(false);
    setInsumoEditar(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Insumos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Materia prima, envases, etiquetas y gastos operativos
          </p>
        </div>
        <Button
          onClick={() => {
            setInsumoEditar(null);
            setFormAbierto(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Insumo
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar insumos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="hidden md:inline">
          <Tabs value={filtroTipo} onValueChange={setFiltroTipo}>
            <TabsList>
              <TabsTrigger value="TODOS">Todos</TabsTrigger>
              <TabsTrigger value="MATERIA_PRIMA">Materia Prima</TabsTrigger>
              <TabsTrigger value="ENVASE">Envases</TabsTrigger>
              <TabsTrigger value="ETIQUETA">Etiquetas</TabsTrigger>
              <TabsTrigger value="OPERATIVO">Operativos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="md:hidden w-full">
          <Select
            value={filtroTipo}
            onValueChange={(value) => setFiltroTipo(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="MATERIA_PRIMA">Materia Prima</SelectItem>
              <SelectItem value="ENVASE">Envases</SelectItem>
              <SelectItem value="ETIQUETA">Etiquetas</SelectItem>
              <SelectItem value="OPERATIVO">Operativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <InsumoTable
        insumos={insumos}
        cargando={cargando}
        onEditar={abrirEdicion}
        onDesactivar={handleDesactivarClick}
        onActivar={async (id) => {
          await fetch(`/api/insumos/${id}/activar`, { method: "POST" });
          refetch();
        }}
      />

      <InsumoForm
        abierto={formAbierto}
        onClose={cerrarForm}
        onSubmit={insumoEditar ? handleEditar : handleCrear}
        insumo={insumoEditar}
        proveedores={proveedores}
      />

      <ConfirmDialog
        abierto={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmarDesactivar}
        titulo="¿Desactivar insumo?"
        descripcion="El insumo se ocultará de los listados pero no se eliminará permanentemente."
        textoConfirmar="Desactivar"
        variante="destructive"
      />
    </div>
  );
}
