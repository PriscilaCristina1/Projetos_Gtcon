"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserPlus } from "lucide-react"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/clientes/novo", label: "Novo Cliente", icon: UserPlus },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-sky-100/60 flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/60 to-transparent pointer-events-none" />
      <div className="p-5 border-b border-sky-100/60 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md flex-shrink-0">
            <img
              src="/Projetos_Gtcon/log-nova-min.jpeg"
              alt="GTCON"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GTCON
            </h1>
            <p className="text-[10px] text-zinc-400 tracking-wider uppercase">Controle de Clientes</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 relative">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                isActive
                  ? "text-cyan-700"
                  : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20" />
              )}
              <span className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full transition-all duration-300",
                isActive ? "bg-cyan-500" : "bg-transparent"
              )} />
              <Icon className={cn("w-5 h-5 relative z-10", isActive && "text-cyan-600")} />
              <span className={cn("relative z-10", isActive && "text-cyan-700")}>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-sky-100/60 relative">
        <p className="text-xs text-zinc-400">GTCON © 2026</p>
      </div>
    </aside>
  )
}
