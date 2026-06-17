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
    <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-5 shadow-lg overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 relative">{title}</h3>
      <div className="h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis
              dataKey={labelKey}
              tick={{ fontSize: 11, fill: "#71717a" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11, fill: "#71717a" }} />
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
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <Bar dataKey={dataKey} fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
