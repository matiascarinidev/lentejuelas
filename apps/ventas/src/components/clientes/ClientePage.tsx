"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Pencil, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export function ClientePage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [formAbierto, setFormAbierto] = useState(false);
  const [clienteEditar, setClienteEditar] = useState<any>(null);
  const [guardando, setGuardando] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemADesactivar, setItemADesactivar] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  const fetchClientes = async () => {
    setCargando(true);
    const params = new URLSearchParams();
    if (busqueda) params.set("q", busqueda);
    const res = await fetch(`/api/clientes?${params}`);
    const json = await res.json();
    if (json.success) setClientes(json.data.clientes);
    setCargando(false);
  };

  useEffect(() => { fetchClientes(); }, [busqueda]);

  const abrirForm = (cliente?: any) => {
    if (cliente) {
      setClienteEditar(cliente);
      setNombre(cliente.nombre || "");
      setTelefono(cliente.telefono || "");
      setEmail(cliente.email || "");
      setDireccion(cliente.direccion || "");
    } else {
      setClienteEditar(null);
      setNombre("");
      setTelefono("");
      setEmail("");
      setDireccion("");
    }
    setFormAbierto(true);
  };

  const handleGuardar = async () => {
    if (!nombre.trim()) return;
    setGuardando(true);
    try {
      const url = clienteEditar ? `/api/clientes/${clienteEditar.id}` : "/api/clientes";
      const method = clienteEditar ? "PATCH" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono: telefono || undefined, email: email || undefined, direccion: direccion || undefined }),
      });
      setFormAbierto(false);
      fetchClientes();
    } finally {
      setGuardando(false);
    }
  };

  const handleDesactivarClick = (id: string) => {
    setItemADesactivar(id);
    setConfirmOpen(true);
  };

  const handleConfirmarDesactivar = async () => {
    if (!itemADesactivar) return;
    await fetch(`/api/clientes/${itemADesactivar}`, { method: "DELETE" });
    setItemADesactivar(null);
    fetchClientes();
  };

  const handleActivar = async (id: string) => {
    await fetch(`/api/clientes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: true }),
    });
    fetchClientes();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={() => abrirForm()}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar clientes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="overflow-x-auto">
        {cargando ? (
          <TableSkeleton columns={5} rows={5} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No se encontraron clientes.
                  </TableCell>
                </TableRow>
              ) : (
                clientes.map((c) => (
                  <TableRow key={c.id} className={!c.activo ? "opacity-50" : ""}>
                    <TableCell className="font-medium">{c.nombre}</TableCell>
                    <TableCell>{c.telefono || "—"}</TableCell>
                    <TableCell>{c.email || "—"}</TableCell>
                    <TableCell>{c.direccion || "—"}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={c.activo ? "default" : "destructive"}>
                        {c.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => abrirForm(c)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {c.activo ? (
                          <Button size="sm" variant="ghost" onClick={() => handleDesactivarClick(c.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => handleActivar(c.id)}>
                            <RotateCcw className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={formAbierto} onOpenChange={setFormAbierto}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{clienteEditar ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Teléfono</Label>
                <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Dirección</Label>
              <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormAbierto(false)}>Cancelar</Button>
            <Button onClick={handleGuardar} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        abierto={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmarDesactivar}
        titulo="¿Desactivar cliente?"
        descripcion="El cliente se ocultará pero no se eliminará permanentemente."
        textoConfirmar="Desactivar"
        variante="destructive"
      />
    </div>
  );
}