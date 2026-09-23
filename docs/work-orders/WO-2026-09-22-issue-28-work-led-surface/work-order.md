# Work Order — Issue #30 work-to-experience translation

## Header

- Work-order ID: WO-2026-09-22-issue-28-work-led-surface
- Title: Portfolio work-to-experience translation and work-led surfaces
- Status: close-out review complete; stacked draft PR remains open
- Created: 2026-09-22
- Last updated: 2026-09-23 (post-revision cold read and responsive/menu review recorded; PR #31 remains draft)
- Requester: Riley / repository owner
- Current owner: Riley Morgan / Codex implementation for Current Work CW-39
- Request mode: update and prototype
- Proportionality tier: feature
- Change mode and domain: source-backed UX translation, public portfolio UI, typed presentation boundary, harness, and verification
- Reconciliation requirement: reconcile Current Work CW-39 and issue #30 with the final branch, draft PR, work packet, and validation results
- Explicit authorization and target: implement Issue #30 in `rickvang/Portfolio`, stacked on the current Issue #29 head; publish a draft PR and update Issue #30 with artifact links. Do not merge, deploy, publish to production, or close the issue.
- Stopping condition: implementation, evidence, reader review, and checks are reviewable through the open stacked draft PR and Issue #30; document that human usability research is not claimed.

## Artifact home and index

- Artifact home: `docs/work-orders/WO-2026-09-22-issue-28-work-led-surface/`
- Work Order file: this file
- Current concrete deliverable: an agent-facing thematic and quality-reflection scaffold; seven-layer evidence-to-experience translation for both approved projects; shared semantic presentation on Home/Work/detail; and a deterministic local harness with fallbacks.
- Specialized artifact links: [Experience crosswalk](experience-crosswalk.md); [DESIGN.md](../../../DESIGN.md); [ARCHITECTURE.md](../../../ARCHITECTURE.md); [DECISIONS.md](../../../DECISIONS.md).

| Artifact ID | Type | Path or URL | Revision | Owner | Status | Evidence or authorization note |
| --- | --- | --- | --- | --- | --- | --- |
| ART-001 | Work Order | `docs/work-orders/WO-2026-09-22-issue-28-work-led-surface/work-order.md` | Current branch | Riley Morgan / Codex | reviewed | Continuation of CW-39 / Issue #28, extended by Issue #30. |
| ART-002 | UX evidence and design crosswalk | `docs/work-orders/WO-2026-09-22-issue-28-work-led-surface/experience-crosswalk.md` | Current branch | Riley Morgan / Codex | reviewed | Source-backed interpretations; reader response remains a hypothesis. |
| ART-003 | Product implementation and tests | `src/lib/experience-profiles.ts`, `src/lib/project-presentation.ts`, `src/components/experience-presentation.tsx`, `src/components/project-preview.tsx`, and associated pages/styles/tests | Current branch | Portfolio | reviewed | All mutations stay in Portfolio; previously recorded checks need a fresh run after the current revisions. |
| ART-004 | GitHub issue | https://github.com/rickvang/Portfolio/issues/30 | Live issue | Repository owner | open | User-directed progress link update; keep issue open. |
| ART-005 | Stacked draft PR | https://github.com/rickvang/Portfolio/pull/31 | Branch `codex/issue-30-work-to-experience` | Portfolio | active | Draft PR #31 targets `feat/issue-28-work-led-surface` at PR #29's head; no merge/deploy. |

## Project context and reference routing

### Project profile

- Primary project type: public portfolio website
- Secondary project type: source-backed case-study content and reusable presentation system
- Primary user or operator job: help a prospective collaborator or hiring reader understand the documented work and navigate to its evidence
- Platform and environment: Next.js App Router, server-rendered pages, desktop and mobile browsers, local-only development harness
- Content density and variability: two approved source projects with structured system items; future projects can be thin, unknown, or contain longer text
- Risk or consequence level: medium; presentation can misstate client work or reveal unapproved media if source and approval boundaries fail
- Uncertainty level: moderate; source copy is approved for public use, but relationships and desired reader response are interpretations
- Audience or role: portfolio visitors; a hiring or collaboration reader is a working assumption, not user research
- Evidence available and missing: imported approved text, source sections, and client-IP disclaimer; no approved screenshots with useful alt text/captions; an independent model-based cold-reader review is recorded in the crosswalk; no quantitative outcome measures are available.
- Constraints and authorization boundary: use only approved facts; keep draft review local; no fabricated/recreated client UI; do not merge or deploy
- Success criteria: distinguish observed work qualities, interface qualities, and intended feelings; record evidence and alternatives; name thematic direction in words; use Clarity/Compose/Differentiate/Refine/Reduce noise as observable prompts; select evidence-based reusable patterns; render semantic responsive content with clear fallback; preserve media and approval gates
- Stopping condition: code and work artifacts are reviewable through the open stacked draft PR and issue link; cold-reader findings are recorded, resulting revisions are reviewed on the updated preview, and required checks pass.

### Routing decision

- Primary lens: UX evidence-to-experience translation
- Secondary lens: frontend semantics, responsive behavior, and content-safety boundaries
- Why this route fits: Issue #30 asks for an explicit reasoning chain from project evidence to visual grammar and to testable visitor response.
- Classification confidence: high for the requested implementation; medium for the visitor goals, which are inferred from portfolio context
- Provisional assumptions: visitors scan project previews before opening detail; the existing approved status permits the source text but does not authorize image reuse
- Proportionality tier: feature
- Selected Personas and Skills: Portfolio UX/UI/frontend route; Persona-Library `component-builder` practice applied for semantic pattern and interaction specification
- Selected reference IDs and examples: Portfolio Issues #28 and #30; approved import at `content/imports/rickvang.com.json`; UX Work Order Template in Persona-Library
- Minimum gates: approval/evidence validation, semantic and keyboard access, responsive wrapping, fallback coverage, unit/browser verification, no media fabrication
- Conditional gates: source-media/IP review remains required before any source image is added; the model-based cold read supports the visible structural explanation only, not human response or feeling hypotheses.
- Gates skipped with reason: formal participant research is outside this portfolio-page change and no participant access is provided; use source review plus implementation inspection and keep qualitative hypotheses provisional
- Question that would materially change the route: whether approved media with usable captions/alt text and reuse permissions becomes available

### Profile revisions

| Revision | Date | Field or lens changed | New evidence | Impact on route | Decision or next action |
| --- | --- | --- | --- | --- | --- |
| R-001 | 2026-09-22 | Scope and baseline | Issue #30 assigned as full implementation, stacked on live Issue #29 head | Extended existing CW-39 work packet without replacing its active #28 implementation | Build the seven-layer translation and retain the #29 → #30 stack. |

### Promotion disposition

| Candidate | Generalizable beyond this project? | Evidence status | Proposed shared location | Decision |
| --- | --- | --- | --- | --- |
| Seven-layer evidence-to-experience chain | yes | explicit issue requirement and source-backed project examples | Portfolio DESIGN.md; later Persona-Library only through a separate authorized task | retain project-only for this implementation; propose no cross-repository mutation |
| Project-specific pattern profiles | no | curated interpretations of two Portfolio case studies | Portfolio `src/lib/experience-profiles.ts` | retain project-only |

## 1. Scope and frame

### User or operator goal

Give a visitor a source-backed way to understand how each approved project is structured and why its presentation uses a particular visual grammar.

### Primary task

Trace approved facts through a visitor goal, interpreted work qualities, interface qualities, a feeling hypothesis, a justified pattern, and a semantic presentation contract. Preserve the shared case-study information architecture.

### Included scope

- Build authored experience profiles for Multi Product Integrations and Design Systems.
- Provide a repeatable agent-facing rationale scaffold and observable visual-quality prompts, separate from the UI harness.
- Reuse one presentation contract on Home, Work, and case-study detail.
- Add a profile resolver with public approval checks, source-note validation, stable membership checks, and text-first fallback.
- Keep media deferred/redacted and add synthetic, visibly non-client harness cases for text-only and dense content.
- Update design, architecture, decision, tests, and this work packet; submit a stacked draft PR and link it from Issue #30.

### Excluded scope

- Merge, production deployment, issue closure, hosted-system mutation, project content beyond the two approved records, and cross-repository writes.
- Client image reuse, screenshot recreation, numeric UX outcomes, measured feeling, or claims of user validation.

### Success criteria

- Both projects have distinct, evidence-backed patterns with explicit item membership and rejected alternatives.
- The design scaffold names each project's thematic direction in words and uses observable reflection questions without numeric scores or automatic theme-to-layout rules.
- Observed work qualities, desired interface qualities, and feeling hypotheses are separate fields.
- No arrow, sequence, dependency, exact density scale, fabricated screen, unsupported metric, or automatic feeling-to-layout mapping is added.
- Drafts remain unavailable on public routes; incomplete approved profiles fail to source-ordered text.
- The public Home and Work surfaces prioritize approved work, and detail includes source-section trace links.
- Responsive/keyboard/reduced-motion behavior and thin/long content have deterministic harness/browser coverage.
- Independent model-based cold-reader review completed 2026-09-23; human/user response and feeling hypotheses remain unvalidated.

### Known constraints

- Shared case-study chapter sequence remains authoritative.
- User authorization allows a stacked draft PR and issue update; main is an auto-deploy boundary and is not authorized for mutation.
- Source media metadata is inadequate for reuse; only approved text may be rendered.

### Evidence already available

| Evidence ID | Description | Status | Source or revision | Scope and limitation |
| --- | --- | --- | --- | --- |
| E-001 | Approved Integration overview, exploration, system items, and outcomes | sourced | `content/imports/rickvang.com.json` and normalized case-study record | No numeric outcome values or directional task order. |
| E-002 | Approved Design Systems exploration and system items | sourced | same import and normalized record | No exact density measurements or rollout order. |
| E-003 | Existing curation/media review notes | sourced | Portfolio issue #28 and imported case-study record | Source images remain deferred; no usable alt-text/caption data. |
| E-004 | Candidate presentation semantics and responsive behavior | recommendation | `DESIGN.md` and `experience-crosswalk.md` | Checked against implementation and browser suite; independent reader result is recorded in Section 12. |
| E-005 | Synthetic thin/dense fallback examples | synthetic_assumption | `fixtures/seed.json` and local harness | Tests rendering only; not client work or participant evidence. |

### Unknowns and validation questions

| Unknown ID | Unknown | Why it matters | Next validation method | Owner |
| --- | --- | --- | --- | --- |
| U-001 | Does the visible interface communicate the relationship without implying unsupported order or density? | One model-based reader can assess the visible explanation but cannot establish real-user prevalence or feelings. | Independent model-based review completed 2026-09-23; findings and limits are in `experience-crosswalk.md`. Human research was not conducted. | Riley / Codex |
| U-002 | Are original source images cleared for reuse and sufficiently described? | Client IP and accessibility; current image content must stay absent. | Obtain explicit reuse approval and metadata through a future authorized content task. | Repository owner |

## 2. Contextual workflow and tool discovery

### Research decision

- Why contextual discovery is or is not warranted: no unfamiliar user workflow is being introduced; this is a portfolio reading experience over approved historical work. Source inspection is appropriate for claims, but it cannot establish visitor comprehension.
- Target role or segment: prospective collaborator/hiring reader, assumed from portfolio purpose and not validated.
- Real-user research available: no; one model-based cold read is recorded, not user research.
- Evaluation performed: one independent model-based first read of Home and Work at 1363×936 and 400×849, plus mobile-menu open/dismiss. The exact interpretation and limits are in `experience-crosswalk.md`; this was not a human usability session.
- Access, consent, and safety constraints: do not expose private client details; do not call a synthetic response real feedback; avoid leading prompts.

### Workflow map

| Step ID | Trigger or action | Information needed | Tool/system | Handoff or interruption | Failure/recovery | Evidence status |
| --- | --- | --- | --- | --- | --- | --- |
| W-001 | Visitor opens Home or Work | Project identity and useful first signal | Public site | Native link to case study | Return to compact approved summary if profile cannot resolve | implementation target |
| W-002 | Visitor scans project structure | Named parts and relationship | ExperiencePresentation | Source-trail anchor on detail | Text-first authored order if evidence/membership check fails | interpretation |
| W-003 | Visitor checks detail evidence | Supporting section and media status | CaseStudyTemplate | Navigate among visible sections | Source media stays deferred; no substitute screen | sourced boundary |
| W-004 | Reviewer evaluates relationship | Open explanation without profile terminology | Independent model-based reviewer | First interpretation recorded in crosswalk | Revise pattern or record a pass with limitations | pass with limitations |

### Tool and system inventory

| Tool/system | What it appears to support | Known or unverified | Source | Permission or access question |
| --- | --- | --- | --- | --- |
| Approved Portfolio case-study record | Project copy, section items, source references, approval state | known | `src/lib/case-studies.ts` and imported content | Public presentation allowed only when approved. |
| Local `/dev/harness` | Deterministic preview and fallback states | known | Portfolio harness route | Must remain local-only and production-blocked. |
| Independent cold reader | Model-based qualitative comprehension check | completed 2026-09-23; not human research | Result in crosswalk | No participant contact or human usability claim. |

### Participant records

| Participant ID | Type | Role/task | Source or construction basis | Evidence status | Open validation |
| --- | --- | --- | --- | --- | --- |
| P-001 | no human participant recruited | N/A | No human study was conducted; separate model-based review is documented below. | not applicable | No human-participant result is claimed. |
| P-SYN-001 | synthetic harness fixture | Check fallback and long-content rendering | Local non-client seed copy | synthetic_assumption | Not evidence of comprehension or demand. |

### Synthetic participant prompt and responses

No synthetic-user or human-participant responses are claimed. The harness only exercises component states. The separate model-based cold read is recorded below and is not user research.

## 3. Content and information architecture

### Content fixture

- Fixture ID or source revision: approved import captured 2026-09-22; synthetic thin/dense fixtures in `fixtures/seed.json`.
- Why this content is representative: it includes two distinct but related system-design case studies, source-section traceability, and a content-thin fallback.
- Long-content case: synthetic dense project preview, clearly labeled non-client work.
- Short-content case: synthetic text-only project without structured system detail.
- Empty or partial-data case: approved profile whose evidence/item membership is incomplete resolves to text-first output.
- Error, permission, stale/offline, or recovery case: no external query occurs; draft content is unavailable publicly and review mode remains text-only.

### Content inventory and terminology

| Content ID | Content or concept | Source authority | Label | Grouping or taxonomy rationale | Evidence status |
| --- | --- | --- | --- | --- | --- |
| C-001 | Unified framework and five system surfaces | approved Integration case study | How the product parts relate | Source says one framework; unordered list avoids asserting steps | sourced + interpreted |
| C-002 | Governance, core library, foundations, density, patterns | approved Design Systems case study | Governance, foundations, and use patterns | Explicit curated membership clarifies distinct roles | sourced + interpreted |
| C-003 | Marketing and enterprise-product surfaces | approved Design Systems case study | Contexts named in the source | Source names both density contexts; values remain unspecified | sourced |
| C-004 | Deferred source media | case-study curation notes | Original case-study media | No reuse until permission/description review | sourced boundary |

### IA alternatives

| Alternative ID | Structure or navigation model | Strength | Risk or tradeoff | Evidence status | Selected / parked / no-go |
| --- | --- | --- | --- | --- | --- |
| IA-001 | Framework hub and unordered capability list | Shows shared membership | Can be misread as architecture if lines/arrows imply dependencies | sourced + interpreted | selected with no arrows; model-based reader found the shared relation legible |
| IA-002 | Explicit group matrix with context labels | Makes shared practice and variations scannable | Groups are interpretations and may look chronological | authored from evidence | selected with fixed group labels and no stage numbers |
| IA-003 | Numbered workflow / rollout sequence | Familiar scan pattern | Unsupported by source and risks inventing sequence | unsupported | no-go |
| IA-004 | Source-ordered plain text | Faithful and robust to thin evidence | Less visual comparison | source-backed fallback | selected for invalid/thin profiles |

### Screen and state map

| Stable ID | Goal/task served | Content or IA item | Screen/region | State | Responsive rule | Accessibility condition | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home.work-preview | Identify approved work early | First approved project | Home first viewport | approved profile | compact two-column hero stacks | headings and native detail link | Portfolio |
| work.project-preview | Compare two project structures | Map and matrix | Work index | approved/text-first | groups stack at narrow widths | named headings and unordered lists | Portfolio |
| case-study.experience | Understand source relationship | Curated presentation and evidence trail | System chapter | approved profile/fallback | source content stacks; no horizontal scroll | source links navigate to visible sections | Portfolio |
| harness.experience-states | Inspect dense, thin, and media states | Synthetic fallback, deferred, redacted | Local harness only | test fixtures | wraps at mobile/tablet sizes | fixture visibly marked synthetic; controls remain native | Portfolio |

## 4. Visual and interaction translation

### Visual direction

- Hierarchy principle: approved project content is the primary hierarchy; compact identity supports rather than delays the work preview.
- Context and product rationale: map communicates shared membership; matrix communicates authored group membership and context comparison.
- Typography and readability: use existing site type scale and semantic headings; summaries remain plain text.
- Color roles and contrast: reuse existing neutral/accent/focus tokens; no pattern meaning depends on color alone.
- Spacing, grid, density: preserve current content grid; stack topology and matrix groups at existing narrow breakpoint; allow long text to wrap.
- Motion and transition: both patterns are static; reduced-motion behavior is identical.
- Rejected direction and reason: arrows, chronology, charts, reconstructed screens, or numerical badges lack source support.

### Component and state matrix

| Component/screen ID | Initial | Loading | Empty | Partial data | Success | Error/validation | Disabled | Permission/stale/offline | Confirmation/recovery | Evidence/status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ExperiencePresentation | Approved pattern | N/A: local server data | Text-only message/items | Text-first source order | Topology or matrix | N/A: malformed data caught by validator/tests | N/A | Draft public is unavailable | Native source anchors; no retry needed | authored profile, schema and tests |
| ProjectPreview | Approved compact preview | N/A | N/A | Text-first | Detail link | Route-level 404 for unapproved slug | N/A | Approved records only | Return to Work/Home | implementation + E2E |
| ArtifactFrame | Derived text only if authored | N/A | Deferred / redacted copy | N/A | N/A pending media | N/A | N/A | Permission boundary stated | Future approval and metadata review | source reuse unknown |
| Work-led harness | Approved examples | N/A | Text-only synthetic | Dense synthetic | Two patterns | Existing harness errors independent | N/A | Local route, blocked in production | Direct navigation/normal site routes | E2E and production guard |

### Responsive and accessibility checks

| Condition | Expected transformation or requirement | Checked? | Evidence/status | Finding or open question |
| --- | --- | --- | --- | --- |
| Narrow width | Patterns stack without horizontal overflow | checked 2026-09-23 | E2E viewport suite and updated preview at 400×849 | No horizontal overflow on Home and /work. |
| Long content | Long summaries and labels wrap within cards/groups | passed in E2E run 77 | synthetic dense fixture and browser suite | Long-content coverage passed; no failure was reported. |
| Zoom or text expansion | Native document flow expands vertically | not checked | CSS layout | No separate browser-zoom/text-expansion claim is made. |
| Keyboard or alternate input | Native anchors tab in reading order; visible focus | E2E passed; menu dismissal restores focus | E2E keyboard source trace and updated-preview menu check | No separate keyboard-only usability session was conducted. |
| Semantic order and focus | Headings precede group lists and source links | E2E passed; menu focus restoration observed | React markup, E2E, and updated-preview menu check | No full manual accessibility audit is claimed. |
| Contrast or motion | Existing tokens; static map/matrix and unchanged reduced-motion state | reduced-motion E2E passed; contrast not re-audited | CSS tokens and browser suite | No separate contrast audit is claimed. |

## 5. Prototype and evaluation

- Risky question: does the selected visual structure communicate the intended relationship without suggesting an unsupported process, architecture, or exact density specification?
- Prototype or test artifact: public Home, Work, case-study detail, and local-only `/dev/harness` previews.
- Method: implementation inspection, browser tests, and one independent model-based cold-reader session completed 2026-09-23.
- Scope tested: profile resolution, content membership, public approval boundary, source-link structure, synthetic fallback and dense states, and responsive behavior.
- Scope not tested: human/real-visitor comprehension (the model read is qualitative), actual client screen reuse, zoom/text expansion, or business/outcome measurement.
- Evidence status: source facts are sourced; the design interpretations are recommendations; feeling claims remain hypotheses.
- Findings: the revised Home and Work copy made the common systems-design thread and the main project distinction legible; practical outcomes remain abstract. See the crosswalk for exact wording and limitations.
- Assumptions and unknowns: documented in U-001/U-002 and the experience crosswalk.
- Next validation action: no further U-001 close-out read is required; later human usability or source-media review would be a separately authorized follow-up.

## 6. IA-to-UI traceability

- Matrix ID: CW-39-issue-30-traceability
- Revision: 2026-09-23
- Coverage result: implementation acceptance and model-based reader result recorded; human usability is not claimed.
- Unserved or blocked rows: approved source media and quantified human outcomes remain unavailable; media stays intentionally blocked.
- Orphan check: complete; PR #31 lists all 23 intended changed files and issue/Work Order links resolve to the same branch.
- Owner: Riley Morgan / Codex
- Next correction: no copy correction is needed for the current reader-understanding criterion; revisit only if an invalidator is triggered or approved evidence changes.

| Acceptance item | Evidence in implementation | Verification |
| --- | --- | --- |
| Repeatable agent-facing reasoning and aesthetic lens | `DESIGN.md` reasoning scaffold, `experienceProfiles.thematicDirection`, and work-order crosswalk | unit profile completeness; model-based comprehension review recorded, not a human study |
| Evidence-backed patterns for both projects | `src/lib/experience-profiles.ts` and `experience-crosswalk.md` | unit assertions and cold-reader interpretation recorded in the crosswalk |
| Stable data-defined membership | section/title IDs and explicit profile ID groups | resolver membership tests |
| Draft/public boundary | `getProjectPresentation` audience and route approval filter | unit/E2E public boundary tests |
| Text-only, long-content, deferred and redacted states | local-only work-led harness and fixture | E2E and viewport checks |
| Home/Work first signal | public page composition and shared preview | E2E assertions, responsive screenshots/snapshots, and updated-preview checks |
| No unsupported client media | `ArtifactFrame` discriminated props and no media source | typecheck, source inspection, rendered state assertions |
| Model-based cold read | script and result in crosswalk | Pass with limitations; no human usability study or feeling validation claimed |

## 7. Decisions and tradeoffs

| Decision ID | Question | Options considered | Decision | Rationale and evidence | Owner | Revisit condition |
| --- | --- | --- | --- | --- | --- | --- |
| D-030-01 | How should integration surfaces relate visually? | map, ordered flow, prose | hub + unordered list, trace in detail | shared framework is sourced; directional order is not | Portfolio | reader infers a sequence/dependency |
| D-030-02 | How should Design Systems be organized? | group matrix, stage sequence, density specification | explicit three-group matrix plus context list | group membership is authored; two contexts named; no exact density values | Portfolio | reader infers chronology/measurements or source changes |
| D-030-03 | How should missing profile facts behave? | best-effort visual grouping, hide, text-first fallback | text-first approved source order; hide draft publicly | avoids unsupported grouping and protects publication boundary | Portfolio | new evidence supports another deterministic state |
| D-030-04 | What to do with source images? | reuse, recreate, omit | defer | no useful approval/caption/alt text established | Portfolio | explicit reuse approval and descriptive metadata arrive |

## 8. Phase progress and gates

| Phase | Owner | Status | Output or link | Evidence status | Gate result | Smallest next action |
| --- | --- | --- | --- | --- | --- | --- |
| Scope and frame | Riley Morgan / Codex | complete | issue #30 and this packet | sourced request | pass | none |
| Context and tool discovery | Riley Morgan / Codex | complete | approved import review | source facts known; human response and feelings remain unvalidated | skipped with reason: product discovery unavailable and not required to state copy | none |
| Content and IA | Riley Morgan / Codex | complete | experience crosswalk and profiles | source-backed with curated interpretations | pass; revised shared thread passed model-based review | no further action under this gate |
| Visual and interaction | Portfolio | complete | shared renderer, previews, harness | authored pattern contracts | pass | none |
| Prototype and evaluation | Riley Morgan / Codex | complete with limitations | updated preview and cold-reader report | model-based qualitative read; no human session | pass for the issue's visible-relationship criterion | no further implementation action; preserve stated issue/PR boundary |
| Handoff and QA | Riley Morgan / Codex | complete | [draft PR #31](https://github.com/rickvang/Portfolio/pull/31), Issue #30, and CW-39 | implementation checks passed on the reviewed code head; documentation update will receive normal CI | pass on reviewed head | confirm latest CI on the documentation-update head; do not merge/deploy |

## 9. Handoffs and recovery

| From | To | Revision | Accepted evidence/decisions | Open questions | Blocker or fallback | Required output | Next action | Acknowledged |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Issue #30 request | Riley Morgan / Codex | R-001 | full implementation requested; stack on #29; no merge/deploy | model-based reader result recorded; human response not validated | preserve no-merge/no-deploy boundary | tested change, work packet, draft PR, issue links | record close-out and verify latest CI | yes |
| Riley Morgan / Codex | independent model-based reviewer | R-002 | revised preview and neutral first-reader prompt; no source/profile/PR context supplied | concrete outcomes remain abstract; model read is not human research | screenshot endpoint timed out; accessible page snapshots and interaction state were used | first interpretation, wording, remaining ambiguity, and menu result | recorded in crosswalk; no copy change needed for the criterion | yes |

## 10. Handoff, implementation QA, and reconciliation

### Handoff packet

- Approved structure and visual direction: hub/unordered capability map for integrations; authored group matrix plus contexts for design systems; thin fallback remains source-ordered text.
- Content and state fixture: approved project records plus labeled synthetic text-only/dense harness fixtures.
- Acceptance criteria and fail conditions: seven layers remain distinct; no unsupported order or visuals; tests pass; no publication-boundary leak.
- Responsive rules: list/group stacks and wraps without horizontal overflow.
- Accessibility requirements: semantic headings/lists, native source anchors, visible focus, static reduced-motion behavior.
- Implementation questions: none blocking the code; independent comprehension and image reuse are not resolved.
- Known limitations: feeling hypotheses are not validated by human users; outcomes are unquantified; approved source media remains absent by design.
- Owner and revision: Portfolio / current branch, revision to be set at draft PR.

### Built-versus-designed QA

- Build or revision checked: current Issue #30 working tree; `pnpm verify` passed lint, typecheck, 32 unit tests, and production build
- Screens and states checked: Home first viewport capture; Work index; Integration detail source trail; local harness text-only/dense/deferred/redacted; reduced-motion states
- Widths, inputs, zoom, or environments checked: Playwright default desktop plus 390px mobile and 768px tablet; keyboard focus on native detail trace link
- Content and overflow checked: approved records, draft public metadata/noindex, synthetic labels, no source images, and no horizontal overflow at mobile/tablet widths
- Findings: authored groups remain legible and source links work; unsupported sequence and fabricated media are absent
- What was not checked: human/user comprehension, post-revision detail-route cold reading, zoom beyond browser defaults, and source-media reuse rights
- Corrections required: none for implementation QA; E2E assertions were aligned to the current work-led hierarchy
- Recheck status: pass; all 37 Playwright tests pass

### Reconciliation

- Durable change observed: implementation and design artifacts pass local repository checks
- Initiating contract: Issue #30 and Current Work CW-39
- Direct dependents: Portfolio DESIGN.md, architecture, decisions, tests, GitHub Issue #30
- Required updates: link work packet and draft PR from issue; update Current Work with resulting state
- Optional follow-ups: conduct human usability research only if later authorized; separately review source-media reuse
- Reconciliation status: complete; Issue #30 and Current Work CW-39 link to draft PR #31 and the updated evidence packet
- Link: [Current Work CW-39](https://app.notion.com/p/3e3cd82535ff81199040fc1bbd07f5a5); [Issue #30](https://github.com/rickvang/Portfolio/issues/30); [draft PR #31](https://github.com/rickvang/Portfolio/pull/31)

## 11. Close or no-go

- Concrete deliverable, decision, prototype, implementation, or action plan: seven-layer interpretation, agent-facing scaffold, two project patterns, shared renderer, local harness, passing build/unit/browser suites, and stacked draft PR #31
- Success criterion addressed: implementation and verification criteria, including the independent model-based reader check; the visible relationship criterion passed with limitations.
- Contribution or decision dispositions: Portfolio only; no shared-repository write is authorized
- Evidence limitations: model-based review only (no human usability research), no quantitative outcomes, and no approved source media.
- Remaining unknowns: U-002 source-media approval; human response, feelings, and quantitative outcomes were not validated by this model-based review.
- What was not tested: real visitor comprehension or outcomes, detail-route comprehension in the post-revision read, and source-media reuse permission.
- Final gate: implementation, checks on the reviewed code head, and the model-based reader-understanding criterion pass; no human research is claimed.
- Next action or explicit completion boundary: no further implementation action under the current scope; keep Issue #30 open and PR #31 draft, with no merge or production deployment.
- Closed by: not closed
- Closed at: not closed


## 12. Independent cold-reader close-out reviews — 2026-09-22 and 2026-09-23

### Initial review — 2026-09-22

A separate cloud reviewer inspected Home, Work, and both case studies before reading Issue #30's acceptance criteria. It reviewed each page at 1363×936 desktop and 400×849 mobile and reported no horizontal overflow at the mobile size. This was a model-based qualitative read, not a human usability study.

The reviewer could explain each project's broad purpose but inferred the relationship between them. It found the Work index's introduction-to-project transition too spacious. It could identify the integrations capabilities and Design Systems groupings, while noting that neither page shows original interfaces or examples. The source narratives provide qualitative outcomes but no measurements. The browser interaction for the mobile Menu timed out, so its behavior was not established by this review.

### Post-revision independent cold read — 2026-09-23

A separate model-based reviewer inspected the updated public Home and /work pages before reading the issue, source profiles, or earlier review. It checked 1363×936 desktop and 400×849 mobile viewports. It concluded that a visitor can explain the shared relationship and main distinction from the visible copy: both projects concern systems design; Multi Product Integrations connects workflows across a fragmented product ecosystem, while Design Systems gives teams shared, governed foundations for consistent patterns across distinct contexts. The same throughline is explicit on Home and /work.

The reviewer opened the mobile navigation, confirmed the dialog exposed Home, Work, Notes, About, and Contact, dismissed it, and confirmed focus returned to the menu toggle. A separate responsive check on the updated preview found no horizontal overflow at 400×849 on Home and /work.

The reviewer-understanding acceptance criterion passes. Remaining ambiguity is the abstract practical boundary between a framework and a design system; the interface lacks concrete day-to-day user examples, before/after comparisons, and quantified outcomes. The reviewer also found the text-derived diagrams more evidence-like than a conventional visual case-study narrative. Screenshot capture timed out, so the cold read relied on accessible page snapshots and interaction state rather than a complete screenshot-based visual review. This was a model-based qualitative check, not human usability research or proof of emotional outcomes.

This PR revision adds an explicit throughline to Home and Work, reduces the Work index transition gap, corrects contextual heading levels, and replaces process-oriented media wording with a visitor-facing explanation. It keeps original images deferred and adds no invented screens, outcome metrics, or causal claims. No further copy change is needed to meet the visible-relationship criterion. Original media and quantitative outcomes remain unavailable without new approved source material.

**Current close-out state:** the model-based reader-understanding criterion passes with the limitations above. Keep Issue #30 open and draft PR #31 open under the existing authorization; do not merge, close, or deploy to production under this work order.

**Implementation CI before this documentation update:** GitHub Actions run 77 completed successfully on `ae1dad76c5e6c2584969e91391d5fc289a861085`; Vercel reported success for the corresponding preview deployment. The stale copy assertion was updated to guard the throughline and case-study links. The documentation-only close-out commit receives the normal branch checks; the PR status will reflect the resulting head.