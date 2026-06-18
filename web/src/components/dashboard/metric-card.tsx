"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", icon: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", icon: "text-purple-600 dark:text-purple-400" },
  green: { bg: "bg-green-50 dark:bg-green-950/40", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", icon: "text-green-600 dark:text-green-400" },
  cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/40", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", icon: "text-cyan-600 dark:text-cyan-400" },
  teal: { bg: "bg-teal-50 dark:bg-teal-950/40", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", icon: "text-teal-600 dark:text-teal-400" },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 overflow-hidden"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className={cn("text-sm transition-colors", c.text)}>{title}</p>
          <p className={cn("text-2xl font-bold mt-1 transition-colors", c.text)}>{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", c.bg, c.icon, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
