const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const EXCEL_FILE = path.join(__dirname, "..", "..", "Controle Novos Clientes .xlsx");
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "clientes.json");

function normalizeTrib(val) {
  if (!val) return null;
  const v = String(val).toUpperCase().trim();
  if (v.includes("SIMPLES")) return "SIMPLES NACIONAL";
  if (v === "SN" || v === "SN ") return "LUCRO PRESUMIDO";
  if (v.includes("PRESUMIDO")) return "LUCRO PRESUMIDO";
  if (v.includes("REAL")) return "LUCRO REAL";
  return String(val).trim();
}

function normalizeRamo(val) {
  if (!val) return null;
  const v = String(val).trim();
  if (v === "SN" || v === "SN ") return "COMERCIO";
  return v;
}

function parseSerialDate(val) {
  if (!val && val !== 0) return null;
  if (typeof val === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    const d = new Date(excelEpoch.getTime() + val * 86400000);
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  }
  const s = String(val).trim();
  if (/^\d{1,2}\/\d{4}$/.test(s)) return s;
  return s;
}

function main() {
  console.log("Lendo Excel...");
  const wb = XLSX.readFile(EXCEL_FILE);

  const allClients = [];
  let idCounter = 1;

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
    if (rows.length < 2) continue;

    const header = rows[0].map((h) => String(h || "").toUpperCase().trim());
    const dataRows = rows.slice(1).filter((r) => r.length > 0 && r.some((c) => c !== undefined && c !== null && c !== ""));

    for (const row of dataRows) {
      const rowObj = {};
      header.forEach((h, i) => {
        rowObj[h] = row[i] !== undefined ? row[i] : null;
      });

      const empresa = String(rowObj["EMPRESA"] || "").trim();
      const cod = rowObj["COD"] ? Number(rowObj["COD"]) : null;

      const isGroup = empresa.toUpperCase().startsWith("GRUPO") || (!cod && empresa.length > 0);

      const entrada =
        rowObj["ENTRADA GTCON"] ||
        rowObj["ENTRADA"] ||
        rowObj["DATA DE ENTRADA"] ||
        null;

      const gclick =
        rowObj["CADASTRO GCLICK"] ||
        rowObj["GCLICK"] ||
        null;

      const dominio =
        rowObj["CADASTRO DOMINIO"] ||
        rowObj["DOMINIO"] ||
        null;

      let tel1 = rowObj["TEL DE CONTATO"] || null;
      let tel2 = null;

      if (header.filter((h) => h === "TEL DE CONTATO").length > 1) {
        const indices = header.map((h, i) => (h === "TEL DE CONTATO" ? i : -1)).filter((i) => i >= 0);
        if (indices.length > 1) {
          const val1 = row[indices[0]];
          const val2 = row[indices[1]];
          if (val1 && val2) {
            tel1 = val1;
            tel2 = val2;
          }
        }
      }

      const client = {
        id: idCounter++,
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
        xmlSaida: rowObj["XML SAIDA"] ? String(rowObj["XML SAIDA"]).trim() : null,
        email: rowObj["E-MAIL "] || rowObj["E-MAIL"] || null,
        telefone: tel1,
        telefone2: tel2,
        responsavel: rowObj["RESPONSAVEL"] || rowObj["RESPONSAVEIS"] || rowObj["RESPONSAVEIS "] || null,
        perfilGclick: rowObj["PERFIL NO GCLICK"] || null,
        obrigacoesDp: rowObj["OBRIGAÇÕES DP "] || null,
        obrigacoesContabil: rowObj["OBRIGAÇÕES CONTABIL"] || null,
        obrigacoesFiscal: rowObj["OBRIGAÇÕES FISCAL"] || null,
        mesReferencia: sheetName,
        isGroup,
        groupName: isGroup ? empresa : null,
      };

      if (empresa || cod) {
        allClients.push(client);
      }
    }
  }

  console.log(`Total de clientes importados: ${allClients.length}`);

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(allClients, null, 2), "utf-8");
  console.log(`Arquivo salvo: ${DATA_FILE}`);
}

main();
