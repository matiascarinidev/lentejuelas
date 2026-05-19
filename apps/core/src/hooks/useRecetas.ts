"use client";

import { useState, useEffect, useCallback } from "react";
import { RecetaResponse } from "@/types/receta";

interface UseRecetasOptions {
  productoId?: string;
  activa?: boolean;
  pagina?: number;
}

export function useRecetas(options: UseRecetasOptions = {}) {
  const [recetas, setRecetas] = useState<RecetaResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchRecetas = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.productoId) params.set("productoId", options.productoId);
      if (options.activa !== undefined)
        params.set("activa", String(options.activa));
      if (options.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/recetas?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setRecetas(json.data.recetas);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [options.productoId, options.activa, options.pagina]);

  useEffect(() => {
    fetchRecetas();
  }, [fetchRecetas]);

  return { recetas, cargando, error, paginacion, refetch: fetchRecetas };
}

export async function fetchReceta(id: string) {
  const res = await fetch(`/api/recetas/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data as RecetaResponse;
}

export async function crearReceta(data: any) {
  const res = await fetch("/api/recetas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function duplicarReceta(
  id: string,
  productoId: string,
  varianteNombre?: string
) {
  const res = await fetch(`/api/recetas/${id}/duplicar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productoId, varianteNombre }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function agregarItemAReceta(recetaId: string, data: any) {
  const res = await fetch(`/api/recetas/${recetaId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function actualizarItemReceta(itemId: string, data: any) {
  const res = await fetch(`/api/recetas/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function eliminarItemReceta(itemId: string) {
  const res = await fetch(`/api/recetas/items/${itemId}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function toggleReceta(id: string, activar: boolean) {
  const endpoint = activar ? "activar" : "";
  const method = activar ? "POST" : "DELETE";
  const res = await fetch(
    `/api/recetas/${id}${endpoint ? `/${endpoint}` : ""}`,
    { method }
  );
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
