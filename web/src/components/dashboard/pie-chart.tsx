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
    <div className="relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm overflow-hidden">
      <h3 className="text-sm font-semibold text-zinc-700 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
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
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#18181b",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#52525b" }} />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
