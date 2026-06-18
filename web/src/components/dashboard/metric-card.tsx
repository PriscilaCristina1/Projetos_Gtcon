"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-zinc-100", text: "text-zinc-600", border: "border-zinc-200", icon: "text-zinc-600" },
  purple: { bg: "bg-zinc-100", text: "text-zinc-600", border: "border-zinc-200", icon: "text-zinc-600" },
  green: { bg: "bg-zinc-100", text: "text-zinc-600", border: "border-zinc-200", icon: "text-zinc-600" },
  cyan: { bg: "bg-zinc-100", text: "text-zinc-600", border: "border-zinc-200", icon: "text-zinc-600" },
  teal: { bg: "bg-zinc-100", text: "text-zinc-600", border: "border-zinc-200", icon: "text-zinc-600" },
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
