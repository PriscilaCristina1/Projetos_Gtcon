"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#14b8a6", "#0ea5e9", "#8b5cf6", "#0284c7", "#2dd4bf"]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-5 shadow-lg overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 relative">{title}</h3>
      <div className="h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={data}
              dataKey="total"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ label, total }) => `${label}: ${total}`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24,24,27,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#fafafa",
                boxShadow: "0 0 20px -5px rgba(6,182,212,0.15)",
              }}
            />
            <Legend />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
