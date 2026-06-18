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

const DEFAULT_COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#14b8a6", "#0ea5e9", "#8b5cf6", "#0284c7", "#2dd4bf"]

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
    <div className="relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm overflow-hidden">
      <h3 className="text-sm font-semibold text-zinc-700 mb-4 relative flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
        {title}
      </h3>
      <div className={`${horizontal ? "h-80" : "h-72"} relative`}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={chartData} layout={horizontal ? "vertical" : "horizontal"} barCategoryGap={horizontal ? "20%" : "10%"} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" strokeOpacity={0.5} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={{ stroke: "#d4d4d8" }} tickLine={{ stroke: "#d4d4d8" }} />
                <YAxis dataKey={showPercentage ? "labelComPct" : labelKey} type="category" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={{ stroke: "#d4d4d8" }} tickLine={{ stroke: "#d4d4d8" }} width={200} />
              </>
            ) : (
              <>
                <XAxis dataKey={labelKey} tick={{ fontSize: 11, fill: "#71717a" }} angle={-45} textAnchor="end" height={60} axisLine={{ stroke: "#d4d4d8" }} tickLine={{ stroke: "#d4d4d8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={{ stroke: "#d4d4d8" }} tickLine={{ stroke: "#d4d4d8" }} />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "8px",
                color: "#18181b",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              cursor={{ fill: "rgba(6,182,212,0.05)" }}
            />
            <defs>
              {!colors && (
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              )}
            </defs>
            {colors ? (
              <Bar dataKey={dataKey} radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={(colors || DEFAULT_COLORS)[i % (colors || DEFAULT_COLORS).length]} />
                ))}
                <LabelList dataKey={dataKey} position="top" fill="#71717a" fontSize={11} />
              </Bar>
            ) : (
              <Bar dataKey={dataKey} fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
                <LabelList dataKey={dataKey} position="top" fill="#71717a" fontSize={11} />
              </Bar>
            )}
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
