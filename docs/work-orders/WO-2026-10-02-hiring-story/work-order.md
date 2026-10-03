# Portfolio hiring story and contact

- Status: waiting for owner content approval; preparation verified
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

The proposed wording is exported to [story.md](story.md) for easy review; the typed authored record remains canonical.

Verification passed: design contract, lint, typecheck, 34 unit tests, production build, and 44 browser tests. Browser coverage checks direct contact targets and keyboard focus, desktop/mobile first-screen contact links, the local owner-interview review, and exclusion of that revision from public routes. Desktop/mobile contact and full story-review screenshots were inspected. Existing primary-checkout edits remain intact.

The first restricted build could not download the existing Google font; network-enabled verification passed. The worktree reuses the unchanged primary dependency installation through a local junction; pnpm's automatic dependency reinstall was disabled for these checks so that installation was preserved. No dependency or lockfile change is part of this work.

Next action: obtain Rick's wording approval, then promote the approved replacement at the canonical slug and prepare the authorized publication step.

The concrete preparation boundary is a readable local story review and direct contact page, with verification recorded. Publication requires the separate explicit content decision in DESIGN.md. On approval, replace the original imported story with the authored revision at the canonical slug, retain approved preview media, and verify the publication gate and public route before merging or deployment.
