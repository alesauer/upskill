# MEMORY.md — Universo Narrado Clone

## Estado Atual
- **Fase:** Todos os 5 módulos concluídos e validados (Infraestrutura, Backend/Banco, Motor de Cálculo/Relatórios, Frontend e Validação Final).
- **Repositório Remoto:** `https://github.com/alesauer/upskill.git` (branch `main`).
- **Base de Design:** `designmd/designmd-universonarrado-com-br/` (DesignMD tokens, Tailwind v4 `@theme`, Museo + Young Serif, paleta `#ffffff`, `#0cf2b5`, `#03203d`, `#1c3752`, `#4a6079`, `#eaf0ff`, `#f1ecff`, `#f9f3e3`, `#fff9d6`, `#e3e7eb`).

## Arquitetura Implementada
- **Frontend & SSR:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
  - Páginas: `/` (Home), `/cursos` (Trilha + 4 degraus + Calculadora), `/cursos/[slug]` (Ementa detalhada), `/314-editora`, `/sobre/historia`, `/suporte`, `/entrar`, `/aluno`.
  - Componentes: `Navbar`, `Footer`, `DesignSystem`, `CourseCoverArt`, `TimelineSection`, `TrilhaCalculator`, `SupportForm`, `StudentDashboard`.
- **Banco de Dados & Persistência:** `src/lib/db.ts` com SQLite nativo (`node:sqlite` / `DatabaseSync`) em `data/universo.db` (ignorado no Git). Tabelas: `courses`, `books`, `users`, `sessions`, `enrollments`, `diagnostics`, `support_tickets`.
- **Autenticação:** `src/lib/auth.ts` com `scrypt` + salt + `timingSafeEqual` e cookie `httpOnly` (`un_session`). Usuário demo: `aluno@universonarrado.com.br` / `sapereaude`.
- **Motor de Cálculo & Relatórios:** `src/lib/calculator.ts` (`calculateTrilha`, `formatTrilhaCsv`), APIs `POST/GET /api/diagnostico` e `GET /api/reports/trilha?format=json|csv`, testados em `tests/calculator.test.ts` (5/5 passando).

## Endpoints Criados
- `GET /api/health` — Status da aplicação e contagem de registros no SQLite
- `GET /api/courses` — Lista os 4 cursos (`DMAT`, `LM`, `LF`, `LC`) com filtro opcional `?code=`
- `GET /api/books` — Catálogo da Editora 314
- `POST /api/diagnostico` | `GET /api/diagnostico` — Executa o Motor de Cálculo de Trilha e persiste no SQLite
- `GET /api/reports/trilha?format=json|csv` — Exportação de relatórios de diagnóstico (JSON ou CSV com BOM UTF-8)
- `POST /api/support` | `GET /api/support` — Registro e listagem de tickets de suporte
- `POST /api/auth/login` | `POST /api/auth/logout` | `GET /api/auth/session` — Autenticação e sessão
- `GET /api/progress` | `POST /api/progress` — Progresso de módulos na Área do Aluno

## Comandos de Execução
- `npm install` — Instalar dependências
- `npm run dev` — Servidor de desenvolvimento (`http://localhost:3000`)
- `npm run build` — Build de produção
- `npm run start` — Servidor de produção
- `npm run typecheck` — Verificação TypeScript (`tsc --noEmit`)
- `npm test` — Testes unitários (`node --test tests/*.test.ts`)

## Validação Realizada
- `npm run typecheck` — 0 erros
- `npm test` — 5/5 testes unitários passando (`tests/calculator.test.ts`)
- `npm run build` — 20/20 rotas compiladas com sucesso
- Smoke test E2E em servidor de produção (`next start -p 3014`) validando todas as páginas (`200 OK`) e todos os endpoints de API + SQLite.
