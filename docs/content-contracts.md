# Portfolio content and route contracts

Issue #6 Phase 1 established the content and route contracts. Later phases now consume those contracts with explicit record-level publication decisions for imported and authored content.

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
- `reviewStatus`: `draft`, `review-ready`, or `approved`;
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
- explicit record-level approval status;
- only source-backed sections currently available: overview, exploration, system/practice, and outcomes.

The adapter does not infer publication from source capture. Each imported record carries its own explicit approval state.

## Publication boundary

`getApprovedCaseStudies()` gates public indexes and `getApprovedCaseStudyBySlug()` gates public detail routes. Imported client work and the authored AI Systems / UI Design Practices case studies are public only because those individual records now carry explicit `approved` status.

Approval remains an explicit content decision. It must not be inferred from the existence of source material, successful validation, or a route being implemented.


## Shared rendering boundary

`CaseStudyTemplate` consumes the typed case-study record in two modes:

- public mode, reachable only after the route has resolved an approved record;
- review mode, reachable from the local-only development harness and allowed to expose source provenance, evidence notes, and curation notes for draft review.

Review mode remains available for provenance/evidence inspection regardless of publication state. Public `/work/[slug]` routes still resolve only records carrying explicit `approved` status.


## Published notes boundary

The public Notes routes merge two explicit publication sources behind `src/lib/posts.ts`:

- source-controlled authored editorial records carrying `reviewStatus: "published"`;
- Supabase rows explicitly marked `published` with a publication timestamp that is not in the future.
- `getPublishedPosts()` merges and sorts both sources.
- `getPublishedPostBySlug()` resolves the source-controlled publication first, then the Supabase publication boundary.
- If Supabase is unavailable or intentionally bypassed for deterministic browser tests, source-controlled published Notes still render while deterministic fixture posts remain local/test-only.
- Deterministic post fixtures remain available through the local development harness and focused component tests. They are not authored portfolio content.

This keeps test determinism, source-controlled authorship, and the hosted author workflow as separate concerns without creating competing public route contracts.

## Authored editorial content

Phase 5 originally introduced three source-backed review artifacts under `content/drafts/`. Issue #41 records the later explicit publication decision:

- `AI Systems` — approved public case study grounded in Persona-Library orchestration, Work Order, and shared problem-context contracts;
- `UI Design Practices` — approved public case study grounded in the Portfolio redesign plan/interaction work and the Persona-Library UX practice;
- `Persona-led Design Starts Before the Screen` — published source-controlled Note describing bounded persona selection and questioning during exploration while explicitly preserving synthetic-evidence limits.

The historical `content/drafts/` path remains the source location, but path naming is not publication authority. Record status is authoritative. The harness continues to expose provenance and curation detail for these records even after publication.
