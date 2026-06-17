"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6", "#f97316"]

interface PieChartProps {
  title: string
  data: { label: string; total: number }[]
}

export function PieChart({ title, data }: PieChartProps) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 shadow-lg">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">{title}</h3>
      <div className="h-72">
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
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fafafa",
              }}
            />
            <Legend />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
