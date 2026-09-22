# Portfolio design system

This document is the working visual and interaction contract for rickvang.com. It describes the design system that is implemented today, not a speculative redesign. The local development harness at [`/dev/harness`](http://localhost:3000/dev/harness) is the living component and state reference.

## Design direction

The portfolio uses a cinematic editorial foundation for systems-oriented product design work:

- the work and authored content remain the focal point; navigation acts as a stable frame;
- a dark persistent rail creates continuity against warm neutral reading surfaces;
- the original rickvang.com accent is restored as `#f24c27` and used semantically rather than decoratively;
- small text on light surfaces uses the darker `--accent-ink` token instead of raw orange where contrast would be insufficient;
- generous spacing and compact typography create hierarchy without delaying access to content;
- every important flow has explicit loading, empty, error, disabled, long-content, keyboard, and reduced-motion behavior where applicable;
- the system favors native HTML, readable markup, progressive enhancement, and route continuity over interaction for its own sake.

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
| `--background` | `#f4f1eb` | Public page and application background |
| `--surface` | `#fffdfa` | Cards, fields, and elevated reading surfaces |
| `--surface-muted` | `#e9e4db` | Secondary surfaces and disabled fields |
| `--surface-strong` | `#ded7cc` | Stronger neutral separation when a muted surface is insufficient |
| `--foreground` | `#171614` | Primary text and strong borders |
| `--muted` | `#6b665f` | Supporting text |
| `--border` | `#d5cfc5` | Dividers, card borders, and field borders |
| `--accent` | `#f24c27` | Brand identity, active rail marker, large authored emphasis, button fill |
| `--accent-hover` | `#ff6848` | Hover fill for accent actions |
| `--accent-ink` | `#b7371c` | Small accent text and links on light surfaces |
| `--rail` | `#151311` | Persistent navigation rail and mobile drawer |
| `--rail-foreground` | `#f7f2eb` | Primary text on the rail |
| `--rail-muted` | `#aaa29a` | Secondary rail text |
| `--focus` | `#f24c27` | Keyboard focus indication |
| `--danger` | `#9c342e` | Destructive actions and failures |
| `--success` | `#176648` | Successful feedback |

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

- Public routes use `.public-shell`: a fixed `17rem` desktop rail plus a content column capped by `--content-max: 76rem`.
- The public content column uses responsive horizontal padding: `clamp(1.5rem, 5vw, 5rem)`; below `900px` it becomes full-width with a sticky mobile navigation bar.
- `.site-shell` remains the centered `1120px` container for internal/admin and development-harness surfaces; public pages no longer depend on it.
- Public heroes use a large first-view rhythm and `.public-hero` targets up to `78vh` without requiring a fixed height.
- Major sections retain a top divider and `5rem` vertical padding so long-form content keeps a predictable chapter rhythm.
- Cards use responsive padding: `clamp(1.25rem, 3vw, 2rem)`; repeated grids use a `1rem` gap.
- Prefer the existing spacing rhythm; introduce a token only when a new spacing value repeats across components.

### Shape, elevation, and motion

- Standard card radius: `--radius: 1rem`; pills use `999px` radius for buttons, tags, and compact controls.
- Cards use `--shadow: 0 18px 50px rgb(23 22 20 / 8%)`.
- Rail links and active markers use short `150ms ease` state transitions; buttons retain the small `1px` hover lift.
- Loading indicators use an `800ms linear` rotation.
- The shell does not run an intro animation or delay route content. Chapter-style route motion remains a Phase 3 concern.
- `prefers-reduced-motion: reduce` globally removes nonessential animation/transition duration and smooth scrolling.

## Component inventory

These are the reusable components currently in `src/components/`.

| Component | Role | Inputs | Important states |
| --- | --- | --- | --- |
| `SiteShell` | Persistent public navigation and content frame | `children` | Desktop rail; mobile closed/open drawer; active route; keyboard Escape/Tab trap; no-JS fallback |
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

### Interaction specification: `SiteShell`

**Purpose:** provide a stable navigation spine across public routes while keeping internal admin, API, and harness surfaces independent.

**Anatomy:** desktop `aside` rail; identity link; primary navigation; active-route marker; mobile sticky bar; menu toggle; modal drawer/backdrop; skip link; public `main` content region.

**States:** desktop rail; mobile drawer closed; mobile drawer open; active-route state; keyboard focus; reduced motion; no-JavaScript fallback navigation.

**Transitions:** desktop route state changes are immediate except for the short active-marker/color transition. Opening the drawer locks body scrolling and moves focus into the drawer. Explicit close or Escape closes the drawer and returns focus to the menu button. Selecting a route closes the drawer without queueing decorative motion.

**Keyboard and focus:** rail links remain in native document order. The drawer traps Tab/Shift+Tab only while open and closes on Escape. The global skip link targets `#main-content`.

**Responsive behavior:** the fixed rail is used above `900px`; at `900px` and below it is replaced by the sticky mobile bar and drawer. Public content drops its rail offset at the same breakpoint.

**Accessibility contract:** active route uses `aria-current="page"` plus a visible marker, not color alone. The mobile toggle exposes `aria-expanded` and `aria-controls`; the open drawer uses `role="dialog"` and `aria-modal="true"`. A no-JavaScript navigation list preserves access to the public routes.

**Verification:** Playwright covers rail visibility and active state on default desktop, drawer behavior at mobile/tablet widths, Escape/focus return, and viewport overflow. Reduced motion is enforced in CSS and will receive a dedicated visual snapshot in the later motion/harness phase.

### Prioritized interaction map

The following existing surfaces use the template above. ContactForm is the representative component with a full harness journey; the server-bound forms keep their real data boundary and use the deterministic author preview for cross-cutting state inspection.

| Component | Purpose and states | Interaction and safety contract | Harness or route verification |
| --- | --- | --- | --- |
| `AdminLoginForm` | Sign an author into the content workspace; idle, pending, and error. | Native email/password fields; submit becomes disabled while pending; server action owns authentication and redirect validation; errors use `role="alert"`. | `/admin/login` is the route-level boundary; the harness author preview represents loading, error, and disabled author-tool states without credentials. |
| `PostEditorForm` | Create or edit a post; create, edit, pending, validation/action error, and long-content. | Visible labels and native required/pattern validation; server action validates title, slug, and content; pending disables the submit action; no client-side publishing or external transmission. | `/admin/posts/new` and `/admin/posts/[id]/edit` are the route-level boundaries; long-content fixtures exercise the surrounding author layout in the harness. |
| `PostStatusActions` | Change draft/published/archived status or delete an owned post. | Each status action is an explicit form; pending disables only its action; server action validates the post ID, status, and author ownership; deletion remains visually destructive and must keep confirmation behavior explicit before expansion. | The author preview exposes the same visible action availability across loading, disabled, error, and long-content states; live status mutations remain a hosted-auth route concern. |
| Primary navigation / `SiteShell` | Move among Home, Work, Notes, About, and Contact while preserving orientation. | Desktop uses a persistent rail with text plus an active marker; mobile uses an explicitly named drawer, Escape close, focus containment while open, focus return on explicit close, and a `<noscript>` fallback. Primary destinations never depend on hover or motion. | Browser coverage verifies active-route semantics, desktop rail visibility, mobile drawer open/close, Escape, focus return, and no horizontal overflow. |
| Harness controls | Select a deterministic fixture state and restore the baseline. | Use a labeled button group with `aria-pressed`; state changes are local and synchronous; reset returns to `success`; direct URL state is accepted only from the known state union. | `/dev/harness` exposes all six fixture states, a reset control, `data-harness-state`, and stable state-region selectors. |

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

Public navigation and content use a `900px` shell breakpoint; internal grids keep the existing `760px` content breakpoint:

- above `900px`: public routes use the fixed `17rem` rail and offset content column;
- at `900px` and below: the rail is removed from layout and replaced with the sticky mobile bar plus drawer;
- at `760px` and below: project, post, split, harness, and relevant admin grids collapse to one column;
- content determines height; fixed heights remain limited to loading placeholders and minimum card rhythm;
- test long titles, long excerpts, drawer focus behavior, and route navigation at both mobile and tablet widths.

The Playwright suite includes default desktop plus dedicated mobile and tablet projects.

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
