# Content import from rickvang.com

This document records the first local-first import from the public Framer site. The imported content is a typed draft and is previewed through `/dev/harness`; it is not automatically published to the homepage or written to Supabase.

## Source capture

- Source site: <https://www.rickvang.com/>
- Captured: 2026-09-22
- Import file: `content/imports/rickvang.com.json`
- Validation boundary: `src/lib/imported-content.ts`
- Local review surface: `/dev/harness`

## Source-to-content mapping

| Source page | Imported content | Status | Notes |
| --- | --- | --- | --- |
| `/` | positioning, availability label, headline, summary, project links | Draft | Grammar was normalized in the summary; no source images imported. |
| `/about` | about heading, biography summary, experience counts | Draft | Email, phone, LinkedIn, credentials, and testimonials are intentionally deferred for review. |
| `/projects` | project index context and client-IP disclaimer | Draft | The disclaimer is preserved in the draft preview and should remain attached to case-study content. |
| `/projects/multi-product-integrations` | category, scope, discovery, outcomes, solution sections | Draft | Client-protective level of detail retained; source category typo normalized. |
| `/projects/design-systems` | category, scope, discovery, outcomes, collaboration, foundations, density, templates, patterns | Draft | Structured as reusable sections for later public rendering. |

## Curation rules

- Treat every imported claim as draft until Rick reviews and approves it.
- Preserve the client-IP disclaimer for case-study content.
- Do not add protected client details or infer employer/client names that the source does not state.
- Keep contact information, third-party testimonials, credentials, brand marks, and source images out of the public content model until separately reviewed.
- Do not write imported material to Supabase automatically.
- Keep source URLs and curation notes next to the imported content so future edits remain attributable.

## Next review decisions

1. Approve or edit the profile positioning and About copy.
2. Approve case-study titles, categories, summaries, outcomes, and section order.
3. Decide which source images may be hosted locally or referenced remotely.
4. Review whether any testimonials, credentials, contact links, or brands should be carried forward.
5. Promote only approved records into the public content source or Supabase workflow.
