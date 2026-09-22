# Work Order — Initial Vercel deployment

- Work Order ID: `WO-2026-09-22-initial-vercel-deployment`
- Status: active
- Created: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `ops/initial-vercel-deployment`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/23
- Current Work: `CW-36`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff814cbd74ca0afaecd7af
- Vercel project: `portfolio`
- Vercel project ID: `prj_TpNCsnCbMRjCS4Sn6FLdnR7BCqM2`
- Vercel team ID: `team_aDqth5R7Xpr6XKtxgfpfvTZt`
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → Vercel deployment/CI-CD

## Objective

Trigger and verify the first production deployment of the current Portfolio `main` branch to the newly created Vercel `portfolio` project.

## Authorization

The requester explicitly authorized deployment in chat on 2026-09-22.

## Scope

- Use the normal repository PR/CI path so the production deployment is triggered from an auditable `main` push.
- Verify Vercel creates a deployment for the project.
- Inspect build status and build errors if any.
- Verify the deployed site and runtime health when a deployment URL becomes available.

## Non-goals

- No draft case-study or article publication.
- No Supabase schema mutation.
- No new paid service or unrelated code change.
- No domain reassignment unless separately requested.

## Current state

The Git integration is confirmed. The first preview build for commit `0be3cc2` failed on Vercel with `edge_invalid_api` while the repository CI build passed. The failure matches the known Edge-runtime static-analysis limitation in the pinned Supabase client path. The deployment branch now sets Next.js 15.5 middleware to the stable `nodejs` runtime for the narrow `/admin` and `/dev/harness` matcher, and Vercel is rebuilding commit `64db9eb`.

## Next action

Merge this Work Order through the normal green CI gate, then inspect the Vercel project for the resulting production deployment and verify build/runtime health.
