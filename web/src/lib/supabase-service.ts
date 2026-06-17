import { supabase, mapDbToClient, mapClientToDb, type DbClient } from "./supabase"
import type { Client, ClientFilters, DashboardMetrics } from "./types"
import { normalizeTributacao, extractMesAno } from "./utils"

export async function fetchClients(): Promise<Client[]> {
  const s = supabase()
  const { data, error } = await s
    .from("clientes")
    .select("*")
    .order("id", { ascending: false })

  if (error) throw error
  return (data as DbClient[]).map(mapDbToClient)
}

export async function fetchClientById(id: number): Promise<Client | null> {
  const s = supabase()
  const { data, error } = await s
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return mapDbToClient(data as DbClient)
}

export async function createClient(data: Partial<Client>): Promise<Client> {
  const s = supabase()
  const dbData = {
    ...mapClientToDb(data),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { data: created, error } = await s
    .from("clientes")
    .insert(dbData)
    .select()
    .single()

  if (error) throw error
  return mapDbToClient(created as DbClient)
}

export async function updateClient(id: number, data: Partial<Client>): Promise<Client | null> {
  const s = supabase()
  const dbData = {
    ...mapClientToDb(data),
    updated_at: new Date().toISOString(),
  }

  const { data: updated, error } = await s
    .from("clientes")
    .update(dbData)
    .eq("id", id)
    .select()
    .single()

  if (error) return null
  return mapDbToClient(updated as DbClient)
}

export async function deleteClient(id: number): Promise<boolean> {
  const s = supabase()
  const { error } = await s
    .from("clientes")
    .delete()
    .eq("id", id)

  return !error
}

export async function filterClients(filters: ClientFilters): Promise<Client[]> {
  const s = supabase()
  let query = s.from("clientes").select("*")

  if (filters.search) {
    const q = filters.search.toLowerCase()
    query = query.or(
      `empresa.ilike.%${q}%,cnpj.ilike.%${q}%,grupo.ilike.%${q}%`
    )
  }

  if (filters.grupo) {
    query = query.eq("grupo", filters.grupo)
  }

  if (filters.tributacao) {
    query = query.eq("tributacao", filters.tributacao)
  }

  if (filters.ramo) {
    query = query.eq("ramo", filters.ramo)
  }

  if (filters.statusGclick) {
    query = query.eq("gclick", filters.statusGclick)
  }

  const { data, error } = await query.order("id", { ascending: false })

  if (error) throw error
  return (data as DbClient[]).map(mapDbToClient)
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const clients = await fetchClients()
  const ativos = clients.filter((c) => !c.isGroup)

  const clientesPorMesMap = new Map<string, number>()
  for (const c of ativos) {
    const mes = extractMesAno(c.entrada)
    if (mes) clientesPorMesMap.set(mes, (clientesPorMesMap.get(mes) ?? 0) + 1)
  }
  const clientesPorMes = Array.from(clientesPorMesMap.entries())
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => {
      const [mA, aA] = a.mes.split("/").map(Number)
      const [mB, aB] = b.mes.split("/").map(Number)
      return aA - aB || mA - mB
    })

  const tribMap = new Map<string, number>()
  for (const c of ativos) {
    const t = normalizeTributacao(c.tributacao)
    tribMap.set(t, (tribMap.get(t) ?? 0) + 1)
  }
  const porTributacao = Array.from(tribMap.entries()).map(([label, total]) => ({ label, total }))

  const ramoMap = new Map<string, number>()
  for (const c of ativos) {
    const r = c.ramo || "NÃO INFORMADO"
    ramoMap.set(r, (ramoMap.get(r) ?? 0) + 1)
  }
  const porRamo = Array.from(ramoMap.entries())
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const gclickMap = new Map<string, number>()
  for (const c of ativos) {
    const g = "CADASTRADO"
    gclickMap.set(g, (gclickMap.get(g) ?? 0) + 1)
  }
  const statusGclick = Array.from(gclickMap.entries()).map(([label, total]) => ({ label, total }))

  const dominioMap = new Map<string, number>()
  for (const c of ativos) {
    const d = c.dominio || "PENDENTE"
    dominioMap.set(d, (dominioMap.get(d) ?? 0) + 1)
  }
  const statusDominio = Array.from(dominioMap.entries()).map(([label, total]) => ({ label, total }))

  const grupos = new Set(clients.filter((c) => c.grupo && c.grupo !== "-").map((c) => c.grupo))

  const clientesRecentes = [...ativos]
    .sort((a, b) => {
      const extract = (v: string | null) => {
        if (!v) return [0, 0]
        const [m, y] = v.split("/").map(Number)
        return [y || 0, m || 0]
      }
      const [yA, mA] = extract(a.entrada)
      const [yB, mB] = extract(b.entrada)
      return yB - yA || mB - mA
    })
    .slice(0, 10)

  return {
    totalClientes: ativos.length,
    totalGrupos: grupos.size,
    clientesPorMes,
    porTributacao,
    porRamo,
    statusGclick,
    statusDominio,
    clientesRecentes,
  }
}

export async function fetchGrupos(): Promise<string[]> {
  const s = supabase()
  const { data, error } = await s
    .from("clientes")
    .select("grupo")
    .not("grupo", "is", null)
    .neq("grupo", "-")
    .neq("grupo", "")

  if (error) return []
  const grupos = new Set(
    (data as { grupo: string }[])
      .map((r) => r.grupo)
      .filter((g): g is string => g !== null)
  )
  return Array.from(grupos).sort()
}

export async function fetchTributacoes(): Promise<string[]> {
  const s = supabase()
  const { data, error } = await s
    .from("clientes")
    .select("tributacao")

  if (error) return []
  const tribs = new Set(
    (data as { tributacao: string | null }[])
      .map((r) => normalizeTributacao(r.tributacao))
  )
  return Array.from(tribs).sort()
}
