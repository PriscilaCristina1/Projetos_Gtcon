"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = [
  "#22d3ee", "#60a5fa", "#818cf8", "#34d399",
  "#38bdf8", "#a78bfa", "#0ea5e9", "#5eead4",
  "#67e8f9", "#93c5fd", "#a5b4fc", "#6ee7b7",
]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/40 p-5 shadow-lg overflow-hidden group hover:border-zinc-600/60 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-200 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
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
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(39,39,42,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#fafafa",
                boxShadow: "0 0 20px -5px rgba(6,182,212,0.15)",
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
