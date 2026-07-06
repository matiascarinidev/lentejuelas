"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ProveedorForm } from "@/components/proveedores/ProveedorForm";
import { CompraForm } from "./CompraForm";
import { useCompras } from "@/hooks/useCompras";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "../ui/table-skeleton";

export function ComprasPage() {
  const [proveedorFormAbierto, setProveedorFormAbierto] = useState(false);
  const [compraFormAbierto, setCompraFormAbierto] = useState(false);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [proveedorFiltro, setProveedorFiltro] = useState("todos");

  const { compras, cargando, error, refetch } = useCompras({
    proveedorId: proveedorFiltro !== "todos" ? proveedorFiltro : undefined,
  });

  useEffect(() => {
    fetch("/api/proveedores?limite=100")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProveedores(j.data.proveedores);
      });
  }, [compraFormAbierto]);

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compras y Proveedores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Registro de compras de insumos y gestión de proveedores
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-around md:gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setProveedorFormAbierto(true)}
          >
            <Plus className=" md:h-4 md:w-4" /> Proveedor
          </Button>
          <Button onClick={() => setCompraFormAbierto(true)}>
            <Plus className="md:h-4 md:w-4" />
            {""}
            <span className="hidden md:inline">Nueva</span> Compra
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={proveedorFiltro} onValueChange={setProveedorFiltro}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los proveedores</SelectItem>
              {proveedores.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {cargando && <TableSkeleton columns={6} rows={8} />}

      {!cargando && compras.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-gray-500">No hay compras registradas.</p>
          <Button onClick={() => setCompraFormAbierto(true)}>
            <Plus className="mr-2 h-4 w-4" /> Registrar primera compra
          </Button>
        </div>
      )}

      {!cargando && compras.length > 0 && (
        <div className="space-y-4">
          {compras.map((compra) => (
            <Card key={compra.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {compra.proveedor?.nombre || "Compra sin proveedor"}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {format(new Date(compra.fecha), "dd/MM/yyyy", {
                      locale: es,
                    })}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    #{compra.id.slice(-8)}
                  </span>
                  <span className="text-lg font-bold">
                    ${Number(compra.total).toFixed(0)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {compra.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.insumo.nombre} — {Number(item.cantidadCompra)}
                        <span className="hidden md:inline">
                          {item.insumo.unidadCompra}
                        </span>
                        <span className="md:hidden">
                          {item.insumo.unidadCompra?.charAt(0)}
                        </span>
                      </span>
                      <span>${Number(item.precioUnitario).toFixed(0)} c/u</span>
                    </div>
                  ))}
                </div>
                {compra.observacion && (
                  <p className="text-xs text-gray-400 mt-2">
                    {compra.observacion}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProveedorForm
        abierto={proveedorFormAbierto}
        onClose={() => setProveedorFormAbierto(false)}
        onSubmit={async (data) => {
          await fetch("/api/proveedores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          setProveedorFormAbierto(false);
        }}
      />

      <CompraForm
        abierto={compraFormAbierto}
        onClose={() => setCompraFormAbierto(false)}
        onSuccess={() => refetch()}
        proveedores={proveedores}
      />
    </div>
  );
}
