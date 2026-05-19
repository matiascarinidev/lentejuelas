"use client";

import { useState, useEffect, useCallback } from "react";

interface UseComprasOptions {
  proveedorId?: string;
  desde?: string;
  hasta?: string;
  pagina?: number;
}

export function useCompras(options: UseComprasOptions = {}) {
  const [compras, setCompras] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchCompras = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.proveedorId) params.set("proveedorId", options.proveedorId);
      if (options.desde) params.set("desde", options.desde);
      if (options.hasta) params.set("hasta", options.hasta);
      if (options.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/compras?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setCompras(json.data.compras);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [options.proveedorId, options.desde, options.hasta, options.pagina]);

  useEffect(() => {
    fetchCompras();
  }, [fetchCompras]);

  return { compras, cargando, error, paginacion, refetch: fetchCompras };
}

export async function registrarCompra(data: {
  proveedorId?: string | null;
  fecha?: string;
  items: { insumoId: string; cantidadCompra: number; precioUnitario: number }[];
  observacion?: string;
}) {
  const res = await fetch("/api/compras", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
