import type { Metadata } from "next"
import { Sidebar } from "@/components/layout/sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "GTCON - Controle de Clientes",
  description: "Sistema de controle de novos clientes",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="relative">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
        </div>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6 animate-slide-up">{children}</main>
        </div>
      </body>
    </html>
  )
}
