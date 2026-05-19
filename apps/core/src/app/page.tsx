"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { ProductoPage } from "@/components/productos/ProductoPage";
import { InsumoPage } from "@/components/insumos/InsumoPage";
import { RecetaPage } from "@/components/recetas/RecetaPage";
import { ProduccionPage } from "@/components/produccion/ProduccionPage";
import { ComprasPage } from "@/components/compras/ComprasPage";
import { ProveedorPage } from "@/components/proveedores/ProveedorPage";
import { GastosPage } from "@/components/gastos/GastosPage";
import { StockPage } from "@/components/stock/StockPage";
import { SimuladorPage } from "@/components/produccion/SimuladorPage";

import { useState } from "react";

const tabs = [
  { value: "dashboard", label: "Dashboard" },
  { value: "produccion", label: "Producción" },
  { value: "compras", label: "Compras" },
  { value: "stock", label: "Stock" },
  { value: "productos", label: "Productos" },
  { value: "recetas", label: "Recetas" },
  { value: "insumos", label: "Insumos" },
  { value: "gastos", label: "Gastos" },
  { value: "proveedores", label: "Proveedores" },
  { value: "simulador", label: "Simulador" },
];

export default function Home() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div>
      <div className="border-b bg-white px-6 overflow-x-auto">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start gap-6 rounded-none border-b-0 bg-transparent p-0 flex-nowrap">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="rounded-none border-b-2 border-transparent px-4 py-3 whitespace-nowrap data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {tab === "dashboard" && <DashboardPage />}
      {tab === "produccion" && <ProduccionPage />}
      {tab === "simulador" && <SimuladorPage />}
      {tab === "compras" && <ComprasPage />}
      {tab === "stock" && <StockPage />}
      {tab === "productos" && <ProductoPage />}
      {tab === "recetas" && <RecetaPage />}
      {tab === "insumos" && <InsumoPage />}
      {tab === "gastos" && <GastosPage />}
      {tab === "proveedores" && <ProveedorPage />}
    </div>
  );
}
