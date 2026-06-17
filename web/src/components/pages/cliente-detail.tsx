"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { fetchClientById, deleteClient } from "@/lib/supabase-service"
import { ArrowLeft, Edit3, Trash2 } from "lucide-react"

export function ClienteDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClientById(Number(id))
      .then(setClient)
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = useCallback(async () => {
    if (!client || !confirm(`Excluir "${client.empresa}"?`)) return
    const ok = await deleteClient(Number(id))
    if (ok) router.push("/clientes")
  }, [client, id, router])

  if (loading) return <p className="text-zinc-400">Carregando...</p>
  if (!client) return <p className="text-red-400">Cliente não encontrado</p>

  const fields: { label: string; value: string | null }[] = [
    { label: "COD", value: client.cod?.toString() ?? null },
    { label: "Empresa", value: client.empresa },
    { label: "CNPJ", value: client.cnpj },
    { label: "Grupo", value: client.grupo },
    { label: "Tributação", value: client.tributacao },
    { label: "Ramo", value: client.ramo },
    { label: "Entrada", value: formatDate(client.entrada) },
    { label: "GCLICK", value: client.gclick },
    { label: "SIEG", value: client.sieg },
    { label: "Domínio", value: client.dominio },
    { label: "XML Saída", value: client.xmlSaida },
    { label: "E-mail", value: client.email },
    { label: "Telefone", value: client.telefone },
    { label: "Telefone 2", value: client.telefone2 },
    { label: "Responsável", value: client.responsavel },
    { label: "Perfil GCLICK", value: client.perfilGclick },
    { label: "Mês Ref.", value: client.mesReferencia },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/clientes"
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{client.empresa}</h1>
            <p className="text-sm text-zinc-500">{client.cnpj || "Sem CNPJ"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/clientes/${id}/editar`}
            className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) =>
            f.value ? (
              <div key={f.label}>
                <p className="text-xs text-zinc-500 uppercase font-medium">{f.label}</p>
                <p className="text-sm text-zinc-200 mt-0.5">{f.value}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
