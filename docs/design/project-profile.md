# Portfolio project profile

Project ID: `rickvang/Portfolio`. Repository: [Portfolio](https://github.com/rickvang/Portfolio). This is durable design orientation; [Current Work](https://app.notion.com/p/3decd82535ff81809250e8db33b9ce3c) and the relevant issue/PR own current objectives, decisions and next actions.

## Start here

Help readers understand Rick's work through source-backed stories and reach relevant work or contact paths. This project includes public portfolio pages and a separate authenticated author workflow. Its design conventions are project-specific.

1. Read [repository instructions](../../AGENTS.md), then [DESIGN.md](../../DESIGN.md) for visual/interaction work.
2. Use the [pattern index](pattern-index.md) to find the relevant existing layout, collection, CRUD or content convention; follow its owning source.
3. For architecture/data boundaries use [ARCHITECTURE.md](../../ARCHITECTURE.md) and [DECISIONS.md](../../DECISIONS.md); for imported content use [content import](../content-import.md).
4. On resumption, retrieve the matching Current Work record and linked issue/PR or [Work Order](../work-orders.md). Historical design studies are not active redesigns merely because they are discoverable.

## Design infrastructure readiness

Assessed 2026-10-09 against source revision `06b78a28fa64666dd4854b94c64fe8de81432b73`, plus this documentation change. These are facets of available guidance, not a project stage or quality score. Recheck affected source before relying on it.

| Facet | State | Evidence / next useful improvement |
| --- | --- | --- |
| Entry and source ownership | Established | Root AGENTS, this profile, DESIGN selective references and pattern index form an entry path. |
| Layout and component coverage | Established for current routes | DESIGN inventory, shell and case-study specifications, local harness. New product surfaces still need applicability checks. |
| Collection and CRUD coverage | Partial | Posts have list/create/edit/status/delete implementations and documented components. There is no universal entity CRUD policy or case-study CRUD editor. |
| Adoption and exceptions | Partial | DESIGN and pilot history record approvals and route exceptions; some implementation conventions are only observed. Pattern index labels this distinction. |
| Verification | Established for existing UI contracts | [Harness/e2e](../../tests/e2e), fixtures and DESIGN verification workflow. Documentation presence is not a fresh test pass. |
| Maintenance and evolution | Partial | Git history, decisions and work records exist. Consumer/migration inventory must be refreshed for each affected change. |

## Authorities, dependencies and exceptions

DESIGN owns the visual/interaction baseline; code owns actual implemented behavior. A mismatch is a scoped conflict to resolve, not permission to copy either blindly. In particular, older general rail/contact/chapter descriptions coexist with later route-specific approvals. Read the current route/component and the applicable approval section. The `ContactForm` harness example does not describe the current public Contact page. UI Design Practices has an approved three-chapter exception; other stories have separately approved renderers.

Reusable methods: [Adaptive UX](https://github.com/rickvang/SkillRepo/blob/main/codex/methods/adaptive-ux-design/SKILL.md) and conditionally Component Builder as routed by AGENTS. These are methods, not imported style systems. No external shared design-system dependency is declared here; do not infer Golden adoption. If one is adopted later, record its owner, revision, consumed scope and local exceptions here.

The application's `src/lib/experience-profiles.ts` contains authored case-study presentation data. Those profiles are not these project-memory records and do not grant content publication permission.

## Work and updates

This infrastructure was introduced under [CW-99](https://app.notion.com/p/3f4cd82535ff81e2be64c42a2146fb04). Prior CW-97 and other design studies supply historical evidence; use Current Work and live issue/PR state to find anything still active. Never treat this pointer as a live status mirror.

Update this profile only when purpose, authority, coverage, dependencies or durable constraints change. Put a proposed pattern/variant in its owning design reference with evidence and scope; retain the adopted baseline while exploring. A redesign records alternatives and acceptance in the work record. A refactor records behavior to preserve and affected consumers. When replacing a pattern, link old and new IDs, migration scope, remaining consumers and rollback source before marking the old record superseded. Transferable reasoning may be proposed to shared design knowledge with conditions and counterexamples; Portfolio's visual style stays here.
