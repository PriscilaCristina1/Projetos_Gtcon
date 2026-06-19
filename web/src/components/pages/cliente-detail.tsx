"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate, normalizeTributacao } from "@/lib/utils"
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
    if (!client || !confirm(`Excluir "${client.empresa?.toUpperCase()}"?`)) return
    const ok = await deleteClient(Number(id))
    if (ok) router.push("/clientes")
  }, [client, id, router])

  if (loading) return <p className="">Carregando...</p>
  if (!client) return <p className="">Cliente não encontrado</p>

  const fields: { label: string; value: string | null }[] = [
    { label: "COD", value: client.cod?.toString() ?? null },
    { label: "Empresa", value: client.empresa?.toUpperCase() ?? null },
    { label: "CNPJ", value: client.cnpj },
    { label: "Grupo", value: client.grupo },
    { label: "Tributação", value: normalizeTributacao(client.tributacao) },
    { label: "Ramo", value: client.ramo },
    { label: "Entrada", value: formatDate(client.entrada) },
    { label: "GCLICK", value: client.gclick },
    { label: "Domínio", value: client.dominio },
    { label: "XML Saída", value: client.xmlSaida },
    { label: "E-mail", value: client.email },
    { label: "Telefone", value: client.telefone },
    { label: "Responsável Legal", value: client.responsavel },
    { label: "Cadastro", value: client.cadastro },
    { label: "Observações", value: client.observacoes },
    { label: "Perfil GCLICK", value: client.perfilGclick },
    { label: "Mês Ref.", value: client.mesReferencia },
  ]

  return (
    <div className="max-w-3xl space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/clientes"
            className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold uppercase">{client.empresa}</h1>
            <p className="text-sm">{client.cnpj || "Sem CNPJ"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/clientes/${id}/editar`}
            className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all duration-300"
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-xl border border-zinc-200/70 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) =>
            f.value ? (
              <div key={f.label} className="group/field">
                <p className="text-xs uppercase font-medium transition-colors">{f.label}</p>
                <p className="text-sm mt-0.5">{f.value}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
