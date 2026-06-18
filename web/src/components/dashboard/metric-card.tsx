"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    shadow: "shadow-cyan-500/10",
    gradient: "from-cyan-500 to-blue-500",
  },
  purple: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-300",
    border: "border-indigo-500/20",
    shadow: "shadow-indigo-500/10",
    gradient: "from-indigo-500 to-purple-500",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-500/20",
    shadow: "shadow-emerald-500/10",
    gradient: "from-emerald-500 to-teal-500",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    shadow: "shadow-cyan-500/10",
    gradient: "from-cyan-500 to-sky-500",
  },
  teal: {
    bg: "bg-teal-500/10",
    text: "text-teal-300",
    border: "border-teal-500/20",
    shadow: "shadow-teal-500/10",
    gradient: "from-teal-500 to-cyan-500",
  },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-5 shadow-lg transition-all duration-300 hover:border-zinc-700/80 hover:shadow-xl overflow-hidden",
      "hover:shadow-[0_0_30px_-5px]",
      c.shadow
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-center justify-between relative">
        <div>
          <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{title}</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1 group-hover:text-white transition-colors">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative overflow-hidden", c.bg, c.text, c.border)}>
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          {icon}
        </div>
      </div>
    </div>
  )
}
