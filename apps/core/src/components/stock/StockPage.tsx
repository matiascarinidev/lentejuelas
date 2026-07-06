"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  AlertTriangle,
  Package,
  ArrowDown,
  ArrowUp,
  Loader2,
  DollarSign,
  Pencil,
} from "lucide-react";
import {
  useStockInsumos,
  useStockProductos,
  useMovimientos,
} from "@/hooks/useStock";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function StockPage() {
  const [tab, setTab] = useState("insumos");
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroMov, setFiltroMov] = useState("");
  const [dashboard, setDashboard] = useState<any>(null);

  // Ajuste rápido
  const [ajusteAbierto, setAjusteAbierto] = useState(false);
  const [ajusteItem, setAjusteItem] = useState<{
    itemId: string;
    tipo: "INSUMO" | "PRODUCTO";
    nombre: string;
    stockActual: number;
    unidad: string;
  } | null>(null);
  const [cantidadAjuste, setCantidadAjuste] = useState("");
  const [observacionAjuste, setObservacionAjuste] = useState("");
  const [guardandoAjuste, setGuardandoAjuste] = useState(false);

  const {
    items: insumos,
    cargando: cargandoInsumos,
    refetch: refetchInsumos,
  } = useStockInsumos({
    busqueda: busqueda || undefined,
    tipo: filtroTipo || undefined,
  });

  const {
    items: productos,
    cargando: cargandoProductos,
    refetch: refetchProductos,
  } = useStockProductos({
    busqueda: busqueda || undefined,
  });

  const { movimientos, cargando: cargandoMov } = useMovimientos({
    tipo: filtroMov || undefined,
  });

  useEffect(() => {
    fetch("/api/stock/dashboard")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setDashboard(j.data);
      });
  }, []);

  const abrirAjuste = (item: any, tipo: "INSUMO" | "PRODUCTO") => {
    setAjusteItem({
      itemId: item.id,
      tipo,
      nombre: item.nombre,
      stockActual: item.stockActual,
      unidad: item.unidad || "unidades",
    });
    setCantidadAjuste(String(item.stockActual));
    setObservacionAjuste("");
    setAjusteAbierto(true);
  };

  const handleAjustar = async () => {
    if (!ajusteItem) return;
    setGuardandoAjuste(true);
    try {
      const res = await fetch("/api/stock/ajustar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: ajusteItem.itemId,
          tipo: ajusteItem.tipo,
          cantidadReal: parseFloat(cantidadAjuste),
          observacion: observacionAjuste || undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setAjusteAbierto(false);
      if (ajusteItem.tipo === "INSUMO") refetchInsumos();
      else refetchProductos();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGuardandoAjuste(false);
    }
  };

  const tipoColorMap: Record<string, string> = {
    MATERIA_PRIMA: "bg-blue-100 text-blue-800",
    ENVASE: "bg-yellow-100 text-yellow-800",
    ETIQUETA: "bg-purple-100 text-purple-800",
    OPERATIVO: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 p-4 md:p-6 xl:max-w-screen-2xl xl:m-auto">
      <div>
        <h1 className="text-2xl font-bold">Stock</h1>
        <p className="text-sm text-gray-500 mt-1">
          Control de inventario y movimientos
        </p>
      </div>

      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Alertas stock bajo
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {dashboard.alertasStockBajo}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Movimientos hoy
              </CardTitle>
              <Package className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard.movimientosHoy}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Insumos activos
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard.totalInsumosActivos}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="insumos">Insumos</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
        </TabsList>

        <TabsContent value="insumos" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 mb-4" />
              <Input
                placeholder="Buscar insumos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__todos">Todos</SelectItem>
                <SelectItem value="MATERIA_PRIMA">Materia Prima</SelectItem>
                <SelectItem value="ENVASE">Envases</SelectItem>
                <SelectItem value="ETIQUETA">Etiquetas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {cargandoInsumos ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead className="text-left">Tipo</TableHead>
                    <TableHead className="text-right md:text-center min-w-24 md:min-w-36">
                      Stock
                    </TableHead>
                    <TableHead className="text-right md:text-center min-w-32">
                      Stock Mín.
                    </TableHead>
                    <TableHead className="text-right min-w-32">
                      Costo Unit.
                    </TableHead>
                    <TableHead className="text-center min-w-24">
                      Valor Stock
                    </TableHead>
                    <TableHead className="text-center md:min-w-36">
                      Proveedor
                    </TableHead>
                    <TableHead className="text-center min-w-24">
                      Estado
                    </TableHead>
                    <TableHead className="text-right md:text-center min-w-24">
                      Ajustar
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insumos.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 min-w-32">
                          {item.stockBajo && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                          {item.nombre}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-48">
                        <Badge className={tipoColorMap[item.tipo] || ""}>
                          {item.tipo?.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right  md:text-center">
                        <span
                          className={
                            item.stockBajo ? "text-amber-600 font-medium" : ""
                          }
                        >
                          {item.stockActual?.toFixed(0)}{" "}
                          <span className="hidden lg:inline">
                            {" "}
                            {item.unidad}
                          </span>
                          <span className="lg:hidden">
                            {" "}
                            {item.unidad.charAt(0)}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-right md:text-center">
                        {item.stockMinimo?.toFixed(0)}
                      </TableCell>
                      <TableCell className="text-right  md:text-center">
                        ${item.costoUnitario?.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right  md:text-center">
                        ${item.valorStock?.toFixed(2)}
                      </TableCell>
                      <TableCell className="md:text-center">
                        {item.proveedor || "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.stockBajo ? (
                          <Badge variant="destructive">Bajo</Badge>
                        ) : (
                          <Badge variant="default">OK</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right  md:text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => abrirAjuste(item, "INSUMO")}
                          title="Ajustar stock"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="productos" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>

          {cargandoProductos ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-center min-w-24">
                      Propio
                    </TableHead>
                    <TableHead className="text-right min-w-24">Stock</TableHead>
                    <TableHead className="text-right min-w-32">
                      Precio Venta
                    </TableHead>
                    <TableHead className="text-right min-w-32">
                      Valor Stock
                    </TableHead>
                    <TableHead className="text-right min-w-24">
                      Ajustar
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium flex min-w-48 ">
                        {item.nombre}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.esProduccionPropia ? "Sí" : "No"}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.stockActual}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.precioVentaSugerido?.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.valorStock?.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => abrirAjuste(item, "PRODUCTO")}
                          title="Ajustar stock"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="movimientos" className="space-y-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Select value={filtroMov} onValueChange={setFiltroMov}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__todos">Todos</SelectItem>
                  <SelectItem value="ENTRADA">Entradas</SelectItem>
                  <SelectItem value="SALIDA">Salidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {cargandoMov ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="min-w-48 md:text-center md:min-w-72">
                      Item
                    </TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead>Observación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos.map((mov: any) => (
                    <TableRow key={mov.id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {format(new Date(mov.fecha), "dd/MM HH:mm", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>
                        {mov.tipo === "ENTRADA" ? (
                          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                            <ArrowDown className="h-3 w-3" /> Entrada
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                            <ArrowUp className="h-3 w-3" /> Salida
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="m-w-48 md:min-w-72 lg:w-fit">
                        <span className="font-medium">{mov.itemNombre}</span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({mov.itemTipo})
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {mov.cantidad?.toFixed(0)}
                        <span className="hidden lg:inline"> {mov.unidad} </span>
                        <span className="lg:hidden">
                          {" "}
                          {mov.unidad.charAt(0)}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500 max-w-xs truncate">
                        {mov.observacion || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de ajuste rápido */}
      <Dialog open={ajusteAbierto} onOpenChange={setAjusteAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajustar Stock</DialogTitle>
          </DialogHeader>
          {ajusteItem && (
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="font-medium">{ajusteItem.nombre}</p>
                <p className="text-sm text-gray-500">
                  Stock actual: {ajusteItem.stockActual?.toFixed(2)}{" "}
                  {ajusteItem.unidad}
                </p>
              </div>
              <div>
                <Label>Nuevo stock real</Label>
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  value={cantidadAjuste}
                  onChange={(e) => setCantidadAjuste(e.target.value)}
                />
                {cantidadAjuste &&
                  parseFloat(cantidadAjuste) !== ajusteItem.stockActual && (
                    <p className="text-xs text-amber-600 mt-1">
                      Diferencia:{" "}
                      {(
                        parseFloat(cantidadAjuste) - ajusteItem.stockActual
                      ).toFixed(2)}{" "}
                      {ajusteItem.unidad}
                    </p>
                  )}
              </div>
              <div>
                <Label>Observación</Label>
                <Input
                  value={observacionAjuste}
                  onChange={(e) => setObservacionAjuste(e.target.value)}
                  placeholder="Ej: conteo físico, merma..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAjusteAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAjustar} disabled={guardandoAjuste}>
              {guardandoAjuste ? "Guardando..." : "Guardar ajuste"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
