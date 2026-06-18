import { ClienteEdit } from "@/components/pages/cliente-edit"
import { supabase } from "@/lib/supabase"

export async function generateStaticParams() {
  const { data, error } = await supabase().from("clientes").select("id")
  if (error || !data) return [{ id: "1" }]
  return data.map((c: { id: number }) => ({ id: String(c.id) }))
}

export default function EditarClientePage() {
  return <ClienteEdit />
}
