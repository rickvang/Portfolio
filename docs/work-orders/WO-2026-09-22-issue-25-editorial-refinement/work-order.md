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

Phase 1 — inspect current implementation surfaces and lock the token/composition/chapter changes.

## Validation required

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- Vercel preview reaches READY before merge
- No unresolved blocking review threads

## Completion boundary

Issue #25 is complete when the visual/editorial refinement, chapter pattern, motion, harness, tests, and documentation land on `main` with all applicable gates green, while unapproved content remains review-gated and no production deployment is intentionally initiated beyond normal repository preview/build behavior.

## Next action

Inspect the homepage, shared case-study template/data, global CSS, harness, fixtures, and browser tests; then implement the smallest coherent refinement stack.
