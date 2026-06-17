"use client"

import { useEffect, useState } from "react"
import { DashboardMetrics } from "@/lib/types"
import { MetricCard } from "@/components/dashboard/metric-card"
import { BarChart } from "@/components/dashboard/bar-chart"
import { PieChart } from "@/components/dashboard/pie-chart"
import { RecentClients } from "@/components/dashboard/recent-clients"
import { fetchDashboardMetrics } from "@/lib/supabase-service"
import { Users, Building2, UserCheck, TrendingUp } from "lucide-react"

export function DashboardContent() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-zinc-400">Carregando...</p>
  if (!metrics) return <p className="text-red-400">Erro ao carregar dados</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-500 text-sm">Visão geral dos clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Clientes"
          value={metrics.totalClientes}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Grupos"
          value={metrics.totalGrupos}
          icon={<Building2 className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="GCLICK OK"
          value={metrics.statusGclick.find((s) => s.label === "OK")?.total ?? 0}
          icon={<UserCheck className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Média por Mês"
          value={Math.round(metrics.clientesPorMes.reduce((a, b) => a + b.total, 0) / Math.max(metrics.clientesPorMes.length, 1))}
          icon={<TrendingUp className="w-6 h-6" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Clientes por Mês"
          data={metrics.clientesPorMes.slice(-12)}
          dataKey="total"
          labelKey="mes"
        />
        <PieChart
          title="Por Regime Tributário"
          data={metrics.porTributacao}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Top 10 Ramos"
          data={metrics.porRamo}
          dataKey="total"
          labelKey="label"
        />
        <PieChart
          title="Status GCLICK"
          data={metrics.statusGclick}
        />
      </div>

      <RecentClients clients={metrics.clientesRecentes} />
    </div>
  )
}
