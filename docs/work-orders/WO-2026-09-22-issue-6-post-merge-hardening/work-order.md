# Work Order — Issue #6 post-merge hardening

- Work Order ID: `WO-2026-09-22-issue-6-post-merge-hardening`
- Status: active
- Created: 2026-09-22
- Last updated: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `fix/issue-6-post-merge-hardening`
- Related issue: https://github.com/rickvang/Portfolio/issues/6
- Current Work: `CW-34`
- Requester: Rick
- Owner: Riley Morgan / current implementation agent
- Operating Route: Riley Morgan / `ai-orchestrator` → frontend hardening

## Objective

Correct the destructive-action hardening gap that remained after PR #18 merged Issue #6: keep the native confirmation control, enforce the same confirmation value in the server action, and repair the harness UUID so the regression journey reaches the intended server boundary.

## Scope

- Validate `confirmDelete === "delete"` server-side before auth/deletion.
- Use a valid non-production UUID in the delete harness fixture.
- Keep DESIGN.md aligned with the no-JavaScript-safe confirmation contract.
- Run the normal Portfolio verification gate.

## Non-goals

- No redesign expansion.
- No content publication or approval.
- No schema, dependency, paid-service, or external-integration change.
- No explicit deployment operation.

## Evidence

PR #16 automated review identified that a JavaScript-only confirmation could be bypassed before hydration. PR #18 merged a partial correction with the native checkbox but without server-side validation; current main also retained a non-versioned harness UUID that prevented the confirmed-path test from reaching the Supabase configuration boundary.

## Current phase

Implementation complete; verification pending.

## Next action

Open the corrective PR against current main, run review/CI, and follow the repository merge contract if all gates pass.
