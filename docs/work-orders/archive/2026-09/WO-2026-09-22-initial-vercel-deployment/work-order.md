# Work Order — Initial Vercel deployment

- Work Order ID: `WO-2026-09-22-initial-vercel-deployment`
- Status: complete
- Created: 2026-09-22
- Completed: 2026-09-22
- Repository: `rickvang/Portfolio`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/23
- Current Work: `CW-36`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff814cbd74ca0afaecd7af
- Vercel project: `portfolio`
- Vercel project ID: `prj_TpNCsnCbMRjCS4Sn6FLdnR7BCqM2`
- Vercel team ID: `team_aDqth5R7Xpr6XKtxgfpfvTZt`
- Production deployment: `dpl_2M6TM9pPDDqsmM1frnC1fPH1f81p`
- Production commit: `af1432705076e0038213240662dfee04b6a99f67`
- Production alias: https://portfolio-acme-dd4d.vercel.app
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → Vercel deployment/CI-CD

## Objective

Trigger and verify the first production deployment of the current Portfolio `main` branch to the newly created Vercel `portfolio` project.

## Authorization

The requester explicitly authorized deployment in chat on 2026-09-22.

## Outcome

The first Vercel attempts exposed two platform-specific deployment problems before production:

1. Next.js middleware packaging failed on the Edge path. The routing middleware now lives at the documented project root and uses the stable Node.js middleware runtime for the narrow `/admin/:path*` and `/dev/harness/:path*` matcher.
2. Vercel had blank optional values for `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `src/lib/env.ts` now normalizes blank optional values to unset, preserves failures for invalid non-empty URLs, and uses Vercel system URLs as the site-url fallback.

A protected diagnostic preview captured the actual Next.js failure without exposing environment values. The final preview for PR #22 reached `READY`, GitHub CI passed lint, typecheck, unit tests, Playwright, build, visual-capture upload, and local Supabase checks, and PR #22 merged to `main`.

Vercel production deployment `dpl_2M6TM9pPDDqsmM1frnC1fPH1f81p` reached `READY` for commit `af1432705076e0038213240662dfee04b6a99f67`. The production homepage returned HTTP 200, Vercel reported no runtime error clusters in the post-deploy window, and no error/fatal runtime logs were found for the deployment.

## Current runtime boundary

Supabase project values remain unset/blank in Vercel, so the public site is intentionally operating through the repository's fixture-mode fallback. No Supabase schema mutation or draft-content publication occurred. Connecting production Supabase values is a separate follow-up because it changes the live data boundary.

## Non-goals preserved

- No draft case-study or article publication.
- No Supabase schema mutation.
- No new paid service.
- No custom-domain reassignment.

## Completion boundary

The authorized first Vercel production deployment is complete and healthy at the Vercel production alias. Any custom-domain cutover, production Supabase configuration, or draft-content publication should be handled as a separately authorized workstream.

## Next action

None for this Work Order.
