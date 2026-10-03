# Design Systems iterations

Internal editorial and recovery record. Reader-facing text lives in `story.md`; the schema record is `design-systems-revision.json`. This example belongs to CW-83 and draft PR #63. The parent owns integration and tracker/PR updates.

Assigned checkout: `portfolio-design-systems-story`, branch `codex/design-systems-story`, starting at `042819bf9a489e91a067689926c56b24ff222c4e`. Only this example directory is authorized for committed changes. Preview port: 3193, with `E2E_USE_FIXTURES=true`.

Canonical instructions loaded afresh from the single Instruction Versions row where Status = Current and Scope = Codex: **Codex Collaboration — Automatic Allowance Instrumentation**. Repository AGENTS.md and the parent's `next-case-studies-plan.md` were read. The parent retains all shared coordination surfaces; no duplicate Work Order or Current Work row is needed.

## 1. Ground the story

**Findings.** The imported project provides the library, collaboration, governance, foundations, density and template/pattern scope. The original public page attributes platform framework design to Rick. Its density section states that marketing displays and enterprise interfaces need different guidance, and its template section describes duplicating reusable screens for specific use cases. These support a useful account without borrowing facts from the integrations compilation.

**Changes.** Created a complete first-person story and schema record with five connected sections: legacy-capability context, pattern audit and collaboration, reusable library, density decision, and ongoing use. Kept individual framework design separate from shared library work. Replaced the legacy impact language with supported artifacts and early-adopter collaboration.

**Checks.** Compared all first-pass claims with `content/imports/rickvang.com.json` and the original public project page, fetched October 3, 2026. Reviewed the existing schema and review renderer. Omitted the legacy hero image, all real-estate-specific facts, code implementation ownership, measured outcomes and research-validation claims. No final test or browser pass has run yet.

**Next critique.** The first version names the reusable artifacts but does not explain their relationship clearly enough. Expand the density decision and how a designer uses a template, while preserving the limits on individual ownership.

## 2. Explain the work

**Findings.** Pass 1 treated the library as an inventory and gave the density decision only a brief description. The opening also made individual and collective work too easy to read as the same contribution. The sources support a practical reuse method, but not a particular client's screen sequence or a measured benefit.

**Changes.** Rewrote all five narrative sections. Made Rick's platform framework design explicit and described the library/governance work as shared. Expanded the library section into a supported example: duplicate a reusable screen and modify its use-case details, with workflow patterns covering the recurring task. Explained why separate density guidance for marketing and enterprise surfaces sat alongside common foundations. Connected workshops and developer feedback to prioritization and feasibility, and connected governance to sustaining the shared effort.

**Checks.** Compared the expanded example with the original Templates, Patterns and Density descriptions and the imported solution sections. Kept template use in capability terms rather than inventing a historical user, screen or adoption result. No Figma-specific architecture, spacing value, component variant, research outcome or savings claim was added. JSON and readable export contain the same revised prose. Final automated checks remain reserved for pass 3.

**Next critique.** The expanded version overexplains the same reuse benefit and repeats collaboration in the opening, exploration and ending. The density paragraph can be more direct. Pass 3 should keep the decision-to-artifact connection while reducing abstractions and a recap-style ending.

## 3. Make it readable and review the evidence

**Findings.** The second pass repeated the benefit of reuse and made the ending a recap of the library's contents. The explanation worked better in the order a hiring reader would follow: common decisions, the surface-specific density decision, then a reusable screen and its workflow. The available evidence supports these design artifacts more strongly than impact claims or detailed personal ownership of each artifact.

**Changes.** Rewrote and retitled all five sections. Moved density beside the foundations that it qualifies, then made the duplicate-and-modify screen method the next practical example. Shortened the exploration paragraph and removed repeated claims about collaboration, the abstract phrase "consistency could be applied in context," and the recap-style ending. Kept Rick's framework design and early-adopter collaboration explicit. The final export and JSON share the same plain first-person copy.

**Evidence review.** Checked every section against the import and original page. Density is a supported distinction between marketing and enterprise guidance; template reuse is the documented method, described as what a designer could do. No specific screen, pixel value, token architecture, research validation, persona response, code implementation, numerical impact or real-estate engagement detail was introduced. Evidence and unresolved ownership questions remain in review-only fields and this log. The candidate carries no media and stays `review-ready`.

**Final checks.** The candidate passed the existing `caseStudySchema` with strict top-level parsing, review-only publication filtering, absence of unapproved media, and an exact comparison of `story.md` with the JSON's reader-facing summary and five sections (2 temporary checks, passed). After restoring the catalog, the existing case-study and imported-content suites passed (13 tests). The restored catalog, package manifest and lockfile have no diff.

The one local browser pass also completed before the parent's follow-up: 3 checks passed in 27.5 seconds on port 3193 with deterministic fixtures. They covered the actual story renderer and source/evidence review at 1280 × 900 and 390 × 844, exact section text, source link/evidence access, no horizontal overflow, no client images, and exclusion from public detail/Home/Work routes. The desktop and mobile story screenshots were visually inspected. The runner cleaned up its server. Temporary validation files were removed; no test, schema, renderer, dependency or shared-catalog change is included in the deliverables.

**Parent verification pending.** The parent owns the combined desktop/mobile and publication checks after integration, CW-83 and PR #63. Its follow-up narrows the remaining work here to recording actual results and committing this example directory. All three prose passes are complete; no additional pass or browser run is needed in this checkout.

## Delivery and recovery

Final files: `design-systems-revision.json` (one existing-schema record, id/slug `design-systems-revision`, status `review-ready`), `story.md` (readable narrative), and this three-pass log. No example-specific asset was added.

The parent should integrate the JSON record into the existing catalog once, then run its combined review checks. Preserve the approved import and current media permissions. Publication remains a separate owner decision. Detailed individual ownership and numerical impact questions below remain internal and do not block review of the supported story.

## Evidence boundaries and remaining owner questions

- Confirm Rick's personal contribution to the core library, foundations, density guidance, templates and governance if the final story needs a more detailed individual role. Current copy uses collaborative attribution.
- A specific template or workflow walkthrough would need a matching artifact and Rick's account of the decision. The source currently supports the reuse method and four workflow categories, not exact screens or controls.
- No underlying measure or reliable attribution is supplied for the legacy administrative-hours claim. No quantified savings or research result will appear in the story.
- General early-adopter collaboration and incremental rollout are present in this project's original source; exact adoption, rollout cadence and team size remain unconfirmed.
- Figma/library details from the integrations compilation are not enough to attach that engagement's ownership, layout starter or component rules to Design Systems.
- Original density/template image fetches returned cache misses. The story uses the supported written description and does not reconstruct those images.

[C01 | 2026-10-03 02:07 am] Session instructions and target boundary verified. The first narrative is grounded in the imported and original project material; pass 2 will explain the density and template decisions more concretely.

[C02 | 2026-10-03 02:12 am] Grounded first narrative complete. Pass 2 rewrites the story around practical template reuse and separate density guidance, with individual framework design distinguished from collective work.

[C03 | 2026-10-03 02:21 am] Three writing passes complete. The schema/export checks, 13 existing content tests and 3 local desktop/mobile/publication browser checks passed. Temporary catalog and validation files are restored/removed; port 3193 is no longer listening. The three deliverables are ready for the scoped commit and parent integration. Parent combined browser verification is pending.
