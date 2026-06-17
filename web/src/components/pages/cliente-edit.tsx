"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Client } from "@/lib/types"
import { fetchClientById, updateClient } from "@/lib/supabase-service"
import { ArrowLeft, Save } from "lucide-react"

export function ClienteEdit() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    empresa: "",
    cnpj: "",
    cod: "",
    grupo: "",
    tributacao: "",
    ramo: "",
    entrada: "",
    gclick: "",
    sieg: "",
    dominio: "",
    xmlSaida: "",
    email: "",
    telefone: "",
    responsavel: "",
  })

  useEffect(() => {
    fetchClientById(Number(id))
      .then((client: Client | null) => {
        if (!client) return
        setForm({
          empresa: client.empresa || "",
          cnpj: client.cnpj || "",
          cod: client.cod?.toString() || "",
          grupo: client.grupo || "",
          tributacao: client.tributacao || "",
          ramo: client.ramo || "",
          entrada: client.entrada || "",
          gclick: client.gclick || "",
          sieg: client.sieg || "",
          dominio: client.dominio || "",
          xmlSaida: client.xmlSaida || "",
          email: client.email || "",
          telefone: client.telefone || "",
          responsavel: client.responsavel || "",
        })
      })
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const raw: Record<string, string | number | null> = {}
    for (const [key, value] of Object.entries(form)) {
      raw[key] = value.trim() || null
    }
    if (raw.cod) raw.cod = Number(raw.cod)
    const updated = await updateClient(Number(id), raw as Partial<Client>)
    if (updated) router.push(`/clientes/${id}`)
    setSaving(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (loading) return <p className="text-zinc-400">Carregando...</p>

  return (
    <div className="max-w-2xl space-y-6 animate-slide-up">
      <div className="flex items-center gap-4">
        <Link href={`/clientes/${id}`} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors hover:text-cyan-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Editar Cliente</h1>
          <p className="text-sm text-zinc-500">{form.empresa}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-lg p-6 space-y-5 group hover:border-zinc-700/80 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-1">Empresa *</label>
            <input
              type="text"
              name="empresa"
              required
              value={form.empresa}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">COD</label>
            <input
              type="number"
              name="cod"
              value={form.cod}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Grupo</label>
            <input
              type="text"
              name="grupo"
              value={form.grupo}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Tributação</label>
            <select
              name="tributacao"
              value={form.tributacao}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            >
              <option value="">Selecione...</option>
              <option value="SIMPLES NACIONAL">Simples Nacional</option>
              <option value="LUCRO PRESUMIDO">Lucro Presumido</option>
              <option value="LUCRO REAL">Lucro Real</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Ramo</label>
            <input
              type="text"
              name="ramo"
              value={form.ramo}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Entrada</label>
            <input
              type="text"
              name="entrada"
              placeholder="MM/AAAA"
              value={form.entrada}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Responsável</label>
            <input
              type="text"
              name="responsavel"
              value={form.responsavel}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">GCLICK</label>
            <select
              name="gclick"
              value={form.gclick}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            >
              <option value="">Selecione...</option>
              <option value="OK">OK</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">SIEG</label>
            <select
              name="sieg"
              value={form.sieg}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all duration-300"
            >
              <option value="">Selecione...</option>
              <option value="OK">OK</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50 relative">
          <Link
            href={`/clientes/${id}`}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 border border-cyan-500/20 px-5 py-2 rounded-lg text-sm font-medium hover:from-cyan-500/20 hover:to-blue-500/20 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.2)] disabled:opacity-50 transition-all duration-300"
          >
            <Save className="w-4 h-4" />
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}
