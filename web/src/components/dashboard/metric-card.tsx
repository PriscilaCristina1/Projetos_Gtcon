"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "teal" | "cyan"
}

const colors = {
  blue: { bg: "bg-gradient-to-br from-blue-500 to-blue-600", text: "", border: "border-blue-100 dark:border-blue-900", icon: "text-white" },
  purple: { bg: "bg-gradient-to-br from-purple-500 to-purple-600", text: "", border: "border-purple-100 dark:border-purple-900", icon: "text-white" },
  green: { bg: "bg-gradient-to-br from-green-500 to-green-600", text: "", border: "border-green-100 dark:border-green-900", icon: "text-white" },
  cyan: { bg: "bg-gradient-to-br from-cyan-500 to-cyan-600", text: "", border: "border-cyan-100 dark:border-cyan-900", icon: "text-white" },
  teal: { bg: "bg-gradient-to-br from-teal-500 to-teal-600", text: "", border: "border-teal-100 dark:border-teal-900", icon: "text-white" },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-zinc-200/70 p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 overflow-hidden"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm transition-colors text-zinc-500">{title}</p>
          <p className="text-xl font-bold transition-colors text-zinc-800">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl", c.bg, c.icon)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
