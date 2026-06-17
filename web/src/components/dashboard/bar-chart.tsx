"use client"

import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface BarChartProps {
  title: string
  data: { label?: string; mes?: string; total: number }[]
  dataKey: string
  labelKey: string
}

export function BarChart({ title, data, dataKey, labelKey }: BarChartProps) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 shadow-lg">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey={labelKey}
              tick={{ fontSize: 11, fill: "#a1a1aa" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fafafa",
              }}
            />
            <Bar dataKey={dataKey} fill="#6366f1" radius={[4, 4, 0, 0]} />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
