# Portfolio repository instructions

## Purpose

This repository owns the rickvang.com web application and is the authoritative source for Portfolio code, architecture, design, tests, data boundaries, and repository-specific implementation decisions.

Persona Workspace, Persona-Library, SkillRepo, operating-packs, and tool-repo may provide reusable coordination, Persona, Skill, Playbook, Operating Pack, and Tool guidance. They do not replace this repository's local implementation truth or grant permission to mutate this repository or any sibling repository.

## Orchestration and continuity

- For every substantial Portfolio workstream, treat Riley Morgan / `ai-orchestrator` as the default durable orchestration owner unless the requester explicitly establishes another orchestration boundary.
- The selected Persona, Skill, Playbook, Tool path, specialist, or execution runtime may operate directly. Do not insert an unnecessary Riley execution hop.
- When the user's Notion Current Work tracker is available, create or resume one row at the first substantial checkpoint and use it as the concise cross-thread/cross-agent index.
- Keep Current Work focused on durable resumable context: Work ID, current objective, owner, Operating Route, optional Parent Work ID, next action, blocker, last checkpoint, and authoritative links.
- Reconcile Riley's durable orchestration state at workstream creation, material rerouting, cross-agent handoff, major blocker, and completion.
- Use a repo-local Work Order for detailed execution and recovery state on non-trivial, multi-step, or interruptible work. Follow `docs/work-orders.md`.
- Use this state hierarchy: **Current Work → repo-local Work Order → selectively refreshed live systems**.
- GitHub, Vercel, Supabase, deployments, permissions, CI, review state, mergeability, and other independently changing systems remain freshness-sensitive authorities. Do not mirror volatile live state into Current Work merely to make the tracker look complete.
- If Current Work cannot be updated because the required Notion tool, connection, or permission is unavailable, explicitly state **Current Work not updated** and why.

## Development contract

- Use pnpm and the Node version declared in `package.json`.
- Read `ARCHITECTURE.md` and `DECISIONS.md` before changing system boundaries.
- Read `DESIGN.md` before making visual changes or adding reusable components.
- For reusable component work, use the canonical `component-builder` method from `SkillRepo` when it is available in the shared workspace.
- When reusable Skills, Playbooks, Operating Packs, or Tool-use recipes are relevant, use their canonical source rather than copying their full procedure into Portfolio. Portfolio's local architecture, design, source code, tests, and current live state remain authoritative for Portfolio-specific implementation.
- Keep product content separate from reusable UI and infrastructure.
- Add or update deterministic fixtures in `fixtures/seed.json` when a state needs to be represented in the harness.
- Keep `/dev/harness` local-only. It must not be accessible in production.
- Prefer accessible queries and user-visible behavior in Playwright tests.
- Do not add external services, secrets, databases, deployment configuration, or production-state changes without an explicit decision and appropriate authorization.
- Add Supabase schema changes as migrations and keep RLS enabled on exposed tables.
- Run the narrowest relevant checks while iterating and `pnpm verify` before completing substantial changes.
- Run `pnpm test:e2e` for browser verification; its runner owns and cleans up the temporary dev server. Use `PW_REUSE_SERVER=true` only when invoking Playwright directly against a server you started separately.

## Work tracking

- Create or link a GitHub issue for each non-trivial implementation plan. Keep scope, status, and next action visible there and link it from the Work Order.
- Use one Current Work row per substantial workstream, not one row per conversational turn.
- Use one repo-local Work Order per substantial implementation packet. Link specialized artifacts rather than duplicating them.
- Archive completed Work Orders under `docs/work-orders/archive/YYYY-MM/<work-order-id>/` rather than deleting them.
- When work is already represented in Current Work, reconcile that record before reporting a material handoff, blocker, priority change, or completion.
- When Riley decomposes a substantial outcome into child workstreams, record the parent `CW-#` in Current Work's **Parent Work ID** field.

## GitHub operating boundary

- Resolve the target repository before acting and refresh current remote state before planning, review, or consequential GitHub mutations.
- Prefer a connected/native GitHub plugin or connector for remote GitHub operations when available. A checked-out Portfolio workspace may still be used for ordinary local development when that is the active execution environment.
- Follow the pinned [GitHub operating instructions](https://github.com/rickvang/tool-repo/blob/01198019e8f1520eb222dc6af2ec17bd81bc9c30/tools/github/AGENTS.md) for GitHub mutation classes, authorization, review/merge procedure, and linked-issue completion semantics.
- For Portfolio itself, a requester instruction to implement, fix, build, or complete a scoped repository issue or change is **standing completion authorization** for the normal implementation path: branch/file changes, pull-request creation or updates, scoped review corrections, and merge into the default branch once current completion gates pass.
- Explicit instructions such as `do not merge`, `PR only`, `leave for review`, or an equivalent narrower boundary override standing completion authorization.
- Standing completion authorization is scoped to the requested Portfolio work. It does not authorize unrelated issue mutations, repository settings or access changes, external repositories, deployments, production data changes, publication, purchases, or external communications.
- Immediately before merge, refresh the current PR, head/base relationship, required checks, blocking review state, unresolved review threads, mergeability, and linked-issue completion effects. Do not merge while a known blocker remains.

## Definition of done

A change is complete when its requested behavior is implemented, directly inspectable structure and invariants are correct, the relevant harness state exists when applicable, documentation is current, and applicable verification has passed.

Do not create recursive validation work solely to prove that prior validation occurred. If an applicable check cannot be run, state the remaining uncertainty instead of claiming completion.
