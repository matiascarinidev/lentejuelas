"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProveedorFormProps {
  abierto: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  proveedor?: any;
}

export function ProveedorForm({
  abierto,
  onClose,
  onSubmit,
  proveedor,
}: ProveedorFormProps) {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (proveedor) {
      setNombre(proveedor.nombre || "");
      setContacto(proveedor.contacto || "");
      setTelefono(proveedor.telefono || "");
      setEmail(proveedor.email || "");
    } else {
      setNombre("");
      setContacto("");
      setTelefono("");
      setEmail("");
    }
  }, [proveedor, abierto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    setGuardando(true);
    try {
      await onSubmit({
        nombre,
        contacto: contacto || undefined,
        telefono: telefono || undefined,
        email: email || undefined,
      });
      onClose();
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {proveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Contacto</Label>
              <Input
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
              />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
