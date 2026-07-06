"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShoppingCart } from "lucide-react";

export function LayoutClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const [alertas, setAlertas] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const VENTAS_API =
    process.env.NEXT_PUBLIC_VENTAS_API_URL ||
    "https://lentejuelas-ventas.vercel.app/api";

  useEffect(() => {
    const fetchNotificaciones = () => {
      fetch("/api/stock/dashboard")
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setAlertas(j.data.alertasStockBajo || 0);
        })
        .catch(() => {});

      fetch(`${VENTAS_API}/pedidos?estado=PENDIENTE`)
        .then((r) => r.json())
        .then((j) => {
          if (j.success) setPedidosPendientes(j.data.pedidos?.length || 0);
        })
        .catch(() => {});
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 60000);
    return () => clearInterval(interval);
  }, [VENTAS_API]);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-4 md:px-6 py-3">
        <div className="flex items-center">
          <span className="text-lg font-bold text-emerald-700">
            Lentejuelas
          </span>
          Core
          <div className="flex items-center gap-2 md:gap-3">
            {pedidosPendientes > 0 && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-amber-300 text-amber-700"
              >
                <ShoppingCart className="h-3 w-3" />
                <span className="hidden md:inline">
                  {pedidosPendientes} pedidos
                </span>
                <span className="md:hidden">{pedidosPendientes}</span> pedidos
              </Badge>
            )}
            {alertas > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span className="hidden md:inline">{alertas} stock bajo</span>
                <span className="md:hidden">{alertas} </span> stock bajo
              </Badge>
            )}
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
}
