# rickvang.com

A maintainable Next.js foundation for Rick Vang's portfolio site.

## Setup

Requirements: Node 22.13+, pnpm 11, and Docker Desktop for the local Supabase stack.

```bash
pnpm install
pnpm seed
pnpm dev
```

Open `http://localhost:3000`. The local development harness is at `http://localhost:3000/dev/harness`.

The app can run without Supabase credentials. Copy `.env.example` to `.env.local` when connecting the posts adapter to a project.

## Supabase

Supabase is wired for future content posts. The initial migration creates a `posts` table with draft, published, and archived states, public-read RLS for published posts, and authenticated author ownership policies. No remote Supabase project is linked yet and no credentials are committed.

```bash
pnpm supabase:start
pnpm supabase:reset
pnpm supabase:types
```

Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` when connecting the app to a Supabase project. Never put a Supabase secret key in a `NEXT_PUBLIC_` variable. Remote schema changes should go through migration files and `pnpm supabase:push` after the project is explicitly linked.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

`pnpm verify` runs lint, type checking, unit tests, and a production build. `pnpm test:e2e` owns a temporary development server, waits for `/api/health`, runs the browser matrix, and cleans up the server afterward so the command is safe for agents and CI on Windows as well as Unix-like hosts.

GitHub Actions also runs a separate `supabase` job on Ubuntu. It starts the local Docker-backed Supabase stack, resets it from committed migrations and seed data, lints the local database, verifies migration state, and smoke-tests the seeded posts table and RLS. This job intentionally uses no hosted Supabase credentials.

## Harness

The harness is deterministic and local-only. It previews the first vertical slice, including the project, public posts, contact, and author-workflow boundaries, and lets you switch among success, loading, empty, error, disabled, and long-content states. Every state is also deep-linkable, for example `/dev/harness?state=error`, which makes it easy for an agent or browser test to start from a known condition. Add a fixture to `fixtures/seed.json`, type it in `src/lib/fixtures.ts`, and expose the state through `src/components/harness-playground.tsx` when extending the matrix.

## Repository guidance

See `AGENTS.md`, `ARCHITECTURE.md`, and `DECISIONS.md` before making structural changes.
