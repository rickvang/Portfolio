# Portfolio redesign brief — Issue #6

Status: Phase 0 contract  
Issue: https://github.com/rickvang/Portfolio/issues/6

## Objective

Redesign rickvang.com for two audiences, in order:

1. Hiring managers and design leadership evaluating Rick for senior design work.
2. Potential consulting clients evaluating fit for complex product or system work.

This brief locks structure before visual implementation. Imported content remains draft-first until reviewed.

## Repository ownership and handoffs

Issue #6 is the repository-local coordination surface. Each phase must leave an inspectable artifact or verified behavior before dependent work proceeds.

| Stage | Repository-local owner | Exit artifact |
| --- | --- | --- |
| Phase 0–1: IA and content contracts | UX / information architecture | Visitor jobs, page modes, routes, hierarchy, case-study contract |
| Phase 2–3: visual + interaction | UI / interaction design | Rail/drawer, hierarchy, orange token use, motion, responsive/accessibility rules |
| Phase 2–6: implementation | Frontend engineering | Reusable shell, progressive enhancement, performance, harness and browser coverage |
| Persistence changes, only if required | Application/data architecture | Justified source-of-truth/schema/auth/publishing changes |
| Lifecycle boundaries | Issue owner / implementing contributor | Issue status, blockers, handoffs, and completion evidence stay current |

## Visitor jobs

These are design recommendations inferred from the confirmed audiences, not user-research findings.

### Hiring managers and design leadership

Visitors should be able to:

- understand Rick's design focus and level in the first viewport;
- reach representative work immediately;
- scan case studies for context, decisions, system thinking, outcomes, and reflection;
- see credible AI-design practice only where attributable work supports it;
- move between projects without losing orientation;
- reach About or Contact without traversing unrelated content.

### Potential consulting clients

Visitors should be able to:

- understand the kinds of complex design problems Rick can help structure;
- inspect relevant examples before contacting him;
- see how discovery, decisions, systems thinking, interaction definition, and validation connect;
- understand that client-sensitive work is intentionally bounded;
- reach a direct contact path after evaluating fit.

## Page modes and routes

Public page modes:

- Home: positioning and evidence gateway.
- Work index: compare available case studies.
- Case-study detail: evaluate depth and outcomes.
- Notes index: browse published thinking.
- Article detail: long-form reading.
- About: background and working approach.
- Contact: start a conversation.

Target public routes:

```text
/
├─ /work
│  └─ /work/[slug]
├─ /notes
│  └─ /notes/[slug]
├─ /about
└─ /contact
```

`/admin`, `/dev/harness`, and `/api/health` remain outside public navigation.

The current homepage hash navigation is transitional. Major information spaces move to stable routes while retaining normal link behavior and progressive enhancement.

## Navigation contract

### Desktop

Use a persistent left rail that:

- exposes Home/identity, Work, Notes, About, and Contact;
- identifies the active route without color alone;
- remains usable at zoom and narrower desktop widths;
- never hides the only route to content behind hover or motion;
- can host a case-study-local section index without confusing section and route hierarchy.

### Mobile

The rail becomes an accessible drawer that:

- exposes an accessible name and state;
- closes on Escape;
- returns focus to its invoker;
- closes after route selection;
- preserves usable navigation if JavaScript fails;
- uses appropriate touch targets.

## Content hierarchy

### Home

1. First-viewport thesis.
2. Direct path to selected work.
3. Selected approved case studies.
4. Concise authored-thinking / design-practice evidence.
5. About preview.
6. Contact entry.

Home is a gateway, not a compressed copy of every route.

### Case study

Shared sequence:

1. Overview
2. Context
3. Personas
4. Problem
5. Exploration
6. System / practice
7. Decisions
8. Outcomes
9. Reflection

Minimum content contract: slug, title, summary, category/discipline, source-backed role/scope, draft-or-approved status, source/provenance, client-IP disclaimer applicability, ordered sections, and reviewed media metadata when used.

The persona-led design article remains a Notes item unless a later content decision changes its type.

## First-viewport thesis

Without scrolling, answer:

1. Who is Rick professionally?
2. What kinds of design problems does he take on?
3. Where can the visitor inspect the strongest evidence?

Use one concise positioning statement, one supporting line, a direct path to selected work, and enough persistent navigation to make the site structure obvious.

Do not lock final copy in Phase 0; imported positioning is still draft.

## Signature cinematic interaction

Use **rail continuity with chapter-style content transitions**.

The rail is the stable spine while main content changes like chapters:

- rail position remains stable across route changes;
- active route/section state updates continuously;
- incoming heading and lead content use a restrained reveal;
- motion never delays reading, navigation, browser history, or focus;
- rapid navigation resolves to the newest destination instead of queueing decorative motion;
- content remains visible and navigable without JavaScript;
- reduced-motion mode removes translation and nonessential animation.

Phase 3 will lock exact timing/easing/interruption in `DESIGN.md`. Initial target: roughly 150–200ms for active-state changes and 200–300ms for content reveals; no splash intro, scroll-jacking, or autoplay cinematic.

## Visual boundary

Confirmed direction:

- cinematic experience with work as the focal point;
- persistent desktop left rail and mobile drawer;
- recover the original site's orange as a semantic accent token.

Phase 0 does not rewrite current implemented tokens in `DESIGN.md`. Phase 2 updates that contract only when the new system is implemented. Orange must be contrast-checked per use rather than assumed valid everywhere.

## Anti-goals

Do not turn the redesign into:

- a generic agency landing page;
- animation that delays access to evidence;
- scroll-jacking or motion required for comprehension;
- route-specific one-off component systems;
- publication of unreviewed imported claims;
- unsupported AI positioning;
- expanded protected client detail;
- a dependency-heavy animation/component stack without demonstrated need;
- a redesign of admin/content authoring unless a requirement reaches that boundary.

## Unchanged until approval

- Imported rickvang.com content stays draft-first.
- The client-IP disclaimer stays attached to relevant case-study material.
- Deferred testimonials, credentials, links, brands, and source media remain under review.
- Existing Supabase post/auth boundaries remain intact unless later requirements justify architecture changes.
- Published status continues to control public Notes visibility.
- Hosted content is not overwritten as a redesign side effect.
- No deployment occurs as part of Issue #6 without explicit approval.
- The local-only harness remains an engineering surface, not a portfolio destination.

## Phase 0 exit gate

Phase 0 is complete when audience, visitor jobs, page modes, route contracts, rail/drawer behavior, content hierarchy, first-viewport thesis, signature interaction, anti-goals, publication boundaries, and repository-local handoffs are all explicit.

Next boundary: Phase 1 — information architecture and typed content contracts. Visual implementation follows only after that structure is sufficient.
