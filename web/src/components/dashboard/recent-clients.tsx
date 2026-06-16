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
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Clientes Recentes</h3>
        <Link href="/clientes" className="text-xs text-blue-600 hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Empresa</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">CNPJ</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Entrada</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">GCLICK</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium text-gray-800">{client.empresa}</td>
                <td className="py-2.5 px-3 text-gray-600">{client.cnpj || "-"}</td>
                <td className="py-2.5 px-3 text-gray-600">{formatDate(client.entrada)}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      client.gclick === "OK"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {client.gclick || "PENDENTE"}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <Link href={`/clientes/${client.id}`}>
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600" />
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
