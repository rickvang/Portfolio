# Initial visual-quality review — Portfolio Issue #5

- Review date: 2026-09-22
- Baseline: Portfolio PR #31 head `5cb26d1`
- Review type: source, content, and design-contract review
- Live surfaces reviewed: Home/featured work, Notes, Contact, local development harness, and admin posts
- Reusable component reviewed in detail: `ProjectPreview`

## Review boundary

This review inspected the current TSX, CSS, design contract, and source-backed case-study content. PR #31's CI passed and produced visual captures, but the artifact images were not opened here. The findings below are therefore structural and content-based; they are not rendered visual approval. The independent cold-reader evaluation for Issue #30 is also still pending.

## Page-level review: Home with Multi Product Integrations

### Context and intent

The primary reader is a prospective collaborator or hiring reader. The surface should identify the work, offer a direct route to all work, and make one approved project understandable from its source-backed text. The project crosswalk records the underlying evidence and keeps reader response provisional.

### Rubric findings

| Dimension | Evidence examined | Finding and next check |
| --- | --- | --- |
| Context and intent | Home page uses the approved profile and case-study catalog. The #30 crosswalk names the reader task and claim limits. | The source and task are explicit. Retain the crosswalk as the evidence boundary. |
| Hierarchy and reading path | Home markup orders role labels, `h1`, summary, primary/secondary links, and featured project title, summary, and preview. | The intended reading path is explicit in the document structure. Check the actual desktop fold and mobile sequence in a rendered review. |
| Composition quality | `work-led.css` gives the hero a 0.72/1.28 two-column grid and stacks it below 900px. The project topology stacks below 620px. | The composition has a documented recovery at narrower widths. Text length and rendered balance still need visual inspection. |
| Visual language and semantic tokens | The preview uses the existing warm-neutral surfaces, borders, accent, type, and spacing tokens; it labels the view as text-derived. | Project variation comes from authored evidence, while shared styling stays token-based. Do not introduce a new token for either single project. |
| Interaction completeness | The project title and case-study action are links. The presentation contains no simulated controls. Missing profile data has a text-first fallback. | The preview communicates information without suggesting an unimplemented interaction. Verify the links and fallback through the existing browser coverage when that suite is run. |
| Responsive and environmental behavior | Breakpoints at 900px and 620px change the hero and presentation grids. The design contract specifies reduced motion and text-first fallback. | Source rules cover the known environments. A rendered review should include narrow and wide widths, zoom, and reduced motion. |
| Accessibility and inclusion | The route uses a section label, one page `h1`, native anchors, labelled presentation sections, and unordered item lists. | The semantics match the reading task. Check focus visibility and contrast in the rendered page. |
| Reuse and component boundaries | `ProjectPreview` delegates to the shared `ExperiencePresentation`; project facts remain in the typed profile and case-study source. | The preview owns framing, not project-specific data or selection logic. Keep the API small. |
| Implementation fidelity and QA | PR #31 has a passing CI baseline and a generated visual-capture artifact. | Code and browser coverage exist for the #30 implementation, but the artifact was not inspected here. Do not call the visual direction signed off. |
| Evidence and rationale | `experience-crosswalk.md` names source facts, alternatives, invalidating conditions, and cold-reader prompts. | Rationale is inspectable. Feeling hypotheses remain provisional until the independent review occurs. |

### Five aesthetic reflection prompts

- **Clarity:** Can a reader identify the shared framework and its capabilities from visible labels and content? The text and project heading expose both; rendered comprehension remains unconfirmed.
- **Compose:** Does the grouping show membership without implying process order? The unordered list and absence of directional connectors follow the documented evidence.
- **Differentiate:** Does this project's presentation vary for a source-backed reason? The authored hub-and-capabilities pattern differs from the Design Systems groups for a documented reason.
- **Refine:** Do spacing, line lengths, labels, and source links support scanning and evidence checks? The CSS and typed source trace are present; rendered rhythm remains to be checked.
- **Reduce noise:** Can decoration or claims be removed without losing evidence or orientation? The preview uses approved text and no reconstructed client screen; keep ornamental connectors and unsupported metadata out.

## Reusable-component review: `ProjectPreview`

| Concern | Observation |
| --- | --- |
| Purpose and content | Receives one `CaseStudy` and optional review audience; displays category, “Text-derived view,” and the shared preview presentation. |
| Composition | Uses the authored topology or matrix shape, with explicit labels and lists. It does not derive item membership from array order. |
| Reuse and boundaries | Project presentation logic stays in `ExperiencePresentation` and the validated resolver. `ProjectPreview` does not read services or create its own layout rules. |
| States and fallback | Unknown/thin approved content falls back to source text; drafts are unavailable publicly and text-only in review mode. |
| Accessibility and responsive rules | Uses labelled sections, headings, lists, and text; CSS collapses the topology and matrix at the narrow breakpoint. |
| Evidence and uncertainty | The source crosswalk supplies the rationale. Rendered composition and independent reader response remain open checks. |

No code or component change is justified by this source-level pass. Use the review template in `DESIGN.md` for a later rendered pass and record any finding with its evidence and consequence.

## Surface scan

| Surface | Source inspected | Initial finding | Open check |
| --- | --- | --- | --- |
| Notes | Notes route and `PostList` | Published content, loading, empty, and error states share one content boundary. The error fixture clearly describes the future retry boundary. | Inspect realistic long titles/excerpts and error presentation at narrow widths if the route changes. |
| Contact | Contact route and `ContactForm` | Fields have visible labels and native types; feedback uses a live region. The route states that the current form does not transmit data, and success text says “Message ready to send.” | Preserve this local-first boundary until a real transport exists; review keyboard and error state in a rendered pass. |
| Development harness | `HarnessPlayground` | State controls expose `aria-pressed`; fixtures cover the contact form, project list, posts, case studies, and author workflow. The surface is explicitly local-only. | Keep representative content and important states direct-linkable; no new fixture was identified by this source scan. |
| Admin posts | Admin posts route, status actions, and CSS | Post status is visible; actions remain in forms; delete requires an explicit checkbox and uses a danger style. Rows stack below 760px. | Recheck action grouping and focus at a narrow width if the admin layout changes. |

## Disposition

The current code and design contract provide enough structure for an initial review without a product redesign. The open implementation task is to formalize the rubric and repeatable workflow. Rendered sign-off, image review, and the independent cold-reader result remain separate evidence gates; this record does not claim them.
