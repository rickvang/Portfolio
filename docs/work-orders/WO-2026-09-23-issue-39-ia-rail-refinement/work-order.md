# Work Order — Issue #39 IA + persistent rail refinement

- Work Order ID: WO-2026-09-23-issue-39-ia-rail-refinement
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-39-ia-rail-refinement
- GitHub issue: https://github.com/rickvang/Portfolio/issues/39
- Current Work: CW-55
- Current Work URL: https://app.notion.com/3e4cd82535ff814f98aef38ddd564f6b
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → SkillRepo aesthetic-reasoning → Layout Lab promote/validate → Impeccable refinement → Portfolio implementation
- Request mode: scoped implementation and completion

## Objective

Refine the merged Personal Practice / Working Archive pilot after rendered review. Restore a lighter persistent rail, remove serif display typography, simplify Home information architecture, and prevent deterministic fixture content from presenting as authored public Notes content.

## Accepted evidence

- User rendered-review feedback prefers the persistent left rail, rejects the serif display voice, and identifies Notes IA as confusing.
- SkillRepo `aesthetic-reasoning` on current `main` supplies the qualitative critique/routing method.
- Persona-Library Layout Lab applies in promote/validate mode because the user has already selected persistent rail + simplified IA and authorized implementation.
- SkillRepo PR #20 is draft and non-canonical; its color/saturation pilot is excluded from this implementation.
- Portfolio Issue #39 is the implementation plan.
- Portfolio `AGENTS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, and `DESIGN.md` remain authoritative.

## Material decisions

- Desktop pilot routes regain a persistent left rail, but with a light/warm treatment rather than the prior dominant charcoal frame.
- Inter becomes the sole pilot typeface; hierarchy comes from weight, size, rhythm, and composition rather than a display serif.
- Home priority becomes Intro → Selected Work → How I work → optional Notes → About/Contact.
- Notes is omitted from Home when no genuine public posts exist.
- Deterministic fixture posts remain harness/test data and must not appear on public routes when the real content boundary is unavailable.
- Multi Product Integrations keeps its evidence-first case-study structure; this pass changes shell/type presentation only.

## Constraints

- Do not perform custom-domain cutover.
- Do not consume draft SkillRepo #20 as canonical guidance.
- Do not invent authored notes, project metrics, or media.
- Preserve public-route evidence and publication boundaries.
- Keep mobile navigation accessible and touch-safe.
- Keep non-pilot routes unchanged except where necessary to prevent fixture leakage.

## Current phase

Implementation complete on the branch. The pilot now uses a light persistent rail and Inter-only typography; Home is simplified to Intro → Selected Work → How I work → optional Notes → About; deterministic post fixtures no longer fall through the public publication adapter; public Notes and browser/unit contracts are updated. Next: open the scoped PR and verify through GitHub CI/Vercel preview.

## Completion boundary

Complete when Issue #39 behavior is implemented, relevant docs/tests are updated, repository CI and Vercel preview pass on the final PR head, review blockers are resolved, and the authorized scoped PR is merged.