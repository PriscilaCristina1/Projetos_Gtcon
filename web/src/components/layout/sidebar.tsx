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

const linkIcons: Record<string, string> = {
  "/": "from-emerald-500 to-emerald-600 shadow-emerald-200",
  "/clientes": "from-blue-500 to-blue-600 shadow-blue-200",
  "/clientes/novo": "from-violet-500 to-violet-600 shadow-violet-200",
}

const linkBars: Record<string, string> = {
  "/": "bg-emerald-400",
  "/clientes": "bg-blue-400",
  "/clientes/novo": "bg-violet-400",
}

const linkActiveBg: Record<string, string> = {
  "/": "bg-emerald-50 border-emerald-200",
  "/clientes": "bg-blue-50 border-blue-200",
  "/clientes/novo": "bg-violet-50 border-violet-200",
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-zinc-200/60 flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/60 to-transparent pointer-events-none" />
      <div className="p-5 border-b border-zinc-200/60 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md flex-shrink-0">
            <img
              src="/Projetos_Gtcon/log-nova-min.jpeg"
              alt="GTCON"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold">
              GTCON
            </h1>
            <p className="text-[10px] tracking-wider uppercase">Controle de Clientes</p>
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
                  ? linkActiveBg[link.href]
                  : "hover:bg-zinc-50"
              )}
            >
              {isActive && (
                <span className={cn("absolute inset-0 rounded-lg border", linkActiveBg[link.href].split(" ")[1])} />
              )}
              <span className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full transition-all duration-300",
                isActive ? linkBars[link.href] : "bg-transparent group-hover:bg-zinc-300"
              )} />
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300 shadow-sm",
                isActive
                  ? `bg-gradient-to-br ${linkIcons[link.href]} text-white shadow-md`
                  : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={cn(
                "relative z-10 transition-all duration-300",
                isActive ? "text-zinc-800 font-semibold" : "text-zinc-600 group-hover:text-zinc-800"
              )}>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200/60 relative">
        <p className="text-xs">GTCON © 2026</p>
      </div>
    </aside>
  )
}
