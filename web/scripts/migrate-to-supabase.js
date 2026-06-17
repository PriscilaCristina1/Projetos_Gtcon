const { createClient } = require("@supabase/supabase-js")
const fs = require("fs")
const path = require("path")

const DATA_FILE = path.join(__dirname, "..", "data", "clientes.json")
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: Defina SUPABASE_URL e SUPABASE_SERVICE_KEY no ambiente")
  console.error("Exemplo:")
  console.error('  $env:SUPABASE_URL="http://127.0.0.1:54321"')
  console.error('  $env:SUPABASE_SERVICE_KEY="<service-role-key>"')
  console.error("  node scripts/migrate-to-supabase.js")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log("Lendo dados do JSON...")
  const raw = fs.readFileSync(DATA_FILE, "utf-8")
  const clients = JSON.parse(raw)

  if (!Array.isArray(clients) || clients.length === 0) {
    console.log("Nenhum cliente encontrado no JSON.")
    return
  }

  console.log(`${clients.length} clientes encontrados. Inserindo no Supabase...`)

  const batchSize = 100
  let inserted = 0

  for (let i = 0; i < clients.length; i += batchSize) {
    const batch = clients.slice(i, i + batchSize)
    const { error } = await supabase.from("clientes").insert(batch)
    if (error) {
      console.error(`Erro no lote ${i / batchSize + 1}:`, error.message)
      continue
    }
    inserted += batch.length
    console.log(`${inserted}/${clients.length} inseridos...`)
  }

  console.log(`Migração concluída! ${inserted} clientes inseridos.`)
}

main().catch(console.error)
