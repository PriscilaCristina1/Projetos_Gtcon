"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserPlus } from "lucide-react"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, color: "emerald" },
  { href: "/clientes", label: "Clientes", icon: Users, color: "blue" },
  { href: "/clientes/novo", label: "Novo Cliente", icon: UserPlus, color: "violet" },
]

const linkColors = {
  emerald: { active: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800" },
  blue: { active: "text-blue-600 dark:text-blue-400", bar: "bg-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200 dark:border-blue-800" },
  violet: { active: "text-violet-600 dark:text-violet-400", bar: "bg-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40", border: "border-violet-200 dark:border-violet-800" },
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-zinc-200/60 flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/60 to-transparent pointer-events-none" />
      <div className="p-5 border-b border-zinc-200/60 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md flex-shrink-0 ring-1 ring-zinc-200">
            <img
              src="/Projetos_Gtcon/log-nova-min.jpeg"
              alt="GTCON"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
              GTCON
            </h1>
            <p className="text-[10px] tracking-wider uppercase text-zinc-400">Controle de Clientes</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 relative">
        {links.map((link) => {
          const Icon = link.icon
          const c = linkColors[link.color as keyof typeof linkColors]
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                isActive
                  ? c.bg
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              )}
            >
              {isActive && (
                <span className={cn("absolute inset-0 rounded-lg border", c.border)} />
              )}
              <span className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full transition-all duration-300",
                isActive ? c.bar : "bg-transparent group-hover:bg-zinc-300"
              )} />
              <Icon className={cn("w-5 h-5 relative z-10 transition-all duration-300", isActive ? c.active : "text-zinc-400 group-hover:text-zinc-600")} />
              <span className={cn("relative z-10 transition-all duration-300", isActive ? c.active : "text-zinc-600 group-hover:text-zinc-800")}>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200/60 relative">
        <p className="text-xs text-zinc-400">GTCON © 2026</p>
      </div>
    </aside>
  )
}
