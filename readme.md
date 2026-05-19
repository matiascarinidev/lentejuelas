# Lentejuelas

Sistema de gestión integral para emprendimientos gastronómicos con producción propia y punto de venta. Control de costos reales, inventario, producción, ventas en salón y mostrador.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?logo=shadcnui)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ¿Qué hace?

| Necesidad                   | Solución                                                       |
| --------------------------- | -------------------------------------------------------------- |
| ¿Cuánto me cuesta producir? | Simulación con materia prima, packaging, gastos y amortización |
| ¿A qué precio vendo?        | Tabla de márgenes automática (30% a 80%)                       |
| ¿Cuánto stock tengo?        | Inventario unificado con alertas y predicción de agotamiento   |
| ¿Qué pasó en el día?        | Dashboard de producción + ventas + cierre de caja              |
| ¿Cómo atiendo el salón?     | Mesas con comandas, cocina en tiempo real                      |
| ¿Cómo vendo en mostrador?   | POS con atajos de teclado e impresión de ticket                |
| ¿Y si se cae internet?      | Cola offline que reintenta automáticamente                     |

---

## Arquitectura

┌─────────────────────────────────────────────────────┐
│ Lentejuelas │
├──────────────────────┬──────────────────────────────┤
│ Core │ Ventas │
│ localhost:3001 │ localhost:3002 │
├──────────────────────┼──────────────────────────────┤
│ Productos │ Mesas / Comandas │
│ Recetas │ Punto de Venta (POS) │
│ Insumos │ Pedidos │
│ Producción │ Cocina (tiempo real) │
│ Compras │ Clientes │
│ Stock │ Cierre de caja │
│ Proveedores │ Auditoría │
│ Gastos operativos │ Dashboard de ventas │
│ Activos amortizables│ │
│ Dashboard KPIs │ │
├──────────────────────┴──────────────────────────────┤
│ PostgreSQL (Core) PostgreSQL (Ventas) │
│ Puerto 5432 Puerto 5433 │
└─────────────────────────────────────────────────────┘

**Microservicios con bases de datos aisladas.** Core gestiona producción e inventario. Ventas gestiona el punto de venta y el salón. Se comunican vía REST. Si Ventas no puede contactar a Core, las operaciones se encolan y se procesan cuando vuelve la conexión.

---

## Stack técnico

- **Frontend:** Next.js 14 (App Router), React 18, TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes, TypeScript
- **ORM:** Prisma con schemas aislados por servicio
- **Base de datos:** PostgreSQL
- **Monorepo:** pnpm workspaces, Turborepo
- **DevOps:** Docker Compose

---

## Instalación

### Requisitos

- Node.js 20+
- pnpm 9+
- PostgreSQL 16+
- Docker (opcional, para las bases de datos)

### Pasos

```bash
# 1. Clonar
git clone https://github.com/matiascarinidev/lentejuelas.git
cd lentejuelas

# 2. Instalar dependencias
pnpm install

# 3. Levantar bases de datos
cd docker
docker compose up -d

# 4. Configurar Core
cd ../apps/core
cp .env.example .env
pnpm exec prisma generate
pnpm exec prisma db push
pnpm dev

# 5. En otra terminal, configurar Ventas
cd apps/ventas
cp .env.example .env
pnpm exec prisma generate
pnpm exec prisma db push
pnpm dev
```
