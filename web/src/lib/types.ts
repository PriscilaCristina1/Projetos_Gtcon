export interface Client {
  id: number
  cod: number | null
  empresa: string
  cnpj: string | null
  grupo: string | null
  tributacao: string | null
  ramo: string | null
  entrada: string | null
  gclick: string | null
  sieg: string | null
  dominio: string | null
  xmlSaida: string | null
  email: string | null
  email2: string | null
  telefone: string | null
  telefone2: string | null
  responsavel: string | null
  cadastro: string | null
  observacoes: string | null
  perfilGclick: string | null
  obrigacoesDp: string | null
  obrigacoesContabil: string | null
  obrigacoesFiscal: string | null
  mesReferencia: string | null
  isGroup: boolean
  groupName: string | null
}

export interface DashboardMetrics {
  totalClientes: number
  totalGrupos: number
  clientesPorMes: { mes: string; total: number }[]
  porTributacao: { label: string; total: number }[]
  porRamo: { label: string; total: number }[]
  statusGclick: { label: string; total: number }[]
  statusDominio: { label: string; total: number }[]
  totalDominioCadastrado: number
  clientesRecentes: Client[]
}

export interface ClientFilters {
  search?: string
  grupo?: string
  tributacao?: string
  ramo?: string
  mesInicio?: string
  mesFim?: string
  statusGclick?: string
}
