import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Client } from "./types"

function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Create a .env.local file based on .env.local.example"
    )
  }

  return createClient(url, key)
}

let _supabase: SupabaseClient | null = null

export function supabase(): SupabaseClient {
  if (!_supabase) _supabase = getSupabase()
  return _supabase
}

export type DbClient = Client & {
  xml_saida: string | null
  telefone2: string | null
  email2: string | null
  perfil_gclick: string | null
  cadastro: string | null
  obrigacoes_dp: string | null
  obrigacoes_contabil: string | null
  obrigacoes_fiscal: string | null
  mes_referencia: string | null
  observacoes: string | null
  is_group: boolean
  group_name: string | null
  created_at: string
  updated_at: string
}

export function mapDbToClient(db: DbClient): Client {
  return {
    id: db.id,
    cod: db.cod,
    empresa: db.empresa,
    cnpj: db.cnpj,
    grupo: db.grupo,
    tributacao: db.tributacao,
    ramo: db.ramo,
    entrada: db.entrada,
    gclick: db.gclick,
    sieg: db.sieg,
    dominio: db.dominio,
    xmlSaida: db.xml_saida,
    email: db.email,
    telefone: db.telefone,
    telefone2: db.telefone2,
    email2: db.email2,
    responsavel: db.responsavel,
    perfilGclick: db.perfil_gclick,
    cadastro: db.cadastro,
    observacoes: db.observacoes,
    obrigacoesDp: db.obrigacoes_dp,
    obrigacoesContabil: db.obrigacoes_contabil,
    obrigacoesFiscal: db.obrigacoes_fiscal,
    mesReferencia: db.mes_referencia,
    isGroup: db.is_group,
    groupName: db.group_name,
  }
}

export function mapClientToDb(client: Partial<Client>): Record<string, unknown> {
  const db: Record<string, unknown> = {}
  if (client.cod !== undefined) db.cod = client.cod
  if (client.empresa !== undefined) db.empresa = client.empresa
  if (client.cnpj !== undefined) db.cnpj = client.cnpj
  if (client.grupo !== undefined) db.grupo = client.grupo
  if (client.tributacao !== undefined) db.tributacao = client.tributacao
  if (client.ramo !== undefined) db.ramo = client.ramo
  if (client.entrada !== undefined) db.entrada = client.entrada
  if (client.gclick !== undefined) db.gclick = client.gclick
  if (client.sieg !== undefined) db.sieg = client.sieg
  if (client.dominio !== undefined) db.dominio = client.dominio
  if (client.xmlSaida !== undefined) db.xml_saida = client.xmlSaida
  if (client.email !== undefined) db.email = client.email
  if (client.telefone !== undefined) db.telefone = client.telefone
  if (client.telefone2 !== undefined) db.telefone2 = client.telefone2
  if (client.email2 !== undefined) db.email2 = client.email2
  if (client.responsavel !== undefined) db.responsavel = client.responsavel
  if (client.perfilGclick !== undefined) db.perfil_gclick = client.perfilGclick
  if (client.obrigacoesDp !== undefined) db.obrigacoes_dp = client.obrigacoesDp
  if (client.obrigacoesContabil !== undefined) db.obrigacoes_contabil = client.obrigacoesContabil
  if (client.obrigacoesFiscal !== undefined) db.obrigacoes_fiscal = client.obrigacoesFiscal
  if (client.mesReferencia !== undefined) db.mes_referencia = client.mesReferencia
  if (client.isGroup !== undefined) db.is_group = client.isGroup
  if (client.groupName !== undefined) db.group_name = client.groupName
  if (client.observacoes !== undefined) db.observacoes = client.observacoes
  if (client.cadastro !== undefined) db.cadastro = client.cadastro
  return db
}
