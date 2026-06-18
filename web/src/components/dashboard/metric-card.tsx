"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-zinc-100", text: "", border: "border-zinc-200", icon: "" },
  purple: { bg: "bg-zinc-100", text: "", border: "border-zinc-200", icon: "" },
  green: { bg: "bg-zinc-100", text: "", border: "border-zinc-200", icon: "" },
  cyan: { bg: "bg-zinc-100", text: "", border: "border-zinc-200", icon: "" },
  teal: { bg: "bg-zinc-100", text: "", border: "border-zinc-200", icon: "" },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 overflow-hidden"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm transition-colors">{title}</p>
          <p className="text-2xl font-bold mt-1 transition-colors">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", c.bg, c.icon, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
