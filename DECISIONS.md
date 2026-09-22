# Decisions

## 2026-09-21 — Start with a single Next.js application

The repository was empty, so the first implementation uses a single Next.js App Router application with TypeScript, pnpm, CSS variables, Vitest, Playwright, and Zod. A monorepo and external integrations beyond the database are deferred until the product needs them.

## 2026-09-21 — Treat the harness as a first-class feature

The local `/dev/harness` route is part of the development contract. It makes loading, empty, error, success, disabled, and long-content states inspectable before production integrations exist. It is guarded from production at the route boundary.

## 2026-09-21 — Keep the first content set explicitly provisional

The initial copy and project cards are labeled fixture or placeholder content. No portfolio claims or external project details are invented before the content model is agreed.

## 2026-09-21 — Add Supabase as the content persistence boundary

Supabase is included now because posts are a foreseeable product capability. The first migration creates only the `posts` table and its RLS policies; media storage and remote project linking remain separate decisions. The app can still run without Supabase credentials while the local schema and typed adapter are prepared.

## 2026-09-21 — Make harness states direct-linkable

Fixture states are accepted through `/dev/harness?state=<state>` and rendered with a stable state attribute. This keeps browser tests and future Codex sessions independent from the order of prior clicks while preserving the visible state controls for exploratory work.

## 2026-09-21 — Verify Supabase locally in GitHub Actions

The CI workflow gets a dedicated Ubuntu job that runs the local Docker-backed Supabase stack, applies migrations and seed data, lints the schema, runs pgTAP database tests, and smoke-tests the posts table with RLS enabled. Hosted Supabase credentials are intentionally excluded until a remote project and deployment workflow are explicitly approved.

## 2026-09-22 — Keep authoring local-first

The first author workflow is implemented as server actions and protected routes over the typed Supabase boundary. It can be developed and tested without a hosted project; the public site falls back to deterministic fixtures when public Supabase configuration is absent. Hosted authentication, remote migration deployment, and production publishing remain gated until the project is explicitly linked.


## 2026-09-22 — Keep cinematic motion CSS-first and interruption-safe

The redesign motion contract uses semantic CSS duration/easing tokens and small presentational transforms rather than adding a motion library. Public chapter entry, drawer entry, rail-state changes, hover/focus feedback, and form feedback are expressible with CSS and do not justify a new dependency.

Navigation, Escape, explicit close, browser history, and focus recovery are authoritative. Motion is canceled or superseded when those states change; animations are not queued and no exit animation may delay drawer close or route focus. Reduced-motion users receive final-state rendering without chapter, drawer, backdrop, or feedback animation.

Revisit a motion dependency only if a later approved interaction requires coordinated stateful choreography that cannot remain accessible, interruptible, progressively enhanced, and maintainable with the platform primitives already in use.

## 2026-09-22 — Use Riley and Current Work as the durable orchestration layer

Portfolio remains authoritative for its code, architecture, design, tests, data boundaries, and repository-specific implementation decisions. For every substantial Portfolio workstream, Riley Morgan / `ai-orchestrator` is the default durable orchestration owner unless the requester establishes another boundary. Current Work is the concise cross-agent index, repo-local Work Orders carry detailed execution and recovery state, and GitHub, Vercel, Supabase, and other live systems remain authoritative for volatile operational facts. The selected specialist, Persona, Skill, Playbook, Tool path, or runtime may execute directly without an artificial Riley hop. Shared Persona Workspace repositories provide reusable guidance but do not replace Portfolio-local implementation truth or grant cross-repository mutation permission.
