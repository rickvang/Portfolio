# Portfolio design system

This document is the working visual and interaction contract for rickvang.com. It describes the design system that is implemented today, not a speculative redesign. The local development harness at [`/dev/harness`](http://localhost:3000/dev/harness) is the living component and state reference.

## Design direction

The portfolio uses a quiet editorial foundation for systems-oriented product design work:

- content leads; decoration supports comprehension;
- warm neutral surfaces keep long-form case-study content comfortable to read;
- deep green provides a restrained action and identity accent;
- generous spacing creates hierarchy without introducing visual noise;
- every important flow has an explicit loading, empty, error, disabled, and long-content behavior;
- the system favors native HTML, readable markup, and progressive enhancement over interaction for its own sake.

The current system is CSS-variable based. Tailwind and a third-party component library are not required for this application.

## System ownership

| Concern | Location | Rule |
| --- | --- | --- |
| Design tokens and global primitives | `src/app/globals.css` | Add or update tokens here before scattering new values through components. |
| Reusable presentation and interaction | `src/components/` | Components receive data and callbacks; they do not create external-service clients. |
| Deterministic component states | `fixtures/seed.json`, `src/lib/fixtures.ts` | Add fixture data and type changes together. |
| State catalog | `src/components/harness-playground.tsx` | Make important states visible and direct-linkable through `/dev/harness?state=...`. |
| Product and data boundaries | `src/app/`, `src/lib/` | Keep route orchestration, adapters, validation, and auth outside presentation components. |

## Tokens

The source of truth is `src/app/globals.css`. These are the currently implemented values.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#f7f5f0` | Page background |
| `--surface` | `#fffdf8` | Cards, fields, and elevated content |
| `--surface-muted` | `#eeece5` | Secondary surfaces and disabled fields |
| `--foreground` | `#1d1c1a` | Primary text and strong borders |
| `--muted` | `#6d6a63` | Supporting text and secondary navigation |
| `--border` | `#d8d4c9` | Dividers, card borders, and field borders |
| `--accent` | `#1d5b52` | Primary actions, eyebrows, and active emphasis |
| `--accent-strong` | `#12483f` | Hover state for primary actions |
| `--danger` | `#9c342e` | Destructive actions and failures |
| `--success` | `#176648` | Successful feedback |
| focus ring | `#8bc9ba` | Keyboard focus indication |

Use semantic tokens instead of raw color values in components. A new semantic color should be added to the token list before it is used in multiple places.

### Typography

- The current body font stack is `Arial, Helvetica, sans-serif`.
- Headings use tight line-height (`1.1`) and negative tracking for an editorial, compact silhouette.
- `h1` uses `clamp(3rem, 8vw, 6.5rem)` and is constrained to roughly 11–14 characters per line depending on the surface.
- `h2` uses `clamp(1.8rem, 4vw, 3.2rem)`.
- `h3` is `1.3rem`.
- Supporting copy uses the `--muted` token and a line-height between `1.6` and `1.8`.
- `.eyebrow` is uppercase, bold, `0.75rem`, and letter-spaced at `0.12em`.

Do not use heading levels only for visual size. Preserve document hierarchy and use a class when the visual size differs from the semantic level.

### Layout and spacing

- `.site-shell` is centered at a maximum width of `1120px` with responsive horizontal padding: `clamp(1.25rem, 4vw, 4rem)`.
- The hero uses generous vertical space: `clamp(5rem, 14vw, 10rem)` above and `7rem` below on larger screens.
- Major sections use a top divider and `5rem` vertical padding.
- Cards use responsive padding: `clamp(1.25rem, 3vw, 2rem)`.
- Repeated grids use a `1rem` gap.
- The current spacing values are intentionally simple rather than a full numeric scale. Prefer an existing value; introduce a token if a new value repeats.

### Shape, elevation, and motion

- Standard card radius: `--radius: 1rem`.
- Pills use `999px` radius for buttons, tags, and compact status labels.
- Cards use `--shadow: 0 18px 50px rgb(29 28 26 / 8%)`.
- Interactive buttons transition background, border, and a small `1px` lift over `150ms ease`.
- Loading indicators use an `800ms linear` rotation.
- Page anchor scrolling is smooth, but motion should remain supplementary and should not carry meaning.
- Respect a future reduced-motion preference if animated surfaces become more prominent.

## Component inventory

These are the reusable components currently in `src/components/`.

| Component | Role | Inputs | Important states |
| --- | --- | --- | --- |
| `ContactForm` | Contact form boundary | `disabled`, `initialStatus` | Idle, success, error, disabled |
| `ProjectList` | Project card collection | `projects`, `state` | Success, loading, empty, error, long content |
| `PostList` | Public/admin-friendly post card collection | `posts`, `state` | Success, loading, empty, error, long content |
| `AdminWorkflowPreview` | Harness preview of author actions | `state` | All six harness states; action buttons disabled during loading/disabled |
| `AdminLoginForm` | Server Action-backed sign-in form | `nextPath` | Idle, pending, error |
| `PostEditorForm` | Create/edit post form | `action`, `initialValues` | Create, edit, pending, validation/action error |
| `PostStatusActions` | Status and deletion controls | `postId`, `status` | Publish, archive, move to draft, delete, pending, error |
| `AdminSetupState` | Missing-configuration explanation | none | Configuration error |
| `HarnessPlayground` | Local-only component/state catalog | `initialState` | State switching, reset, deep-linked initial state |

### Component rules

1. Keep components focused on presentation and interaction. Supabase, auth, and external-data clients belong behind `src/lib/` adapters or Server Actions.
2. Prefer explicit props and discriminated state types over hidden global state.
3. Keep client boundaries narrow. Add `"use client"` only when a component needs browser interaction or client state.
4. Use native controls before introducing custom primitives.
5. Keep actions visible in disabled states so the harness and users can understand what is unavailable.
6. Keep long content valid. Titles, excerpts, tags, and status metadata must wrap without forcing horizontal overflow.
7. Add a component to the harness when it has a meaningful state or is reused across a product flow.

## Interaction specifications

Every important interactive component should have a short interaction specification before its behavior is expanded. Use this structure:

1. **Purpose** — the user goal and the boundary of the component.
2. **Anatomy** — semantic elements, labels, actions, and feedback regions.
3. **States** — default, hover, focus, pressed, disabled, loading, success, error, empty, and long-content states that apply.
4. **Transitions** — what triggers each state, what feedback appears, and how the user recovers or cancels.
5. **Keyboard and focus** — native tab order, activation keys, focus visibility, and any intentional focus movement.
6. **Validation and safety** — client/server validation, data transmission, confirmation, and destructive-action rules.
7. **Responsive behavior** — layout changes, touch targets, wrapping, and overflow expectations.
8. **Accessibility contract** — accessible names, roles, descriptions, live regions, and disabled semantics.
9. **Harness and verification** — deterministic fixture states, stable selectors, and browser/unit acceptance checks.

### Representative interaction specification: `ContactForm`

**Purpose:** collect a visitor's contact intent. The current implementation is local-first and simulates feedback; it does not transmit data to an external service.

**Anatomy:** visible labels for name, email, and message; native text controls; a submit button; and an `aria-live="polite"` feedback region.

**Current states:**

- `idle`: fields and submit action are available.
- `success`: the harness initializes the feedback region with “Message ready to send.”; a local submit also produces that message.
- `error`: the harness exposes an actionable error message with `role="alert"`.
- `disabled`: native controls and submit action are disabled and the state explains why.
- `loading`, `empty`, and `long-content`: the harness keeps the form idle because those states belong to the data surfaces in this component group.

**Transitions:** submitting prevents the browser's default navigation and changes local state to success when enabled. A disabled form does not submit. A future real contact adapter must define pending, retry, and transmission-error behavior before it is connected.

**Keyboard and focus:** use the browser's native form tab order; submit from a focused control using the native form behavior; preserve the global visible focus ring; do not add custom focus movement until a concrete recovery flow requires it.

**Validation and safety:** the current form uses the native email input type but does not yet transmit or perform server-side validation. A future integration must validate with the application's server boundary before sending contact data and must document consent, failure, and retry behavior.

**Responsive behavior:** the form remains a single-column grid and controls use the shared full-width field treatment. Verify it at mobile width through the harness.

**Accessibility and selectors:** labels are associated with controls by `htmlFor`/`id`; feedback uses `aria-live`; failures use `role="alert"`; the form and feedback region expose `data-testid="contact-form"` and `data-testid="contact-feedback"` for harness-bound tests. Prefer labels and roles in tests when they identify the behavior directly.

**Verification:** `tests/e2e/harness.spec.ts` verifies that the success form can submit locally and that the disabled fixture disables both a field and the submit button.

## State matrix

The harness accepts `success`, `loading`, `empty`, `error`, `disabled`, and `long-content` through the visible controls or a direct URL such as `/dev/harness?state=error`.

| Harness state | Data surfaces | Contact surface | Author preview |
| --- | --- | --- | --- |
| `success` | Fixture projects and posts render as cards | Success feedback is visible | Draft-ready actions are enabled |
| `loading` | Lists show a spinner and `aria-busy` | Form remains idle | Session/loading copy; actions disabled |
| `empty` | Lists explain that no content exists and offer the next action | Form remains idle | No-drafts copy |
| `error` | Lists expose an actionable alert | Error feedback is visible | Author-tools failure copy |
| `disabled` | Fixture content remains inspectable | Inputs and submit are disabled | Actions are visible but disabled |
| `long-content` | Expanded fixtures exercise wrapping and density | Form remains usable | Long-title metadata fixture |

When a new important state is introduced, update all four places together:

1. `HarnessState` and fixture helpers in `src/lib/fixtures.ts`;
2. the state controls and mapping in `src/components/harness-playground.tsx`;
3. the affected reusable component;
4. browser coverage and this matrix.

## Accessibility contract

- Use real `button`, `a`, `form`, `label`, `input`, and `textarea` elements.
- Every form field has a visible label and a stable `htmlFor`/`id` relationship.
- Use `aria-live="polite"` for non-blocking form feedback and `role="alert"` for failures.
- Use `aria-busy="true"` on loading data surfaces.
- Use `aria-pressed` for the harness state toggle group.
- Preserve a visible `:focus-visible` ring with sufficient contrast.
- Keep heading levels in document order.
- Prefer Playwright roles, labels, and visible text. Use `data-testid` only for harness roots and state boundaries that do not have a better semantic locator.
- Do not use color alone to communicate status; pair it with text or a semantic label.

## Responsive behavior

The main breakpoint is `760px`:

- desktop/tablet: two-column project, post, split, and harness layouts where content supports it;
- mobile: grids collapse to one column, headers and admin rows stack, and action groups wrap;
- content determines height; fixed heights are reserved for loading placeholders and minimum card rhythm;
- test long titles and long excerpts at mobile widths before shipping.

Use the harness at normal desktop width and a narrow viewport to validate layout changes. The Playwright suite includes default, mobile, and tablet projects.

## Content presentation

- Portfolio/profile content and reusable presentation are separate concerns.
- Project and post summaries should be concise enough for cards; full content belongs on detail surfaces.
- Public posts are rendered only when their status is `published`.
- Draft, archived, and unpublished content must not leak through public components or metadata.
- Preserve the client-IP disclaimer when importing case-study material from the existing site.
- Treat testimonials and personal contact information as reviewable content, not automatic fixtures.

## Verification workflow

Before a UI change is complete:

1. Start with the relevant harness state, for example `/dev/harness?state=long-content`.
2. Verify keyboard focus, labels, empty/error feedback, and responsive layout.
3. Run the narrowest relevant test while iterating.
4. Run the full baseline before handoff:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

The local harness is disabled or inaccessible in production. Do not add a visual or component-library dependency unless the current harness and CSS-variable system no longer provide enough coverage.

## Extension checklist

When adding a component or pattern:

- identify whether it belongs in `src/components/` or is route-specific;
- reuse the existing semantic tokens and spacing rhythm;
- define loading, empty, error, disabled, and long-content behavior when applicable;
- add stable accessible selectors through semantics first;
- add a deterministic fixture and harness preview for meaningful states;
- update this document and the relevant architecture/decision record;
- run the verification commands before completing the change.
