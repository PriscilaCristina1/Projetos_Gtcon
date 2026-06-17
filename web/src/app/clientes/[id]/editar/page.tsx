import { ClienteEdit } from "@/components/pages/cliente-edit"
import fs from "fs"
import path from "path"

export function generateStaticParams() {
  const dataFile = path.join(process.cwd(), "data", "clientes.json")
  if (!fs.existsSync(dataFile)) return [{ id: "1" }]
  const raw = fs.readFileSync(dataFile, "utf-8")
  const clients = JSON.parse(raw)
  return clients.map((c: { id: number }) => ({ id: String(c.id) }))
}

export default function EditarClientePage() {
  return <ClienteEdit />
}
