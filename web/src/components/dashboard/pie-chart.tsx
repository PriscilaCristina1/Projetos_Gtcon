"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = ["#f59e0b", "#10b981", "#6366f1", "#ef4444", "#ec4899"]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="relative bg-white rounded-xl border border-zinc-200/50 p-3 shadow-sm transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/30 to-transparent rounded-xl pointer-events-none" />
      <h3 className="text-sm font-semibold mb-2 relative flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-400 shadow-sm" />
        {title}
      </h3>
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={data}
              dataKey="total"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={2}
              cornerRadius={4}
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
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "11px", color: "#64748b", paddingTop: "4px" }}
              iconType="circle"
              iconSize={8}
            />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
