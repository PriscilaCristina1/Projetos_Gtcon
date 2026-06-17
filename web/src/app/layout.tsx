import type { Metadata } from "next"
import { Sidebar } from "@/components/layout/sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "GTCON - Controle de Clientes",
  description: "Sistema de controle de novos clientes",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="relative">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.03)_0%,_transparent_50%)]" />
        </div>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6 animate-slide-up">{children}</main>
        </div>
      </body>
    </html>
  )
}
