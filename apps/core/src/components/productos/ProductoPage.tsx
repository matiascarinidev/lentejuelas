"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Tags, Loader2 } from "lucide-react";
import { ProductoTable } from "./ProductoTable";
import { ProductoForm } from "./ProductoForm";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Label } from "@/components/ui/label";

export function ProductoPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [formAbierto, setFormAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = useState<any>(null);
  const [catFormAbierto, setCatFormAbierto] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);
  const [guardandoCat, setGuardandoCat] = useState(false);
  const fetchProductos = async () => {
    setCargando(true);
    const params = new URLSearchParams();
    if (busqueda) params.set("q", busqueda);
    if (filtroCategoria) params.set("categoriaId", filtroCategoria);
    if (filtroTipo)
      params.set("propio", filtroTipo === "propio" ? "true" : "false");
    const res = await fetch(`/api/productos?${params}`);
    const json = await res.json();
    if (json.success) {
      const productosConCosto = await Promise.all(
        json.data.productos.map(async (p: any) => {
          if (p.esProduccionPropia && p.recetas?.length > 0) {
            try {
              const resCosto = await fetch(`/api/productos/${p.id}/costo`);
              const jsonCosto = await resCosto.json();
              if (jsonCosto.success) {
                return {
                  ...p,
                  costoUnitario: jsonCosto.data.costoUnitario,
                  costoPackCompleto: jsonCosto.data.costoPackCompleto,
                };
              }
            } catch {}
          }
          return p;
        })
      );
      setProductos(productosConCosto);
    }
    setCargando(false);
  };

  const fetchCategorias = async () => {
    const res = await fetch("/api/categorias?activo=true");
    const json = await res.json();
    if (json.success) setCategorias(json.data);
  };

  useEffect(() => {
    fetchProductos();
  }, [busqueda, filtroCategoria, filtroTipo]);
  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleCrear = async (data: any) => {
    await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchProductos();
  };

  const handleEditar = async (data: any) => {
    await fetch(`/api/productos/${productoEditar.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setProductoEditar(null);
    fetchProductos();
  };

  const handleDesactivarClick = (id: string) => {
    setItemADesactivar(id);
    setConfirmOpen(true);
  };

  const handleConfirmarDesactivar = async () => {
    if (!itemADesactivar) return;
    await fetch(`/api/productos/${itemADesactivar}`, { method: "DELETE" });
    setItemADesactivar(null);
    fetchProductos();
  };

  const handleCrearCategoria = async () => {
    if (!nuevaCategoria.trim()) return;
    setGuardandoCat(true);
    await fetch("/api/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaCategoria }),
    });
    setNuevaCategoria("");
    setGuardandoCat(false);
    setCatFormAbierto(false);
    fetchCategorias();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <Button variant="outline" onClick={() => setCatFormAbierto(true)}>
            <Tags className="mr-2 h-4 w-4" /> Categorías
          </Button>
          <Button
            onClick={() => {
              setProductoEditar(null);
              setFormAbierto(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__todas">Todas</SelectItem>
            {categorias.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__todos">Todos los tipos</SelectItem>
            <SelectItem value="propio">Propios</SelectItem>
            <SelectItem value="tercero">Terceros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductoTable
        productos={productos}
        cargando={cargando}
        onEditar={(p) => {
          setProductoEditar(p);
          setFormAbierto(true);
        }}
        onDesactivar={handleDesactivarClick}
        onActivar={async (id) => {
          await fetch(`/api/productos/${id}/activar`, { method: "POST" });
          fetchProductos();
        }}
      />

      <ProductoForm
        abierto={formAbierto}
        onClose={() => {
          setFormAbierto(false);
          setProductoEditar(null);
        }}
        onSubmit={productoEditar ? handleEditar : handleCrear}
        producto={productoEditar}
      />

      <Dialog open={catFormAbierto} onOpenChange={setCatFormAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Nombre de la categoría</Label>
            <Input
              placeholder="Nombre de la categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
            />
            {categorias.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">
                  Categorías existentes
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categorias.map((c) => (
                    <Badge key={c.id} variant="secondary">
                      {c.nombre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button onClick={handleCrearCategoria} disabled={guardandoCat}>
              {guardandoCat ? "Creando..." : "Crear"}
            </Button>
            <Button variant="outline" onClick={() => setCatFormAbierto(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        abierto={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmarDesactivar}
        titulo="¿Desactivar producto?"
        descripcion="El producto se ocultará de los listados pero no se eliminará permanentemente."
        textoConfirmar="Desactivar"
        variante="destructive"
      />
    </div>
  );
}
