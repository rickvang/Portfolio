# Work-to-experience translation

Use this seven-layer chain when a project needs more than a title and summary:

| Layer | Question | Portfolio rule |
| --- | --- | --- |
| Evidence | Which approved fact, artifact, decision, constraint, or outcome supports the presentation? | Name the source and keep the claim within its limits. A source image remains unavailable until reuse is approved. |
| Reader goal | What relationship, sequence, comparison, or decision should a visitor understand? | State the visitor's task before choosing a visual pattern. |
| Observed work/system qualities | What structural qualities are supported by the evidence? | Separate source facts from interpretation. Relational, modular, governed, and adaptable describe the work only when a cited fact supports the reading. |
| Experiential qualities | What should the interface make perceptible or easier to read? | Describe interface behavior such as legible, coherent, paced, or scannable. Do not use these as claims about project outcomes. |
| Intended-feeling hypothesis | What human response might follow, and what would support or contradict it? | Orientation, confidence, clarity, and competence are hypotheses. They are not verified because profile metadata names them. |
| Translation pattern | Which curated action best serves the reader goal and experience qualities? | Select map, trace, assemble, compare, reveal, or instrument with an evidence-based rationale and an invalidating condition. |
| Semantic presentation contract | Which semantic structure, responsive rule, fallback, and motion behavior render the choice? | Existing components and tokens render an authored choice. There is no automatic feeling-to-layout or quality-to-pattern engine. |

Keep the shared case-study chapter sequence as the information-architecture boundary. A project profile may choose a presentation within a relevant chapter, while source sections, provenance, approval filtering, and the client-IP note remain authoritative. Home and Work previews use the same typed presentation contract in a compact form.

### Worked example: Multi Product Integrations

- **Evidence:** the approved overview describes a unified framework across fragmented products; exploration describes persona and workflow mapping; system details name modular layouts, persona-shaped dashboards, records and chat, reusable settings, and workflow completion; outcomes describe operational visibility and reduced administrative/rework burden without numeric measures.
- **Reader goal:** understand which documented product surfaces relate through the shared framework.
- **Observed qualities:** relational, modular, stateful, and operational; each interpretation points to overview, exploration, system, or outcome evidence.
- **Experiential qualities:** make the shared relationship legible and navigation precise.
- **Feeling hypothesis:** a reader may feel oriented if they can identify the framework and its capabilities. A reader who assumes an undocumented execution order weakens the hypothesis.
- **Pattern:** a hub with an unordered capability list, plus source-section links in detail. Its position communicates membership only; it has no arrows, direction, or sequence.
- **Presentation contract:** semantic headings and lists; one-column fallback at narrow widths; static motion; source media stays deferred; thin or unknown projects use a text-first summary.

### Worked example: Design Systems

- **Evidence:** approved exploration describes pattern/scenario audits, workshops, usage analysis, testing, and developer feedback. Approved system details name collaborators, a core library, lightweight governance, token foundations, density across marketing and enterprise-product surfaces, and reusable workflow templates/patterns.
- **Reader goal:** understand how governance and shared foundations support reusable patterns across different surface needs.
- **Observed qualities:** governed, layered, reusable, and adaptable. The source names two density contexts but does not define exact density values.
- **Experiential qualities:** make system structure coherent and scannable so a reader can compare authored groups.
- **Feeling hypothesis:** a reader may feel clear and capable if they can distinguish stewardship, shared foundations, and application. Exact density rules or chronology inferred from layout would contradict that hypothesis.
- **Pattern:** an explicitly authored matrix groups governance, shared foundations, and application. A separate context list names marketing and enterprise-product surfaces. Group membership is stable item data, not array-position slicing.
- **Presentation contract:** labelled groups and lists, not a staged flow; groups stack at narrow widths; static motion; text-first fallback; no reconstructed screens.

Use the source-backed project profile data and linked Issue #5 review evidence for source notes, alternatives, invalidating conditions, and reviewer questions; do not assume an active Work Order exists. Keep intended feelings in that work record and typed profile data; do not expose them as user-facing labels. Use [Issue #5](https://github.com/rickvang/Portfolio/issues/5) for the broader visual-quality rubric rather than duplicating it here.

### Agent-facing reasoning scaffold

Use this scaffold when translating approved code, content, or system evidence into a portfolio experience. It records a human decision path; it does not select a theme, component, or layout automatically. The short thematic direction is an authored lens before pattern selection, not an eighth translation layer and not a visitor-facing claim.

1. **Name the theme in words.** Write one concise phrase about the documented work, such as “connected operations across a shared product environment” or “a governed foundation that supports deliberate variation.” Cite the source facts that make the phrase apt.
2. **State the reader goal and evidence.** Name the relationship, sequence, comparison, or decision the reader should understand. Point to the approved section, item, artifact, decision, constraint, or outcome that supports each claim. If the evidence cannot support the relationship, use text-first content.
3. **Separate the qualities.** Record observed work/system qualities with their evidence, experiential qualities as interface intentions, and intended feelings as hypotheses. Do not let an archetype replace evidence or a reader goal.
4. **Choose and challenge a pattern.** Explain how the pattern serves both the goal and intended experience. Compare at least one plausible alternative and name a condition that would invalidate the choice. Use a spectrum only when its position changes a concrete presentation decision; never score an archetype or map it automatically to a layout.
5. **Write the presentation contract.** Specify semantic structure, stable item membership, responsive behavior, keyboard/focus, motion and reduced-motion behavior, media permission, and text-first fallback. Keep the contract in the existing shared case-study structure.

Before handoff, use these five reflection prompts as observable questions rather than scores:

| Lens | Observable question |
| --- | --- |
| Clarity | Can a reader who has not seen the profile explain the main relationship from visible labels and content? Which phrase or grouping is ambiguous? |
| Compose | Does hierarchy show what belongs together and the intended reading order without implying an unsupported process? Can every grouping be traced to authored evidence? |
| Differentiate | Does each project vary where the source evidence differs, while shared navigation, semantics, and tokens remain consistent? Can the reader name the reason for the difference? |
| Refine | Do alignment, spacing, labels, and source links help a reader scan, compare, and check evidence with keyboard or touch? Which element interrupts that task? |
| Reduce noise | Can any unsupported decoration, repeated claim, invented connector, or unneeded label be removed without losing evidence or wayfinding? |

The reasoning profile is distinct from the UI harness. Profiles keep the evidence and authored design rationale reviewable; the local harness renders real components with approved and explicitly synthetic fixtures so the visual, responsive, keyboard, fallback, and reduced-motion behavior can be inspected. Harness success does not establish that a feeling hypothesis is true.

### Presentation anti-patterns

- Do not infer an arrow, dependency, workflow order, metric, or exact screen from visual proximity or from a general mention of connections.
- Do not group items by array position, number an unverified sequence, or select a pattern from an unexplained project slug.
- Do not convert feelings or archetype adjectives into numeric scores, CSS classes, tokens, or automatic layout choices.
- Do not add fake product UI, stock or generated screenshots, or source media whose reuse has not been classified.
- Do not invent pattern groups when the source is thin; render the approved text in its existing order and state what is absent.
- Do not add a semantic token for a single project. A repeated need across at least two surfaces must justify and document a token.
