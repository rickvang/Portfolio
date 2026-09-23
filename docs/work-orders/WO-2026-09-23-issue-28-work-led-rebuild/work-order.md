# Work Order — Issue #28 work-led surface rebuild

- Work Order ID: WO-2026-09-23-issue-28-work-led-rebuild
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-28-work-led-rebuild
- GitHub issue: https://github.com/rickvang/Portfolio/issues/28
- Prior prototype: https://github.com/rickvang/Portfolio/pull/29 (merged)
- Current Work: CW-39
- Current Work URL: https://app.notion.com/p/3e3cd82535ff81199040fc1bbd07f5a5
- Requester: Rick
- Owner: Riley Morgan / ai-orchestrator
- Operating Route: Riley Morgan / ai-orchestrator → Portfolio implementation and design verification
- Request mode: scoped implementation and issue completion
- Target repository: rickvang/Portfolio

## Objective

Complete the remaining Issue #28 acceptance scope on top of the merged prototype. Preserve the source-backed project structures and make the public Home, Work, and case-study detail surfaces communicate real work with clear, differentiated, reusable presentations. Finish the design contract and deterministic harness coverage without inventing artifacts or outcomes.

## Scope

- Audit current Home, Work, shared case-study chapter rendering, project presentation components, harness states, and DESIGN.md against Issue #28.
- Improve only the remaining hierarchy, composition, traceability, or documentation gaps identified by that audit.
- Keep integrations and design-systems presentation grammars distinct while reusing stable primitives.
- Keep chapter information architecture shared while allowing content-appropriate visual composition.
- Update deterministic fixtures/tests and DESIGN.md for any material implementation changes.
- Run the repository's required verification and browser checks; create and merge a scoped PR only after the current GitHub gates pass.

## Non-goals and constraints

- Do not redo the already-merged PR #29 prototype.
- Do not reuse old Framer media unless a human classifies each asset for client-IP, ownership, and disclosure safety. The current implementation has deferred-media fallbacks; keep them until approval exists.
- Do not add generic stock or generated product screenshots, invented project facts, or unsupported outcome metrics.
- Do not publish review-ready content, change external services or production data, or deploy to production.
- Do not use the exposed Vercel bypass credential referenced by the prior CW-39 record.
- Keep the local development harness local-only and preserve semantic tokens, keyboard accessibility, responsive behavior, reduced-motion support, and publication boundaries.

## Authorization boundary

The requester asked to implement Issue #28. Portfolio's standing completion authorization permits scoped file/branch changes, PR creation and scoped review fixes, and merge after fresh completion gates pass. It does not authorize production deployment, external service changes, publication, unrelated issue mutations, or media-rights decisions.

## Evidence and decisions

- Fresh GitHub state: Issue #28 is open; PR #29 is merged at merge commit 8f3894262088cc20c6b58e6036e96736c288d3a6.
- Issue #3 is closed and PR #27 is merged at 0e494c2b55524e5f58fea2dfe712a2d43660a528.
- The current remote main was fetched at fd302c04630f828b213da45f61527cbdd3be0e38 before creating this branch.
- PR #29 already introduced content-derived topology and matrix presentations, shared preview/artifact primitives, detail-page presentation, source tracing, and deferred-media harness states. Inspect the current code before changing those boundaries.
- Issue #28's approved content and current merged components are the evidence base. No authorization or source evidence currently supports reusing the old Framer assets.
- Existing semantic color, focus, motion, responsive, and publication contracts remain authoritative.

## Audit result

- Home and Work already render approved project language, including a systems topology for Multi Product Integrations and a foundations/governance matrix for Design Systems. The detail pages retain the shared chapter information architecture, source-section traces, and client-IP note.
- The baseline desktop and 390×844 mobile captures show a concrete project title and source-backed summary in Home's first viewport. On mobile, a repeated cross-project explanation then pushes the actual topology farther down; the shared explanation already appears on Work and can be removed from Home.
- Home and Work repeat generic eyebrow labels immediately above headings. Remove labels that add no status or meaning while retaining the source-backed availability status.
- The topology capability list uses a 2px orange left stripe and the matrix rows use sub-12px rounded surfaces. Simplify those details in line with the work-led accent discipline and component craft floor.
- DESIGN.md already documents evidence-backed topology/matrix choices and media boundaries, but does not consolidate the specific work-led anti-patterns from Issue #28. Add concrete rules for counts vs evidence, repeated throughlines, unsupported relationships, generic card-only previews, and deferred source media.
- The issue's source-media comment identifies 8 Multi Product Integrations assets and 9 Design Systems media positions plus a cross-project card, but supplies no asset-level approval, useful alt text, or captions. Classify all original media as omitted/deferred for this implementation; reuse none. The content-derived map and matrix remain the rich, evidence-backed visual artifacts.
- Existing harness coverage includes both approved content-derived patterns, text-only and dense synthetic fixtures, deferred and redacted media states, focus, responsive behavior, and reduced motion. Add a mobile first-viewport assertion for the actual project pattern.

## Completed implementation

Phase 2 — complete. Home now moves from concise positioning to the featured project and its topology without repeating the cross-study summary. Redundant Home/Work labels were removed, the project list uses quiet neutral separators and token-derived radii, and DESIGN.md now names the work-led patterns and anti-patterns.

The targeted 390×844 Playwright check passes. The rendered first viewport now includes the project name, evidence-based pattern explanation, and the first part of the content-derived topology. Its screenshot was inspected; the page has no horizontal overflow.

## Current phase and next action

Phase 3 — complete. `pnpm verify` passed (lint, typecheck, 32 unit tests, and production build). `pnpm test:e2e` passed all 38 browser checks across desktop, tablet, and mobile projects. The first full browser run exposed one stale assertion for a removed generic eyebrow; the assertion now targets the actual project evidence, and the full suite passes.

The independent visual finish review found that the 390×844 first viewport cut off before showing any topology capabilities. I tightened the mobile-only spacing and shortened the explanatory copy without removing the note that the topology is not a workflow sequence. The updated screenshot now shows the framework, its “Includes” relationship, the full first capability, and the start of the second. An assertion checks that the first capability is in view, and the targeted check, full verification, and all 38 browser checks pass. The independent reviewer confirmed the finding is resolved and reported no new material visual issues.

Phase 4 — complete. PR #33 is open, ready for review, and mergeable. The implementation commit is `7f14e9277d1e2010811ecef844b2266aa23cd6e8`; subsequent branch commits only update this Work Order. GitHub Actions CI run 85 passed all verification and Supabase schema jobs, and the Vercel preview status succeeded. Cursor's approval automation approved the implementation; its note says Bugbot was not present, so that automated-review signal was skipped. No unresolved inline review threads were returned.

The Vercel deployment is a PR preview only. The PR remains unmerged because Portfolio's production-deployment gate requires explicit authorization.

Phase 5 — waiting for deployment authorization before merge.

Next action: if production deployment is authorized, refresh the PR head/base, CI and preview status, review submissions, unresolved threads, mergeability, and linked-issue effect; merge only if the gates still pass.

## Validation

- Baseline desktop and post-change 390×844 mobile Home captures were inspected. The targeted mobile Playwright check proves the project title, evidence-based pattern explanation, and topology hub heading fit the first viewport without horizontal overflow.
- `pnpm verify` passed: lint, TypeScript, all 32 unit tests, and the production build.
- `pnpm test:e2e` passed: all 38 browser checks across desktop, tablet, and mobile configurations, including responsive, focus, and reduced-motion coverage.
- Final desktop 1440×1000 and mobile 390×844 captures were visually reviewed. The homepage presents the actual project pattern earlier, with no horizontal overflow on mobile.
- The independent review identified the first mobile capture as incomplete because it hid all topology capabilities. The revised capture and regression assertion now bring the first capability into the viewport while retaining the source qualification about sequence.
- The E2E runner owns and cleans up its temporary development server; no persistent test port was left running.
- The Impeccable engine detector could not run because its binary download is blocked by the current network policy. Issue #28 and DESIGN.md provide the design direction; review the rendered output and record this tooling limit rather than inventing a replacement direction.
- Independent reviewer confirmed the focused mobile fix and reported no new material visual issues.
- PR #33 is open and mergeable. GitHub Actions CI run 85 and the Vercel preview status succeeded; the automated Cursor review approved the implementation, with Bugbot skipped because it was unavailable. No unresolved inline review threads were returned.
- No production merge or deployment occurred; explicit authorization is still required.
- Refresh PR head/base, checks, reviews, unresolved threads, mergeability, and linked-issue effects before final close-out.

## Completion boundary

The Issue #28 scope is implemented and documented; harness states exist for applicable rich, deferred, dense, redacted, text-first, responsive, focus, and reduced-motion cases; applicable checks pass or limitations are explicit; PR #33 is open and its current checks/review signals pass apart from the unavailable Bugbot signal. The issue remains open until the PR merges. Merge would deploy to production and remains gated on explicit authorization; source-media reuse remains deferred pending human approval.
