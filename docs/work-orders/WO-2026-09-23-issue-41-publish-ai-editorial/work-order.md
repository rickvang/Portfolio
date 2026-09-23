# Work Order — Issue #41 publish prior AI editorial work

- Work Order ID: WO-2026-09-23-issue-41-publish-ai-editorial
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-41-publish-ai-editorial
- GitHub issue: https://github.com/rickvang/Portfolio/issues/41
- Current Work: CW-56
- Current Work URL: https://app.notion.com/3e4cd82535ff81019d0ec6befef1fd54
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → Portfolio content contract → GitHub implementation → CI/Vercel verification
- Request mode: scoped implementation and completion

## Objective

Promote the three existing source-backed AI editorial artifacts that were deliberately left review-only:
- AI Systems;
- UI Design Practices;
- Persona-led Design Starts Before the Screen.

Use their existing evidence and copy. Do not replace them with newly invented content.

## Decisions

- AI Systems and UI Design Practices become approved public case studies through the existing Work publication gate.
- Persona-led Design Starts Before the Screen becomes a source-controlled published Note while keeping Supabase-authored Notes supported.
- Public Notes no longer depend on deterministic fixture fallback content.
- Existing hosted Supabase rows are not deleted by this Work Order. Any cleanup of live content state requires an explicit, separately recorded mutation.
- Imported client work keeps its current approval state and evidence contracts.

## Current phase

Implementation. Branch created from current main after PR #40. Next: update authored publication schemas/status, public Notes adapter/detail rendering, docs, and tests.

## Completion boundary

Complete when the three existing authored pieces resolve publicly, repository CI and Vercel preview pass, review findings are resolved, and the scoped PR is merged.