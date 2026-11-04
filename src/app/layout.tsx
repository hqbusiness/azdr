import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AZ DIRECTORIO Empresarial | Directorio de Empresas y Negocios",
  description: "AZ DIRECTORIO Empresarial - El índice de empresas y negocios verificadas más consultado de la región. Directorio comercial de empresas, servicios y profesionales con contacto directo por WhatsApp.",
  keywords: [
    "AZ Directorio",
    "AZ DIRECTORIO Empresarial",
    "directorio empresarial",
    "directorio de empresas",
    "negocios latinoamerica",
    "directorio comercial",
    "whatsapp negocios",
    "empresas verificadas",
  ],
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-[#FBFAF6] text-[#2C2E33] antialiased selection:bg-brand-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
