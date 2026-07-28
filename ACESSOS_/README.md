# Controle de Acessos - GTCON

Aplicação web moderna para gerenciamento de acessos de usuários, substituindo planilha Excel.

## Funcionalidades

- **Autenticação:** Login seguro com sessão por aba (sessionStorage)
- **Dashboard interativo:** Cards com estatísticas em tempo real
- **Tabela inteligente:** Busca global, filtro por status
- **CRUD completo:** Cadastrar, editar e excluir acessos
- **Exportação:** CSV, XLSX (compatível com Excel) e JSON
- **Modo escuro/claro:** Alternância com persistência de preferência
- **Design responsivo:** Funciona em desktop, tablet e mobile

## Credenciais de Acesso

| Usuário | Senha |
|---------|-------|
| ADM     | 1882  |

## Estrutura do Projeto

```
ACESSOS_/
├── index.html          # Página principal (SPA)
├── README.md           # Documentação
├── src/
│   ├── css/
│   │   └── style.css   # Estilos customizados + variáveis CSS
│   └── js/
│       ├── app.js      # Inicialização e orquestração
│       ├── auth.js     # Módulo de autenticação
│       ├── export.js   # Exportação CSV/JSON/XLSX
│       ├── storage.js  # Persistência em LocalStorage
│       ├── theme.js    # Gerenciamento de tema (dark/light)
│       └── ui.js       # Interface do usuário (tabela, modais, toast)
└── assets/             # Recursos estáticos
```

## Como Usar

### Opção 1: Abrir diretamente (mais simples)

1. Baixe/clone o repositório
2. Abra o arquivo `index.html` no seu navegador
3. Faça login com as credenciais acima

### Opção 2: Servir com um servidor local (recomendado)

Com Python:
```bash
# Python 3
python -m http.server 8000
# Acesse http://localhost:8000
```

Com Node.js:
```bash
npx serve .
# Acesse http://localhost:3000
```

## Publicar no GitHub

```bash
# 1. Crie um repositório no GitHub (sem README, .gitignore ou license)

# 2. No diretório do projeto, inicialize o git
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o commit
git commit -m "feat: controle de acessos GTCON - v1.0"

# 5. Vincule ao repositório remoto
git remote add origin https://github.com/seu-usuario/acessos-gtcon.git

# 6. Envie para o GitHub
git branch -M main
git push -u origin main
```

### Deploy no GitHub Pages

1. No repositório do GitHub, vá em **Settings > Pages**
2. Em "Source", selecione **Deploy from a branch**
3. Escolha a branch `main` e pasta `/ (root)`
4. Clique em **Save**
5. Seu site estará disponível em `https://seu-usuario.github.io/acessos-gtcon`

## Tecnologias

- HTML5 / CSS3 (Flexbox, Grid, Variáveis CSS, Animações)
- JavaScript (ES6+)
- LocalStorage / SessionStorage (persistência)
- Fonte Inter (Google Fonts)
- Sem dependências externas ou build tools

## Licença

Este projeto é de uso interno da GTCON - Sistemas Contábeis.
