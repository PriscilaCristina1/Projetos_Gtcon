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
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-gradient-to-br from-sky-200 to-blue-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[25rem] h-[25rem] bg-gradient-to-tr from-cyan-200 to-sky-100 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.06)_0%,_transparent_50%)]" />
        </div>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6 animate-slide-up">{children}</main>
        </div>
      </body>
    </html>
  )
}
