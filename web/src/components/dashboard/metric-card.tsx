"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-zinc-50 dark:bg-zinc-800/20", text: "", border: "border-zinc-200 dark:border-zinc-700", icon: "text-blue-400/40 dark:text-blue-400/30" },
  purple: { bg: "bg-zinc-50 dark:bg-zinc-800/20", text: "", border: "border-zinc-200 dark:border-zinc-700", icon: "text-purple-400/40 dark:text-purple-400/30" },
  green: { bg: "bg-zinc-50 dark:bg-zinc-800/20", text: "", border: "border-zinc-200 dark:border-zinc-700", icon: "text-green-400/40 dark:text-green-400/30" },
  cyan: { bg: "bg-zinc-50 dark:bg-zinc-800/20", text: "", border: "border-zinc-200 dark:border-zinc-700", icon: "text-cyan-400/40 dark:text-cyan-400/30" },
  teal: { bg: "bg-zinc-50 dark:bg-zinc-800/20", text: "", border: "border-zinc-200 dark:border-zinc-700", icon: "text-teal-400/40 dark:text-teal-400/30" },
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
        <div className={cn("p-3 rounded-xl border transition-all duration-300", c.bg, c.icon, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
