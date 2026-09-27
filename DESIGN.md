# Portfolio design system

This document is the working visual and interaction contract for rickvang.com. It describes the design system that is implemented today, not a speculative redesign. The local development harness at [`/dev/harness`](http://localhost:3000/dev/harness) is the living component and state reference.

## Design direction

The portfolio uses a cinematic editorial foundation for systems-oriented product design work:

- the work and authored content remain the focal point; navigation acts as a stable frame;
- a warm-charcoal persistent rail creates continuity against warm neutral reading surfaces without reading as pure black chrome;
- the original rickvang.com accent is restored as `#f24c27` and used semantically rather than decoratively;
- small text on light surfaces uses the darker `--accent-ink` token, while small rail text uses the contrast-adjusted `--rail-accent` token;
- generous spacing and compact typography create hierarchy without delaying access to content;
- every important flow has explicit loading, empty, error, disabled, long-content, keyboard, and reduced-motion behavior where applicable;
- the system favors native HTML, readable markup, progressive enhancement, and route continuity over interaction for its own sake.

The current system is CSS-variable based. Tailwind and a third-party component library are not required for this application.

## Selective design references

Read only the reference needed for the current task after this core contract:

| Task | Additional reference |
| --- | --- |
| Visual-quality critique, selection gates, or design QA method | [Visual quality review](docs/design/visual-quality-review.md) |
| Translating project evidence into a portfolio experience | [Work-to-experience translation](docs/design/work-to-experience.md) |
| Detailed motion pattern timing, interruption, and reduced-motion behavior | [Motion contract](docs/design/motion.md) |
| Component interaction specification or representative behavior examples | [Interaction specifications](docs/design/interaction-specifications.md) |
| Home or Multi Product Integrations visual changes, or other Personal Practice / Working Archive pilot-specific direction | [Personal Practice pilot](docs/design/examples/personal-practice-pilot.md) |
| Why a shipped design choice exists or how a prior release was hardened | [Release and design history](docs/design/history/release-history.md) |

Do not load all references by default. `DESIGN.md` remains the current universal design contract; the files above provide conditional procedure, examples, or historical rationale.

## System ownership

| Concern | Location | Rule |
| --- | --- | --- |
| Design tokens and global primitives | `src/app/globals.css` | Add or update tokens here before scattering new values through components. |
| Authored experience profiles, presentation resolution, and work-led styling | `src/lib/experience-profiles.ts`, `src/lib/project-presentation.ts`, `src/app/work-led.css` | Profiles are authored interpretations. The resolver enforces approval, evidence, and stable membership; the feature stylesheet composes the existing semantic tokens. |
| Reusable presentation and interaction | `src/components/` | Components receive data and callbacks; they do not create external-service clients. |
| Deterministic component states | `fixtures/seed.json`, `src/lib/fixtures.ts` | Add fixture data and type changes together. |
| State catalog | `src/components/harness-playground.tsx`, `src/app/dev/harness/` | Make important states visible and direct-linkable through the core state matrix plus specialized shell and case-study harness routes. |
| Product and data boundaries | `src/app/`, `src/lib/` | Keep route orchestration, adapters, validation, and auth outside presentation components. |

## Tokens

The source of truth is `src/app/globals.css`. These are the currently implemented values.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#f7f6f2` | Public page and application background |
| `--surface` | `#fffefc` | Cards, fields, and elevated reading surfaces |
| `--surface-muted` | `#e8e7e4` | Secondary surfaces and disabled fields |
| `--surface-strong` | `#dcdcd9` | Stronger neutral separation when a muted surface is insufficient |
| `--foreground` | `#171614` | Primary text and strong borders |
| `--muted` | `#6b665f` | Supporting text |
| `--border` | `#cfcfcc` | Dividers, card borders, and field borders |
| `--accent` | `#f24c27` | Brand identity, active rail marker, large authored emphasis, button fill |
| `--accent-hover` | `#ff6848` | Hover fill for accent actions |
| `--accent-ink` | `#b7371c` | Small accent text and links on light surfaces |
| `--rail` | `#282622` | Warm-charcoal persistent navigation rail and mobile drawer |
| `--rail-foreground` | `#f7f2eb` | Primary text on the rail |
| `--rail-muted` | `#b6afa3` | Secondary rail text |
| `--rail-accent` | `#ff6848` | Contrast-adjusted orange for small rail indices and active markers |
| `--rail-border` | `rgb(247 242 235 / 14%)` | Rail separators on charcoal |
| `--focus` | `#f24c27` | Selected-state accent and legacy focus-related emphasis |
| `--focus-inner` | `#fffdfa` | Light inner edge of the two-tone keyboard focus ring |
| `--focus-outer` | `#171614` | Dark outer edge of the two-tone keyboard focus ring |
| `--danger` | `#9c342e` | Destructive actions and failures |
| `--success` | `#176648` | Successful feedback |

Use semantic tokens instead of raw color values in components. The `#f24c27` accent was recovered from the rendered rickvang.com wordmark/name treatment on 2026-09-22 rather than guessed. `--rail-accent` is a contrast-adjusted derivative for small text on `--rail`; the original orange remains the primary brand/accent token. On `#282622`, rail foreground, muted text, and rail-accent all clear normal-text contrast targets. A new semantic color should be added to the token list before it is used in multiple places.

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
- The homepage uses an asymmetric `.editorial-hero-grid`: the statement carries the visual weight and the supporting copy/actions occupy the narrower column. At the shell breakpoint it returns to one column.
- Major sections retain a top divider and `5rem` vertical padding so long-form content keeps a predictable chapter rhythm. A single offset section may create editorial cadence, but repeated zig-zagging is discouraged.
- Cards use responsive padding: `clamp(1.25rem, 3vw, 2rem)`; repeated grids use a `1rem` gap.
- Prefer the existing spacing rhythm; introduce a token only when a new spacing value repeats across components.

### Editorial composition rules

Use the following patterns deliberately rather than decorating every section:

1. **Content-led hierarchy** — once source-backed portfolio content is approved, use the actual project names, project language, biography, evidence, and artifacts as the primary hierarchy. Do not replace specific work with generic portfolio slogans merely to fill a composition.
2. **Work-forward first viewport** — keep identity concise and bring a substantial source-backed project preview into the first viewport or its immediate transition. Do not let a manifesto, profile statistics, or a project count displace the first real project signal.
3. **Asymmetry with recovery** — use one controlled offset or unequal-column moment, then return to the shared content grid so the page remains easy to scan.
4. **Numbered orientation** — the global rail uses 01–05 indices and long-form case studies use chapter numbers. Numbers support wayfinding; they do not replace text labels.
5. **Chapter scale** — case-study chapter headings are the largest long-form landmarks beneath the page title. Nested source sections remain smaller and may disappear when their title duplicates the chapter name.
6. **Warm neutral surfaces** — use background/surface contrast, spacing, and rules before adding more boxes. Cards are reserved for discrete items, evidence, or interactive surfaces.
7. **Accent discipline** — orange identifies authored emphasis, active state, and selected landmarks. It should not become a decorative wash or substitute for hierarchy.
8. **Layout choice** — use the asymmetric homepage pattern for thesis-led landing pages, the split section pattern for paired explanation/action content, and the chapter pattern for evidence-heavy long-form work. Do not force the chapter pattern onto short notes or utility pages.

## Shape, elevation, and motion

For the full motion pattern matrix, interruption rules, and reduced-motion behavior, read [docs/design/motion.md](docs/design/motion.md).

- Standard card radius: `--radius: 1rem`; pills use `999px` radius for buttons, tags, and compact controls.
- Cards use `--shadow: 0 18px 50px rgb(23 22 20 / 8%)`.
- Motion uses semantic duration/easing tokens: `--motion-fast: 150ms`, `--motion-standard: 240ms`, `--motion-slow: 320ms`, `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`, and `--ease-emphasized: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Public page entry is a non-blocking `240ms` chapter reveal from 0.96 opacity and a 0.625rem vertical offset; content exists in the DOM immediately and does not wait for animation completion.
- Homepage coordinate, statement, and support columns use a staged `320ms` reveal from partial opacity with 50–110ms delays. The copy is still readable before the animation finishes.
- Case-study chapters use the same `320ms` CSS-first reveal with small capped delays between chapters; no intersection observer or scroll-trigger dependency is required.
- Mobile drawer entry uses `240ms` emphasized easing with a 1rem horizontal offset; the backdrop fades over `150ms`. Close is intentionally immediate so Escape, route selection, and focus recovery win over decoration.
- Rail state, hover/focus, and feedback transitions use the `150ms` fast token.
- Loading indicators remain an `800ms linear` functional animation.
- There is no splash intro, scroll-jacking, autoplay cinematic sequence, or animation prerequisite for reading/navigation.
- `prefers-reduced-motion: reduce` removes the chapter, drawer, backdrop, and feedback animations; it also removes smooth scrolling and collapses other transitions to effectively immediate state changes.

## Component inventory

These are the reusable components currently in `src/components/`.

| Component | Role | Inputs | Important states |
| --- | --- | --- | --- |
| `SiteShell` | Public pathname-aware wrapper around the shared frame | `children` | Current public route state |
| `SiteShellFrame` | Persistent public navigation/content frame used by production routes and local verification | `children`, `pathname`, optional `initialDrawerOpen` | Desktop rail; mobile closed/open drawer; deterministic active route; keyboard Escape/Tab trap; no-JS fallback |
| `CaseStudyList` | Public approved-work index/cards | `caseStudies`, optional empty copy | Approved list; empty review-gated state |
| `CaseStudyTemplate` | Shared case-study renderer for public and local review surfaces | `caseStudy`, `mode` | Public approved rendering; local draft/review-ready rendering with chapter map, provenance, and evidence |
| `ProjectPreview` | Home/Work preview of an approved case study | `caseStudy` | Curated system map, pattern matrix, or text-first fallback |
| `ExperiencePresentation` | Compact preview and detail presentation under the shared case-study information architecture | `caseStudy`, `mode`, optional local-review audience | Approved evidence-backed profile; text-first for unknown/thin approved content; unavailable for draft public presentation |
| `ArtifactFrame` | Media or text-derived artifact boundary | `label`, explicit `state`, optional `note` | Derived text view, deferred media, redacted source detail; deferred/redacted states cannot receive media children |
| `ProfileStats` | Reusable compact experience summary driven by approved profile data | `stats` | Homepage/About experience counts; semantic `dl` that collapses from three columns to one using existing surface/border tokens |
| `EditorialDraftPreview` | Local-only review surface for source-backed article drafts | `draft` | Draft or review-ready article, evidence details, source provenance, curation notes |
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

### Specialized harness routes

The core state matrix remains at `/dev/harness?state=...`. Interaction surfaces that need deterministic URL-addressable state use the same production components through specialized local-only routes:

| Surface | Route | Deterministic inputs | Verification purpose |
| --- | --- | --- | --- |
| Public shell | `/dev/harness/shell?route=<home|work|notes|about|contact>&drawer=<open|closed>` | Synthetic active pathname and optional initial drawer state | Rail/drawer hierarchy, active-route state, keyboard/focus, touch targets, responsive behavior, reduced motion, visual capture |
| Case study | `/dev/harness/case-study?slug=<draft-slug>` | Any typed case-study draft slug | Shared template first viewport, long content, section navigation, evidence/provenance review, responsive behavior, visual capture |

Both specialized routes return not-found in production through the same environment guard as the main development harness. They do not create a second implementation of the shell or case-study renderer.

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
- Preserve a visible `:focus-visible` ring with sufficient contrast. Light surfaces use the global light/dark two-tone ring; charcoal rail/drawer controls use a light inner outline plus orange outer ring.
- Primary mobile navigation controls maintain at least a 44×44 CSS-pixel target; browser coverage checks the menu and close controls at mobile/tablet widths.
- Keep heading levels in document order.
- Express topology with a named heading and unordered list; express a matrix with labelled sections and lists. Do not rely on colour, line position, or motion to convey a relationship.
- Deferred and redacted artifact states explain why media is absent and never render a substitute image or hidden screenshot.
- Prefer Playwright roles, labels, and visible text. Use `data-testid` only for harness roots and state boundaries that do not have a better semantic locator.
- Do not use color alone to communicate status; pair it with text or a semantic label.

## Responsive behavior

Public navigation and content use a `900px` shell breakpoint; internal grids keep the existing `760px` content breakpoint:

- above `900px`: public routes use the fixed `17rem` rail and offset content column;
- at `900px` and below: the rail is removed from layout and replaced with the sticky mobile bar plus drawer;
- at `760px` and below: project, post, split, harness, and relevant admin grids collapse to one column;
- at `620px` and below: topology panels, authored matrix groups, and text lists stack in source/read order;
- content determines height; fixed heights remain limited to loading placeholders and minimum card rhythm;
- test long titles, long excerpts, drawer focus behavior, and route navigation at both mobile and tablet widths.

The Playwright suite includes default desktop plus dedicated mobile and tablet projects. The mobile/tablet journeys check long-content overflow, drawer focus behavior, 44×44 navigation targets, immediate motion interruption, and reduced-motion final states.

## Content presentation

- Portfolio/profile content and reusable presentation are separate concerns.
- Project and post summaries should be concise enough for cards; full content belongs on detail surfaces.
- Public case-study lists and detail routes receive only records with `reviewStatus: "approved"`; the same template may render `draft` and `review-ready` records only in local review mode.
- Authored AI Systems and UI Design Practices case studies live under `content/drafts/` and are currently `review-ready`: source-backed and polished for human approval, but still unpublished.
- The persona-led design article is a separate typed editorial record, currently `review-ready`, and is not connected to the public post adapter.
- `review-ready` is not publication authorization. Moving any of these records to `approved` is a separate explicit content decision.
- Public posts are rendered only when their status is `published`.
- Draft, archived, and unpublished content must not leak through public components or metadata.
- Preserve the client-IP disclaimer when importing case-study material from the existing site.
- A project profile is a curated presentation adapter, not publication approval. It may resolve only for reviewStatus approved and for evidence/item references that still exist in the case-study source. Draft review mode uses the source text only.
- The homepage keeps identity concise and presents the first approved project preview beside it at desktop widths; at narrow widths the project title, factual pattern explanation, and content-derived structure follow immediately after the introduction.
- Treat testimonials and personal contact information as reviewable content, not automatic fixtures.

### Work-led patterns and anti-patterns

- **Home preview:** pair one concise identity statement with a source-backed project title and its content-derived structure. At narrow widths, put the project's own pattern directly after that introduction.
- **Work index:** use the shared throughline to explain the relationship between separate projects, then let each preview show its own evidence-backed structure.
- **Integrations topology:** use a named framework and an unordered capability list when the source establishes membership but not execution order. Do not add arrows or sequence numbers without source evidence.
- **Design-systems matrix:** group only authored, evidence-backed practices and label the source-named contexts. Do not imply chronology or exact density values the source does not give.
- **Artifact boundary:** label text-derived diagrams as derived. Keep source media deferred or redacted until each asset has human approval and an accessible description; honor the recorded surface scope. The Multi Product Integrations and Design Systems images are approved with captions on Home and the Work index; detail-route reuse remains outside that approval. Never replace missing media with stock or fabricated product UI.
- **Chapter boundary:** retain shared chapters for wayfinding and provenance, but select a visual pattern from the chapter's evidence. Do not make every project a uniform title-and-summary card or force one artifact grammar through the whole case study.
- **Evidence over decoration:** a project count, repeated eyebrow, oversized generic thesis, or ornamental marker cannot stand in for a project name, concrete relationship, artifact type, decision, or supported outcome. Move shared synthesis to the Work index instead of repeating it inside every project preview.

## Verification workflow

Before a UI change is complete:

1. Start with the relevant harness state, for example `/dev/harness?state=long-content`.
2. Inspect /dev/harness for both approved case studies, the text-only fallback, synthetic long-content fixture, deferred and redacted artifact states, and local-only review states.
3. Verify keyboard focus, labels, empty/error feedback, reduced motion, and responsive layout without horizontal overflow.
4. Run the narrowest relevant test while iterating.
5. For material visual changes, inspect the deterministic captures generated by `tests/e2e/visual.spec.ts`: home first viewport, mobile drawer, case-study first viewport, and reduced-motion drawer. CI uploads them as the `visual-verification-captures` artifact for 14 days. These are review captures; semantic/CSS/browser assertions remain the automated regression gate rather than a brittle pixel-diff baseline.
6. Run the full baseline before handoff:

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
