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
    <div className="relative bg-white rounded-xl border border-zinc-200/70 p-5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-700">Clientes Recentes</h3>
        <Link href="/clientes" className="text-xs text-cyan-600 hover:text-cyan-700 transition-colors">
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
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">GCLICK</th>
              <th className="text-left py-2 px-3 text-zinc-500 font-medium">Domínio</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-zinc-100 hover:bg-sky-50 transition-colors">
                <td className="py-2.5 px-3 font-medium text-zinc-800">{client.empresa}</td>
                <td className="py-2.5 px-3 text-zinc-500">{client.cnpj || "-"}</td>
                <td className="py-2.5 px-3 text-zinc-500">{formatDate(client.entrada)}</td>
                <td className="py-2.5 px-3">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-200">
                    CADASTRADO
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  {client.entrada === "07/2026" ? (
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                      CADASTRADO
                    </span>
                  ) : (
                    <span className="text-zinc-400">-</span>
                  )}
                </td>
                <td className="py-2.5 px-3">
                  <Link href={`/clientes/${client.id}`}>
                    <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-cyan-600 transition-colors" />
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
