# Work Order — Issue #28 work-led surface rebuild

- Work Order ID: `WO-2026-09-22-issue-28-work-led-surface`
- Status: active
- Created: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `feat/issue-28-work-led-surface`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/28
- Current Work: `CW-39`
- Parent Work ID: `CW-38`
- Operating Route: Riley Morgan / `ai-orchestrator` → UX → UI → Frontend Systems Engineer

## Objective

Rebuild the portfolio around approved real work and system structure, using `DESIGN.md`, semantic tokens, reusable components, typed content boundaries, and harness states.

## Baseline

Stacked on Issue #3 head `4775bdd`, containing the approved profile plus Multi Product Integrations and Design Systems content.

## Scope

- Replace generic project cards with content-driven project previews.
- Prototype client-protective artifact and deferred-media states.
- Give the two approved projects distinct visual grammar through reusable primitives.
- Keep the shared typed case-study information architecture.
- Update harness states and `DESIGN.md`.

## Constraints

- No fabricated screenshots, stock imagery, or unreviewed source media.
- Preserve accessibility, responsive, reduced-motion, focus, and publication boundaries.
- Reuse the existing orange/neutral/focus/motion/shell tokens unless a repeated semantic need justifies a documented token.
- Project variation belongs in reusable patterns and presentation data, not route-specific styling.
- Production publication remains separately gated.

## First slice

1. Add reusable `ProjectPreview`.
2. Render Multi Product Integrations as a content-derived workflow/system topology.
3. Render Design Systems as a content-derived foundations/pattern matrix.
4. Add an artifact surface with explicit deferred/redacted states.
5. Exercise the patterns in the harness before broad case-study-detail changes.

## Verification

Run the narrowest checks while iterating and the repository verification suite before completion. Confirm no draft content or unreviewed media becomes public.

## Next action

Prototype the shared project-preview and artifact patterns in the harness, then use them on Home and Work.
