import { ClienteDetail } from "@/components/pages/cliente-detail"
import { supabase } from "@/lib/supabase"

export async function generateStaticParams() {
  const { data, error } = await supabase().from("clientes").select("id")
  if (error || !data) return [{ id: "1" }]
  return data.map((c: { id: number }) => ({ id: String(c.id) }))
}

export default function ClienteDetailPage() {
  return <ClienteDetail />
}
