"use client"

import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface RecentClientsProps {
  clients: Client[]
}

export function RecentClients({ clients }: RecentClientsProps) {
  return (
    <div className="relative bg-white rounded-xl border border-zinc-200/50 p-5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-700">Clientes Recentes</h3>
        <Link href="/clientes" className="text-xs text-zinc-500 hover:text-zinc-700 transition-colors">
          Ver todos
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">Empresa</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">CNPJ</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">Entrada</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-zinc-100 hover:bg-sky-50 transition-colors">
                <td className="py-2.5 px-3 font-medium text-zinc-800 uppercase">{client.empresa}</td>
                <td className="py-2.5 px-3 text-zinc-500">{client.cnpj || "-"}</td>
                <td className="py-2.5 px-3 text-zinc-500">{formatDate(client.entrada)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
