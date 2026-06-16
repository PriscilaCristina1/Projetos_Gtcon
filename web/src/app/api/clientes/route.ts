import { NextRequest, NextResponse } from "next/server"
import { readClients, createClient, filterClients, getGrupos, getTributacoes } from "@/lib/data"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get("search") ?? undefined
  const grupo = searchParams.get("grupo") ?? undefined
  const tributacao = searchParams.get("tributacao") ?? undefined
  const ramo = searchParams.get("ramo") ?? undefined
  const statusGclick = searchParams.get("gclick") ?? undefined

  if (!search && !grupo && !tributacao && !ramo && !statusGclick) {
    const clients = readClients()
    return NextResponse.json(clients)
  }

  const filtered = filterClients({ search, grupo, tributacao, ramo, statusGclick })
  return NextResponse.json(filtered)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const client = createClient(data)
  return NextResponse.json(client, { status: 201 })
}
