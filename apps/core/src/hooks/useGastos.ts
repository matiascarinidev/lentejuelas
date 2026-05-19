"use client";

import { useState, useEffect, useCallback } from "react";

export function useGastosOperativos(prorrateable?: boolean) {
  const [gastos, setGastos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGastos = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (prorrateable !== undefined)
        params.set("prorrateable", String(prorrateable));
      const res = await fetch(`/api/gastos-operativos?${params}`);
      const json = await res.json();
      if (json.success) setGastos(json.data.gastos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [prorrateable]);

  useEffect(() => {
    fetchGastos();
  }, [fetchGastos]);

  return { gastos, cargando, error, refetch: fetchGastos };
}

export function useActivos(activo?: boolean) {
  const [activos, setActivos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivos = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (activo !== undefined) params.set("activo", String(activo));
      const res = await fetch(`/api/gastos-operativos/activos?${params}`);
      const json = await res.json();
      if (json.success) setActivos(json.data.activos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [activo]);

  useEffect(() => {
    fetchActivos();
  }, [fetchActivos]);

  return { activos, cargando, error, refetch: fetchActivos };
}
