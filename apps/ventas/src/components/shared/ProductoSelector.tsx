"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Minus, X } from "lucide-react";
import { fetchCore } from "@/lib/api";

interface ProductoSelectorProps {
  items: {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
    nombre?: string;
    requiereCocina?: boolean;
    esProductoPropio?: boolean;
    unidadesPorPack?: number | null;
  }[];
  onChange: (
    items: {
      productoId: string;
      cantidad: number;
      precioUnitario: number;
      nombre?: string;
      requiereCocina?: boolean;
      esProductoPropio?: boolean;
      unidadesPorPack?: number | null;
    }[]
  ) => void;
}

const normalizar = (texto: string) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function ProductoSelector({ items, onChange }: ProductoSelectorProps) {
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<
    { id: string; nombre: string }[]
  >([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("TODAS");
  const [mostrando, setMostrando] = useState(false);

  useEffect(() => {
    fetchCore("/productos?limite=100&activo=true").then((data) => {
      if (data.success && data.data?.productos) {
        const prods = data.data.productos.map((p: any) => ({
          ...p,
          stockActual: Number(p.stockActual) || 0,
          precioVenta: Number(p.precioVentaFinal ?? p.precioVentaSugerido) || 0,
          unidadesPorPack: p.recetas?.[0]?.unidadesPorPack || null,
          requiereCocina: p.requiereCocina ?? false,
          esProduccionPropia: p.esProduccionPropia ?? false,
          categoriaNombre: p.categoria?.nombre || "Sin categoría",
        }));
        setProductos(prods);

        // Extraer categorías únicas
        const cats = new Map<string, string>();
        prods.forEach((p: any) => {
          if (p.categoriaId && p.categoriaNombre) {
            cats.set(p.categoriaId, p.categoriaNombre);
          }
        });
        setCategorias(
          Array.from(cats.entries()).map(([id, nombre]) => ({ id, nombre }))
        );
      }
    });
  }, []);

  const productosFiltrados = productos
    .filter((p) => {
      const coincideBusqueda = normalizar(p.nombre).includes(
        normalizar(busqueda)
      );
      const coincideCategoria =
        filtroCategoria === "TODAS" || p.categoriaId === filtroCategoria;
      const noEstaAgregado = !items.find((i) => i.productoId === p.id);
      return coincideBusqueda && coincideCategoria && noEstaAgregado;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  const agregarProducto = (p: any) => {
    onChange([
      ...items,
      {
        productoId: p.id,
        nombre: p.nombre,
        cantidad: 1,
        precioUnitario: p.precioVenta,
        unidadesPorPack: p.unidadesPorPack || null,
        requiereCocina: p.requiereCocina ?? false,
        esProductoPropio: p.esProduccionPropia ?? false,
      },
    ]);
    setBusqueda("");
  };

  const actualizarCantidad = (productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      onChange(items.filter((i) => i.productoId !== productoId));
    } else {
      onChange(
        items.map((i) => (i.productoId === productoId ? { ...i, cantidad } : i))
      );
    }
  };

  const actualizarPrecio = (productoId: string, precio: number) => {
    onChange(
      items.map((i) =>
        i.productoId === productoId ? { ...i, precioUnitario: precio } : i
      )
    );
  };

  const total = items.reduce(
    (sum, i) => sum + i.cantidad * i.precioUnitario,
    0
  );

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-2">
        <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Todas</SelectItem>
            {categorias.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setMostrando(true);
            }}
            onFocus={() => setMostrando(true)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Dropdown de productos */}
      {/* Lista de productos */}
      {mostrando && (
        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
            <span className="text-xs text-gray-500">
              {productosFiltrados.length} producto
              {productosFiltrados.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setMostrando(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {productosFiltrados.length === 0 ? (
              <p className="p-3 text-sm text-gray-500 text-center">
                Sin resultados
              </p>
            ) : (
              productosFiltrados.map((p) => (
                <button
                  key={p.id}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                  onClick={() => {
                    agregarProducto(p);
                    setMostrando(false);
                  }}
                >
                  <div >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{p.nombre}</span>
                      {p.requiereCocina && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-orange-50 text-orange-600 border-orange-200 justify-self-end"
                        >
                          Cocina
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 justify-between ">
                      <span className="text-xs text-gray-400">
                        {p.categoriaNombre}
                        {" · "}
                        {p.unidadesPorPack
                          ? `${Math.floor(p.stockActual / p.unidadesPorPack)} packs`
                          : p.requiereCocina
                            ? "Se prepara al momento"
                            : `${p.stockActual} en stock`}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        ${p.precioVenta.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Items agregados */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.productoId}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {item.nombre || `Prod #${item.productoId.slice(-4)}`}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() =>
                    actualizarCantidad(item.productoId, item.cantidad - 1)
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.cantidad}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() =>
                    actualizarCantidad(item.productoId, item.cantidad + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <Input
                  type="number"
                  step="0.01"
                  value={item.precioUnitario}
                  onChange={(e) =>
                    actualizarPrecio(
                      item.productoId,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="h-8 text-sm text-right w-full sm:w-20"
                />
              </div>
              <span className="text-sm font-medium w-full sm:w-20 text-left sm:text-right">
                ${(item.cantidad * item.precioUnitario).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-end pt-2 border-t">
            <span className="text-lg font-bold">
              Total: ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
