import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-"
  if (/^\d+\/\d{4}$/.test(dateStr)) return dateStr
  if (/^\d{5}$/.test(dateStr)) {
    const excelEpoch = new Date(1899, 11, 30)
    const d = new Date(excelEpoch.getTime() + parseInt(dateStr) * 86400000)
    return d.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric" })
  }
  return dateStr
}

export function normalizeTributacao(val: string | null): string {
  if (!val) return "NÃO INFORMADO"
  const v = val.toUpperCase().trim()
  if (v === "LR") return "LUCRO REAL"
  if (v === "LP") return "LUCRO PRESUMIDO"
  if (v.includes("SIMPLES")) return "SIMPLES NACIONAL"
  if (v.includes("PRESUMIDO") || v === "SN") return "LUCRO PRESUMIDO"
  if (v.includes("REAL")) return "LUCRO REAL"
  return val.trim()
}

export function extractMesAno(entrada: string | null): string | null {
  if (!entrada) return null
  if (/^\d+\/\d{4}$/.test(entrada)) return entrada
  if (/^\d{5}$/.test(entrada)) {
    const excelEpoch = new Date(1899, 11, 30)
    const d = new Date(excelEpoch.getTime() + parseInt(entrada) * 86400000)
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`
  }
  return null
}
