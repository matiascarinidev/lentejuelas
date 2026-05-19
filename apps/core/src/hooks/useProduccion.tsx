"use client";

import { useState, useEffect, useCallback } from "react";
import { ProduccionLoteResponse } from "@/types/produccion";

interface UseProduccionOptions {
  productoId?: string;
  desde?: string;
  hasta?: string;
  pagina?: number;
}

export function useProduccion(options: UseProduccionOptions = {}) {
  const [lotes, setLotes] = useState<ProduccionLoteResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchLotes = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.productoId) params.set("productoId", options.productoId);
      if (options.desde) params.set("desde", options.desde);
      if (options.hasta) params.set("hasta", options.hasta);
      if (options.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/produccion?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setLotes(json.data.lotes);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [options.productoId, options.desde, options.hasta, options.pagina]);

  useEffect(() => {
    fetchLotes();
  }, [fetchLotes]);

  return { lotes, cargando, error, paginacion, refetch: fetchLotes };
}

export async function simularProduccion(data: {
  productoId: string;
  recetaId: string;
  cantidadPlanificada: number;
  horasProduccion?: number;
}) {
  const res = await fetch("/api/produccion/simular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function registrarProduccion(data: {
  productoId: string;
  recetaId: string;
  cantidadPlanificada: number;
  cantidadReal: number;
  mermaReal?: number;
  motivoMerma?: string;
  horasProduccion?: number;
  fechaProduccion?: string;
  fechaVencimiento?: string;
  observacion?: string;
}) {
  const res = await fetch("/api/produccion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
