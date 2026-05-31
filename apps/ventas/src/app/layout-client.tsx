"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Coffee, Clock } from "lucide-react";
import { startQueueProcessor } from "@/lib/offlineQueue";
import { fetchCore } from "@/lib/api";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [mesasOcupadas, setMesasOcupadas] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);

  useEffect(() => {
    startQueueProcessor(fetchCore);

    const fetchNotificaciones = () => {
      fetch("/api/dashboard")
        .then((r) => r.json())
        .then((j) => {
          if (j.success) {
            setMesasOcupadas(j.data.mesasActivas || 0);
            setPedidosPendientes(j.data.pedidosPendientes || 0);
          }
        })
        .catch(() => {});
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-700">
            Lentejuelas
          </span>
          Ventas
          <div className="flex items-center gap-3">
            {mesasOcupadas > 0 && (
              <Badge variant="default" className="flex items-center gap-1">
                <Coffee className="h-3 w-3" />
                {mesasOcupadas} mesas
              </Badge>
            )}
            {pedidosPendientes > 0 && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-amber-300 text-amber-700"
              >
                <Clock className="h-3 w-3" />
                {pedidosPendientes} pendientes
              </Badge>
            )}
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
}
