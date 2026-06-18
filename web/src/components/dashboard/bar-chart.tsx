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
  filter?: React.ReactNode
}

const DEFAULT_COLORS = ["#67e8f9", "#93c5fd", "#a5b4fc", "#6ee7b7", "#7dd3fc", "#c4b5fd", "#fda4af", "#fde68a"]

export function BarChart({
  title,
  data,
  dataKey,
  labelKey,
  horizontal,
  colors,
  showPercentage,
  filter,
}: BarChartProps) {
  const total = showPercentage ? data.reduce((s, d) => s + (d.total || 0), 0) : 0
  const chartData = showPercentage
    ? data.map((d) => {
        const pct = total > 0 ? ((d.total || 0) / total * 100).toFixed(1) : "0.0"
        return { ...d, labelComPct: `${d.label || d.mes || ""}  ${pct}%` }
      })
    : data

  return (
    <div className="relative bg-white rounded-xl border border-zinc-200/50 p-5 shadow-sm transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/30 to-transparent rounded-xl pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-700 mb-4 relative flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-400 shadow-sm" />
        {title}
        <span className="ml-auto">{filter}</span>
      </h3>
      <div className={`${horizontal ? "h-80" : "h-72"} relative`}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={chartData} layout={horizontal ? "vertical" : "horizontal"} barCategoryGap="30%" margin={{ top: 22, right: 10, left: 0, bottom: 2 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" strokeWidth={0.3} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} tickLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} />
                <YAxis dataKey={showPercentage ? "labelComPct" : labelKey} type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} tickLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} width={200} />
              </>
            ) : (
              <>
                <XAxis dataKey={labelKey} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 400 }} height={28} axisLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} tickLine={{ stroke: "#e2e8f0", strokeWidth: 0.5 }} />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(6,182,212,0.1)",
                borderRadius: "10px",
                color: "#475569",
                fontSize: "12px",
                fontWeight: 400,
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                padding: "8px 12px",
              }}
              cursor={{ fill: "rgba(6,182,212,0.04)" }}
            />
            <Bar dataKey={dataKey} radius={horizontal ? [0, 8, 8, 0] : [8, 8, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={(colors || DEFAULT_COLORS)[i % (colors || DEFAULT_COLORS).length]}
                  className="hover:opacity-75 transition-opacity"
                />
              ))}
              <LabelList dataKey={dataKey} position="top" fill="#94a3b8" fontSize={11} fontWeight={400} />
            </Bar>
          </RechartsBar>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center pt-3">
        {chartData.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: (colors || DEFAULT_COLORS)[i % (colors || DEFAULT_COLORS).length] }} />
            <span className="text-xs text-zinc-500">{d.label || d.mes}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
