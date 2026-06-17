"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "purple" | "green" | "orange"
}

const colors = {
  blue: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
  },
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  const c = colors[color]
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 shadow-lg transition-all duration-200 hover:border-zinc-700 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1">{value}</p>
        </div>
        <div className={cn("p-3 rounded-lg border", c.bg, c.text, c.border)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
