# Personal Practice / Working Archive pilot

Issue #36 established the initial Personal Practice / Working Archive pilot on **Home** and **Multi Product Integrations**. Issue #39 refines that pilot after rendered review.

- Desktop pilot routes use a **persistent light/warm left rail** for orientation. The rail should stay quiet enough that the work remains visually primary. Below the shell breakpoint it becomes a compact sticky top navigation.
- **Inter is the only pilot typeface.** Hierarchy comes from weight, scale, spacing, and composition; the pilot no longer uses a display serif.
- Home follows a strict evidence-first order: **Intro → Selected Work → How I work → optional Notes → About / Contact**.
- Home positioning describes the actual operating range of the work. The approved opening is “I make complex products easier to understand, build, and evolve.” The supporting line names product strategy, systems design and AI-assisted delivery.
- Home Selected Work uses homepage-specific transformation statements while canonical case-study summaries remain unchanged. The intentional homepage order is Multi Product Integrations → AI Systems → Design Systems → UI Design Practices so product-system depth and AI-system differentiation are visible in the first scan.
- Selected Work remains an index/list rather than a generic card grid.
- “How I work” is compact supporting context, not a second manifesto competing with project evidence.
- Notes appear on Home only when genuine public authored posts exist. Deterministic fixture posts belong to the local/test harness and must never be used as public publication fallback content.
- Authentic/source-backed project evidence remains authoritative. Generated lifestyle scenes and unapproved legacy Framer media are not evidence and must not be presented as project artifacts. Explicitly approved source media may appear only in its recorded surface and scope.
- Multi Product Integrations keeps the source-backed editorial sequence introduced in Issue #36. Missing role, reflection, metrics, or media remain omitted rather than inferred.
- The existing publication gate, experience-profile resolution, source traces, client-IP disclaimer, keyboard/focus contract, reduced-motion behavior, and harness boundaries remain authoritative.
- Non-pilot public routes continue using the existing rail system until an explicit rollout decision is made.

The refined pilot is successful only if a reader can orient quickly, reach real work before biography or secondary content dominates, and distinguish authored portfolio content from test fixtures or internal workflow state.

Rick requested a first-principles case-study prototype on 2026-10-03 and accepted the Integrations example before extending the approach to the other projects. The local-only `/dev/harness/case-study?slug=<revision-slug>&view=example` supports all four revisions and links between them. Integrations presents role and problem beside a label/value comparison, then the adopted workflow, reusable deliverables and supported outcome. AI Systems shows a consistent question across three compiled AI personas; Design Systems shows shared foundations with surface-specific guidance and reuse at screen/workflow levels; UI Design Practices shows portfolio hierarchy, responsive navigation and the recorded palette selection. Fuller context uses native disclosures. Diagrams explain supported relationships rather than reproduce client UI or invented persona answers. The shared/public renderer and publication gate remain the current production implementation; the new examples remain in local review.

## CW-97 approved case-study publication — 2026-10-09

Rick approved the final Integrations, Design Systems and AI Systems concepts after iterative review. Their authored public stories now live in `src/content/*-story.tsx`, selected behind the existing approval gate in `CaseStudyTemplate`; `approved-stories.css` scopes the approved composition to `.approved-story`. Source imports and earlier review revisions remain historical evidence and are not the current public narrative for these three routes.

The accepted source is the final CW-97 prototype, including the manager-only typical-persona comparison, the connected context framework and three role-specific UI specimens. New UI samples, diagrams and system responses are explicitly illustrative. They do not claim to be client screens, original transcripts, or validated research. Rick's account of colleagues questioning the source material is owner-reported experience.

The existing production shell, navigation, signature, branding and routes are preserved. Prototype review controls and navigation are excluded. No global shell styles are copied; static interface specimens do not add fake interactive controls. Home/Work preview media permissions are unchanged. See [issue #72](https://github.com/rickvang/Portfolio/issues/72) and [CW-97](https://app.notion.com/p/3f3cd82535ff81ad9357dc85de1073c8).

## Homepage discovery refinement — issue #80

The shared rail displays Rick Vang’s name alongside the existing signature, including the compact mobile header. Home keeps the approved headline and continuous hero field while widening the desktop statement and reducing hero spacing so the first project enters the opening view sooner. Its four summaries name contributions grounded in the approved stories; they do not add outcomes or implementation claims.

Home previews retain the existing approved assets and illustrative diagrams. Concise client-IP or illustrative captions sit below the art, associated with each preview and included in the case-study link’s accessible description. Work’s separate gallery remains unchanged. Home closes with a native contact link after the experience statistics; the three statistics share one compact row on mobile. No new interaction state, dependency, data boundary, or motion pattern is introduced. Existing hover/focus, drawer recovery and reduced-motion behavior remain authoritative.
