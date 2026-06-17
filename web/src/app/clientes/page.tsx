"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { fetchClients, deleteClient } from "@/lib/supabase-service"
import { Search, Plus, ExternalLink, Trash2 } from "lucide-react"

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return clients
    const q = search.toLowerCase()
    return clients.filter(
      (c) =>
        c.empresa.toLowerCase().includes(q) ||
        (c.cnpj && c.cnpj.includes(q)) ||
        (c.grupo && c.grupo.toLowerCase().includes(q))
    )
  }, [search, clients])

  const handleDelete = useCallback(async (id: number, empresa: string) => {
    if (!confirm(`Excluir "${empresa}"?`)) return
    const ok = await deleteClient(id)
    if (ok) {
      setClients((prev) => prev.filter((c) => c.id !== id))
    }
  }, [])

  if (loading) return <p className="text-zinc-400">Carregando...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Clientes</h1>
          <p className="text-sm text-zinc-500">{filtered.length} registros encontrados</p>
        </div>
        <Link
          href="/clientes/novo"
          className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar por empresa, CNPJ ou grupo..."
          className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">COD</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">Empresa</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">CNPJ</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">Grupo</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">Tributação</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">Entrada</th>
                <th className="text-left py-3 px-4 text-zinc-500 font-medium">GCLICK</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 text-zinc-400">{client.cod ?? "-"}</td>
                  <td className="py-3 px-4 font-medium text-zinc-200">{client.empresa}</td>
                  <td className="py-3 px-4 text-zinc-400 font-mono text-xs">{client.cnpj || "-"}</td>
                  <td className="py-3 px-4 text-zinc-400">{client.grupo || "-"}</td>
                  <td className="py-3 px-4 text-zinc-400">{client.tributacao || "-"}</td>
                  <td className="py-3 px-4 text-zinc-400">{formatDate(client.entrada)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        client.gclick === "OK"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {client.gclick || "PENDENTE"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/clientes/${client.id}`}>
                        <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-indigo-400 transition-colors" />
                      </Link>
                      <button onClick={() => handleDelete(client.id, client.empresa)}>
                        <Trash2 className="w-4 h-4 text-zinc-500 hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-500">
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
