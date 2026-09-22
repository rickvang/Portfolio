# Work Order — Issue #25 editorial refinement

- Work Order ID: `WO-2026-09-22-issue-25-editorial-refinement`
- Status: active
- Created: 2026-09-22
- Last updated: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `feat/issue-25-editorial-refinement`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/25
- Current Work: `CW-37`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff81ee964dd64275732757
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → Camille Ortiz / `ui-expert` → Jordan Lee / `ux-senior` → Frontend Systems Engineer
- Request mode: implement and complete issue #25 under the repository's normal standing completion authorization
- Target repository: `rickvang/Portfolio`

## Objective

Refine the issue #6 production portfolio so it recovers more of the authored Option E visual/editorial character without rebuilding the application architecture.

## Scope

- Adopt a warmer charcoal rail treatment as semantic tokens if contrast and focus remain sound.
- Strengthen homepage first-viewport thesis, typographic hierarchy, section composition, and editorial transitions.
- Strengthen the shared case-study experience around a visible chapter model: Context → Personas → Exploration → System → Outcomes.
- Preserve usable missing-section, long-content, empty, and missing-media behavior.
- Make existing CSS-first motion more perceptible while preserving interruption and reduced-motion guarantees.
- Update harness fixtures/routes and Playwright coverage for the refined rail, chapter model, long content, and responsive states.
- Update DESIGN.md with final rail, composition, chapter, and motion guidance.
- Refine the AI Systems, UI Design Practices, and persona-led article records/status metadata without publishing them.

## Non-goals

- No architecture rewrite.
- No replacement of the shared case-study template.
- No new motion library.
- No scroll-jacking, splash intro, autoplay dependency, or motion prerequisite.
- No new external service or paid integration.
- No production deployment.
- No publication of draft/review content without separate explicit authorization.

## Constraints

- Portfolio architecture, routing, harness, accessibility baseline, and data boundaries remain authoritative.
- Semantic design tokens precede scattered component values.
- Orange remains the primary semantic accent.
- Desktop/mobile navigation must remain keyboard-operable and reduced-motion safe.
- Draft content remains unavailable on public routes until separately approved.
- Any missing content section remains absent rather than receiving invented filler.

## Accepted evidence

- GitHub issue #25 acceptance criteria and implementation order.
- Current `DESIGN.md`, `ARCHITECTURE.md`, and `DECISIONS.md` on `main`.
- Persona-Library `dist/portfolio-layout-lab.html`, especially Option E: warm-charcoal rail + visible chapter path.
- Current production implementation from issue #6 / PR #18 and subsequent deployment hardening.

## Material decisions

1. Preserve the current rail + chapter architecture and refine it instead of replacing it.
2. Use Option E's warm charcoal direction as the candidate rail treatment, subject to contrast/focus verification.
3. Keep chapter navigation native and visible; do not introduce scroll interception.
4. Treat editorial publication as a separate authorization boundary even while refining draft content/status.

## Current phase

Phase 5 — implementation and verification complete; waiting for explicit merge/production authorization.

## Implemented changes

- Warm-charcoal Option E rail tokens, numbered navigation, contrast-adjusted small-text rail accent, and rail-specific focus treatment.
- Stronger asymmetric homepage thesis/composition with explicit section numbering and a clearer first-viewport statement.
- Canonical case-study chapter grouping: Context → Personas → Exploration → System → Outcomes, derived from existing typed/evidence-backed sections without invented filler.
- CSS-first staged homepage and chapter entry motion with reduced-motion fallbacks and no scroll interception.
- Explicit `review-ready` lifecycle state for AI Systems, UI Design Practices, and the persona-led article; public adapters still accept only `approved`.
- Updated browser/unit/visual verification for chapter labels, review-ready gating, refined focus, reduced motion, and the five-chapter authored case study.
- Deterministic review captures were inspected for the homepage, mobile drawer, reduced-motion drawer, and AI Systems first viewport; Next.js development chrome was removed from the capture harness so screenshots represent the authored UI cleanly.
- Codex's three P2 review findings were repaired: later chapter-section headings remain labeled, nested card headings are demoted beneath visible section headings, and case-study chapter reduced-motion behavior is explicitly tested.
- DESIGN.md updated with rail, composition, chapter, motion, layout-choice, focus, and publication guidance.

## Validation evidence

- PR: https://github.com/rickvang/Portfolio/pull/26
- Validated implementation head before tracking-only Work Order updates: `0e27668ea822ed95534e552b8cb8e15f96d07281`
- GitHub CI run `35754808409`: lint, typecheck, unit tests, Playwright E2E, visual capture upload, production build, and local Supabase schema checks all passed.
- Vercel preview `dpl_2WamtXRghteHXNRSgvM4fwbRjkkV`: `READY`, no alias error.
- Visual artifact `10706249851`: reviewed; captures are clean and development chrome is excluded.
- Automated review: Cursor approval present; all Codex P2 threads are resolved; no unresolved review threads remain.
- Branch relationship at the last verification: ahead of `main` with no known product/validation blocker.
- The final Work Order checkpoint commits are documentation-only and do not change product behavior; their CI/preview state must still be refreshed before any authorized merge.

## Validation required

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- Vercel preview reaches READY before merge
- No unresolved blocking review threads

## Completion boundary

The implementation packet is complete and verified on PR #26. Issue #25 should close only after PR #26 lands on `main`. Because this repository's Vercel Git integration automatically creates a production deployment from `main`, merging the PR is also a production-state change and remains outside standing implementation authorization until the requester explicitly approves it. Review-ready content must remain unpublished unless separately approved.

## Next action

Wait for explicit requester authorization to merge PR #26 / deploy the resulting `main` commit. After authorization, refresh PR head/base, required checks, review state, unresolved threads, mergeability, and the Vercel preview immediately before merge. Do not change the three review-ready content records to `approved` unless publication is separately authorized.
