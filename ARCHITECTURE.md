# Architecture

## Current shape

The application is a small Next.js App Router site with server-rendered pages and focused client components for interactive states. Public portfolio routes share one route-group layout and persistent navigation shell, while admin, API, and development-harness surfaces remain outside that public frame.

```text
src/app/(public)/        public portfolio routes sharing the persistent site shell
src/app/                 root metadata plus admin, API, harness, and global boundaries
src/components/          reusable UI and interactive client components
src/lib/                 fixtures, content contracts, route contracts, logging, and adapters
src/lib/supabase/        typed browser/server clients and database contract
content/                 imported and authored content sources kept separate from presentation
fixtures/                deterministic source data for local development
scripts/                 seed and reset helpers for local fixture state
supabase/                local Supabase config, migrations, and database seed
tests/                   Vitest unit tests and Playwright browser tests
```

## Boundaries

- `fixtures/seed.json` is the current local content source for the foundation and the deterministic posts preview.
- `src/lib/fixtures.ts` provides typed access to deterministic fixture data.
- `content/imports/rickvang.com.json` is a draft source capture; it is never a publication signal by itself.
- `src/lib/case-studies.ts` adapts case-study sources into the shared typed contract, validates section order and evidence references, and exposes explicit approval filtering plus approved-by-slug lookup.
- `src/lib/public-routes.ts` is the canonical public route-shape contract used by navigation and public-route implementation.
- `src/app/(public)/layout.tsx` is the public routing boundary. It applies `SiteShell` without wrapping `/admin`, `/api`, or `/dev/harness`.
- `src/components/site-shell.tsx` owns the persistent desktop rail and accessible mobile drawer; route pages should not duplicate primary navigation markup.
- `src/components/case-study-template.tsx` is the single case-study detail renderer. Public routes use public mode only after approval filtering; `/dev/harness` may use review mode for draft provenance/evidence inspection.
- `/work` and `/work/[slug]` are publication boundaries: draft case studies must resolve to the empty index state or 404 rather than render publicly.
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
