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
    dominio: "",
    xmlSaida: "",
    email: "",
    email2: "",
    telefone: "",
    telefone2: "",
    responsavel: "",
    cadastro: "",
    observacoes: "",
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
          dominio: client.dominio || "",
          xmlSaida: client.xmlSaida || "",
          email: client.email || "",
          email2: client.email2 || "",
          telefone: client.telefone || "",
          telefone2: client.telefone2 || "",
          responsavel: client.responsavel || "",
          cadastro: client.cadastro || "",
          observacoes: client.observacoes || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (loading) return <p className="">Carregando...</p>

  return (
    <div className="max-w-2xl space-y-6 animate-slide-up">
      <div className="flex items-center gap-4">
        <Link href={`/clientes/${id}`} className="p-2 rounded-lg hover:bg-zinc-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Editar Cliente</h1>
          <p className="text-sm uppercase">{form.empresa}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative bg-white rounded-xl border border-zinc-200/70 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Empresa *</label>
            <input
              type="text"
              name="empresa"
              required
              value={form.empresa}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 uppercase focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">COD</label>
            <input
              type="number"
              name="cod"
              value={form.cod}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grupo</label>
            <input
              type="text"
              name="grupo"
              value={form.grupo}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tributação</label>
            <select
              name="tributacao"
              value={form.tributacao}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            >
              <option value="">Selecione...</option>
              <option value="SIMPLES NACIONAL">Simples Nacional</option>
              <option value="LUCRO PRESUMIDO">Lucro Presumido</option>
              <option value="LUCRO REAL">Lucro Real</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ramo</label>
            <input
              type="text"
              name="ramo"
              value={form.ramo}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Entrada</label>
            <input
              type="text"
              name="entrada"
              placeholder="MM/AAAA"
              value={form.entrada}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email2"
              value={form.email2}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="telefone2"
              value={form.telefone2}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Responsável Legal</label>
            <input
              type="text"
              name="responsavel"
              value={form.responsavel}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">G-click</label>
            <select
              name="gclick"
              value={form.gclick}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            >
              <option value=""></option>
              <option value="CADASTRADO">Cadastrado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cadastro Onvio</label>
            <select
              name="cadastro"
              value={form.cadastro}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            >
              <option value=""></option>
              <option value="CADASTRADO">Cadastrado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Domínio</label>
            <select
              name="dominio"
              value={form.dominio}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300"
            >
              <option value=""></option>
              <option value="CADASTRADO">Cadastrado</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
          <Link
            href={`/clientes/${id}`}
            className="px-4 py-2 text-sm font-medium hover:bg-zinc-100 rounded-lg transition-all"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 disabled:opacity-50 transition-all duration-300"
          >
            <Save className="w-4 h-4" />
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}
