# Work Order — Issue #44 homepage positioning and work hierarchy

- Work Order ID: WO-2026-09-23-issue-44-homepage-positioning
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-44-homepage-positioning
- GitHub issue: https://github.com/rickvang/Portfolio/issues/44
- Current Work: CW-59
- Current Work URL: https://app.notion.com/3e5cd82535ff81149553e524a8f420e9
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → Portfolio content contract → GitHub implementation → CI/Vercel verification
- Request mode: scoped implementation and completion

## Objective

Translate the broad portfolio research into a content-first homepage pass without changing the visual system.

## Scope

- replace the abstract Home thesis with a concrete systems-design positioning statement;
- use source-backed supporting copy across product architecture, design systems, AI-assisted workflows, and durable implementation practice;
- make Multi Product Integrations, AI Systems, Design Systems, and UI Design Practices the four homepage evidence anchors;
- move AI Systems to the second slot;
- use concise homepage-specific transformation statements while preserving canonical case-study content;
- keep How I work compact and supportive;
- preserve Notes, About, rail, typography, color, publication, and evidence behavior.

## Constraints

- no new metrics or unsupported claims;
- no case-study detail rewrite;
- no visual-system or color-token change;
- do not merge or copy the Issue #43 color-study selector into this branch;
- keep current publication and accessibility contracts intact.

## Evidence

The homepage transformation statements are bounded paraphrases of the approved case-study summaries and sections already present in the Portfolio content sources. The underlying source records remain unchanged.

## Current phase

Implementation rendered correctly at desktop and narrow widths and CI #106 passed all repository gates. PR review identified one content-ownership issue: homepage-specific transformation copy had been embedded in the reusable Work Index component. The correction moves that copy into the Home route and passes explicit presentation items into the reusable component without changing rendered behavior. Next: rerun final gates and merge if clean.

## Completion boundary

Complete when the source-backed homepage positioning and Selected Work hierarchy are merged with green repository gates and a READY Vercel deployment.