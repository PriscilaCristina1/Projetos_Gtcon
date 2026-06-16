import fs from "fs"
import path from "path"
import type { Client, ClientFilters, DashboardMetrics } from "./types"
import { normalizeTributacao, extractMesAno } from "./utils"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "clientes.json")
const EXCEL_FILE = path.join(process.cwd(), "..", "Controle Novos Clientes .xlsx")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export function readClients(): Client[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function writeClients(clients: Client[]) {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(clients, null, 2), "utf-8")
}

export function getClientById(id: number): Client | null {
  const clients = readClients()
  return clients.find((c) => c.id === id) ?? null
}

export function createClient(data: Partial<Client>): Client {
  const clients = readClients()
  const maxId = clients.reduce((max, c) => Math.max(max, c.id), 0)
  const client: Client = {
    id: maxId + 1,
    cod: data.cod ?? null,
    empresa: data.empresa ?? "",
    cnpj: data.cnpj ?? null,
    grupo: data.grupo ?? null,
    tributacao: data.tributacao ?? null,
    ramo: data.ramo ?? null,
    entrada: data.entrada ?? null,
    gclick: data.gclick ?? null,
    sieg: data.sieg ?? null,
    dominio: data.dominio ?? null,
    xmlSaida: data.xmlSaida ?? null,
    email: data.email ?? null,
    telefone: data.telefone ?? null,
    telefone2: data.telefone2 ?? null,
    responsavel: data.responsavel ?? null,
    perfilGclick: data.perfilGclick ?? null,
    obrigacoesDp: data.obrigacoesDp ?? null,
    obrigacoesContabil: data.obrigacoesContabil ?? null,
    obrigacoesFiscal: data.obrigacoesFiscal ?? null,
    mesReferencia: data.mesReferencia ?? null,
    isGroup: data.isGroup ?? false,
    groupName: data.groupName ?? null,
  }
  clients.push(client)
  writeClients(clients)
  return client
}

export function updateClient(id: number, data: Partial<Client>): Client | null {
  const clients = readClients()
  const idx = clients.findIndex((c) => c.id === id)
  if (idx === -1) return null
  clients[idx] = { ...clients[idx], ...data }
  writeClients(clients)
  return clients[idx]
}

export function deleteClient(id: number): boolean {
  const clients = readClients()
  const idx = clients.findIndex((c) => c.id === id)
  if (idx === -1) return false
  clients.splice(idx, 1)
  writeClients(clients)
  return true
}

export function filterClients(filters: ClientFilters): Client[] {
  let clients = readClients()
  if (filters.search) {
    const q = filters.search.toLowerCase()
    clients = clients.filter(
      (c) =>
        c.empresa.toLowerCase().includes(q) ||
        (c.cnpj && c.cnpj.includes(q)) ||
        (c.grupo && c.grupo.toLowerCase().includes(q))
    )
  }
  if (filters.grupo) clients = clients.filter((c) => c.grupo === filters.grupo)
  if (filters.tributacao) clients = clients.filter((c) => c.tributacao === filters.tributacao)
  if (filters.ramo) clients = clients.filter((c) => c.ramo === filters.ramo)
  if (filters.statusGclick) clients = clients.filter((c) => c.gclick === filters.statusGclick)
  return clients
}

export function getDashboardMetrics(): DashboardMetrics {
  const clients = readClients()
  const ativos = clients.filter((c) => !c.isGroup)

  const clientesPorMesMap = new Map<string, number>()
  for (const c of ativos) {
    const mes = extractMesAno(c.entrada)
    if (mes) clientesPorMesMap.set(mes, (clientesPorMesMap.get(mes) ?? 0) + 1)
  }
  const clientesPorMes = Array.from(clientesPorMesMap.entries())
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => a.mes.localeCompare(b.mes))

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
    const g = c.gclick || "PENDENTE"
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

  const clientesRecentes = ativos
    .sort((a, b) => b.id - a.id)
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

export function getGrupos(): string[] {
  const clients = readClients()
  const grupos = new Set(
    clients.filter((c) => c.grupo && c.grupo !== "-" && c.grupo !== "").map((c) => c.grupo!)
  )
  return Array.from(grupos).sort()
}

export function getTributacoes(): string[] {
  const clients = readClients()
  const tribs = new Set(clients.map((c) => normalizeTributacao(c.tributacao)))
  return Array.from(tribs).sort()
}
