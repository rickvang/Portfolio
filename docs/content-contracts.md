# Portfolio content and route contracts

Issue #6 Phase 1 established the content and route contracts. Later phases now consume those contracts, but implementation still does not turn imported draft content into published content.

## Public route contract

The canonical route shape is implemented in `src/lib/public-routes.ts`:

```text
/
├─ /work
│  └─ /work/[slug]
├─ /notes
│  └─ /notes/[slug]
├─ /about
└─ /contact
```

Use `workHref(slug)` and `noteHref(slug)` for detail links instead of duplicating route strings in components.

The public route files and shared navigation shell now implement this route shape. The route contract remains the canonical URL source so components do not invent competing paths.

## Case-study contract

`src/lib/case-studies.ts` owns the reusable case-study schema.

A case study contains:

- stable `id` and route `slug`;
- title, summary, and category;
- optional source-backed role and scope;
- `reviewStatus`: `draft` or `approved`;
- client-IP disclaimer when applicable;
- one or more attributed sources;
- ordered sections with source-linked evidence;
- curation notes.

Only `approved` case studies are eligible for later public rendering. Draft status is preserved by default.

## Shared section sequence

Available sections must remain in this order:

1. Overview
2. Context
3. Personas
4. Problem
5. Exploration
6. System / practice
7. Decisions
8. Outcomes
9. Reflection

A case study does not need to invent content for every section. Missing sections remain absent until attributable material exists. The schema rejects duplicate or out-of-order sections.

## Evidence and provenance

Every section contains at least one evidence reference. Evidence points to a source declared on the case study rather than carrying an untracked claim.

The first imported rickvang.com projects are adapted into the shared schema with:

- their original public case-study URL;
- the captured source date;
- the existing client-IP disclaimer;
- draft status;
- only source-backed sections currently available: overview, exploration, system/practice, and outcomes.

The adapter does not modify `content/imports/rickvang.com.json` and does not promote those drafts.

## Publication boundary

`getApprovedCaseStudies()` gates public indexes and `getApprovedCaseStudyBySlug()` gates public detail routes. With the current imported set both return no publishable case studies because both records remain drafts.

Approval is an explicit content decision. It must not be inferred from the existence of imported content, successful validation, or a route being implemented.


## Shared rendering boundary

`CaseStudyTemplate` consumes the typed case-study record in two modes:

- public mode, reachable only after the route has resolved an approved record;
- review mode, reachable from the local-only development harness and allowed to expose source provenance, evidence notes, and curation notes for draft review.

Both current imported drafts are exercised through review mode so layout and section behavior can be verified without changing their publication status. Their public `/work/[slug]` URLs intentionally return 404 until approval.


## Published notes boundary

The public Notes routes are backed by the Supabase publication boundary.

- `getPublishedPosts()` returns only records explicitly marked `published` with a publication timestamp that is not in the future.
- `getPublishedPostBySlug()` uses the same published-only boundary for detail routes.
- If the public content service is unavailable or intentionally bypassed for deterministic browser tests, public Notes resolve to an empty list / not-found detail rather than deterministic fixture content.
- Deterministic post fixtures remain available through the local development harness and focused component tests. They are not authored portfolio content and must not be presented as if they were published notes.
- Draft editorial material remains separate from the Supabase publication adapter until it has its own explicit approval and publication decision.

This keeps test determinism and public authorship as separate concerns.

## Authored editorial drafts

Phase 5 adds three source-backed review artifacts under `content/drafts/`:

- `AI Systems` — a case-study draft grounded in Persona-Library orchestration, Work Order, and shared problem-context contracts;
- `UI Design Practices` — a case-study draft grounded in the Portfolio redesign plan/interaction work and the Persona-Library UX practice;
- `Persona-led Design Starts Before the Screen` — an article draft describing bounded persona selection and questioning during exploration while explicitly preserving synthetic-evidence limits.

The two case studies are parsed into the normal case-study catalog but the authored source file is guarded so every record must remain `draft`. The article uses its own typed editorial-draft contract and is not connected to `getPublishedPosts()` or any Supabase publication path.

All three artifacts are reviewable through `/dev/harness` only. Browser tests verify their draft status and verify that `/work/ai-systems`, `/work/ui-design-practices`, and `/notes/persona-led-design-discovery` do not expose the draft content publicly.
