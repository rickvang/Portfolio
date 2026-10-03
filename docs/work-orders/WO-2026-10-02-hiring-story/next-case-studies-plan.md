# Next portfolio work examples

Requested October 3, 2026: prepare Design Systems and UI Design Practices in separate chats, with at least three substantive revision passes each. Give the AI Systems council draft two additional passes here. Use the existing Portfolio workstream, draft PR and review surface.

## Shared editorial direction

Tell the story of Rick's work: the problem, his contribution, a concrete decision or method, the resulting artifact and supported outcome. Keep interview provenance, drafting commentary and unresolved details in internal notes. Write in plain first-person prose. Prefer connected sections over many small headings. Treat the existing agent-written stories as source material to assess, not copy to preserve automatically.

Use confirmed owner statements and original project material. Distinguish Rick's design work from implementation performed by others or agents. Persona simulation is exploration rather than real-user validation. Keep numerical, adoption and business claims within the available evidence. Keep revisions review-ready; publication is a separate decision.

## Three passes per new example

1. **Ground the story.** Read the existing project material and narrowly relevant original/source artifacts. Establish the problem, role, artifact and evidence boundaries. Write the first complete narrative.
2. **Explain the work.** Critique the first narrative for missing decisions, vague process and unclear ownership. Revise to explain at least one supported example from problem to choice to artifact. Record what changed.
3. **Make it readable.** Review as a hiring reader. Remove machinery, repetition and inflated claims; improve the connection between paragraphs. Verify the final source coverage and rendered desktop/mobile story once. Record changes and remaining internal questions.

Each pass must produce a materially revised story. Three checks of unchanged prose do not count as three iterations. Save a concise pass log with findings and changes, rather than a new workflow or a folder of duplicate full drafts.

## Design Systems

- Start with the imported `design-systems` project in `content/imports/rickvang.com.json` and its original public source. Use Rick's confirmed Figma/library work only where it applies to this example; the integrations story compiles multiple engagements.
- Explain the system's practical use for designers: what was inconsistent or duplicated, what Rick contributed, what reusable artifacts were created and how they were used.
- Do not attribute the real-estate team size, exact rollout, specific component rules or adoption to this example without matching evidence.
- Deliver `design-systems-revision.json`, `story.md` and `iterations.md` under `docs/work-orders/WO-2026-10-02-hiring-story/examples/design-systems/` in the assigned isolated checkout.

## UI Design Practices

- Start with the current authored `ui-design-practices` record. Check its original/source material to decide which work example it actually supports.
- Explain practical design decisions and the resulting interface/artifacts. If the evidence describes the portfolio redesign, identify it as that project and keep ownership accurate; do not present agent-built code as Rick personally implementing it.
- Reduce contract and tool vocabulary to details that help a reader understand the design. Use a supported example such as hierarchy, navigation, responsive behavior or an interaction state.
- Deliver `ui-design-practices-revision.json`, `story.md` and `iterations.md` under `docs/work-orders/WO-2026-10-02-hiring-story/examples/ui-design-practices/` in the assigned isolated checkout.

## Parallel ownership and integration

The running chats are [Revise Design Systems case study](thread://01a10095-0510-7ae1-ac27-37029dbceb38?hostId=local) and [Revise UI Design Practices case study](thread://01a10095-1feb-7453-94e9-341ba3f0141a?hostId=local).

The two chats use separate Portfolio Git checkouts based on commit `042819bf9a489e91a067689926c56b24ff222c4e`. They only commit their own example directory and any explicitly justified example-specific assets. The active hiring-story checkout and primary Portfolio checkout are shared/read-only references.

For local preview in an isolated checkout, temporarily add the candidate record to that checkout's existing catalog. Restore only that chat's temporary catalog change before committing its deliverables. Do not alter shared renderers, schemas, approved records, publication gates or the main work order. Do not merge, publish, deploy or independently update draft PR #63. The parent chat integrates the two finished records into the canonical catalog once and handles the existing PR.

Use separate preview ports: Design Systems 3193; UI Design Practices 3194. Leave the parent preview on 3192. Reuse existing dependencies without changing the install/lockfile. Run the narrowest relevant final checks. Stop a checkout's owned dev server before any production build that shares its temporary output.

The parent also performs AI Systems passes 2 and 3: first strengthen the explanation of the council's practical purpose and synthesis; then edit for direct voice and remove repetition while preserving the confirmed roles, compiled profiles, consistent input and use-case output.
