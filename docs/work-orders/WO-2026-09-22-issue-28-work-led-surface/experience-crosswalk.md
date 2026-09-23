# Work-to-experience crosswalk — Issue #30

- Work Order: [WO-2026-09-22-issue-28-work-led-surface](work-order.md)
- GitHub issue: [#30 — Translate work into an experience](https://github.com/rickvang/Portfolio/issues/30)
- Preceding surface work: [#28 — work-led surface rebuild](https://github.com/rickvang/Portfolio/issues/28)
- Input source: approved project copy imported from [rickvang.com](https://www.rickvang.com/projects)
- Source capture: `content/imports/rickvang.com.json`, captured and reviewed 2026-09-22; normalized authored record: `content/drafts/case-studies.json`
- Status: authored interpretation revised after an independent model-based cold-reader review; responsive re-read remains pending.

This crosswalk preserves the boundary between source evidence and design interpretation. The observed-work and visitor-response rows below are interpretations or hypotheses, not user research, measured project outcomes, or client-approved interface descriptions. The source images remain deferred because the imported record has no useful approval, caption, or alt-text metadata for reuse.

## Seven-layer translation

| Layer | Multi Product Integrations | Design Systems |
| --- | --- | --- |
| Evidence | Approved overview: one framework for standardizing processes, consolidating data, and integrating workflows across fragmented products. Exploration: core personas and their workflows were mapped. System items: modular layouts, persona-shaped dashboards, permission-aware records and chat, reusable settings, and workflow completion. Outcomes mention real-time operational views and reduced administrative work/rework, without numeric measurements. | Approved exploration: audit patterns and scenarios, then use workshops, usage analysis, user testing, and developer feedback. System items name collaboration, a core library, lightweight governance, style/token foundations, density across marketing and enterprise-product surfaces, and reusable workflow templates/patterns. The source gives no exact density values or rollout sequence. |
| Reader goal | Understand which named product capabilities belong to the shared framework and how they are related. | Understand how stewardship and a shared foundation support reusable patterns across different surface needs. |
| Observed work/system qualities | Relational: the shared framework and mapped personas/workflows connect separate surfaces. Modular: modular layouts and reusable settings are explicit. Operational: current entitled data, workflow completion, and real-time views are named. These labels summarize source facts; they do not assert a technical architecture. | Governed: collaboration, lightweight governance, and feedback methods are named. Layered/reusable: a core library and style/token foundations are described. Adaptable: marketing and enterprise-product contexts have different density needs, without specified values. |
| Experiential qualities | Make membership legible and help readers navigate to the evidence behind a capability. | Make the authored groups coherent and scannable; allow comparison of the two named contexts without fabricating settings. |
| Intended-feeling hypothesis | Hypothesis: a reader may feel oriented if they can name the shared framework and several of its capabilities. Support: an independent reader describes the framework and its membership. Contradiction: the reader sees unrelated cards or infers a directional workflow/dependency. A second hypothesis is justified confidence when source trace and missing media are explicit; contradiction is assuming the visual is an exact architecture or screen. | Hypothesis: a reader may feel clear if they distinguish governance, shared foundations, and application, and can identify both contexts tied to density. Contradiction: they infer a release order, treat governance as a visual token, or believe exact density rules are specified. A second hypothesis is competence when they can explain shared and variable decisions; contradiction is decorative grouping with no source-backed rationale. |
| Selected pattern and alternatives | **Map**: one framework heading plus an unordered list of the five authored system items. **Trace**: detail links to Overview, Exploration, System, and Outcomes. Alternative chronological workflow is rejected because no task order is sourced. Prose-only is a valid fallback when the evidence or item membership is incomplete. | **Assemble**: explicit groups for People and governance; Shared library and foundations; Density and workflow patterns. **Compare**: a separate context list names marketing and enterprise-product surfaces. An ordered stage diagram is rejected because no chronology/dependencies are sourced. A density specification table is rejected because there are no values or approved screens. |
| Semantic presentation contract | A named framework and unordered capability list; no arrows or order markers. Detail source links are native anchors to visible sections. Compact preview and detail share the same presentation model. At narrow widths, content stacks into one column. Static presentation respects reduced motion without special treatment. If approval/evidence/membership validation fails, use source summary and authored item order. | Labelled group sections with headings, rationale, and unordered item lists; context names appear in a separate labelled list. Group membership is explicit and keyed by stable section/title IDs, never inferred from array order. At narrow widths groups stack. No exact density scale, arrows, chronology, or reconstructed screens. Invalid profiles use text-first source order. |

## Thematic framing for the agent-facing scaffold

These phrases are concise interpretation aids for design review, not profile labels shown to visitors and not automatic layout instructions.

| Case study | Thematic direction in words | Evidence and reader goal anchor |
| --- | --- | --- |
| Multi Product Integrations | Connected operations across a shared product environment. | The approved summary names a unified framework; the reader should see its five named capability areas as members, without inferring order. |
| Design Systems | A governed foundation that supports deliberate variation. | The approved record names governance, library/foundations, patterns, and two contexts; the reader should distinguish shared foundation from contextual application. |

Use the Clarity, Compose, Differentiate, Refine, and Reduce noise questions in `DESIGN.md` before selecting a pattern. They are observable review prompts, not ratings. The typed experience profiles retain the phrase with the seven translation layers; the local UI harness tests rendering and states separately.

## Evidence and membership index

Stable IDs resolve to the authored System section item titles; they are generated from section kind plus normalized title by `getCaseStudySectionItemId`.

| Project | Stable system item membership | Evidence sections exposed in detail | Non-claim boundary |
| --- | --- | --- | --- |
| Multi Product Integrations | Standardized Layouts; Dashboards; Records and Chat; Settings; Workflow Completion | Overview; Exploration; System; Outcomes | Membership in one framework is supported. Item positions do not specify sequence, dependency, or ownership. Outcomes contain no numeric values. |
| Design Systems | Gathered collaborators; Lightweight governance; Established a core library; Foundations; Density; Templates and patterns | Overview; Exploration; System | Three groups describe the authored relationship. They do not specify a rollout plan. The two contexts are source-named; their exact density settings are unknown. |

## Rejected and invalidating conditions

- Do not use arrows, numbered steps, directional connectors, or animation to imply an execution path for either project.
- Do not show invented interface mockups, generated or stock screenshots, or source media without a reuse decision.
- Do not transform words such as relational, governed, clear, confident, or adaptable into scores, tokens, CSS selectors, or an automatic pattern choice.
- Use text-first content if the project is not approved, source note validation fails, any source system item is missing from the profile, a profile includes an unknown item, or duplicate membership appears.
- Revisit the integrations map if a cold reader infers that capability position is a sequence or technical dependency, or if the approved source no longer supports a shared framework.
- Revisit the design-system matrix if a reader infers chronology, exact density rules, or client-specific screens, or if a group cannot be tied to authored source items.

## Independent cold-reader review — 2026-09-22

A separate cloud reviewer first inspected the public preview as a first-time visitor, then compared its interpretation with Issue #30. The reviewer visited Home, Work, Multi Product Integrations, and Design Systems at **1363×936 desktop** and **400×849 mobile**. It reported no horizontal overflow at the mobile viewport. This was a model-based qualitative review, not a human usability study or evidence of user-research prevalence.

### Findings

- **Home and Work:** Each project’s broad purpose was understandable, but the common thread between them was left to inference. The Work page also felt like a long single column, with a large gap between its introduction and projects.
- **Multi Product Integrations:** The five named capabilities were legible. Their list did not expose handoffs or a cross-product workflow, and a browser click timeout prevented verification of the mobile Menu interaction.
- **Design Systems:** Governance, shared foundations, density, and patterns were identifiable, but the page offered no examples to compare. It correctly avoided claiming exact density values.
- **Evidence limits:** The written sections provide source-backed accounts of personas, workflows, workshops, testing, governance, and foundations. Original interface media is not approved for reuse, and the source provides qualitative outcome claims without measurements.

### Revision and remaining gates

- This revision adds an explicit shared thread on Home and Work, shortens the Work introduction-to-project transition, and gives the shared presentation headings levels appropriate to their page context.
- Public media copy now explains that the diagrams summarize approved text and do not reproduce original screens. No source image, fabricated interface, metric, or causal claim was added.
- The source's unquantified outcomes and absent approved media remain evidence boundaries; resolving them requires new approved source material.
- The Menu interaction remains unverified by this cold read. Existing responsive browser coverage exercises the mobile drawer, but it must be rerun against the revised PR before relying on it.
- Repeat the cold read on the updated preview to check whether the shared thread is now understood. Keep the result qualitative and keep Issue #30 open until the remaining verification gates pass.
