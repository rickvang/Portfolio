# Work Order — Issue #43 reduced warm chroma production selection

- Work Order ID: WO-2026-09-23-issue-43-reduced-warm-chroma
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-43-reduced-warm-chroma
- GitHub issue: https://github.com/rickvang/Portfolio/issues/43
- Current Work: CW-58
- Current Work URL: https://app.notion.com/3e4cd82535ff819aab4bef476c4640fd
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: SkillRepo aesthetic-reasoning/color-saturation → Portfolio production tokens → CI/Vercel verification

## Selection

Rick selected candidate B — reduced warm chroma — from the rendered A/B/C study.

Production semantic tokens:
- background: #f7f6f2
- surface: #fffefc
- surface-muted: #e8e7e4
- surface-strong: #dcdcd9
- border: #cfcfcc

Foreground, muted text, orange accent, status colors, typography, layout, and content hierarchy remain unchanged.

## Headline adjustment

During the production pass Rick preferred the earlier portfolio voice. Restore:

“Designing human-centered systems for what’s next.”

Keep the newer supporting sentence underneath so the opening still communicates product architecture, design systems, and AI-assisted workflows concretely.

## Boundary

Do not merge the experimental color selector/query behavior. This branch starts from current main and contains only the selected production tokens, the headline restoration, corresponding design-contract/test updates, and this Work Order.

## Next action

Open the scoped PR, run all repository gates, inspect Home and Multi Product Integrations at desktop/narrow widths, and merge if review and deployment checks pass.
