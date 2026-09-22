# Architecture

## Current shape

The application is a small Next.js App Router site with server-rendered pages and focused client components for interactive states. Public portfolio routes share one route-group layout and persistent navigation shell, while admin, API, and development-harness surfaces remain outside that public frame.

```text
src/app/(public)/        public portfolio routes sharing the persistent site shell
src/app/                 root metadata plus admin, API, harness, and global boundaries
src/components/          reusable UI and interactive client components
src/lib/                 fixtures, content contracts, route contracts, logging, and adapters
src/lib/supabase/        typed browser/server clients and database contract
content/                 imported sources plus source-backed draft editorial content, separate from presentation
fixtures/                deterministic source data for local development
scripts/                 seed and reset helpers for local fixture state
supabase/                local Supabase config, migrations, and database seed
tests/                   Vitest unit tests and Playwright browser tests
```

## Boundaries

- `fixtures/seed.json` is the current local content source for the foundation and the deterministic posts preview.
- `src/lib/fixtures.ts` provides typed access to deterministic fixture data.
- `content/imports/rickvang.com.json` is a draft source capture; it is never a publication signal by itself.
- `content/drafts/case-studies.json` contains source-backed authored case-study drafts; `src/lib/case-studies.ts` validates them through the shared schema and requires the authored source set to remain draft.
- `content/drafts/persona-led-design.json` is a source-backed article draft parsed by `src/lib/editorial-drafts.ts`; it is intentionally separate from the public/Supabase posts adapter.
- `src/lib/case-studies.ts` adapts case-study sources into the shared typed contract, validates section order and evidence references, and exposes explicit approval filtering plus approved-by-slug lookup.
- `src/lib/public-routes.ts` is the canonical public route-shape contract used by navigation and public-route implementation.
- `src/app/(public)/layout.tsx` is the public routing boundary. It applies `SiteShell` without wrapping `/admin`, `/api`, or `/dev/harness`.
- `src/components/site-shell.tsx` owns the persistent desktop rail and accessible mobile drawer. `SiteShell` supplies the live pathname; `SiteShellFrame` accepts an explicit pathname/initial drawer state so the local harness can exercise the exact production frame without duplicating it.
- `src/components/case-study-template.tsx` is the single case-study detail renderer. Public routes use public mode only after approval filtering; `/dev/harness` may use review mode for draft provenance/evidence inspection.
- `/work` and `/work/[slug]` are publication boundaries: draft case studies must resolve to the empty index state or 404 rather than render publicly.
- `src/components/` owns presentation and interaction; it should not reach directly into external services.
- External services must be introduced behind a typed adapter and mocked in tests.
- Supabase access is isolated behind `src/lib/supabase/` and `src/lib/posts.ts`; components should not create raw clients.
- `supabase/migrations/` is the schema source of truth. Remote changes must be applied through migration files, not ad hoc dashboard edits.
- Every exposed table must enable RLS and define policies for each intended role.
- `/api/health` is a lightweight operational probe and must not expose secrets or private content. It returns HTTP success for process liveness, while its body distinguishes `ready` from `degraded` dependency readiness so local fixture-mode startup checks do not deadlock.
- `middleware.ts` combines two request boundaries: production rejection for `/dev/harness/:path*`, and request-scoped Supabase SSR session refresh for `/admin/:path*` when configuration exists.
- `/dev/harness` is guarded by the production environment check and exists only to exercise behavior locally.
- Core component states are addressable with `/dev/harness?state=<state>`. `/dev/harness/shell` adds deterministic public-shell route/drawer state, and `/dev/harness/case-study` adds deterministic draft case-study rendering; all use production components and all remain local-only.
- Harness roots expose stable state/test boundaries only where semantic locators are insufficient.
- GitHub Actions validates the local Supabase migration, seed, RLS, and pgTAP database-test boundary in an ephemeral Docker-backed job; remote project credentials are intentionally separate from ordinary CI.
- The browser suite writes four deterministic visual verification PNGs under `test-results/visual-snapshots/`; CI uploads them as a short-lived review artifact even if later verification fails.

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
