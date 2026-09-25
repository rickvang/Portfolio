# Work Order — Homepage story and visual system pass

- Work Order ID: WO-2026-09-23-homepage-story-visual-pass
- Status: complete
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/homepage-design-pass
- GitHub issue: not linked; GitHub CLI configuration is inaccessible in this environment
- Current Work: CW-62
- Current Work URL: https://app.notion.com/p/3e5cd82535ff817eb86cf24c97ef18f1
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → Impeccable homepage experience pass → Portfolio implementation → browser verification
- Request mode: scoped implementation and completion

## Objective

Implement one homepage design pass that combines clearer positioning, a source-backed throughline across the work, informative project graphics, reduced rule and number repetition, and restrained cursor-aware motion with accessible fallbacks.

## Scope

- Replace the generic hero and About language with concrete value-oriented positioning based on the approved Portfolio content and the requester's correction to 13 years of experience.
- Replace the generic three-column How I work copy with a non-sequential throughline that relates the four homepage work anchors.
- Add derived, source-backed visual diagrams for the homepage work index without fabricating client screenshots or unsupported relationships.
- Reduce repeated horizontal rules and remove content numbering that does not communicate meaningful sequence.
- Add one authored hero motion moment and subtle project-preview interactions while preserving reduced-motion behavior, keyboard/focus behavior, responsive layout, and the local fixture path.

## Non-goals and constraints

- Do not rewrite canonical case-study source content or publish unapproved media.
- Do not add external services, animation dependencies, stock imagery, fabricated product UI, or production-state changes.
- Preserve the Personal Practice rail, Inter typography, warm neutral palette, approval/publication gates, semantic HTML, and local-only harness boundary.
- Derived diagrams must be understandable without motion and should not imply sequence, dependency, or metrics that the source does not support.

## Authorization boundary

The requester explicitly authorized implementation of both the copy and visual homepage design as one pass. Changes are limited to the Portfolio repository and its repo-local documentation/work-order state.

## Material decisions and assumptions

- The homepage's throughline is: make complexity legible → build reusable foundations → carry decisions into implementation → help teams sustain the system.
- Multi Product Integrations uses a hub/capability map; AI Systems uses a layered operating-model diagram; Design Systems uses a governance/foundation/application matrix; UI Design Practices uses an implementation-contract path.
- The throughline is a reading model, not an asserted chronology. Visual relationships must remain source-backed.
- Hero motion will be CSS/SVG/React-native and short, interruptible, pointer-aware, and disabled under `prefers-reduced-motion`.

## Accepted evidence and authoritative sources

- Portfolio `DESIGN.md`, especially the Personal Practice pilot and work-to-experience translation contract.
- Approved case-study records in `content/imports/rickvang.com.json` and `content/drafts/case-studies.json`.
- Homepage implementation in `src/app/(public)/page.tsx`, `src/components/personal-practice-work-index.tsx`, and `src/app/personal-practice.css`.
- Rendered homepage evidence at `http://localhost:3000/` reviewed in the browser on 2026-09-23.

## Current phase

Complete. The homepage now combines concrete positioning, a source-backed throughline, four derived project diagrams, reduced rule/number repetition, and pointer-aware hero motion with reduced-motion fallbacks.

## Validation plan

- Run focused lint/type checks while iterating.
- Run `pnpm verify` before completion.
- Run `pnpm test:e2e` for browser behavior and visual-capture verification.
- Inspect the live homepage at desktop and narrow widths, including hover/focus and reduced-motion behavior.
- Report any remaining GitHub issue or deployment limitation rather than claiming external verification.

## Verification record

- `pnpm verify` passed: lint, typecheck, 33 unit tests, and production build.
- `pnpm test:e2e` passed: 38 browser tests across default, mobile, tablet, and reduced-motion projects.
- Live browser review passed at `http://localhost:3000/` with desktop work visuals and throughline checked manually. The hero responds to pointer movement and hover; reduced-motion behavior is covered by the browser suite.
- Build warnings remain non-blocking: the existing Supabase/cookies fallback is reported during static generation, and Autoprefixer suggests `flex-end` for an existing `end` alignment declaration.
- GitHub issue remains unlinked because local GitHub CLI configuration is inaccessible; no issue was claimed.

## Completion boundary

Complete when the homepage presents the combined story with concrete copy, source-backed visuals, distinct section rhythm, no unintended double-rule/number noise, accessible/reduced-motion behavior, and passing repository/browser gates. Reconcile Current Work to the terminal state before handoff.
