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

Use semantic tokens instead of raw color values in components. The `#f24c27` accent was recovered from the rendered rickvang.com wordmark/name treatment on 2026-09-22 rather than guessed. A new semantic color should be added to the token list before it is used in multiple places.

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
- Motion uses semantic duration/easing tokens: `--motion-fast: 150ms`, `--motion-standard: 240ms`, `--motion-slow: 320ms`, `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`, and `--ease-emphasized: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Public page entry is a non-blocking `240ms` chapter reveal from 0.96 opacity and a 0.625rem vertical offset; content exists in the DOM immediately and does not wait for animation completion.
- Mobile drawer entry uses `240ms` emphasized easing with a 1rem horizontal offset; the backdrop fades over `150ms`. Close is intentionally immediate so Escape, route selection, and focus recovery win over decoration.
- Rail state, hover/focus, and feedback transitions use the `150ms` fast token.
- Loading indicators remain an `800ms linear` functional animation.
- There is no splash intro, scroll-jacking, autoplay cinematic sequence, or animation prerequisite for reading/navigation.
- `prefers-reduced-motion: reduce` removes the chapter, drawer, backdrop, and feedback animations; it also removes smooth scrolling and collapses other transitions to effectively immediate state changes.

## Cinematic motion contract

Motion supports continuity and hierarchy; it never carries the only copy of state or delays task completion.

| Pattern | Trigger | Duration / easing | Interruption | Repeat behavior | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Active rail marker + link state | Route/pathname changes, hover, or focus | `150ms` / `--ease-standard` | The newest route/pointer/focus state wins immediately; CSS transitions reverse naturally | Every applicable route or interaction state change | State changes immediately; active text + marker remain visible |
| Public chapter entry | A public route/page node mounts | `240ms` / `--ease-standard` | Navigation/unmount cancels the prior animation; the next route begins from its own current state | Once per public page mount, including direct loads | No animation; content renders at final opacity/position |
| Mobile drawer entry | Menu changes from closed to open | drawer `240ms` / `--ease-emphasized`; backdrop `150ms` / `--ease-standard` | Escape, backdrop/close action, or route selection closes immediately; no exit animation is allowed to delay focus recovery | Every explicit open | No animation; drawer appears in final position |
| Mobile drawer close | Escape, close control, backdrop, or route selection | `0ms` intentional | Close/focus recovery is authoritative | Every close | Same immediate behavior |
| Button / link affordance | Hover or focus state changes | `150ms` / `--ease-standard` | Latest pointer/focus state wins; transitions may reverse | Every interaction | Effectively immediate |
| Feedback message entry | Success/error feedback node appears | `150ms` / `--ease-standard` | New feedback replaces/cancels the prior node animation | Once per newly mounted feedback message | No animation |
| Case-study entry | Shared case-study page mounts | Inherits public chapter entry until the case-study template introduces a justified override | Navigation/unmount wins | Once per case-study mount | Inherits final-state rendering |
| Media reveal | Media is added and approved for a case study | **Not implemented yet.** Default requirement is visible content without JS; any later reveal must stay within `240ms` and use existing easing tokens | Scrolling/navigation must never leave media hidden | At most once per media item per page mount | Media renders immediately |

### Motion implementation rules

1. Prefer CSS transitions/animations for presentational motion; do not add a motion dependency while these patterns remain expressible in the platform.
2. Keep entering content visible throughout the effect. The current chapter reveal begins at 0.96 opacity rather than 0.
3. Close, cancellation, route navigation, browser history, keyboard input, and focus recovery take priority over completing an animation.
4. Do not queue animations. If state changes while an effect is running, current state becomes authoritative.
5. Motion may repeat when a user explicitly repeats an interaction or mounts a new route; it must not loop for decoration.
6. A pattern is not implementation-complete until its reduced-motion behavior is defined and verified.
7. The shared case-study template now inherits public chapter entry. Section navigation itself stays native and immediate; media reveal remains deferred until approved media exists, and no hidden placeholder DOM is created solely to demonstrate motion.

## Component inventory

These are the reusable components currently in `src/components/`.

| Component | Role | Inputs | Important states |
| --- | --- | --- | --- |
| `SiteShell` | Persistent public navigation and content frame | `children` | Desktop rail; mobile closed/open drawer; active route; keyboard Escape/Tab trap; no-JS fallback |
| `CaseStudyList` | Public approved-work index/cards | `caseStudies`, optional empty copy | Approved list; empty review-gated state |
| `CaseStudyTemplate` | Shared case-study renderer for public and local review surfaces | `caseStudy`, `mode` | Public approved rendering; local draft review with provenance/evidence |
| `EditorialDraftPreview` | Local-only review surface for source-backed article drafts | `draft` | Draft article, evidence details, source provenance, curation notes |
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
4. **Transitions and motion** — what triggers each state; duration and easing when animated; interruption/cancellation behavior; repeat behavior; feedback; and recovery.
5. **Keyboard and focus** — native tab order, activation keys, focus visibility, and any intentional focus movement.
6. **Validation and safety** — client/server validation, data transmission, confirmation, and destructive-action rules.
7. **Responsive behavior** — layout changes, touch targets, wrapping, and overflow expectations.
8. **Accessibility contract** — accessible names, roles, descriptions, live regions, and disabled semantics.
9. **Harness and verification** — deterministic fixture states, stable selectors, and browser/unit acceptance checks.

### Case-study template contract

`CaseStudyTemplate` is the single renderer for case-study detail content.

- **Public mode:** receives only approved records from the route boundary; review evidence and curation notes are not rendered.
- **Review mode:** is local-harness only and adds an explicit draft banner, source provenance, curation notes, and per-section evidence details without changing the underlying content.
- **Section navigation:** uses native anchor links generated from the ordered typed section contract. Missing sections remain absent rather than receiving invented filler.
- **Client-IP note:** remains attached whenever the case-study record carries the imported disclaimer.
- **Responsive behavior:** desktop uses a sticky local section index beside reading content; at the public shell breakpoint the index becomes static and precedes the sections.
- **Motion:** inherits the public page chapter entry. Section navigation is immediate and never depends on JavaScript animation.
- **Publication safety:** `CaseStudyList` and `/work/[slug]` consume approval-filtered data. Draft records may be exercised only through the local development harness until an explicit content decision changes their status.
- **Verification:** unit coverage checks approval filtering/lookup; browser coverage checks both imported drafts through review mode and proves their public detail URLs return 404 while draft.

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

**Transitions:** active rail state uses the fast motion token. Opening the drawer runs the documented 240ms drawer / 150ms backdrop entry while body scrolling is locked and focus moves into the drawer. Explicit close, backdrop close, Escape, or route selection interrupts immediately rather than waiting for an exit animation. Explicit close or Escape returns focus to the menu button; route selection moves focus to the persistent main-content region. Reopening repeats the entry motion; no animation is queued.

**Keyboard and focus:** rail links remain in native document order. The drawer traps Tab/Shift+Tab only while open and closes on Escape. The global skip link targets `#main-content`.

**Responsive behavior:** the fixed rail is used above `900px`; at `900px` and below it is replaced by the sticky mobile bar and drawer. Public content drops its rail offset at the same breakpoint.

**Accessibility contract:** active route uses `aria-current="page"` plus a visible marker, not color alone. The mobile toggle exposes `aria-expanded` and `aria-controls`; the open drawer uses `role="dialog"` and `aria-modal="true"`. A no-JavaScript navigation list preserves access to the public routes. Reduced-motion users get final-state rendering without chapter/drawer/backdrop/feedback animation.

**Verification:** Playwright covers rail visibility and active state on default desktop, drawer behavior at mobile/tablet widths, Escape/focus return, route focus handoff, viewport overflow, and reduced-motion final-state behavior. Dedicated visual snapshots remain a Phase 6 harness task.

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
- Public case-study lists and detail routes receive only records with `reviewStatus: "approved"`; the same template may render drafts only in local review mode.
- Authored AI Systems and UI Design Practices case studies live under `content/drafts/` and are parsed into the same typed case-study contract with a draft-only source guard.
- The persona-led design article is a separate typed editorial draft and is not connected to the public post adapter.
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
