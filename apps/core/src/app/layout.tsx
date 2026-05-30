"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShoppingCart } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertas, setAlertas] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const VENTAS_API = process.env.NEXT_PUBLIC_VENTAS_API_URL;
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
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Lentejuelas - Core</title>
        <meta
          name="description"
          content="Sistema de gestión para emprendimientos gastronómicos"
        />
        <meta
          property="og:image"
          content="https://lentejuelas-core.vercel.app/og-image.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta
          name="twitter:image"
          content="https://lentejuelas-core.vercel.app/og-image.png"
        />
        <meta property="og:title" content="Lentejuelas" />
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
                {pedidosPendientes > 0 && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-amber-300 text-amber-700"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    {pedidosPendientes} pedidos
                  </Badge>
                )}
                {alertas > 0 && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {alertas} stock bajo
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
