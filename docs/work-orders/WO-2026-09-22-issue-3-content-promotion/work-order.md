# Work Order — Issue #3 content promotion

- Work Order ID: `WO-2026-09-22-issue-3-content-promotion`
- Status: active
- Created: 2026-09-22
- Last updated: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `feat/issue-3-content-promotion`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/3
- Current Work: `CW-38`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff814ca758d38563912ec9
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → Jordan Lee / `ux-senior` → Camille Ortiz / `ui-expert` → Frontend Systems Engineer

## Objective

Complete Issue #3 by promoting the existing first-party rickvang.com import into the typed public content path so the portfolio is driven by Rick's real positioning, biography, and two client-protective case studies instead of placeholder/generic copy.

Then use the resulting content inventory as the evidence base for a separate work-led surface redesign that must reuse and evolve the existing DESIGN.md tokens, component boundaries, and documented layout patterns rather than introducing another unrelated visual language.

## Scope

- Revalidate the five original source pages against the current public Framer site.
- Promote the first-party imported profile and two case studies through explicit typed approval state.
- Render the approved profile on Home and About.
- Render the approved imported case studies through the existing Work index/detail boundaries and shared case-study template.
- Preserve the client-IP disclaimer.
- Keep phone/email, testimonials, credentials, brand assets, source media, and hosted Supabase writes deferred.
- Update deterministic tests and content-import documentation.
- Create a follow-up implementation issue for the work-led surface redesign using the actual content and current DESIGN.md system.

## Non-goals

- No testimonial or third-party quote publication.
- No phone/email promotion.
- No credential or brand-logo import.
- No source-image/media publication until ownership/IP/safe-disclosure review.
- No hosted Supabase writes.
- No new external service.
- No unrelated architecture rewrite.
- No direct production deployment without explicit authorization.

## Design-system constraints

- DESIGN.md is authoritative for semantic tokens, reusable component ownership, public-shell behavior, accessibility, motion, and harness requirements.
- Reuse existing `CaseStudyList` and `CaseStudyTemplate`; content adapters belong in `src/lib/`.
- Keep design tokens in `src/app/globals.css`; do not scatter route-specific visual constants.
- Surface redesign work must start from real content structure and existing patterns, then revise the design contract deliberately where the current pattern produces generic AI-portfolio aesthetics.
- Components should express content structure; they should not embed portfolio copy.

## Source evidence

The current public source was rechecked on 2026-09-22:
- homepage positioning still presents “Hi, I'm Rick.” and systems/firefighting positioning;
- About still contains the decade-long systems biography and 11+/14+/30+ work summary;
- Multi Product Integrations still contains the public scope/discovery/outcomes/solution structure and client-IP disclaimer;
- Design Systems still contains scope/discovery/outcomes plus collaboration, foundations, density, templates, and patterns;
- the source images and third-party material remain outside this promotion packet.

## Validation

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- public tests prove approved profile/work render
- draft/review-ready authored content remains unpublished
- no deferred contact/testimonial/media content appears publicly
- Vercel preview reaches READY before merge
- no unresolved blocking review threads

## Completion boundary

Issue #3 is complete when the approved first-party profile and two imported case studies land on `main` through the typed public adapters, with the client-IP disclaimer preserved and deferred material still excluded.

Because `main` triggers Vercel production, merge/deployment remains a separate explicit authorization boundary.

## Implemented slice

- Revalidated the current public Framer source pages.
- Promoted the first-party import packet to explicit `approved` state.
- Added typed approved-content helpers for the public profile boundary.
- Promoted Multi Product Integrations and Design Systems through the existing approval-filtered case-study catalog.
- Replaced the generic homepage hero/about copy with the approved source-backed positioning and biography.
- Added a reusable semantic `ProfileStats` component for the 11+/14+/30+ experience summary using existing design tokens and responsive patterns.
- Updated Home, About, and Work without introducing a second route/component architecture.
- Kept AI Systems, UI Design Practices, and persona-led design at `review-ready`.
- Kept phone/email, third-party testimonials, credentials, brand assets, source imagery, and Supabase writes outside the promotion packet.
- Updated DESIGN.md with a content-led hierarchy rule so actual work outranks generic portfolio slogans.

## Current phase

Implementation complete on the feature branch; entering PR/CI/preview validation.

## Next action

Open the Issue #3 PR and run full CI plus Vercel preview. Repair any failures or review findings. Do not merge/deploy production without explicit authorization. Separately create the work-led surface redesign issue from the approved content inventory and existing DESIGN.md system.
