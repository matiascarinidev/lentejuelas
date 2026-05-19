"use client";

import { useState, useEffect, useCallback } from "react";

export function useProveedores(options?: {
  busqueda?: string;
  activo?: boolean;
  pagina?: number;
}) {
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchProveedores = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options?.busqueda) params.set("q", options.busqueda);
      if (options?.activo !== undefined)
        params.set("activo", String(options.activo));
      if (options?.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/proveedores?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setProveedores(json.data.proveedores);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [options?.busqueda, options?.activo, options?.pagina]);

  useEffect(() => {
    fetchProveedores();
  }, [fetchProveedores]);

  return {
    proveedores,
    cargando,
    error,
    paginacion,
    refetch: fetchProveedores,
  };
}

export async function crearProveedor(data: {
  nombre: string;
  contacto?: string;
  telefono?: string;
  email?: string;
}) {
  const res = await fetch("/api/proveedores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function actualizarProveedor(id: string, data: any) {
  const res = await fetch(`/api/proveedores/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function desactivarProveedor(id: string) {
  const res = await fetch(`/api/proveedores/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function activarProveedor(id: string) {
  const res = await fetch(`/api/proveedores/${id}/activar`, { method: "POST" });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
