# Work Order — Issue #43 relational background color study

- Work Order ID: WO-2026-09-23-issue-43-relational-color-study
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-43-relational-color-study
- GitHub issue: https://github.com/rickvang/Portfolio/issues/43
- Current Work: CW-58
- Current Work URL: https://app.notion.com/p/3e4cd82535ff819aab4bef476c4640fd
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: SkillRepo aesthetic-reasoning/color-saturation → Impeccable color review → Portfolio preview experiment
- Request mode: exploration and selection, not production authorization

## Objective

Compare the exact shipped semantic palette against two relational alternatives on the real Personal Practice surface while keeping content, typography, layout, accent, foreground, and interaction behavior constant.

## Candidates

- A: exact production control.
- B: reduced-chroma warm canvas seed `#f7f6f2`.
- C: near-neutral canvas seed `#f4f5f3`.

B and C derive surface, muted/strong surface, and border roles from the seed with relative OKLCH where supported and static fallbacks otherwise. Foreground and orange semantic roles remain independently authored.

## Review mechanism

On this branch only, append `?color=a`, `?color=b`, or `?color=c` to Personal Practice routes. A small review control identifies the active candidate. Without the query parameter the branch renders the production control.

## Boundary

The query selector and candidate recipes are exploratory. Do not merge them as production behavior. After rendered review, record a selection or defer; only then remove the selector and implement the selected token strategy in a separately validated production commit.

## Next action

Render Home and Multi Product Integrations at desktop and narrow widths for A/B/C, record observed differences separately from hypotheses, and bring the comparison to Rick for the material visual selection.
