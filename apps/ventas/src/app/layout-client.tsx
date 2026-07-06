"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Coffee, Clock } from "lucide-react";
import { startQueueProcessor } from "@/lib/offlineQueue";
import { fetchCore } from "@/lib/api";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [mesasOcupadas, setMesasOcupadas] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const [itemsListosPrevios, setItemsListosPrevios] = useState(0);

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
      fetch("/api/cocina?estado=LISTO")
        .then((r) => r.json())
        .then((j) => {
          if (j.success) {
            const totalListos = j.data?.length || 0;
            if (totalListos > itemsListosPrevios && itemsListosPrevios >= 0) {
              try {
                const audio = new Audio("/notification.mp3");
                audio.play().catch(() => {});
              } catch {}
            }
            setItemsListosPrevios(totalListos);
          }
        })
        .catch(() => {});
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 5000);
    return () => clearInterval(interval);
  }, [itemsListosPrevios]);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-emerald-700">
              Lentejuelas
            </span>
            Ventas
          </div>
        </div>
      </nav>
      <div className="flex items-center p-4 md:p-6 gap-2 md:gap-3">
        {mesasOcupadas > 0 && (
          <Badge variant="default" className="flex items-center gap-1">
            <Coffee className="h-3 w-3" />
            <span className="hidden md:inline">{mesasOcupadas} mesas</span>
            <span className="md:hidden">{mesasOcupadas}</span> mesas
          </Badge>
        )}
        {pedidosPendientes > 0 && (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-amber-300 text-amber-700"
          >
            <Clock className="h-3 w-3" />
            <span className="hidden md:inline">
              {pedidosPendientes} pedidos
            </span>
            <span className="md:hidden">{pedidosPendientes}</span> pedidos
          </Badge>
        )}
      </div>

      {children}
    </main>
  );
}
