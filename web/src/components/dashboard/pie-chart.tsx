"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS_FRIAS = [
  "#06b6d4", "#2563eb", "#6366f1", "#14b8a6",
  "#0ea5e9", "#8b5cf6", "#0284c7", "#2dd4bf",
  "#1d4ed8", "#0891b2", "#7c3aed", "#0d9488",
]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-5 shadow-lg overflow-hidden group hover:border-indigo-700/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-cyan-500/[0.02] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700 pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
        {title}
      </h3>
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
                <Cell
                  key={i}
                  fill={COLORS_FRIAS[i % COLORS_FRIAS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24,24,27,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "8px",
                color: "#fafafa",
                boxShadow: "0 0 30px -5px rgba(99,102,241,0.15)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", color: "#a1a1aa" }}
            />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
