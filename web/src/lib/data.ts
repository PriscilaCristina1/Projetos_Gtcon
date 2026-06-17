import { supabase } from "./supabase"
import type { Client, ClientFilters, DashboardMetrics } from "./types"
import { normalizeTributacao, extractMesAno } from "./utils"

type DbClient = Omit<Client, "isGroup" | "perfilGclick" | "groupName"> & {
  isGroup: boolean
  perfilGclick: string | null
  groupName: string | null
}

function mapToClient(row: Record<string, unknown>): Client {
  return {
    id: row.id as number,
    cod: row.cod as number | null,
    empresa: row.empresa as string,
    cnpj: row.cnpj as string | null,
    grupo: row.grupo as string | null,
    tributacao: row.tributacao as string | null,
    ramo: row.ramo as string | null,
    entrada: row.entrada as string | null,
    gclick: row.gclick as string | null,
    sieg: row.sieg as string | null,
    dominio: row.dominio as string | null,
    xmlSaida: row.xmlSaida as string | null,
    email: row.email as string | null,
    telefone: row.telefone as string | null,
    telefone2: row.telefone2 as string | null,
    responsavel: row.responsavel as string | null,
    perfilGclick: row.perfilGclick as string | null,
    obrigacoesDp: row.obrigacoesDp as string | null,
    obrigacoesContabil: row.obrigacoesContabil as string | null,
    obrigacoesFiscal: row.obrigacoesFiscal as string | null,
    mesReferencia: row.mesReferencia as string | null,
    isGroup: row.isGroup as boolean,
    groupName: row.groupName as string | null,
  }
}

export async function readClients(): Promise<Client[]> {
  const { data, error } = await supabase().from("clientes").select("*").order("id", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []).map(mapToClient)
}

export async function getClientById(id: number): Promise<Client | null> {
  const { data, error } = await supabase().from("clientes").select("*").eq("id", id).single()
  if (error) {
    if (error.code === "PGRST116") return null
    throw new Error(error.message)
  }
  return mapToClient(data)
}

export async function createClient(payload: Partial<Client>): Promise<Client> {
  const client = {
    cod: payload.cod ?? null,
    empresa: payload.empresa ?? "",
    cnpj: payload.cnpj ?? null,
    grupo: payload.grupo ?? null,
    tributacao: payload.tributacao ?? null,
    ramo: payload.ramo ?? null,
    entrada: payload.entrada ?? null,
    gclick: payload.gclick ?? null,
    sieg: payload.sieg ?? null,
    dominio: payload.dominio ?? null,
    xmlSaida: payload.xmlSaida ?? null,
    email: payload.email ?? null,
    telefone: payload.telefone ?? null,
    telefone2: payload.telefone2 ?? null,
    responsavel: payload.responsavel ?? null,
    perfilGclick: payload.perfilGclick ?? null,
    obrigacoesDp: payload.obrigacoesDp ?? null,
    obrigacoesContabil: payload.obrigacoesContabil ?? null,
    obrigacoesFiscal: payload.obrigacoesFiscal ?? null,
    mesReferencia: payload.mesReferencia ?? null,
    isGroup: payload.isGroup ?? false,
    groupName: payload.groupName ?? null,
  }
  const { data: inserted, error } = await supabase().from("clientes").insert(client).select().single()
  if (error) throw new Error(error.message)
  return mapToClient(inserted)
}

export async function updateClientSv(id: number, payload: Partial<Client>): Promise<Client | null> {
  const { data: updated, error } = await supabase()
    .from("clientes")
    .update(payload)
    .eq("id", id)
    .select()
    .single()
  if (error) {
    if (error.code === "PGRST116") return null
    throw new Error(error.message)
  }
  return mapToClient(updated)
}

export async function deleteClientSv(id: number): Promise<boolean> {
  const { error } = await supabase().from("clientes").delete().eq("id", id)
  if (error) throw new Error(error.message)
  return true
}

export async function filterClients(filters: ClientFilters): Promise<Client[]> {
  let query = supabase().from("clientes").select("*")

  if (filters.search) {
    const q = filters.search.toLowerCase()
    query = query.or(`empresa.ilike.%${q}%,cnpj.ilike.%${q}%,grupo.ilike.%${q}%`)
  }
  if (filters.grupo) query = query.eq("grupo", filters.grupo)
  if (filters.tributacao) query = query.eq("tributacao", filters.tributacao)
  if (filters.ramo) query = query.eq("ramo", filters.ramo)
  if (filters.statusGclick) query = query.eq("gclick", filters.statusGclick)

  query = query.order("id", { ascending: true })

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []).map(mapToClient)
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const { data: clients, error } = await supabase().from("clientes").select("*")
  if (error) throw new Error(error.message)

  const ativos = (clients ?? []).filter((c: Record<string, unknown>) => !c.isGroup)

  const clientesPorMesMap = new Map<string, number>()
  for (const c of ativos) {
    const mes = extractMesAno(c.entrada as string | null)
    if (mes) clientesPorMesMap.set(mes, (clientesPorMesMap.get(mes) ?? 0) + 1)
  }
  const clientesPorMes = Array.from(clientesPorMesMap.entries())
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => a.mes.localeCompare(b.mes))

  const tribMap = new Map<string, number>()
  for (const c of ativos) {
    const t = normalizeTributacao(c.tributacao as string | null)
    tribMap.set(t, (tribMap.get(t) ?? 0) + 1)
  }
  const porTributacao = Array.from(tribMap.entries()).map(([label, total]) => ({ label, total }))

  const ramoMap = new Map<string, number>()
  for (const c of ativos) {
    const r = (c.ramo as string) || "NÃO INFORMADO"
    ramoMap.set(r, (ramoMap.get(r) ?? 0) + 1)
  }
  const porRamo = Array.from(ramoMap.entries())
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const gclickMap = new Map<string, number>()
  for (const c of ativos) {
    const g = (c.gclick as string) || "PENDENTE"
    gclickMap.set(g, (gclickMap.get(g) ?? 0) + 1)
  }
  const statusGclick = Array.from(gclickMap.entries()).map(([label, total]) => ({ label, total }))

  const dominioMap = new Map<string, number>()
  for (const c of ativos) {
    const d = (c.dominio as string) || "PENDENTE"
    dominioMap.set(d, (dominioMap.get(d) ?? 0) + 1)
  }
  const statusDominio = Array.from(dominioMap.entries()).map(([label, total]) => ({ label, total }))

  const gruposSet = new Set(
    (clients ?? [])
      .filter((c: Record<string, unknown>) => c.grupo && c.grupo !== "-")
      .map((c: Record<string, unknown>) => c.grupo as string)
  )

  const clientesRecentes = ativos
    .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.id as number) - (a.id as number))
    .slice(0, 10)
    .map(mapToClient)

  return {
    totalClientes: ativos.length,
    totalGrupos: gruposSet.size,
    clientesPorMes,
    porTributacao,
    porRamo,
    statusGclick,
    statusDominio,
    clientesRecentes,
  }
}

export async function getGrupos(): Promise<string[]> {
  const { data, error } = await supabase()
    .from("clientes")
    .select("grupo")
    .not("grupo", "is", null)
    .not("grupo", "eq", "")
    .not("grupo", "eq", "-")
    .order("grupo", { ascending: true })
  if (error) throw new Error(error.message)
  const grupos = [...new Set((data ?? []).map((r: { grupo: string }) => r.grupo))]
  return grupos.sort()
}

export async function getTributacoes(): Promise<string[]> {
  const { data, error } = await supabase().from("clientes").select("tributacao")
  if (error) throw new Error(error.message)
  const tribs = [...new Set((data ?? []).map((r: { tributacao: string | null }) => normalizeTributacao(r.tributacao)))]
  return tribs.sort()
}
