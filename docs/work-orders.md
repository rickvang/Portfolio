# Portfolio Work Orders

A Work Order is an **optional** repo-local execution and recovery record for Portfolio work that needs durable state beyond its existing authoritative surfaces. Create one when interruption, cross-agent handoff, multi-phase gates, non-obvious accepted evidence, or complex recovery would otherwise require reconstructing hidden decisions.

Do not create a Work Order merely because a change is important, risky, multi-file, multi-step, or heavily tested. The deciding factor is the **tracking/recovery footprint**.

## Decision rule

Before creating a Work Order, ask:

> If the agent stops mid-task, can another agent resume safely from the Portfolio task in Taskosaur, the GitHub issue or PR, and existing project artifacts without reconstructing hidden decisions?

- **Yes:** no separate Work Order is required. Reuse the existing authoritative surfaces.
- **No:** create or continue a Work Order.

A bounded no-Work-Order change is valid when the existing surfaces already preserve:

- objective and scope;
- current owner or Operating Route;
- accepted evidence or decision boundary;
- blocker and resumable next action;
- completion criteria.

Move into a Work Order as soon as those surfaces stop being enough—for example, when work becomes interruptible across agents/sessions, has multi-phase gates that are hard to reconstruct, or needs durable accepted-evidence/decision state that does not belong in the issue/PR or a project artifact.

Omitting a Work Order does **not** remove Taskosaur task continuity, Riley supervision, Work Graph membership, authorization, validation, design/architecture artifacts, or live-state refresh requirements.

## State hierarchy

1. **Portfolio task in Taskosaur** — search the Portfolio project in the configured workspace for the matching workstream. Read its objective, owner, operating route, parent task when applicable, next action, blocker, latest checkpoint and evidence links.
2. **Work Order or project artifact** — follow the task’s link to the artifact that holds the execution or recovery details. This may be a GitHub issue, a PR, a design decision or a Work Order. Keep private evidence with its authorized readers.
3. **Live systems** — refresh GitHub checks, review or merge state, Vercel deployments, Supabase state and permissions when they affect the next action. Record the last verified checkpoint in the task.

## Riley continuity

For every substantial workstream, Riley Morgan / `ai-orchestrator` is the default durable orchestration owner unless the requester establishes another orchestration boundary.

The selected Persona, Skill, Playbook, Tool path, specialist, or runtime may execute directly without an extra Riley runtime hop. Reconcile Riley's durable orchestration state at:

- workstream creation;
- material rerouting;
- cross-agent handoff;
- major blocker;
- completion.

A Work Order is not required merely because Riley or a Work Graph is involved. If a WorkNode is supervised, keep its authoritative dispatch, dependencies, gates, evidence requirements, and disposition whether or not a Work Order exists.

## Storage and closeout

Active Work Orders live at:

`docs/work-orders/<work-order-id>/work-order.md`

Terminal Work Orders (`complete`, `no-go`, or `cancelled`) move to:

`docs/work-orders/archive/YYYY-MM/<work-order-id>/work-order.md`

Archival is lifecycle classification, not deletion.

When the implementation pull request is the final repository change for a Work Order, record the terminal status and move the package to the archive **in that implementation PR**. Do not create a later archive-only PR unless a real correction is needed.

This same-PR closeout avoids an unnecessary documentation-only repository mutation and the additional production Vercel deployment it can trigger. Do not change Vercel deployment configuration merely to compensate for an avoidable archive-only PR.

## Minimum contract when a Work Order is used

A Work Order should record:

- Work Order ID and title;
- status;
- created / last-updated date;
- public GitHub issue or PR (link back to this Work Order from the private Taskosaur task);
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

A Work Order records authorization; it never invents it. Link specialized artifacts rather than duplicating their content.

## Progress updates

Update a Work Order only when state materially changes: a phase starts/completes, an important decision is made, evidence changes the direction, a blocker appears, a handoff occurs, validation changes the next action, or the work completes.

Do not turn it into a transcript or duplicate every commit/check.

## Completion

When a Work Order exists, it is complete when the scoped outcome is in place, directly inspectable structure/invariants are correct, applicable checks have passed or remaining uncertainty is stated, authorization boundaries were respected, and the Portfolio task in Taskosaur records the outcome. If the implementation PR is the final repository change, terminalize and archive the Work Order in that same PR.

For a no-Work-Order change, record completion in the Portfolio task with the issue, PR or relevant project artifacts; do not create a Work Order only to record that the work finished.

If access to the Portfolio task is unavailable, report the access gap and the checkpoint still to record. An agent with access can reconcile it there.

Portfolio-specific completion and verification requirements in `AGENTS.md`, `ARCHITECTURE.md`, and `DESIGN.md` still apply. The normal `pnpm verify`, browser verification where applicable, GitHub review/merge, and deployment authorization semantics are unchanged.
