import { NextRequest, NextResponse } from "next/server"
import { getClientById, updateClient, deleteClient } from "@/lib/data"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = getClientById(Number(id))
  if (!client) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
  return NextResponse.json(client)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await req.json()
  const client = updateClient(Number(id), data)
  if (!client) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
  return NextResponse.json(client)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deleted = deleteClient(Number(id))
  if (!deleted) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
  return NextResponse.json({ success: true })
}
