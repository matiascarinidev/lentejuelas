"use client";

import { useState, useEffect, useCallback } from "react";
import { InsumoResponse } from "@/types/insumo";

interface UseInsumosOptions {
  tipo?: string;
  activo?: boolean;
  proveedorId?: string;
  busqueda?: string;
  stockBajo?: boolean;
  pagina?: number;
}

export function useInsumos(options: UseInsumosOptions = {}) {
  const [insumos, setInsumos] = useState<InsumoResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchInsumos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (options.tipo) params.set("tipo", options.tipo);
      if (options.activo !== undefined)
        params.set("activo", String(options.activo));
      if (options.proveedorId) params.set("proveedorId", options.proveedorId);
      if (options.busqueda) params.set("q", options.busqueda);
      if (options.stockBajo) params.set("stockBajo", "true");
      if (options.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/insumos?${params}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      setInsumos(json.data.insumos);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [
    options.tipo,
    options.activo,
    options.proveedorId,
    options.busqueda,
    options.stockBajo,
    options.pagina,
  ]);

  useEffect(() => {
    fetchInsumos();
  }, [fetchInsumos]);

  return { insumos, cargando, error, paginacion, refetch: fetchInsumos };
}

export async function crearInsumo(data: {
  nombre: string;
  tipo: string;
  unidadBase: string;
  unidadCompra: string;
  factorConversion: number;
  costoUnitarioEstimado: number;
  stockMinimo: number;
  proveedorId?: string;
}) {
  const res = await fetch("/api/insumos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function actualizarInsumo(id: string, data: any) {
  const res = await fetch(`/api/insumos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function desactivarInsumo(id: string) {
  const res = await fetch(`/api/insumos/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
