"use client"

import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"

interface BarChartProps {
  title: string
  data: { label?: string; mes?: string; total: number }[]
  dataKey: string
  labelKey: string
  horizontal?: boolean
  colors?: string[]
  showPercentage?: boolean
}

const DEFAULT_COLORS = ["#22d3ee", "#60a5fa", "#818cf8", "#34d399", "#38bdf8", "#a78bfa", "#0ea5e9", "#5eead4"]

export function BarChart({
  title,
  data,
  dataKey,
  labelKey,
  horizontal,
  colors,
  showPercentage,
}: BarChartProps) {
  const total = showPercentage ? data.reduce((s, d) => s + (d.total || 0), 0) : 0
  const chartData = showPercentage
    ? data.map((d) => {
        const pct = total > 0 ? ((d.total || 0) / total * 100).toFixed(1) : "0.0"
        return { ...d, labelComPct: `${d.label || d.mes || ""}  ${pct}%` }
      })
    : data

  return (
    <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/40 p-5 shadow-lg overflow-hidden group hover:border-zinc-600/60 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-200 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
        {title}
      </h3>
      <div className={`${horizontal ? "h-80" : "h-72"} relative`}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={chartData} layout={horizontal ? "vertical" : "horizontal"} barCategoryGap={horizontal ? "20%" : "10%"} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5f" strokeOpacity={0.3} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={{ stroke: "#27272a" }} tickLine={{ stroke: "#27272a" }} />
                <YAxis dataKey={showPercentage ? "labelComPct" : labelKey} type="category" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={{ stroke: "#27272a" }} tickLine={{ stroke: "#27272a" }} width={200} />
              </>
            ) : (
              <>
                <XAxis dataKey={labelKey} tick={{ fontSize: 11, fill: "#a1a1aa" }} angle={-45} textAnchor="end" height={60} axisLine={{ stroke: "#27272a" }} tickLine={{ stroke: "#27272a" }} />
                <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={{ stroke: "#27272a" }} tickLine={{ stroke: "#27272a" }} />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(39,39,42,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#f4f4f5",
                boxShadow: "0 0 20px -5px rgba(6,182,212,0.15)",
              }}
              cursor={{ fill: "rgba(6,182,212,0.05)" }}
            />
            <defs>
              {!colors && (
                <>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <filter id="barGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22d3ee" floodOpacity="0.3" />
                  </filter>
                </>
              )}
            </defs>
            {colors ? (
              <Bar dataKey={dataKey} radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={(colors || DEFAULT_COLORS)[i % (colors || DEFAULT_COLORS).length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
                <LabelList dataKey={dataKey} position="top" fill="#a1a1aa" fontSize={11} />
              </Bar>
            ) : (
              <Bar dataKey={dataKey} fill="url(#barGradient)" radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]} filter="url(#barGlow)" className="hover:opacity-80 transition-opacity cursor-pointer">
                <LabelList dataKey={dataKey} position="top" fill="#a1a1aa" fontSize={11} />
              </Bar>
            )}
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
