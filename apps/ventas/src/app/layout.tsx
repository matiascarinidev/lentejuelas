"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { Coffee, Clock } from "lucide-react";
import { startQueueProcessor } from "@/lib/offlineQueue";
import { fetchCore } from "@/lib/api";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="es">
      <head>
        <title>Lentejuelas - Ventas</title>
        <meta
          name="description"
          content="Sistema de gestión para emprendimientos gastronómicos"
        />
        <meta property="og:title" content="Lentejuelas" />
        <meta
          property="og:image"
          content="https://lentejuelas-ventas.vercel.app/og-image.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta
          name="twitter:image"
          content="https://lentejuelas-ventas.vercel.app/og-image.png"
        />
        <meta
          property="og:description"
          content="Gestión de producción, recetas, costos y ventas. Aplicación web para emprendedores gastronómicos."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lentejuelas" />
        <meta
          name="twitter:description"
          content="Gestión de producción, recetas, costos y ventas. Aplicación web para emprendedores gastronómicos."
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          <nav className="border-b bg-white px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-emerald-700">
                Lentejuelas
              </span>
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
      </body>
    </html>
  );
}
