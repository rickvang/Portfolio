# Portfolio content and route contracts

Issue #6 Phase 1 establishes the contracts that later public-route implementation will consume. It does not publish draft content or replace the current homepage shell.

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

Creating the missing route files and redesigned navigation shell belongs to the later public vertical slice. Phase 1 only prevents URL and IA drift before that implementation.

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

`getApprovedCaseStudies()` is the publication gate for the case-study model. With the current imported set it returns no public case studies because both records remain drafts.

Approval is an explicit content decision. It must not be inferred from the existence of imported content, successful validation, or a route being implemented.
