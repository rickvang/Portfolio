# Work Order — CW-64 Work page cleanup

- Work Order ID: WO-2026-09-25-CW64-work-page-cleanup
- Status: complete on merge
- Created: 2026-09-25
- Last updated: 2026-09-26
- Repository: rickvang/Portfolio
- Branch: codex/cw64-work-page-cleanup
- GitHub issue: https://github.com/rickvang/Portfolio/issues/50
- Pull request: https://github.com/rickvang/Portfolio/pull/51
- Current Work: CW-64
- Current Work URL: https://app.notion.com/3e5cd82535ff81029b55eafe9a3b1b0d
- Parent Current Work: CW-63
- Requester: Rick
- Owner: Riley Morgan / ai-orchestrator
- Operating Route: Riley / ai-orchestrator → GPT-6 Luna with Ponytail → Noor review → Portfolio implementation

## Objective

Clean up the Work index so visitors reach source-backed project evidence sooner, while keeping project media within its recorded approval scope.

## Scope

- Tighten the Work-page hero and reduce unnecessary vertical space before the case-study rows.
- Remove redundant hero metadata that repeats the page title or project categories.
- Keep images approved for homepage previews on Home; use derived visuals on `/work` while further reuse approval is pending.
- Preserve case-study content, project order, the existing public visual system, accessibility, and responsive behavior.

## Constraints

- Do not add project claims or reuse imagery beyond the recorded homepage-preview scope.
- Broader asset reuse and hosting choice remain pending in CW-64. Derived Work-index diagrams are visibly labelled as illustrative; approved source images remain uncaptained.
- Preserve the unrelated uncommitted changes in the active local Portfolio checkout; implement in this isolated worktree.
- No deployment or production state changes.

## Decisions and evidence

- Current `content/imports/rickvang.com.json` curation notes limit the Multi Product Integrations and Design Systems hero images to homepage previews.
- `PersonalPracticeWorkIndex` is shared by Home and `/work`; its visuals must therefore receive media scope explicitly.
- The current source import and CW-64 tracker row confirm the image-reuse decision is still open.
- User preference for the Work hero opening was requested. No reply was received before implementation, so the recommended projects-first fallback was applied.

## Current phase

The source-media scope correction and recommended Work-hero fallback are implemented in the clean branch. The Work index uses a visually hidden section heading to preserve h1 → h2 → project h3 structure, and derived fallback diagrams carry a visible "Illustrative diagram" figcaption. Home explicitly opts into homepage-preview media; `/work` defaults to derived visuals. The remote Codex review's stale Work-route E2E selectors were corrected in `work-led.spec.ts`, `site.spec.ts`, and `responsive.spec.ts`. Existing Home "Selected work" content and order assertions remain, with two media-scope assertions added for homepage-preview images and derived captions. Hosted CI for the updated PR #51 head is pending. This archived record becomes complete when PR #51 merges; CW-64 remains active for broader image reuse and hosting approval.

## Validation

- `eslint .` and `tsc --noEmit` passed after the E2E selector correction. `next build` passed on the prior head after allowing the existing Inter font fetch from Google Fonts; the initial sandboxed build attempt was blocked with `EACCES`. App code is unchanged in the E2E follow-up.
- Desktop browser review at 1440px showed the first project row immediately after the compact hero and no horizontal overflow.
- Mobile browser review at 390px showed the first project at y=286px, all four illustrative captions, and no horizontal overflow (`scrollWidth=390`).
- Browser accessibility snapshot confirmed `h1 Work` → `h2 Case studies` → project `h3` headings.
- Impeccable detector returned no findings for the changed UI files; the E2E follow-up changed tests and documentation only.
- Remote Codex PR review identified stale Work-route assertions. Noor's follow-up review confirmed the updated assertions match the markup and the existing Home assertions are preserved.
- `git diff --check` passed after the E2E selector correction.
- E2E tests have not been run locally. Hosted CI for the updated head is pending.

## Completion boundary

Complete on merge of PR #51. Do not unblock or imply broader image reuse approval in CW-64.
