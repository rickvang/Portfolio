# Portfolio Work Orders

A Work Order is the repo-local execution and recovery record for non-trivial Portfolio work that has more than one meaningful step, can cross agents/sessions, or may need interruption recovery.

## State hierarchy

Use the following hierarchy for substantial work:

1. **Current Work** — concise cross-thread/cross-agent index: Work ID, objective, owner, Operating Route, optional Parent Work ID, next action, blocker, last checkpoint, and authoritative links.
2. **Portfolio Work Order** — detailed repository-scoped execution state: request, scope, constraints, decisions, accepted evidence, authorization, affected files, phase/gate state, handoffs, validation, and resumable next action.
3. **Live systems** — freshness-sensitive operational authority: GitHub branches/PRs/checks/reviews/mergeability, Vercel deployments, Supabase state, permissions, and other independently changing systems.

**Resume order:** Current Work → linked Work Order → selectively refresh the live systems whose state may have changed.

Do not copy fast-changing live state into Notion as if it were durable truth. Record the last proven checkpoint and what must be refreshed before the next consequential mutation.

## Riley continuity

For every substantial workstream, Riley Morgan / `ai-orchestrator` is the default durable orchestration owner unless the requester establishes another orchestration boundary.

The selected Persona, Skill, Playbook, Tool path, specialist, or runtime may execute directly without an extra Riley runtime hop. Reconcile Riley's durable orchestration state at:

- workstream creation;
- material rerouting;
- cross-agent handoff;
- major blocker;
- completion.

## Storage

Active Work Orders live at:

`docs/work-orders/<work-order-id>/work-order.md`

Terminal Work Orders (`complete`, `no-go`, or `cancelled`) move to:

`docs/work-orders/archive/YYYY-MM/<work-order-id>/work-order.md`

Archival is lifecycle classification, not deletion.

## Minimum contract

Each non-trivial Work Order should record:

- Work Order ID and title;
- status;
- created / last-updated date;
- linked Current Work ID and URL when available;
- linked GitHub issue;
- requester and current owner;
- Operating Route;
- request mode and target repository;
- scope, non-goals, constraints, and affected surfaces;
- authorization boundary;
- material decisions and assumptions;
- accepted evidence and authoritative sources;
- current phase, blocker/fallback, and one next action;
- validation performed and remaining uncertainty;
- concrete completion boundary.

A Work Order records authorization; it never invents it.

## Progress updates

Update a Work Order only when state materially changes: a phase starts/completes, an important decision is made, evidence changes the direction, a blocker appears, a handoff occurs, validation changes the next action, or the work completes.

Do not turn it into a transcript or duplicate every commit/check.

## Completion

A Work Order is complete when the scoped outcome is in place, directly inspectable structure/invariants are correct, applicable checks have passed or remaining uncertainty is stated, authorization boundaries were respected, and Current Work has been reconciled to the terminal state **when the tracker is available**. If Current Work cannot be written because the required Notion tool, connection, or permission is unavailable, the explicit `Current Work not updated` fallback plus the reason satisfies the tracker portion of completion; reconcile it later when a subsequent authorized agent has access.

Portfolio-specific completion and verification requirements in `AGENTS.md`, `ARCHITECTURE.md`, and `DESIGN.md` still apply.
