# Work Order — Issue #36 Personal Practice / Working Archive pilot

- Work Order ID: WO-2026-09-23-issue-36-personal-practice-pilot
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-36-personal-practice-pilot
- GitHub issue: https://github.com/rickvang/Portfolio/issues/36
- Current Work: CW-54
- Current Work URL: https://app.notion.com/p/3e4cd82535ff81c68a37db0865eb136c
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT operating under Riley Morgan / ai-orchestrator continuity
- Operating Route: Riley Morgan / ai-orchestrator → Impeccable approved spec → direct GitHub implementation → GitHub CI / Vercel preview verification
- Request mode: scoped implementation and completion
- Target repository: rickvang/Portfolio

## Objective

Implement the approved Personal Practice / Working Archive direction as an isolated public pilot on Home and Multi Product Integrations. Replace the fixed charcoal public rail and Arial-led public presentation with a quiet horizontal shell, editorial/humanist typography, index-led work presentation, and source-backed case-study storytelling while preserving Portfolio data, evidence, accessibility, publication, and harness boundaries.

## Scope

- Add the approved Fraunces + Inter public typography through `next/font`.
- Replace the public fixed rail with a quiet horizontal desktop header and compact accessible mobile navigation.
- Rebuild Home around the approved authored statement, Working Index selected-work treatment, real published notes where available, source-backed practice framing, and concise About/contact paths.
- Restructure the Multi Product Integrations public case study around system inherited, difficulty, responsibility, ecosystem model, pivotal decisions, resulting system, evidence/outcomes, and reflection using existing approved source material only.
- Preserve evidence-backed presentation resolution, confidential/deferred artifact states, publication gating, keyboard/focus behavior, reduced motion, and local harness isolation.
- Update DESIGN.md and deterministic tests/harness contracts where the public presentation boundary changes.

## Non-goals and constraints

- Do not extend the redesign to every public route in this pilot.
- Do not change CMS/database architecture unless a concrete blocking need appears.
- Do not invent note content, AI projects, outcome metrics, client artifacts, or project names.
- Do not reuse old Framer media without asset-level approval.
- Do not use generated/staged imagery as evidence of Rick's work.
- Do not rewrite admin/API/private surfaces merely to match the new public typography.
- Keep the repository's warm-neutral semantic color tokens where they remain valid.
- Keep motion CSS-first, short, interruptible, and reduced-motion safe.

## Authorization boundary

The requester said “go ahead” after approving the implementation plan for Issue #36. Portfolio's standing completion authorization permits scoped branch/file changes, PR creation/updates, review corrections, and merge into the default branch after fresh completion gates pass. It does not authorize unrelated repository changes, production data mutation, external-service configuration, purchases, or unscoped publication decisions.

## Accepted evidence and authoritative sources

- Portfolio Issue #36 is the implementation plan.
- CW-52 contains the approved design specification and decision history.
- Portfolio `AGENTS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, and `DESIGN.md` remain authoritative for local implementation boundaries.
- Current approved case-study data and experience-profile resolution remain the source of truth for public project claims.
- Remote `main` was refreshed at commit `47aca8bdf7d66e6e08d7435594badfe2ecedcee8` before branch creation.
- No open Portfolio pull requests existed at start.

## Material decisions

- Public pilot typography: Fraunces for authored/display headings and Inter for body/UI. DM Mono remains optional and should not be added unless it materially improves metadata without making the site feel technical.
- Public pilot shell: horizontal header on desktop; compact accessible navigation on narrow viewports. The fixed charcoal rail is retired for the pilot.
- Narrow Home uses the Working Index structure as the authoritative responsive composition rather than stacked desktop cards.
- Authentic/source-backed work artifacts and text presentations remain authoritative; unavailable client media stays deferred.
- The implementation may reuse existing semantic presentation components where they preserve evidence contracts, but should not preserve the previous visual treatment merely because it exists.

## Current phase

Phase 1–3 implementation is complete on the branch: the pilot font variables, route-scoped horizontal shell, Working Index Home, source-backed Multi Product Integrations editorial renderer, browser contracts, and DESIGN.md update are in place. Local execution remains unavailable because the runtime cannot resolve github.com. Next: inspect the branch diff, open the scoped PR, and use GitHub CI/Vercel preview as the verification path.

## Runtime limitation / fallback

The current container cannot resolve `github.com`, so local clone/install/test execution is unavailable. GitHub mutations will use the connected GitHub integration. Verification will use repository CI and preview checks. This limitation must remain explicit; do not claim local `pnpm verify` or `pnpm test:e2e` execution.

## Completion boundary

The work is complete when:
- Home and Multi Product Integrations implement the approved pilot direction using source-backed content;
- DESIGN.md and relevant tests/contracts are current;
- a scoped PR exists;
- GitHub CI and applicable preview checks pass on the final PR head;
- fresh merge preflight shows no blockers;
- the authorized PR is merged;
- Issue #36 closes through the existing PR closing keyword or is otherwise reconciled according to the repository contract;
- this Work Order is archived and CW-54 is marked Done / Reference.

## Next action

Inspect the complete branch diff, open the Issue #36 PR, then evaluate CI, preview status, and any review findings before merge.