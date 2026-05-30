import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lentejuelas - Core",
  description: "Sistema de gestión de producción, stock y costos para emprendimientos gastronómicos.",
  openGraph: {
    title: "Lentejuelas - Core",
    description: "Gestión de producción, recetas, costos y stock.",
    type: "website",
    images: [
      {
        url: "https://lentejuelas-core.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lentejuelas - Core",
    description: "Gestión de producción, recetas, costos y stock.",
    images: ["https://lentejuelas-core.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}