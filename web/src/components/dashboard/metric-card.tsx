"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-blue-50/60 dark:bg-blue-950/30", text: "text-zinc-700 dark:text-zinc-300", border: "border-blue-100 dark:border-blue-900", icon: "text-blue-500 dark:text-blue-400" },
  purple: { bg: "bg-purple-50/60 dark:bg-purple-950/30", text: "text-zinc-700 dark:text-zinc-300", border: "border-purple-100 dark:border-purple-900", icon: "text-purple-500 dark:text-purple-400" },
  green: { bg: "bg-green-50/60 dark:bg-green-950/30", text: "text-zinc-700 dark:text-zinc-300", border: "border-green-100 dark:border-green-900", icon: "text-green-500 dark:text-green-400" },
  cyan: { bg: "bg-cyan-50/60 dark:bg-cyan-950/30", text: "text-zinc-700 dark:text-zinc-300", border: "border-cyan-100 dark:border-cyan-900", icon: "text-cyan-500 dark:text-cyan-400" },
  teal: { bg: "bg-teal-50/60 dark:bg-teal-950/30", text: "text-zinc-700 dark:text-zinc-300", border: "border-teal-100 dark:border-teal-900", icon: "text-teal-500 dark:text-teal-400" },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 overflow-hidden"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm transition-colors text-zinc-500">{title}</p>
          <p className="text-2xl font-bold mt-1 transition-colors text-zinc-800">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", c.bg, c.icon, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
