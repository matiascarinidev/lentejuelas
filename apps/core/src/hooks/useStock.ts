"use client";

import { useState, useEffect, useCallback } from "react";

export function useStockInsumos(options?: {
  tipo?: string;
  busqueda?: string;
  stockBajo?: boolean;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (options?.tipo) params.set("tipo", options.tipo);
      if (options?.busqueda) params.set("q", options.busqueda);
      if (options?.stockBajo) params.set("stockBajo", "true");
      const res = await fetch(`/api/stock/insumos?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setItems(json.data.items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [options?.tipo, options?.busqueda, options?.stockBajo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { items, cargando, error, refetch: fetchData };
}

export function useStockProductos(options?: {
  busqueda?: string;
  propio?: boolean;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const fetchData = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (options?.busqueda) params.set("q", options.busqueda);
      if (options?.propio !== undefined)
        params.set("propio", String(options.propio));
      const res = await fetch(`/api/stock/productos?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setItems(json.data.items);
    } finally {
      setCargando(false);
    }
  }, [options?.busqueda, options?.propio]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { items, cargando, refetch: fetchData };
}

export function useMovimientos(options?: {
  tipo?: string;
  desde?: string;
  hasta?: string;
}) {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const fetchData = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (options?.tipo) params.set("tipo", options.tipo);
      if (options?.desde) params.set("desde", options.desde);
      if (options?.hasta) params.set("hasta", options.hasta);
      const res = await fetch(`/api/stock/movimientos?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setMovimientos(json.data.movimientos);
    } finally {
      setCargando(false);
    }
  }, [options?.tipo, options?.desde, options?.hasta]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { movimientos, cargando, refetch: fetchData };
}
