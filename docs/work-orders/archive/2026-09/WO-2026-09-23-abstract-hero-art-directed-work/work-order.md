# Work Order — Abstract hero and art-directed work visuals

- Work Order ID: WO-2026-09-23-abstract-hero-art-directed-work
- Status: complete
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/homepage-design-pass
- GitHub issue: not linked; GitHub CLI configuration is inaccessible in this environment
- Current Work: CW-63 (created for this follow-up pass)
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → Impeccable visual world expansion → Portfolio implementation → browser verification
- Request mode: scoped implementation and completion

## Objective

Replace the restrained hero and selected-work diagrams with a more expressive visual language inspired by fluid fields and breathing halftone imagery, while preserving source-backed project meaning, responsive behavior, and accessibility.

## Scope

- Rework the hero graphic into an abstract pointer-responsive field with fluid motion, breathing particles, and a clear static fallback.
- Rework selected-work visuals into richer art-directed compositions that feel like portfolio imagery rather than explanatory line diagrams.
- Keep each composition tied to a real project concept: integration flow, layered AI state, governed design-system variation, and staged implementation practice.
- Preserve the existing Personal Practice rail, warm palette, Inter typography, semantic work links, responsive layout, keyboard focus, and reduced-motion contract.
- Prefer lightweight canvas/SVG/React-native implementation over adding a runtime dependency or copying reference code.

## Non-goals and constraints

- Do not copy or vendor the linked repositories' implementation or assets.
- Do not fabricate client screenshots, product metrics, or unsupported workflow relationships.
- Do not turn every work image into the same card, gradient, or generic abstract blob.
- Keep the local fixture path and public approval gates unchanged.

## Material decisions and assumptions

- The hero borrows the references' behavior—pointer-responsive fluidity and breathing particle fields—not their exact visual output.
- Selected work uses four distinct visual compositions rather than one shared thumbnail template.
- The work visuals remain decorative companions to visible text; the text remains the accessible source of project meaning.
- Motion is authored in one system, bounded in amplitude, and disabled under `prefers-reduced-motion`.

## Accepted evidence and authoritative sources

- User-provided reference: https://tkabalin.github.io/WebGL-Fluid-Background/
- User-provided reference: https://github.com/tkabalin/WebGL-Fluid-Background
- User-provided reference: https://github.com/desandro/breathing-halftone
- Portfolio `DESIGN.md`, Personal Practice pilot, and work-to-experience translation contract.
- Approved project records in `content/imports/rickvang.com.json` and `content/drafts/case-studies.json`.

## Validation plan

- Run focused lint/type checks while iterating.
- Run `pnpm verify` before completion.
- Run `pnpm test:e2e` for browser behavior, responsive layout, and reduced-motion coverage.
- Inspect desktop and narrow live renders, including pointer/hover, focus, and static fallback behavior.
- Report the GitHub issue limitation rather than claiming an issue was created.

## Completion boundary

Complete when the hero reads as an abstract living field, selected work has distinct portfolio-grade visual treatments, all visuals remain source-backed and accessible through adjacent text, responsive/reduced-motion checks pass, and the local homepage is ready for review.

## Completion record

- Implemented an original pointer-responsive canvas field for the hero, with animated ribbons, breathing particles, a central focus ring, and a reduced-motion static render.
- Implemented four distinct canvas compositions for selected work: converging integration flows, layered AI systems, breathing design-system fields, and staged UI practice.
- Verified mobile at 390×844 and desktop at 1280×900 with no horizontal overflow; hero and work canvases hydrate after a fresh reload.
- `pnpm verify` passed: lint, typecheck, 33 unit tests, and production build.
- `pnpm test:e2e` passed: 38 browser tests, including mobile, reduced motion, visual, and work-index coverage.
- Browser console was clean except for the existing favicon 404; the production build retained the existing Autoprefixer and Supabase dynamic-render warnings.
- GitHub issue was not linked because GitHub CLI configuration is inaccessible in this environment.
