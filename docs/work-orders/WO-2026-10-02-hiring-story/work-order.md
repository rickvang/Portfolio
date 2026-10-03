# Portfolio hiring story and contact

- Status: active; all four case-study replacements ready for owner review
- Created / updated: 2026-10-02 / 2026-10-03
- Owner: Riley Morgan / ai-orchestrator; Codex executes directly
- Current Work: [CW-83](https://app.notion.com/p/3eecd82535ff8197abd6e6b6e3550609)
- Issue: [Portfolio #62](https://github.com/rickvang/Portfolio/issues/62)
- Target: rickvang/Portfolio, isolated codex/portfolio-hiring-story branch
- Operating route: owner interview → source-backed content → scoped presentation/contact edits → verification → owner publication decision

## Request and authorization

Rick accepted leading with Multi Product Integrations and replacing the contact form with email/LinkedIn. He is comfortable replacing the complicated AI-generated representation. Prepare the replacement story for review using the interview facts. Keep it review-ready until he approves the wording. No production deployment or new content publication is authorized by this preparation.

Rick then moved to the next portfolio work item, AI Systems, and described his AI council. Prepare a review-only revision focused on its product purpose, compiled persona profiles, consistent questions/context, and synthesis into a use-case scenario. Reuse the existing content model and review surface. The readable export is [ai-systems-story.md](ai-systems-story.md).

Rick requested [plans for Design Systems and UI Design Practices](next-case-studies-plan.md), three substantive passes in separate chats for each, and two additional AI Systems passes. Those revisions are complete. The readable stories and pass logs live under [Design Systems](examples/design-systems/story.md) and [UI Design Practices](examples/ui-design-practices/story.md); the catalog remains the canonical application content.

Preserve existing uncommitted work in the primary Portfolio checkout. This worktree starts at remote main 4cafcd20bdce0f8c24d8d4db9be892939624f437.

## Accepted evidence

The story compiles work across engagements. In the real-estate example, Rick was a primary contributor and worked with three teammates, iterating together. He defined workflow patterns, Figma component libraries and guidelines, and a starter layout structure. The team adopted another team's process when it better suited a scenario. Established teams found adaptation harder, though the shared system was accepted. Rick collaborated with frontend developers on feasibility; the frontend team implemented code. Libraries were generally adopted across projects he worked on. No numerical outcomes or universal adoption claims are established.

Contact links were verified on Rick's [public About page](https://www.rickvang.com/about): rick@rickvang.com and https://www.linkedin.com/in/rick-vang.

## Scope and decisions

- Replace the generated detail diagram with plain sections and a list of existing approved patterns. Render role, scope, and decision sections from the authored record when it is promoted.
- Add the owner-interview revision under a distinct review-only slug in the existing authored-content file. Keep the original import intact and the revision out of public routes.
- Use the existing case-study review surface; add no new workflow, dependency, component framework, or service.
- Replace the public contact form with real links; retain the form fixture in the local harness.
- Preserve existing image permissions: Home and Work index only. No new detail-page image reuse.
- Rick subsequently requested graphics for the case study. The working draft includes explanatory label/value and record-workflow diagrams. Captions explain the work; source provenance and tentative historical details remain internal per C12. Original media reuse permissions are unchanged.

## Completion and recovery

Rick found the initial treatment too thin. The Vercel story route was still displaying the imported synopsis, and the separate owner-interview draft was too short. The revision now explains the pattern areas, shared Figma artifacts, layout starter, collaboration, feasibility and qualitative adoption in more detail. A `view=story` option on the existing local-only review surface shows the same production story renderer and shell, without changing public approval filtering.

Rick supplied the concrete example: other applications had more sophisticated dashboards and progressive-disclosure rules, so the team adopted their approach to creating/viewing records in slide-ins. He then tentatively recalled that the earlier approach used a page refresh and drill-down because of prior development constraints. The working draft now explains the earlier approach and the adopted slide-in workflow, explicitly qualifying the earlier behavior and reason as recollection. Whether dashboard/list context remained visible is still unconfirmed and is omitted. No panel location, exact controls, measured usability effect or specific engineering limitation is invented.

The proposed wording is exported to [story.md](story.md) for easy review; the typed authored record remains canonical.

The working draft now also carries two explanatory SVG diagrams, each with a legible stacked mobile variant. The diagram references are explicit section data, rendered by the existing story and evidence-review surfaces through a small shared figure. No client screen, exact control placement, dashboard-context retention or metric is reconstructed. The known example is a container comparison, not an invented screen sequence. The canonical component-builder package was not present in the local SkillRepo checkout; the existing component and content contracts were used directly.

Verification passed for the expanded review implementation: design contract, lint, typecheck, 34 unit tests, production build, and 45 browser tests. After the final interview copy update, all eight relevant browser tests passed again in 11.5 seconds. Browser coverage checks direct contact targets and keyboard focus, desktop/mobile first-screen contact links, the local owner-interview review, the actual story presentation at desktop/mobile widths, and exclusion of that revision from public routes. Desktop/mobile contact and story-review screenshots were inspected, including the final desktop story screenshot. Existing primary-checkout edits remain intact.

The first restricted build could not download the existing Google font; network-enabled verification passed. The worktree reuses the unchanged primary dependency installation through a local junction; pnpm's automatic dependency reinstall was disabled for these checks so that installation was preserved. No dependency or lockfile change is part of this work.

Next action: Rick reviews the expanded story at http://127.0.0.1:3192/dev/harness/case-study?slug=multi-product-integrations-revision&view=story. The concrete process example is incorporated and verification is complete. An exact original architecture and dashboard background behavior are not needed to review this version; those details remain out of the draft. Keep the existing preview synopsis distinct from the review-ready replacement.

The concrete preparation boundary is a readable local story review and direct contact page, with verification recorded. Publication requires the separate explicit content decision in DESIGN.md. On approval, replace the original imported story with the authored revision at the canonical slug, retain approved preview media, and verify the publication gate and public route before merging or deployment.

## Checkpoint

[C08 | 2026-10-02 10:21 pm] Expanded the story around the adopted record slide-in workflow and Rick's qualified recollection of the earlier page-refresh drill-down. The actual desktop/mobile story presentation is available in local review; final relevant browser verification passed. The replacement remains review-ready in draft PR #63.

Native allowance observations for this turn: five-hour used 59% → 71%; weekly used 9% → 11%, within the same reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C09 | 2026-10-02 11:02 pm] Rick requested a more human voice. Applied [Humanizer guidance](https://github.com/NousResearch/hermes-agent/blob/main/skills/creative/humanizer/SKILL.md) using his interview answers as the voice reference. Combined the repeated descriptions and small subsections into six connected sections, simplified the headings, and preserved the concrete workflow example, qualified recollection, role, artifacts and adoption limits. The canonical authored record and readable export are synchronized. This was a bounded copy edit; all 34 unit tests and eight relevant browser tests passed, including the desktop/mobile story view and publication filtering. The earlier full implementation verification remains the baseline.

Native allowance observations for this copy-edit turn: five-hour used 2% → 4%; weekly used 12% → 12%, within the same reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C10 | 2026-10-02 11:29 pm] Added two interview-derived explanatory diagrams to the working story, with desktop and stacked mobile SVG variants, captions, alt text and explicit section references. Batched desktop/mobile figure inspection passed. `pnpm verify` passed (design, lint, typecheck, 34 unit tests, production build); all 45 browser tests passed, including asset loading, mobile asset selection and publication filtering. The first full browser launch timed out after the production build disrupted the running dev server's temporary output; the preview was restarted and the complete browser run then passed in 45.8 seconds. The active review server is on port 3192. Avoid building against its active temporary output on the next iteration; stop and restart the owned preview around the build.

Native allowance observations for this graphics turn: five-hour used 6% → 16% with an unchanged reset timestamp; weekly used 12% → 14% with a one-second shift in its reported reset timestamp. These are account-wide observations and may include concurrent work; no task token count is available.

[C11 | 2026-10-02 11:49 pm] Recreated section 04's diagram after Rick found the two-container comparison unclear. It now shows the earlier page flow (qualified recollection), another team's create/view slide-in pattern, and its adoption into the shared Figma library and guidelines. Updated both existing SVG assets, alt text, caption and readable story export; the renderer and content model needed no changes. Desktop/mobile story browser checks passed, including asset selection and publication exclusion. Both figures were inspected. First tool timestamp was 11:42:37 pm; the first verified visual inspection was at 11:48:48 pm (6 minutes 11 seconds). Preview remains on port 3192; the revision remains review-ready.

Native allowance observations for this bounded diagram revision: five-hour used 27% → 29%; weekly used 15% → 16%, within unchanged reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C12 | 2026-10-02 11:58 pm] Rick corrected the editorial boundary: the case study should describe the work, while interview provenance, drafting commentary and tentative recollection belong in internal review records. Removed those phrases from the reader-facing body, both figure captions, the workflow labels and accessible descriptions. Captions now explain the patterns and their adoption. Tentative historical details remain in evidence/curation notes; the graphic labels a generic page-based workflow. The readable story export is synchronized. Both relevant browser tests passed, including desktop/mobile rendering and exclusion from publication. The existing draft PR and preview on port 3192 remain the review surfaces.

Native allowance observations for this bounded editorial correction: five-hour used 35% → 39%; weekly used 17% → 17%, within unchanged reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C13 | 2026-10-03 1:03 am] Prepared the AI Systems council revision in the existing content model and review surface. Rick confirmed executive, manager and worker personas; all received the same question/context and answered from compiled profiles informed by industry practices and whitepapers. Profiles covered role concerns, pain points, core and occasional activities. He compiled product/data perspectives into a use-case scenario. The specific product/dashboard example remains uncertain and internal. The working story uses five connected sections, with no reader-facing interview commentary. Canonical record: `ai-systems-revision`; readable export: [ai-systems-story.md](ai-systems-story.md); review: http://127.0.0.1:3192/dev/harness/case-study?slug=ai-systems-revision&view=story . All 34 unit tests passed after catalog expectations were updated for the new record. Desktop/mobile story rendering, overflow, content and exclusion from publication passed; both screenshots were inspected. A cold public-route browser navigation timed out waiting for the full load event; the focused retry passed at DOM readiness and showed the not-found title. No application fix was required. Both story replacements remain review-ready in the existing draft PR.

Native allowance observations for this council-story turn: five-hour used 50% → 56%; weekly used 19% → 20%, within unchanged reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C14 | 2026-10-03 2:12 am] Rick requested plans and separate chats for the next two work examples, each with at least three substantive iterations, plus two more AI Systems passes. [The plan](next-case-studies-plan.md) defines scoped evidence, pass criteria, isolated checkouts, preview ports and one parent integration. Design Systems chat: 01a10095-0510-7ae1-ac27-37029dbceb38; UI Design Practices chat: 01a10095-1feb-7453-94e9-341ba3f0141a. Both are running and own only their example deliverables. AI Systems passes 2 and 3 are complete: the concrete question, profile context and synthesis are clearer; the final voice pass combines the role/profile sections and removes repetition. [Its pass log](ai-systems-iterations.md) records material findings and changes. All nine content-contract tests and the final desktop/mobile story, overflow and publication checks passed. Both rendered captures were inspected. Next: inspect the two finished three-pass drafts and integrate them once into the review-only catalog and existing PR.

[C16 | 2026-10-03 07:28 am] The two chats finished their three substantive prose passes after resuming the final handoff interrupted by the account usage limit. The parent reviewed both stories and their evidence boundaries, brought their scoped deliverable commits into this branch, and appended each final record once to the canonical catalog. Design Systems explains shared foundations, surface-specific density guidance and reusable screens/workflow patterns. UI Design Practices describes Rick's portfolio hierarchy, rail and palette choices, with agent implementation explicitly attributed. AI Systems' two additional passes were already complete at C14. All 34 unit tests passed after integration. Both new stories passed content, layout and horizontal-overflow checks at 1280px and 390px; public detail routes and the Work index exclude both drafts. All four final captures were inspected. The original approved records remain unchanged, and no new renderer, schema, dependency, assets or production state were added. Final records remain review-ready for the existing draft PR #63; next action is owner wording review and a separate publication decision.
