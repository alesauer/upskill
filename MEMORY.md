# MEMORY.md — Universo Narrado Clone

## Estado Atual
- **Fase:** Módulo 2 (Backend/Banco) concluído. Avançando para Módulo 3 (Motor de Cálculo/Relatórios).
- **Repositório Remoto:** `https://github.com/alesauer/upskill.git` (branch `main`).
- **Base de Design:** `designmd/designmd-universonarrado-com-br/` (DesignMD tokens, Tailwind v4 `@theme`, Museo + Young Serif, paleta `#ffffff`, `#0cf2b5`, `#03203d`, `#1c3752`, `#4a6079`, `#eaf0ff`, `#f1ecff`, `#f9f3e3`, `#fff9d6`, `#e3e7eb`).

## Arquitetura Implementada
- **Frontend & SSR:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Banco de Dados & Persistência:** `src/lib/db.ts` com SQLite nativo (`node:sqlite` / `DatabaseSync`) em `data/universo.db` (ignorado no Git). Tabelas: `courses`, `books`, `users`, `sessions`, `enrollments`, `diagnostics`, `support_tickets`.
- **Autenticação:** `src/lib/auth.ts` com `scrypt` + salt + `timingSafeEqual` e cookie `httpOnly` (`un_session`). Usuário demo: `aluno@universonarrado.com.br` / `sapereaude`.

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
