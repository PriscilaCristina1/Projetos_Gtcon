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
    <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-5 shadow-lg overflow-hidden group hover:border-cyan-700/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-indigo-500/[0.02] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700 pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
        {title}
      </h3>
      <div className="h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" strokeOpacity={0.3} />
            <XAxis
              dataKey={labelKey}
              tick={{ fontSize: 11, fill: "#71717a" }}
              angle={-45}
              textAnchor="end"
              height={60}
              axisLine={{ stroke: "#27272a" }}
              tickLine={{ stroke: "#27272a" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#71717a" }}
              axisLine={{ stroke: "#27272a" }}
              tickLine={{ stroke: "#27272a" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24,24,27,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#fafafa",
                boxShadow: "0 0 30px -5px rgba(6,182,212,0.15)",
              }}
              cursor={{ fill: "rgba(6,182,212,0.05)" }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <filter id="barGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.3" />
              </filter>
            </defs>
            <Bar
              dataKey={dataKey}
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              filter="url(#barGlow)"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
