"use client"

import { useEffect, useState } from "react"
import { DashboardMetrics } from "@/lib/types"
import { MetricCard } from "@/components/dashboard/metric-card"
import { BarChart } from "@/components/dashboard/bar-chart"
import { RecentClients } from "@/components/dashboard/recent-clients"
import { fetchDashboardMetrics } from "@/lib/supabase-service"
import { Users, Building2, UserCheck, Globe } from "lucide-react"

export function DashboardContent() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="">Carregando...</p>
  if (!metrics) return <p className="">Erro ao carregar dados</p>

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-500">Visão geral dos clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
          title="G-click"
          value={metrics.totalClientes}
          icon={<UserCheck className="w-6 h-6" />}
          color="cyan"
        />
        <MetricCard
          title="Domínio"
          value={metrics.totalDominioCadastrado}
          icon={<Globe className="w-6 h-6" />}
          color="teal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <BarChart
          title="Clientes por Mês"
          data={metrics.clientesPorMes.slice(-12)}
          dataKey="total"
          labelKey="mes"
        />
        <BarChart
          title="Por Regime Tributário"
          data={metrics.porTributacao}
          dataKey="total"
          labelKey="label"
          colors={["#fcd34d", "#6ee7b7", "#a5b4fc", "#fca5a5", "#f9a8d4"]}
        />
      </div>

      <RecentClients clients={metrics.clientesRecentes} />
    </div>
  )
}
