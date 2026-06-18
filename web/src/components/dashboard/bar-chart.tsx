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
  Legend,
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
    <div className="relative bg-white rounded-xl border border-sky-100/80 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent rounded-xl pointer-events-none" />
      <h3 className="text-sm font-semibold text-zinc-700 mb-4 relative flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-sm" />
        {title}
      </h3>
      <div className={`${horizontal ? "h-80" : "h-72"} relative`}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={chartData} layout={horizontal ? "vertical" : "horizontal"} barCategoryGap={horizontal ? "20%" : "12%"} margin={{ top: 22, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0f2fe" strokeOpacity={0.8} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} />
                <YAxis dataKey={showPercentage ? "labelComPct" : labelKey} type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} width={200} />
              </>
            ) : (
              <>
                <XAxis dataKey={labelKey} tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }} angle={-20} textAnchor="end" height={50} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} />
              </>
            )}
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
              cursor={{ fill: "rgba(6,182,212,0.06)" }}
            />
            {colors ? (
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "#64748b", paddingTop: "4px" }}
                iconType="circle"
                iconSize={8}
              />
            ) : (
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "#64748b", paddingTop: "4px" }}
                iconType="rect"
                iconSize={10}
                formatter={() => "Total de Clientes"}
              />
            )}
            <defs>
              {!colors && (
                <>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <filter id="barShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.15" />
                  </filter>
                </>
              )}
            </defs>
            {colors ? (
              <Bar dataKey={dataKey} radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={(colors || DEFAULT_COLORS)[i % (colors || DEFAULT_COLORS).length]}
                    className="hover:opacity-85 transition-opacity"
                  />
                ))}
                <LabelList dataKey={dataKey} position="top" fill="#64748b" fontSize={11} fontWeight={600} />
              </Bar>
            ) : (
              <Bar dataKey={dataKey} fill="url(#barGradient)" radius={[6, 6, 0, 0]} filter="url(#barShadow)" className="hover:opacity-90 transition-opacity">
                <LabelList dataKey={dataKey} position="top" fill="#64748b" fontSize={11} fontWeight={600} />
              </Bar>
            )}
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
