CREATE TABLE clientes (
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
  xml_saida TEXT,
  email TEXT,
  email2 TEXT,
  telefone TEXT,
  telefone2 TEXT,
  responsavel TEXT,
  perfil_gclick TEXT,
  obrigacoes_dp TEXT,
  obrigacoes_contabil TEXT,
  obrigacoes_fiscal TEXT,
  mes_referencia TEXT,
  is_group BOOLEAN NOT NULL DEFAULT FALSE,
  group_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Allow full access for authenticated users
CREATE POLICY "Allow all for authenticated" ON clientes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon read access (so the static site can read without auth)
CREATE POLICY "Allow read for anon" ON clientes
  FOR SELECT
  TO anon
  USING (true);
