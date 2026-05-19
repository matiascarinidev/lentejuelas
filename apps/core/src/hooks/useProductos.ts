"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductoResponse } from "@/types/producto";

interface UseProductosOptions {
  categoria?: string;
  activo?: boolean;
  propio?: boolean;
  busqueda?: string;
  pagina?: number;
}

export function useProductos(options: UseProductosOptions = {}) {
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    totalPaginas: 1,
    total: 0,
  });

  const fetchProductos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (options.categoria) params.set("categoria", options.categoria);
      if (options.activo !== undefined)
        params.set("activo", String(options.activo));
      if (options.propio !== undefined)
        params.set("propio", String(options.propio));
      if (options.busqueda) params.set("q", options.busqueda);
      if (options.pagina) params.set("pagina", String(options.pagina));

      const res = await fetch(`/api/productos?${params}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      setProductos(json.data.productos);
      setPaginacion(json.data.paginacion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [
    options.categoria,
    options.activo,
    options.propio,
    options.busqueda,
    options.pagina,
  ]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return { productos, cargando, error, paginacion, refetch: fetchProductos };
}

export async function crearProducto(data: {
  nombre: string;
  categoria: string;
  esProduccionPropia: boolean;
  precioVentaSugerido: number;
}) {
  const res = await fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function actualizarProducto(id: string, data: any) {
  const res = await fetch(`/api/productos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function desactivarProducto(id: string) {
  const res = await fetch(`/api/productos/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
