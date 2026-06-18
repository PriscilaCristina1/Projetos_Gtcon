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
  "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#14b8a6", "#8b5cf6", "#0284c7", "#2dd4bf",
  "#2563eb", "#0891b2", "#7c3aed", "#0d9488",
]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="relative bg-white rounded-xl border border-sky-100/80 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent rounded-xl pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-700 mb-4 relative flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-sm" />
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
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              cornerRadius={4}
              label={({ label, total, percent }) =>
                `${label}: ${total} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  className="hover:opacity-85 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(6,182,212,0.15)",
                borderRadius: "12px",
                color: "#1e293b",
                fontSize: "13px",
                fontWeight: 500,
                boxShadow: "0 8px 32px rgba(6,182,212,0.12), 0 2px 8px rgba(0,0,0,0.04)",
                padding: "10px 14px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", color: "#64748b", paddingTop: "8px" }}
              iconType="circle"
              iconSize={8}
            />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
