"use client"

import Link from "next/link"
import type { Client } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface RecentClientsProps {
  clients: Client[]
}

export function RecentClients({ clients }: RecentClientsProps) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-300">Clientes Recentes</h3>
        <Link href="/clientes" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          Ver todos
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">Empresa</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">CNPJ</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">Entrada</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">GCLICK</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-zinc-200">{client.empresa}</td>
                <td className="py-2.5 px-3 text-zinc-400">{client.cnpj || "-"}</td>
                <td className="py-2.5 px-3 text-zinc-400">{formatDate(client.entrada)}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      client.gclick === "OK"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {client.gclick || "PENDENTE"}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <Link href={`/clientes/${client.id}`}>
                    <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-indigo-400 transition-colors" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
