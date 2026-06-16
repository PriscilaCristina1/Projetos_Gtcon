"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Edit3, Trash2 } from "lucide-react"

export default function ClienteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/clientes/${id}`)
      .then((r) => r.json())
      .then(setClient)
      .catch(() => setClient(null))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!client || !confirm(`Excluir "${client.empresa}"?`)) return
    const res = await fetch(`/api/clientes/${id}`, { method: "DELETE" })
    if (res.ok) router.push("/clientes")
  }

  if (loading) return <p className="text-gray-500">Carregando...</p>
  if (!client) return <p className="text-red-500">Cliente não encontrado</p>

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
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{client.empresa}</h1>
            <p className="text-sm text-gray-500">{client.cnpj || "Sem CNPJ"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/clientes/${id}/editar`}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) =>
            f.value ? (
              <div key={f.label}>
                <p className="text-xs text-gray-500 uppercase font-medium">{f.label}</p>
                <p className="text-sm text-gray-800 mt-0.5">{f.value}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
