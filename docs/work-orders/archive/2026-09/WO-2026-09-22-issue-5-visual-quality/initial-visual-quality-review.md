# Initial visual-quality review — Portfolio Issue #5

- Source-review date: 2026-09-22
- Rendered-review date: 2026-09-23
- Source-review baseline: Portfolio PR #31 head `5cb26d1` (merged to `main` on 2026-09-23 as `9bbb8207b6f2d5140180c5be4a82e468817c4a56`).
- Rendered review: PR #32 Vercel preview on Home (`/`) and Work (`/work`).
- Review type: source, content, design-contract, and rendered visual review
- Source-inspected surfaces: Home/featured work, Notes, Contact, local development harness, and admin posts.
- Rendered surfaces: Home and Work/`ProjectPreview` at 1440×1000 and 390×844.
- Reusable component reviewed in detail: `ProjectPreview`

## Review boundary

The original 2026-09-22 pass inspected the current TSX, CSS, design contract, and source-backed case-study content; it did not claim rendered visual approval. The 2026-09-23 supplement below records a rendered inspection of the PR #32 preview on Home and Work. The Issue #30 independent cold-reader evaluation is now complete as a model-based review; it is separate from this visual inspection and is not human usability research. The findings above preserve what was checked in the initial source review; the supplement closes the rendered checks where covered.

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

## Rendered review supplement — 2026-09-23

- **Preview:** [PR #32 Vercel preview](https://portfolio-git-codex-issue-5-visual-quality-rubric-acme-dd4d.vercel.app/).
- **Routes:** Home (`/`) and Work (`/work`), which renders two `ProjectPreview` instances with approved case-study content.
- **Viewports:** 1440×1000 desktop and 390×844 mobile.
- **Responsive evidence:** no horizontal overflow at 390 CSS px. Home keeps identity and actions ahead of the featured project. Work's asymmetric desktop composition becomes a single-column mobile stack. The first mobile `ProjectPreview` is about 1,155 CSS px tall; content remains legible, but its scroll depth is a non-blocking density question.
- **Interaction evidence:** the mobile navigation opens a named dialog; Escape closes it and restores focus to the trigger. Project preview content is static and links to its case study.
- **Contrast sample:** token pairs against their documented surfaces measured accent ink/background 5.21:1, muted/background 5.05:1, foreground/background 16.04:1, rail muted/rail 6.94:1, rail accent/rail 5.27:1, and rail foreground/rail 13.56:1. These are token-pair checks, not a full-page contrast audit.
- **Browser diagnostics:** no console errors or warnings were present on Home. Work's console was not checked.
- **Evidence limit:** the previews are text-derived because reuse of source images remains deferred. This pass did not inspect tablet widths, zoom, reduced motion, assistive technology, or human usability. The cold-reader review for Issue #30 is model-based; it found the project throughline understandable while concrete examples and outcomes remain abstract. Feeling hypotheses, image reuse, and quantified outcomes remain unverified.

### Findings by rubric dimension

| Dimension | Rendered finding | Disposition / uncertainty |
| --- | --- | --- |
| Context and intent | Both routes identify approved, source-backed case studies and label the visual summaries as text-derived. | Supports the stated purpose; reader response was not tested with people. |
| Hierarchy and reading path | Home moves from identity and actions to featured work; Work presents each project title, summary, action, and preview. | Supports the documented hierarchy at both tested widths. |
| Composition quality | Desktop uses a split composition; mobile stacks the content without overflow. | Supports the direction; the tall mobile preview merits a later density decision. |
| Visual language and tokens | Warm neutral surfaces, charcoal navigation, and restrained orange accent are consistent. | Supports current system; current typography uses an Arial stack, and cultural color or type-pairing research was not part of this pass. |
| Interaction completeness | The navigation dialog opens and closes; case-study links are exposed as links. | Checked interaction works; other states and route behaviors were not reviewed here. |
| Responsive/environmental behavior | 1440px and 390px layouts render without horizontal overflow. | Those widths support the direction; tablet, zoom, and reduced-motion conditions remain unchecked. |
| Accessibility and inclusion | The accessibility tree exposes headings, named navigation, links, and a dialog; sampled token contrast exceeds 4.5:1. | Partial evidence only; no full keyboard, screen-reader, or assistive-technology audit. |
| Reuse and component boundaries | `ProjectPreview` renders both case studies on Home and Work with the same responsive contract. | Supports reuse for these two examples; no broader consumer study was performed. |
| Implementation fidelity and QA | The rendered preview matches the documented editorial hierarchy and text-derived presentation. | No visual mismatch found in checked routes; source imagery remains intentionally deferred. |
| Evidence and rationale | Captions distinguish source-backed content from interpretation and avoid implying sequence. | Model-based cold read is complete; human response and emotional effect remain hypotheses. |

**Owner:** Portfolio maintainers. **Overall disposition:** the rendered direction is supported for this pass; no blocking rendering defect surfaced. The first mobile preview's scroll depth is the one visual follow-up to consider. This review does not claim universal aesthetic validity or human usability validation.
