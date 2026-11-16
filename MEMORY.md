# MEMORY.md — Universo Narrado Clone

## Estado Atual
- **Fase:** Módulo 1 (Infraestrutura) em andamento.
- **Repositório Remoto:** `https://github.com/alesauer/upskill.git` (branch `main`).
- **Base de Design:** `designmd/designmd-universonarrado-com-br/` (DesignMD tokens, Tailwind v4 `@theme`, Museo + Young Serif, paleta `#ffffff`, `#0cf2b5`, `#03203d`, `#1c3752`, `#4a6079`, `#eaf0ff`, `#f1ecff`, `#f9f3e3`, `#fff9d6`, `#e3e7eb`).

## Arquitetura Planejada
- **Frontend & SSR:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Banco de Dados & Persistência:** SQLite nativo (`node:sqlite` / `DatabaseSync`) em `data/universo.db` (ignorado no Git).
- **Motor de Cálculo & Relatórios:** `src/lib/calculator.ts` — Diagnóstico de Nivelamento e Trilha de Estudos (`DMAT → LM → LF → LC`), cálculo de carga horária semanal, estimativa de semanas e exportação JSON/CSV.
- **Páginas:** `/`, `/cursos`, `/cursos/[slug]`, `/314-editora`, `/sobre/historia`, `/suporte`, `/entrar`, `/aluno`.

## Endpoints Planejados
- `GET /api/health`
- `GET /api/courses`
- `GET /api/books`
- `POST /api/diagnostico` | `GET /api/diagnostico`
- `GET /api/reports/trilha`
- `POST /api/support` | `GET /api/support`
- `POST /api/auth/login` | `POST /api/auth/logout` | `GET /api/auth/session`
- `GET /api/progress` | `POST /api/progress`

## Comandos de Execução
- `npm install` — Instalar dependências
- `npm run dev` — Servidor de desenvolvimento
- `npm run build` — Build de produção
- `npm run typecheck` — Verificação TypeScript
- `npm test` — Testes automatizados (`node --test`)

## Próximos Passos
1. Instalar dependências e configurar `src/app/globals.css` com os tokens exatos do DesignMD.
2. Implementar Backend/Banco (`src/lib/db.ts`, seed e APIs).
3. Implementar Motor de Cálculo & Relatórios (`src/lib/calculator.ts` + `/api/diagnostico` + `/api/reports/trilha`).
4. Implementar Frontend completo fiel ao Universo Narrado.
5. Executar testes unitários, integração, build e validação visual/browser.
