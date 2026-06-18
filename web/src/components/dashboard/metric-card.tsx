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
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    icon: "text-cyan-600",
  },
  purple: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    icon: "text-indigo-600",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: "text-emerald-600",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    icon: "text-cyan-600",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    icon: "text-teal-600",
  },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 overflow-hidden"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">{title}</p>
          <p className="text-2xl font-bold text-zinc-800 mt-1 group-hover:text-zinc-900 transition-colors">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", c.bg, c.icon, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
