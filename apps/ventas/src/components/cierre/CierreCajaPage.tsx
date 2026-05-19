"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Printer, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { exportToCSV } from "@/lib/exportReport";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

export function CierreCajaPage() {
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [efectivoDeclarado, setEfectivoDeclarado] = useState("");
  const [conciliacion, setConciliacion] = useState<any>(null);
  const conciliar = async () => {
    const res = await fetch("/api/cierre-caja/conciliar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        efectivoDeclarado: parseFloat(efectivoDeclarado),
      }),
    });
    const json = await res.json();
    if (json.success) setConciliacion(json.data);
  };
  const fetchCierre = () => {
    setCargando(true);
    fetch("/api/cierre-caja")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data);
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    fetchCierre();
  }, []);

  const imprimir = () => {
    window.print();
  };

  if (cargando) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  const metodoColor: Record<string, string> = {
    EFECTIVO: "bg-green-100 text-green-800",
    TARJETA: "bg-blue-100 text-blue-800",
    TRANSFERENCIA: "bg-purple-100 text-purple-800",
    OTRO: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cierre de Caja</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data?.fecha &&
              format(new Date(data.fecha), "EEEE d 'de' MMMM", { locale: es })}
          </p>
        </div>
        <Button onClick={imprimir} variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Imprimir
        </Button>
        <Button
          onClick={() => {
            if (data?.ventas) {
              exportToCSV(
                `cierre-caja-${new Date().toISOString().split("T")[0]}`,
                data.ventas.map((v: any) => ({
                  Hora: format(new Date(v.fecha), "HH:mm", { locale: es }),
                  Cliente: v.cliente?.nombre || "Mostrador",
                  Metodo: v.metodoPago,
                  Total: Number(v.total).toFixed(2),
                }))
              );
            }
          }}
          variant="outline"
        >
          Exportar CSV
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total facturado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">
              ${data?.totalGeneral?.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Cantidad de ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.cantidadVentas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Por método
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {data?.totalPorMetodo?.map((m: any) => (
              <div key={m.metodo} className="flex justify-between text-sm">
                <Badge className={metodoColor[m.metodo]}>{m.metodo}</Badge>
                <span className="font-medium">${m.total.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalle de ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Método</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.ventas?.map((v: any) => (
                <TableRow key={v.id}>
                  <TableCell className="text-sm">
                    {format(new Date(v.fecha), "HH:mm", { locale: es })}
                  </TableCell>
                  <TableCell>{v.cliente?.nombre || "Mostrador"}</TableCell>
                  <TableCell>
                    <Badge className={metodoColor[v.metodoPago]}>
                      {v.metodoPago}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${Number(v.total).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conciliación de efectivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Efectivo contado en caja
            </Label>
            <Input
              type="number"
              step="0.01"
              value={efectivoDeclarado}
              onChange={(e) => setEfectivoDeclarado(e.target.value)}
              placeholder="Ingresá el efectivo físico"
              className="mt-1"
            />
          </div>
          <Button onClick={conciliar}>Conciliar</Button>
          {conciliacion && (
            <div className="space-y-2 mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm">Efectivo esperado</span>
                <span className="font-medium">
                  ${conciliacion.efectivoEsperado.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Efectivo declarado</span>
                <span className="font-medium">
                  ${conciliacion.efectivoDeclarado.toFixed(2)}
                </span>
              </div>
              <div
                className={`flex justify-between font-bold text-lg border-t pt-2 ${
                  conciliacion.diferencia !== 0
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                <span>Diferencia</span>
                <span>${conciliacion.diferencia.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
