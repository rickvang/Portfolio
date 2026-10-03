# Portfolio hiring story and contact

- Status: active; expanded case study ready for owner review
- Created / updated: 2026-10-02
- Owner: Riley Morgan / ai-orchestrator; Codex executes directly
- Current Work: [CW-83](https://app.notion.com/p/3eecd82535ff8197abd6e6b6e3550609)
- Issue: [Portfolio #62](https://github.com/rickvang/Portfolio/issues/62)
- Target: rickvang/Portfolio, isolated codex/portfolio-hiring-story branch
- Operating route: owner interview → source-backed content → scoped presentation/contact edits → verification → owner publication decision

## Request and authorization

Rick accepted leading with Multi Product Integrations and replacing the contact form with email/LinkedIn. He is comfortable replacing the complicated AI-generated representation. Prepare the replacement story for review using the interview facts. Keep it review-ready until he approves the wording. No production deployment or new content publication is authorized by this preparation.

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

## Completion and recovery

Rick found the initial treatment too thin. The Vercel story route was still displaying the imported synopsis, and the separate owner-interview draft was too short. The revision now explains the pattern areas, shared Figma artifacts, layout starter, collaboration, feasibility and qualitative adoption in more detail. A `view=story` option on the existing local-only review surface shows the same production story renderer and shell, without changing public approval filtering.

Rick supplied the concrete example: other applications had more sophisticated dashboards and progressive-disclosure rules, so the team adopted their approach to creating/viewing records in slide-ins. He then tentatively recalled that the earlier approach used a page refresh and drill-down because of prior development constraints. The working draft now explains the earlier approach and the adopted slide-in workflow, explicitly qualifying the earlier behavior and reason as recollection. Whether dashboard/list context remained visible is still unconfirmed and is omitted. No panel location, exact controls, measured usability effect or specific engineering limitation is invented.

The proposed wording is exported to [story.md](story.md) for easy review; the typed authored record remains canonical.

Verification passed for the expanded review implementation: design contract, lint, typecheck, 34 unit tests, production build, and 45 browser tests. After the final interview copy update, all eight relevant browser tests passed again in 11.5 seconds. Browser coverage checks direct contact targets and keyboard focus, desktop/mobile first-screen contact links, the local owner-interview review, the actual story presentation at desktop/mobile widths, and exclusion of that revision from public routes. Desktop/mobile contact and story-review screenshots were inspected, including the final desktop story screenshot. Existing primary-checkout edits remain intact.

The first restricted build could not download the existing Google font; network-enabled verification passed. The worktree reuses the unchanged primary dependency installation through a local junction; pnpm's automatic dependency reinstall was disabled for these checks so that installation was preserved. No dependency or lockfile change is part of this work.

Next action: Rick reviews the expanded story at http://127.0.0.1:3192/dev/harness/case-study?slug=multi-product-integrations-revision&view=story. The concrete process example is incorporated and verification is complete. An exact original architecture and dashboard background behavior are not needed to review this version; those details remain out of the draft. Keep the existing preview synopsis distinct from the review-ready replacement.

The concrete preparation boundary is a readable local story review and direct contact page, with verification recorded. Publication requires the separate explicit content decision in DESIGN.md. On approval, replace the original imported story with the authored revision at the canonical slug, retain approved preview media, and verify the publication gate and public route before merging or deployment.

## Checkpoint

[C08 | 2026-10-02 10:21 pm] Expanded the story around the adopted record slide-in workflow and Rick's qualified recollection of the earlier page-refresh drill-down. The actual desktop/mobile story presentation is available in local review; final relevant browser verification passed. The replacement remains review-ready in draft PR #63.

Native allowance observations for this turn: five-hour used 59% → 71%; weekly used 9% → 11%, within the same reset windows. These are account-wide observations and may include concurrent work; no task token count is available.

[C09 | 2026-10-02 11:02 pm] Rick requested a more human voice. Applied [Humanizer guidance](https://github.com/NousResearch/hermes-agent/blob/main/skills/creative/humanizer/SKILL.md) using his interview answers as the voice reference. Combined the repeated descriptions and small subsections into six connected sections, simplified the headings, and preserved the concrete workflow example, qualified recollection, role, artifacts and adoption limits. The canonical authored record and readable export are synchronized. This was a bounded copy edit; all 34 unit tests and eight relevant browser tests passed, including the desktop/mobile story view and publication filtering. The earlier full implementation verification remains the baseline.

Native allowance observations for this copy-edit turn: five-hour used 2% → 4%; weekly used 12% → 12%, within the same reset windows. These are account-wide observations and may include concurrent work; no task token count is available.
