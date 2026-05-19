"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { ClientePage } from "@/components/clientes/ClientePage";
import { PedidoPage } from "@/components/pedidos/PedidoPage";
import { MesaPage } from "@/components/mesas/MesaPage";
import { POSPage } from "@/components/pos/POSPage";
import { CierreCajaPage } from "@/components/cierre/CierreCajaPage";
import { useState } from "react";
import { CocinaPage } from "@/components/cocina/CocinaPage";

const tabs = [
  { value: "mesas", label: "Mesas" },
  { value: "pos", label: "POS" },
  { value: "pedidos", label: "Pedidos" },
  { value: "dashboard", label: "Dashboard" },
  { value: "cierre", label: "Cierre" },
  { value: "clientes", label: "Clientes" },
  { value: "cocina", label: "Cocina" },
];

export default function Home() {
  const [tab, setTab] = useState("mesas");

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
      {tab === "mesas" && <MesaPage />}
      {tab === "pos" && <POSPage />}
      {tab === "pedidos" && <PedidoPage />}
      {tab === "dashboard" && <DashboardPage />}
      {tab === "cierre" && <CierreCajaPage />}
      {tab === "clientes" && <ClientePage />}
      {tab === "cocina" && <CocinaPage />}
    </div>
  );
}
