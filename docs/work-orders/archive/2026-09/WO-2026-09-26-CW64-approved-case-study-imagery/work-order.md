# Work Order: Approved Case-Study Imagery on the Work Index

- **Work Order ID:** `WO-2026-09-26-CW64-approved-case-study-imagery`
- **Status:** Complete
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

Both files were already hosted in the public site assets. No new asset sourcing or external hosting was in scope.

## Boundaries

- Keep the image scope on Home Selected Work and the `/work` index. Individual case-study detail routes are unchanged.
- AI Systems and UI Design Practices have no recorded source images; keep their current diagrams labelled *Illustrative diagram*.
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

## Outcome

PR #53 was merged into `main` on 2026-09-26 as squash commit `218b0c0ebec59f4f0653307251c1b98888c7bff4`. GitHub auto-closed issue #52. The corrected implementation stores image paths, alt text, and captions as typed case-study `previewMedia` content, passes that metadata into the shared visual, and records the approved display surfaces in curation notes.

The first hosted CI run exposed a duplicated disclaimer that made an E2E text locator ambiguous. The content and caption source were corrected, and the final CI run passed.

## Validation and completion record

- GitHub Actions [CI run #125](https://github.com/rickvang/Portfolio/actions/runs/36264961520) completed successfully: lint, typecheck, unit tests, Playwright E2E, build, and Supabase local schema checks passed.
- The Vercel preview deployment succeeded at `https://portfolio-git-codex-cw64-approved-work-images-acme-dd4d.vercel.app`. Home and `/work` were manually reviewed at desktop width; the approved images and captions were visible, while the two remaining cards stayed labelled as illustrative diagrams.
- `tests/e2e/responsive.spec.ts` passed its mobile-width responsive and overflow assertions, including the 390px viewport.
- Both outdated Codex inline review threads were resolved. The merge preflight confirmed the PR targeted the current default branch and was cleanly mergeable.
- No local tests were run; validation came from the hosted CI run.
- No production deployment was requested or performed.

## Next action

None. The approved imagery change, issue, and Work Order lifecycle are complete.