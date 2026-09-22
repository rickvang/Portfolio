# Work Order — Portfolio redesign issue #6

- Work Order ID: `WO-2026-09-22-portfolio-redesign-issue-6`
- Status: active
- Created: 2026-09-22
- Last updated: 2026-09-22
- Repository: `rickvang/Portfolio`
- Integration branch: `feat/issue-6-integration-current-main`
- Issue: https://github.com/rickvang/Portfolio/issues/6
- Integration PR: https://github.com/rickvang/Portfolio/pull/19
- Phase 7 PR: https://github.com/rickvang/Portfolio/pull/16
- Current Work: `CW-34`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff8108a4c9f3b18b1d2c43
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → UX/IA → UI/interaction → frontend engineering → editorial/verification/hardening
- Request mode: implementation

## Objective

Implement Portfolio issue #6 as a staged redesign while keeping imported/new editorial content draft-first, preserving internal/admin boundaries, using the production components in deterministic harnesses, and stopping before deployment unless deployment is explicitly authorized.

## Scope completed

- Phase 0: redesign brief, audiences, visitor jobs, routes, navigation and content hierarchy.
- Phase 1: typed route and case-study contracts with source/evidence and approval gates.
- Phase 2: persistent desktop rail, accessible mobile drawer, restored semantic orange system.
- Phase 3: CSS-first cinematic motion contract with interruption and reduced-motion behavior.
- Phase 4: shared case-study renderer, approved-only public work routes, local draft review.
- Phase 5: source-backed AI Systems and UI Design Practices case-study drafts plus persona-led design article draft.
- Phase 6: specialized production-component harness routes, responsive/accessibility checks, deterministic visual review captures.
- Phase 7: Supabase session refresh, dual-contrast focus ring, Notes active-state assertion, no-JS-safe destructive confirmation, public harness-link exclusion, and health/readiness semantics.
- Integration: reconciled current `main` governance/Work Order commit with the redesign head through a two-parent merge commit; both DECISIONS entries are preserved.

## Publication and deployment boundaries

- Imported and authored case studies remain `draft`; no case study is approved for public rendering.
- The persona-led design article remains a typed editorial draft and is not connected to the public posts adapter.
- No Supabase schema or hosted-project mutation is part of this work.
- No paid service or external integration is added.
- Issue #6 explicitly states that deployment does not occur without explicit approval.
- Because merging the integration PR may trigger connected hosting automation, do not merge PR #19 until the requester explicitly authorizes the deployment boundary.

## Review and validation

Validated on the stacked phase branches before integration:

- lint
- TypeScript typecheck
- unit tests
- Playwright desktop/mobile/tablet journeys
- deterministic visual capture generation/upload
- Next.js production build
- local Supabase start/migrations/seed/lint/database tests/RLS smoke verification

Phase 7 automated review found one P1 issue: JavaScript-only destructive confirmation. It was corrected by adding a required native confirmation checkbox plus independent server-side validation before auth/deletion. The review thread is resolved.

Current integration CI must be refreshed from PR #19 before any consequential next step.

## Current phase

Integration-ready, verification in progress.

## Blocker / authorization boundary

Deployment authorization has not been explicitly granted. Treat that as the merge boundary even if repository merge checks pass.

## Next action

Refresh PR #19 CI/review/mergeability and Current Work. If all implementation gates pass, leave the integration PR ready for explicit deployment/merge authorization rather than merging automatically.
