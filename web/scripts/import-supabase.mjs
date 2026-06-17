import { createClient } from "@supabase/supabase-js"
import XLSX from "xlsx"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, "..", ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são necessárias no .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const EXCEL_FILE = path.join(__dirname, "..", "..", "Controle Novos Clientes .xlsx")

function normalizeTrib(val) {
  if (!val) return null
  const v = String(val).toUpperCase().trim()
  if (v.includes("SIMPLES")) return "SIMPLES NACIONAL"
  if (v === "SN" || v === "SN ") return "LUCRO PRESUMIDO"
  if (v.includes("PRESUMIDO")) return "LUCRO PRESUMIDO"
  if (v.includes("REAL")) return "LUCRO REAL"
  return String(val).trim()
}

function normalizeRamo(val) {
  if (!val) return null
  const v = String(val).trim()
  if (v === "SN" || v === "SN ") return "COMERCIO"
  return v
}

function parseSerialDate(val) {
  if (!val && val !== 0) return null
  if (typeof val === "number") {
    const excelEpoch = new Date(1899, 11, 30)
    const d = new Date(excelEpoch.getTime() + val * 86400000)
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`
  }
  const s = String(val).trim()
  if (/^\d{1,2}\/\d{4}$/.test(s)) return s
  return s
}

async function main() {
  console.log("Lendo Excel...")
  const wb = XLSX.readFile(EXCEL_FILE)

  const allClients = []
  let idCounter = 1

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 })
    if (rows.length < 2) continue

    const header = rows[0].map((h) => String(h || "").toUpperCase().trim())
    const dataRows = rows.slice(1).filter((r) => r.length > 0 && r.some((c) => c !== undefined && c !== null && c !== ""))

    for (const row of dataRows) {
      const rowObj = {}
      header.forEach((h, i) => {
        rowObj[h] = row[i] !== undefined ? row[i] : null
      })

      const empresa = String(rowObj["EMPRESA"] || "").trim()
      const cod = rowObj["COD"] ? Number(rowObj["COD"]) : null

      const isGroup = empresa.toUpperCase().startsWith("GRUPO") || (!cod && empresa.length > 0)

      const entrada =
        rowObj["ENTRADA GTCON"] ||
        rowObj["ENTRADA"] ||
        rowObj["DATA DE ENTRADA"] ||
        null

      const gclick =
        rowObj["CADASTRO GCLICK"] ||
        rowObj["GCLICK"] ||
        null

      const dominio =
        rowObj["CADASTRO DOMINIO"] ||
        rowObj["DOMINIO"] ||
        null

      let tel1 = rowObj["TEL DE CONTATO"] || null
      let tel2 = null

      if (header.filter((h) => h === "TEL DE CONTATO").length > 1) {
        const indices = header.map((h, i) => (h === "TEL DE CONTATO" ? i : -1)).filter((i) => i >= 0)
        if (indices.length > 1) {
          const val1 = row[indices[0]]
          const val2 = row[indices[1]]
          if (val1 && val2) {
            tel1 = val1
            tel2 = val2
          }
        }
      }

      const client = {
        cod,
        empresa,
        cnpj: rowObj["CNPJ"] || null,
        grupo: rowObj["GRUPO"] && String(rowObj["GRUPO"]).trim() !== "-" ? String(rowObj["GRUPO"]).trim() : null,
        tributacao: normalizeTrib(rowObj["TRIBUTAÇÃO"] || rowObj["TRIBUTACAO"]),
        ramo: normalizeRamo(rowObj["RAMO"]),
        entrada: parseSerialDate(entrada),
        gclick: gclick ? String(gclick).trim() : null,
        sieg: rowObj["SIEG"] ? String(rowObj["SIEG"]).trim() : null,
        dominio: dominio ? String(dominio).trim() : null,
        xml_saida: rowObj["XML SAIDA"] ? String(rowObj["XML SAIDA"]).trim() : null,
        email: rowObj["E-MAIL "] || rowObj["E-MAIL"] || null,
        telefone: tel1,
        telefone2: tel2,
        responsavel: rowObj["RESPONSAVEL"] || rowObj["RESPONSAVEIS"] || rowObj["RESPONSAVEIS "] || null,
        perfil_gclick: rowObj["PERFIL NO GCLICK"] || null,
        obrigacoes_dp: rowObj["OBRIGAÇÕES DP "] || null,
        obrigacoes_contabil: rowObj["OBRIGAÇÕES CONTABIL"] || null,
        obrigacoes_fiscal: rowObj["OBRIGAÇÕES FISCAL"] || null,
        mes_referencia: sheetName,
        is_group: isGroup,
        group_name: isGroup ? empresa : null,
      }

      if (empresa || cod) {
        allClients.push(client)
      }
    }
  }

  console.log(`Total de clientes para importar: ${allClients.length}`)

  // Inserir em lotes de 100
  const BATCH_SIZE = 100
  let inserted = 0

  for (let i = 0; i < allClients.length; i += BATCH_SIZE) {
    const batch = allClients.slice(i, i + BATCH_SIZE)
    const { error } = await supabase.from("clientes").insert(batch)
    if (error) {
      console.error(`Erro no lote ${i / BATCH_SIZE + 1}:`, error.message)
    } else {
      inserted += batch.length
      console.log(`Importados ${inserted}/${allClients.length}`)
    }
  }

  console.log(`Importação concluída! ${inserted} clientes inseridos no Supabase.`)
}

main().catch(console.error)
