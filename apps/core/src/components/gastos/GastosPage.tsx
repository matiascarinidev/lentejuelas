"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Loader2, Trash2, Power, PowerOff } from "lucide-react";
import { useGastosOperativos, useActivos } from "@/hooks/useGastos";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TableSkeleton } from "../ui/table-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GastosPage() {
  const [tab, setTab] = useState("operativos");
  const [formAbierto, setFormAbierto] = useState(false);
  const [formActivoAbierto, setFormActivoAbierto] = useState(false);
  const { gastos, cargando, refetch: refetchGastos } = useGastosOperativos();
  const {
    activos,
    cargando: cargandoActivos,
    refetch: refetchActivos,
  } = useActivos();

  // Form gasto operativo
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [prorrateable, setProrrateable] = useState(false);
  const [esManoDeObra, setEsManoDeObra] = useState(false);
  const [costoPorHora, setCostoPorHora] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<string | null>(null);

  const handleCrearGasto = async () => {
    setGuardando(true);
    try {
      await fetch("/api/gastos-operativos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concepto,
          monto: parseFloat(monto),
          prorrateable,
          esManoDeObra,
          costoPorHora: costoPorHora ? parseFloat(costoPorHora) : null,
        }),
      });
      setFormAbierto(false);
      setConcepto("");
      setMonto("");
      setProrrateable(false);
      setEsManoDeObra(false);
      setCostoPorHora("");
      refetchGastos();
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarGasto = async (id: string) => {
    setEliminando(id);
    await fetch(`/api/gastos-operativos/${id}`, { method: "DELETE" });
    setEliminando(null);
    refetchGastos();
  };

  // Form activo
  const [descripcion, setDescripcion] = useState("");
  const [valorAdquisicion, setValorAdquisicion] = useState("");
  const [vidaUtilTandas, setVidaUtilTandas] = useState("");
  const [guardandoActivo, setGuardandoActivo] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const handleCrearActivo = async () => {
    setGuardandoActivo(true);
    try {
      await fetch("/api/gastos-operativos/activos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion,
          valorAdquisicion: parseFloat(valorAdquisicion),
          vidaUtilTandas: parseInt(vidaUtilTandas),
        }),
      });
      setFormActivoAbierto(false);
      setDescripcion("");
      setValorAdquisicion("");
      setVidaUtilTandas("");
      refetchActivos();
    } finally {
      setGuardandoActivo(false);
    }
  };

  const handleToggleActivo = async (id: string, activo: boolean) => {
    setToggling(id);
    await fetch(`/api/activos/${id}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo }),
    });
    setToggling(null);
    refetchActivos();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gastos y Amortizaciones</h1>
          <p className="text-sm text-gray-500 mt-1">
            Costos operativos y activos amortizables
          </p>
        </div>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <div className="md:hidden">
          <Select value={tab} onValueChange={(value) => setTab(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
              <SelectValue placeholder="Gastos Operativos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={tab} value="operativos">
                Gastos Operativos
              </SelectItem>
              <SelectItem key={tab} value="activos">
                Activos Amortizables
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsList className="hidden md:inline">
          <TabsTrigger value="operativos">Gastos Operativos</TabsTrigger>
          <TabsTrigger value="activos">Activos Amortizables</TabsTrigger>
        </TabsList>

        <TabsContent value="operativos" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setFormAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Gasto
            </Button>
          </div>

          {cargando ? (
            <TableSkeleton columns={6} rows={6} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-32">Concepto</TableHead>
                  <TableHead className="text-center min-w-24">Monto</TableHead>
                  <TableHead className="text-center min-w-24">
                    Prorrateable
                  </TableHead>
                  <TableHead className="text-center min-w-32">
                    Mano de Obra
                  </TableHead>
                  <TableHead className="text-right min-w-24">
                    Costo/Hora
                  </TableHead>
                  <TableHead className="min-w-24 text-center">Fecha</TableHead>
                  <TableHead className="text-right md:text-center min-w-24">
                    Acción
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gastos?.map((g: any) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.concepto}</TableCell>
                    <TableCell className="text-right">
                      ${Number(g.monto).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={g.prorrateable ? "default" : "secondary"}>
                        {g.prorrateable ? "Sí" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {g.esManoDeObra ? (
                        <Badge variant="outline">Sí</Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {g.costoPorHora
                        ? `$${Number(g.costoPorHora).toFixed(2)}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(g.fecha), "dd/MM/yy", { locale: es })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEliminarGasto(g.id)}
                        disabled={eliminando === g.id}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="activos" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setFormActivoAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Activo
            </Button>
          </div>

          {cargandoActivos ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-36">Descripción</TableHead>
                  <TableHead className="text-center min-w-36">Valor</TableHead>
                  <TableHead className="text-center min-w-24 md:min-w-40">
                    Vida útil (tandas)
                  </TableHead>
                  <TableHead className="text-center min-w-24 md:min-w-36">
                    Tandas acum.
                  </TableHead>
                  <TableHead className="text-center">Costo/tanda</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right lg:text-center">
                    Acción
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activos?.map((a: any) => (
                  <TableRow
                    key={a.id}
                    className={!a.activo ? "opacity-50" : ""}
                  >
                    <TableCell className="font-medium">
                      {a.descripcion}
                    </TableCell>
                    <TableCell className="text-center">
                      ${Number(a.valorAdquisicion).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {a.vidaUtilTandas}
                    </TableCell>
                    <TableCell className="text-center">
                      {a.tandasAcumuladas}
                    </TableCell>
                    <TableCell className="text-center">
                      ${Number(a.costoPorTanda).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={a.activo ? "default" : "destructive"}>
                        {a.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleActivo(a.id, !a.activo)}
                        disabled={toggling === a.id}
                      >
                        {a.activo ? (
                          <PowerOff className="h-4 w-4 text-red-500" />
                        ) : (
                          <Power className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog nuevo gasto */}
      <Dialog open={formAbierto} onOpenChange={setFormAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Gasto Operativo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Concepto</Label>
              <Input
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
              />
            </div>
            <div>
              <Label>Monto</Label>
              <Input
                type="number"
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={prorrateable}
                onChange={(e) => setProrrateable(e.target.checked)}
              />
              <Label>Prorrateable</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={esManoDeObra}
                onChange={(e) => setEsManoDeObra(e.target.checked)}
              />
              <Label>Mano de obra</Label>
            </div>
            {esManoDeObra && (
              <div>
                <Label>Costo por hora</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={costoPorHora}
                  onChange={(e) => setCostoPorHora(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCrearGasto} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog nuevo activo */}
      <Dialog open={formActivoAbierto} onOpenChange={setFormActivoAbierto}>
        <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Activo Amortizable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Descripción</Label>
              <Input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div>
              <Label>Valor de adquisición</Label>
              <Input
                type="number"
                step="0.01"
                value={valorAdquisicion}
                onChange={(e) => setValorAdquisicion(e.target.value)}
              />
            </div>
            <div>
              <Label>Vida útil (en tandas)</Label>
              <Input
                type="number"
                min="1"
                value={vidaUtilTandas}
                onChange={(e) => setVidaUtilTandas(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Ej: freezer que dura 2000 tandas, sartén 1000 tandas
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormActivoAbierto(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCrearActivo} disabled={guardandoActivo}>
              {guardandoActivo ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
