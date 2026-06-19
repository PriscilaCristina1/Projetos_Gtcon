CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  cod INTEGER,
  empresa TEXT NOT NULL DEFAULT '',
  cnpj TEXT,
  grupo TEXT,
  tributacao TEXT,
  ramo TEXT,
  entrada TEXT,
  gclick TEXT,
  sieg TEXT,
  dominio TEXT,
  "xmlSaida" TEXT,
  email TEXT,
  "email2" TEXT,
  telefone TEXT,
  "telefone2" TEXT,
  responsavel TEXT,
  "perfilGclick" TEXT,
  "obrigacoesDp" TEXT,
  "obrigacoesContabil" TEXT,
  "obrigacoesFiscal" TEXT,
  "mesReferencia" TEXT,
  "isGroup" BOOLEAN DEFAULT false,
  "groupName" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clientes_empresa ON clientes (empresa);
CREATE INDEX IF NOT EXISTS idx_clientes_cnpj ON clientes (cnpj);
CREATE INDEX IF NOT EXISTS idx_clientes_grupo ON clientes (grupo);
CREATE INDEX IF NOT EXISTS idx_clientes_gclick ON clientes (gclick);
CREATE INDEX IF NOT EXISTS idx_clientes_tributacao ON clientes (tributacao);

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for service_role" ON clientes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for anon" ON clientes
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

GRANT ALL ON clientes TO anon, service_role;
GRANT USAGE ON SEQUENCE clientes_id_seq TO anon, service_role;
