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
    <aside className="w-64 bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-800/50 flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.02] to-transparent pointer-events-none" />
      <div className="p-5 border-b border-zinc-800/50 relative">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              GTCON
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-wider uppercase">Controle de Clientes</p>
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
                  ? "text-cyan-300"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]" />
              )}
              <span className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full transition-all duration-300",
                isActive ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "bg-transparent"
              )} />
              <span className={cn(
                "relative z-10 transition-all duration-300",
                isActive && "text-cyan-300"
              )}>
                <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]")} />
              </span>
              <span className="relative z-10">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-zinc-800/50 relative">
        <p className="text-xs text-zinc-600">GTCON © 2026</p>
      </div>
    </aside>
  )
}
