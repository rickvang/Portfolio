# Interaction specifications

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
- **Review mode:** is local-harness only and adds an explicit draft/review-ready banner, source provenance, curation notes, and per-section evidence details without changing the underlying content.
- **Chapter navigation:** existing typed sections are grouped into the canonical path `Context → Personas → Exploration → System → Outcomes`. A chapter appears only when at least one evidence-backed section maps to it; missing chapters stay absent rather than receiving invented filler.
- **Section detail:** source sections remain individually addressable inside a chapter so imported provenance and review evidence stay attached to their original content unit.
- **Project translation:** an approved system-practice section may use ExperiencePresentation when profile evidence and stable item membership validate. The profile must not replace, reorder, or invent source facts. Unknown or thin approved content uses its original text and item order.
- **Evidence trace:** detail presentations link to their source sections. Review evidence remains available only in review mode.
- **Client-IP note:** remains attached whenever the case-study record carries the imported disclaimer.
- **Responsive behavior:** desktop uses a sticky local chapter index beside reading content; at the public shell breakpoint the index becomes static and precedes the chapters.
- **Motion:** chapter blocks use capped CSS-first entry staging. Anchor navigation is immediate and never depends on JavaScript animation.
- **Publication safety:** `CaseStudyList` and `/work/[slug]` consume only `reviewStatus: "approved"` data. `draft` and `review-ready` records remain local-review only; authored source location does not override record status.
- **Verification:** unit coverage checks approval filtering/lookup and chapter grouping; browser coverage verifies approved imported and authored work publicly while the harness preserves provenance/evidence review.

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

**Keyboard and focus:** rail links remain in native document order. On charcoal navigation surfaces, focus uses a light inner outline plus orange outer ring; light surfaces keep the global two-tone ring. The drawer traps Tab/Shift+Tab only while open and closes on Escape. The global skip link targets `#main-content`.

**Responsive behavior:** the fixed rail is used above `900px`; at `900px` and below it is replaced by the sticky mobile bar and drawer. Public content drops its rail offset at the same breakpoint.

**Accessibility contract:** active route uses `aria-current="page"` plus a visible marker, not color alone. The mobile toggle exposes `aria-expanded` and `aria-controls`; the open drawer uses `role="dialog"` and `aria-modal="true"`. A no-JavaScript navigation list preserves access to the public routes. Reduced-motion users get final-state rendering without chapter/drawer/backdrop/feedback animation.

**Verification:** Playwright covers rail visibility and active state on default desktop, drawer behavior at mobile/tablet widths, Escape/focus return, route focus handoff, touch-target minimums, focus-ring visibility, motion interruption, viewport overflow, and reduced-motion final-state behavior. `/dev/harness/shell` reuses `SiteShellFrame` for deterministic route/drawer states, and CI uploads visual verification captures.

### Prioritized interaction map

The following existing surfaces use the template above. ContactForm is the representative component with a full harness journey; the server-bound forms keep their real data boundary and use the deterministic author preview for cross-cutting state inspection.

| Component | Purpose and states | Interaction and safety contract | Harness or route verification |
| --- | --- | --- | --- |
| `AdminLoginForm` | Sign an author into the content workspace; idle, pending, and error. | Native email/password fields; submit becomes disabled while pending; server action owns authentication and redirect validation; errors use `role="alert"`. | `/admin/login` is the route-level boundary; the harness author preview represents loading, error, and disabled author-tool states without credentials. |
| `PostEditorForm` | Create or edit a post; create, edit, pending, validation/action error, and long-content. | Visible labels and native required/pattern validation; server action validates title, slug, and content; pending disables the submit action; no client-side publishing or external transmission. | `/admin/posts/new` and `/admin/posts/[id]/edit` are the route-level boundaries; long-content fixtures exercise the surrounding author layout in the harness. |
| `PostStatusActions` | Change draft/published/archived status or delete an owned post. | Each status action is an explicit form; pending disables only its action; server action validates the post ID, status, and author ownership; deletion requires an explicit required confirmation control and the server action independently rejects requests without the confirmation value. | The author preview exposes the same visible action availability across loading, disabled, error, and long-content states; live status mutations remain a hosted-auth route concern. |
| Primary navigation / `SiteShell` | Move among Home, Work, Notes, About, and Contact while preserving orientation. | Desktop uses a persistent rail with text plus an active marker; mobile uses an explicitly named drawer, Escape close, focus containment while open, focus return on explicit close, and a `<noscript>` fallback. Primary destinations never depend on hover or motion. | Browser coverage verifies active-route semantics, desktop rail visibility, mobile drawer open/close, Escape, focus return, and no horizontal overflow. |
| Harness controls | Select a deterministic fixture state and restore the baseline. | Use a labeled button group with `aria-pressed`; state changes are local and synchronous; reset returns to `success`; direct URL state is accepted only from the known state union. | `/dev/harness` exposes all six fixture states, a reset control, `data-harness-state`, and stable state-region selectors. |

### Experience presentation interaction specification

- **User goal:** understand a project's source-backed system structure from a compact preview or a relevant case-study chapter.
- **Product boundary:** server-rendered Portfolio content; presentation components do not fetch from or transmit to external services.
- **Anatomy:** a named presentation heading, sourced summary or relationship, semantic list/group structure, and source-section links in detail. ArtifactFrame names the media state and explains its boundary.
- **States:** approved curated profile; unknown or thin approved content in text-first order; draft unavailable in public mode and text-only in local review; deferred or redacted media; dense and long content.
- **Transitions:** map and matrix content is static. Source-trail anchors use native links and browser history. No interaction depends on motion.
- **Keyboard and focus:** use native link tab order and the global visible focus ring. No scripted focus movement or custom activation keys.
- **Validation and safety:** a profile resolves only when approval, evidence references, and every stable item membership match. Deferred/redacted ArtifactFrame variants cannot receive media children. No data is transmitted.
- **Responsive behavior:** existing shell/content breakpoints apply; topology, matrix groups, and text lists stack at narrow widths and may not cause horizontal overflow.
- **Accessibility:** headings and unordered lists expose structure in source/read order. Source links use the section's visible title. Artifact state is named in text and not conveyed by color alone.
- **Harness and verification:** the local-only harness includes both approved projects, synthetic text-only and long-content examples marked as non-client fixtures, deferred media, redacted media, keyboard links, and reduced-motion checks.
- **Recovery and fallback:** if a profile item or its evidence disappears, use the approved source summary and remaining items in authored order. If content is not approved, public presentation is unavailable.
- **Open evaluation:** intended feelings remain hypotheses until a reader who has not seen profile metadata identifies the relationship or system structure from the surface.
