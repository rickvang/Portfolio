# Work Order — Issue #47 restrained motion polish

- Work Order ID: WO-2026-09-23-issue-47-restrained-motion
- Status: active
- Created: 2026-09-23
- Last updated: 2026-09-23
- Repository: rickvang/Portfolio
- Branch: codex/issue-47-restrained-motion
- GitHub issue: https://github.com/rickvang/Portfolio/issues/47
- Current Work: CW-60
- Current Work URL: https://app.notion.com/3e5cd82535ff818481e7c9eb6f056282
- Parent Current Work: CW-52
- Requester: Rick
- Owner: ChatGPT
- Operating Route: Riley Morgan / ai-orchestrator → Impeccable motion refinement → Portfolio implementation → CI/Vercel verification

## Objective

Add restrained motion polish without changing content, IA, typography, or the selected reduced-warm palette.

## Implementation

- Replace the static per-link orange dot with a shared measured marker inside the desktop Personal Practice rail.
- Keep semantic active state on `aria-current`; the marker is decorative.
- Let the marker temporarily follow pointer hover and keyboard focus, then return to the active route.
- Add a one-time Home entrance sequence using only small translation, opacity, and structural-rule reveal.
- Add subtle background/divider emphasis and a 3–4 px arrow translation to Selected Work hover/focus.
- Disable the motion layer under `prefers-reduced-motion: reduce`.
- Keep narrow navigation static.

## Constraints

No animation library, parallax, looping motion, cursor effects, page-transition theater, scroll-jacking, or motion-dependent meaning.

## Current phase

Implementation is complete on the branch. GitHub CI run #112 passed database validation, lint, typecheck, unit tests, Playwright (including reduced-motion/marker contracts), visual-capture generation, and production build. Cursor review approved the change with no findings. The first Vercel preview request was rejected before build by the account build-rate limiter, not by application code. This checkpoint commit is the single controlled preview retry; do not create a retry loop.


## Review refinement

After Vercel deployment recovery, the motion preview successfully entered a real Vercel build. Codex review identified three interaction-contract gaps, all addressed in one follow-up commit:

- narrow Personal Practice navigation explicitly disables the desktop rail entrance animation;
- desktop entrance opacity now begins at a readable partial state rather than near-zero;
- pointer leave preserves a keyboard-focused rail link before falling back to the active route.

Playwright coverage now checks the static narrow rail and mixed pointer/keyboard marker behavior.
