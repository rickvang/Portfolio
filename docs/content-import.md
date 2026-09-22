# Content import from rickvang.com

This document records the local-first import from the public Framer site. The first-party positioning, biography/experience summary, and two client-protective case studies are now explicitly approved at the individual record level for the public Next.js content path. Deferred personal contact details, third-party testimonials, credentials, brand assets, source imagery, and hosted Supabase writes remain outside this approval.

## Source capture

- Source site: <https://www.rickvang.com/>
- Original capture: 2026-09-22
- Public-source revalidation: 2026-09-22
- Import file: `content/imports/rickvang.com.json`
- Validation boundary: `src/lib/imported-content.ts`
- Public profile adapter: `getApprovedImportedProfile()`
- Case-study adapter: `src/lib/case-studies.ts`
- Local review surface: `/dev/harness`

## Source-to-content mapping

| Source page | Imported content | Status | Notes |
| --- | --- | --- | --- |
| `/` | availability label, “Hi, I'm Rick.” positioning, systems/firefighting summary, project links | Approved profile record | Grammar is normalized in the structured import; source images remain deferred. |
| `/about` | about heading, biography summary, 11+/14+/30+ experience counts | Approved profile record | Email, phone, LinkedIn presentation, credentials, testimonials, and brand assets remain deferred. |
| `/projects` | project index context and client-IP disclaimer | Source reviewed | The disclaimer stays attached to imported case-study records; source review itself does not publish projects. |
| `/projects/multi-product-integrations` | category, summary/scope, discovery, outcomes, solution sections | Approved project record | Client-protective level of detail retained; the source category typo remains normalized. |
| `/projects/design-systems` | category, summary/scope, discovery, outcomes, collaboration, foundations, density, templates, patterns | Approved project record | Structured into the shared case-study model; source media remains deferred. |

## Curation and publication rules

- Profile and project records carry their own publication status; public routes may consume only records carrying explicit `approved` status. Source-capture review status does not publish newly imported records.
- New or refreshed project records default to unpublished until their own status is explicitly approved.
- Preserve the client-IP disclaimer for imported client case studies.
- Do not add protected client details or infer employer/client names that the source does not state.
- Keep phone/email, third-party testimonials, credentials, brand marks, and source images out of the public content model until separately reviewed.
- Do not write imported material to Supabase automatically.
- Keep source URLs and curation notes next to imported content so future edits remain attributable.
- Authored AI Systems, UI Design Practices, and persona-led design content remain separate `review-ready` records and are not approved by this import decision.

## Current public promotion

The approved records drive:

- homepage positioning and About summary;
- the reusable experience-summary stats component;
- the public Work index;
- public detail routes for Multi Product Integrations and Design Systems through the shared `CaseStudyTemplate`.

If profile approval is withdrawn, Home and About remain available with a neutral review-state fallback instead of failing the route. Project publication remains independent per record.

The old Framer site remains the provenance source until a separate launch/cutover decision retires it.

## Remaining review decisions

1. Audit source case-study imagery and classify each asset as safe to reuse, redact, recreate, or omit.
2. Decide whether testimonials should be carried forward and whether attribution/permission needs reconfirmation.
3. Decide whether credentials, brand marks, LinkedIn, email, or phone belong in the redesigned surface.
4. Replace the remaining fixture note content when real writing is approved.
5. Use the approved work/content inventory as the basis for the next visual surface pass rather than inventing generic portfolio copy.
