# Architecture

## Current shape

The application is a small Next.js App Router site with server-rendered pages and focused client components for interactive states. The first vertical slice is a portfolio home page with work, about, and contact sections.

```text
src/app/                 routes, metadata, error boundaries, API routes
src/components/          reusable UI and interactive client components
src/lib/                 fixtures, environment validation, logging, and adapters
src/lib/supabase/        typed browser/server clients and database contract
fixtures/                deterministic source data for local development
scripts/                 seed and reset helpers for local fixture state
supabase/                local Supabase config, migrations, and database seed
tests/                   Vitest unit tests and Playwright browser tests
```

## Boundaries

- `fixtures/seed.json` is the current local content source for the foundation and the deterministic posts preview.
- `src/lib/fixtures.ts` provides typed access to deterministic fixture data.
- `src/components/` owns presentation and interaction; it should not reach directly into external services.
- External services must be introduced behind a typed adapter and mocked in tests.
- Supabase access is isolated behind `src/lib/supabase/` and `src/lib/posts.ts`; components should not create raw clients.
- `supabase/migrations/` is the schema source of truth. Remote changes must be applied through migration files, not ad hoc dashboard edits.
- Every exposed table must enable RLS and define policies for each intended role.
- `/api/health` is a lightweight operational probe and must not expose secrets or private content.
- `/dev/harness` is guarded by the production environment check and exists only to exercise behavior locally.
- Harness states are addressable with `?state=<state>` and expose `data-harness-state` for stable browser assertions.
- GitHub Actions validates the local Supabase migration, seed, RLS, and pgTAP database-test boundary in an ephemeral Docker-backed job; remote project credentials are intentionally separate from ordinary CI.

## Verification surface

The project intentionally exposes the same checks an agent or developer needs to use:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Use `pnpm seed` and `pnpm reset` when a local JSON fixture file needs to be created or removed. Use `pnpm supabase:start` and `pnpm supabase:reset` only when Docker is available. The app can run without Supabase credentials, but the posts adapter requires the two public Supabase environment variables.
