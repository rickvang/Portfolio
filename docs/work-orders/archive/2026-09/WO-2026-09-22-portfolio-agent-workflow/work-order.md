# Work Order — Portfolio agent workflow alignment

- Work Order ID: `WO-2026-09-22-portfolio-agent-workflow`
- Status: complete
- Created: 2026-09-22
- Last updated: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `feat/issue-9-agent-workflow`
- Issue: https://github.com/rickvang/Portfolio/issues/9
- Current Work: `CW-35`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff81eeab40f9aef8abfc68
- Parent Work ID: `CW-34`
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → current implementation agent
- Request mode: update

## Objective

Align Portfolio with the shared durable orchestration model used around Persona-Library while preserving Portfolio as the authority for its own implementation.

## Scope

- Update root `AGENTS.md`.
- Add `docs/work-orders.md`.
- Record the durable decision in `DECISIONS.md`.
- Preserve existing Portfolio development, design, harness, Supabase, and verification rules.

## Non-goals

- No Persona-Library orientation/bootstrap machinery in Portfolio.
- No second orchestration database.
- No deployment, production-state change, or external-service mutation.
- No change to the active redesign implementation itself.

## Authorization

The requester explicitly authorized the scoped repository changes. Under the currently effective `main` contract, this authorizes the implementation branch and PR workflow but does not independently authorize this PR to merge.

The proposed `AGENTS.md` adds Portfolio standing completion authorization for future scoped implementation requests. That new rule does not bootstrap its own merge authorization before it is merged.

## Decisions

- Portfolio remains implementation-authoritative.
- Riley owns durable orchestration continuity, not every execution step.
- Current Work is the cross-agent index.
- Repo-local Work Orders carry detailed implementation/recovery state.
- Live systems remain freshness-sensitive authority.
- Shared Persona/Skill/Playbook/Tool material is reusable guidance, not a replacement for local Portfolio rules.

## Validation

- Structural inspection confirmed the Riley, Current Work, Operating Route, Work Order, and future standing-completion rules are present on the branch.
- PR #10 is open and mergeable.
- Cursor automated review approved the PR with no review threads.
- CI run #10 passed both jobs:
  - `verify`: install, lint, typecheck, unit tests, Playwright E2E, and build.
  - `Supabase local schema`: local start, migrations/seed, lint, database tests, migration-state check, and posts/RLS smoke test.

## Completion boundary

The requester explicitly authorized merge of PR #10 after implementation and validation were complete. The scoped repository changes are ready to land.

## Current phase

Complete.

## Next action

Run a fresh merge preflight on PR #10 after this archival commit's CI completes, then merge if head/base, checks, review threads, mergeability, and linked issue-closing effects remain clear.
