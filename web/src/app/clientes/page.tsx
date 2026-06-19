"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate, normalizeTributacao } from "@/lib/utils"
import { fetchClients, deleteClient } from "@/lib/supabase-service"
import { Search, Plus, ExternalLink, Trash2 } from "lucide-react"

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data.filter((c) => c.empresa?.trim())))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const list = search.trim()
      ? clients.filter((c) => {
          const q = search.toLowerCase()
          return (
            c.empresa.toLowerCase().includes(q) ||
            (c.cnpj && c.cnpj.includes(q)) ||
            (c.grupo && c.grupo.toLowerCase().includes(q))
          )
        })
      : clients

    return [...list].sort((a, b) => {
      const extract = (v: string | null) => {
        if (!v) return [0, 0]
        const [m, y] = v.split("/").map(Number)
        return [y || 0, m || 0]
      }
      const [yA, mA] = extract(a.entrada)
      const [yB, mB] = extract(b.entrada)
      if (yB !== yA || mB !== mA) return yB - yA || mB - mA
      const gA = (a.grupo || "").toLowerCase()
      const gB = (b.grupo || "").toLowerCase()
      if (gA !== gB) return gA.localeCompare(gB)
      return (a.empresa || "").localeCompare(b.empresa || "")
    })
  }, [search, clients])

  const handleDelete = useCallback(async (id: number, empresa: string) => {
    if (!confirm(`Excluir "${empresa}"?`)) return
    const ok = await deleteClient(id)
    if (ok) {
      setClients((prev) => prev.filter((c) => c.id !== id))
    }
  }, [])

  if (loading) return <p className="">Carregando...</p>

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm">{filtered.length} registros encontrados</p>
        </div>
        <Link
          href="/clientes/novo"
          className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" />
        <input
          type="text"
          placeholder="Buscar por empresa, CNPJ ou grupo..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="relative bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left py-3 px-4 font-medium">COD</th>
                <th className="text-left py-3 px-4 font-medium">Empresa</th>
                <th className="text-left py-3 px-4 font-medium">CNPJ</th>
                <th className="text-left py-3 px-4 font-medium">Grupo</th>
                <th className="text-left py-3 px-4 font-medium">Tributação</th>
                <th className="text-left py-3 px-4 font-medium">Entrada</th>
                <th className="text-left py-3 px-4 font-medium">G-click</th>
                <th className="text-left py-3 px-4 font-medium">Domínio</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => (
                <tr key={client.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="py-3 px-4">{client.cod ?? "-"}</td>
                  <td className="py-3 px-4 font-medium uppercase">{client.empresa}</td>
                  <td className="py-3 px-4 font-mono text-xs">{client.cnpj || "-"}</td>
                  <td className="py-3 px-4">{client.grupo || "-"}</td>
                  <td className="py-3 px-4">{normalizeTributacao(client.tributacao)}</td>
                  <td className="py-3 px-4">{formatDate(client.entrada)}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200">
                      CADASTRADO
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {client.entrada === "07/2026" ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200">
                        CADASTRADO
                      </span>
                    ) : (
                      <span className="">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/clientes/${client.id}`}>
                        <ExternalLink className="w-4 h-4 transition-colors" />
                      </Link>
                      <button onClick={() => handleDelete(client.id, client.empresa?.toUpperCase())}>
                        <Trash2 className="w-4 h-4 transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
