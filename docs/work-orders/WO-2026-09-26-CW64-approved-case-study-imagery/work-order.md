# Work Order: Approved Case-Study Imagery on the Work Index

- **Work Order ID:** `WO-2026-09-26-CW64-approved-case-study-imagery`
- **Status:** In progress
- **Created / updated:** 2026-09-26
- **Current Work:** [CW-64](https://app.notion.com/p/3e5cd82535ff81029b55eafe9a3b1b0d)
- **GitHub issue:** [#52 — Extend approved case-study imagery to the Work index](https://github.com/rickvang/Portfolio/issues/52)
- **GitHub pull request:** [#53 — Reuse approved case-study images on Work index](https://github.com/rickvang/Portfolio/pull/53)
- **Requester:** Rick
- **Owner:** Riley Morgan / `ai-orchestrator`
- **Operating Route:** Riley / `ai-orchestrator` → GPT-6 Luna with Ponytail → Noor review → Portfolio implementation
- **Request mode:** Owner-approved implementation follow-through
- **Target repository:** `rickvang/Portfolio`

## Objective

Reuse the two existing public case-study hero images on Home and the `/work` index, and record their hosting, surface scope, descriptive alt text, and visible captions.

## Owner authorization

On 2026-09-26, Rick approved broader case-study image reuse, hosting, and captions in the Codex task. This Work Order applies that approval to the two existing public source images listed below, on Home and the `/work` index. The existing assets remain served from the Portfolio site at `public/work-media/`.

## Scope and media record

| Case study | Existing asset | Source page | Approved surfaces | Alt text | Visible caption |
| --- | --- | --- | --- | --- | --- |
| Multi Product Integrations | `public/work-media/multi-product-integrations.png` | [Public source case study](https://www.rickvang.com/projects/multi-product-integrations) | Home Selected Work and `/work` | Overlapping service interfaces showing work-order records, service listings, inventory, and a map-based activity view. | Selected interface studies for shared service workflows. Screens are modified to protect client intellectual property. |
| Design Systems | `public/work-media/design-systems.png` | [Public source case study](https://www.rickvang.com/projects/design-systems) | Home Selected Work and `/work` | Collage of interface patterns, color and contrast scales, and typography examples from a design system. | Selected design-system foundations and reusable patterns. Screens are modified to protect client intellectual property. |

Both files are already hosted in the public site assets. No new asset sourcing or external hosting is in scope.

## Boundaries

- Keep the image scope on Home Selected Work and the `/work` index. Individual case-study detail routes are unchanged.
- AI Systems and UI Design Practices have no recorded source images; keep their current diagrams labelled “Illustrative diagram.”
- Do not add screenshots, stock imagery, reconstructed client interfaces, outcome claims, or project-specific facts beyond the approved source content.
- Preserve the public source's client-IP notice that the displayed work may differ from implementation and has been modified to protect client intellectual property.
- No production deployment or other production-state change.
- Preserve unrelated changes in the user's active Portfolio checkout; implement in this clean worktree.

## Decisions and evidence

- Rick's owner approval authorizes reuse, current-site hosting, and captions for the two existing public hero images on the approved surfaces.
- The original public case-study pages identify the source projects and include the client-IP disclaimer: Multi Product Integrations and Design Systems.
- The repository already contains the two assets in `public/work-media/`; typed `previewMedia` content records their hosted paths, alt text, and captions, while curation notes record the owner-approved surfaces.
- The source import and visual mapping contain no source images for AI Systems or UI Design Practices, so those cards remain derived and visibly labelled.
- Captions describe the visible image contents and keep the client-IP notice next to each displayed image.

## Affected files

- `src/components/personal-practice-visuals.tsx`
- `src/components/personal-practice-work-index.tsx`
- `src/lib/case-studies.ts`
- `src/lib/imported-content.ts`
- `src/app/(public)/page.tsx`
- `src/app/personal-practice.css`
- `content/imports/rickvang.com.json`
- `DESIGN.md`
- Relevant existing E2E assertions in `tests/e2e/site.spec.ts`, `tests/e2e/work-led.spec.ts`, and `tests/e2e/responsive.spec.ts`
- This Work Order

## Current phase

PR #53 is open with corrective commit f305b82. Typed previewMedia content now carries image paths, alt text, and captions into the shared visual; curation notes no longer repeat the client-IP disclaimer, and this active Work Order is stored outside archive. The first hosted CI run passed lint, typecheck, 33 unit tests, and Supabase schema validation but failed one E2E harness locator due to duplicated text. The new GitHub Actions run and Vercel preview are in progress.

## Validation and completion boundary

- Recheck the rendered Home and `/work` cards at desktop and mobile widths after the updated preview deploys; verify captions remain readable and there is no horizontal overflow.
- Preserve semantic `figure` / `figcaption` structure, meaningful image alternative text, the existing case-study order, and the “Illustrative diagram” labels for the other two cases.
- Require the GitHub CI checks and current PR review/merge preflight to pass before merge. Do not deploy.
- **Complete on merge of the linked implementation PR**, then archive this Work Order and reconcile CW-64 to its terminal state.

## Next action

Review the current Vercel preview at desktop and mobile widths and inspect the current CI visual artifact; refresh required checks, approval, unresolved review threads, mergeability, main/default base, and the #52 closing effect immediately before merge. After merging #53, archive this Work Order and reconcile CW-64.
