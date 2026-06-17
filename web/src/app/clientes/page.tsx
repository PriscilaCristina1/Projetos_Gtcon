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

  if (loading) return <p className="text-gray-500">Carregando...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-sm text-gray-500">{filtered.length} registros encontrados</p>
        </div>
        <Link
          href="/clientes/novo"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por empresa, CNPJ ou grupo..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-500 font-medium">COD</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Empresa</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">CNPJ</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Grupo</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Tributação</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Entrada</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">GCLICK</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">{client.cod ?? "-"}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{client.empresa}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-xs">{client.cnpj || "-"}</td>
                  <td className="py-3 px-4 text-gray-600">{client.grupo || "-"}</td>
                  <td className="py-3 px-4 text-gray-600">{client.tributacao || "-"}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(client.entrada)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        client.gclick === "OK"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {client.gclick || "PENDENTE"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/clientes/${client.id}`}>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                      </Link>
                      <button onClick={() => handleDelete(client.id, client.empresa)}>
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
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
