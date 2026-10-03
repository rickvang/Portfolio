# UI Design Practices revision log

Internal recovery and review notes. Parent workstream: CW-83 / draft PR #63. Assigned branch: `codex/ui-design-story`; starting commit: `042819bf9a489e91a067689926c56b24ff222c4e`. This chat owns only this example directory. The parent integrates the final JSON record once; no publication decision is implied.

## 1. Ground the story

**Findings:** The approved authored record describes the portfolio redesign, but its reader-facing emphasis is phase contracts, tool ownership and verification. Generic Persona-Library methods do not establish Rick's personal project work. Issue #6 supplies the confirmed audience and design direction; Issue #4 and the implementation references support behavior/artifacts, not usability results. Later public presentation has evolved, so the initial drawer must be described historically.

**Changes:** Replaced the contract-heavy account with a complete first-person narrative of the portfolio brief, reading/navigation problem, initial rail-to-drawer behavior, semantic orange and resulting interface. Added explicit role/scope, separated owner direction from AI implementation, removed research/metric caveats from the story, and attached evidence to every section. Kept the existing approved record untouched.

**Checks:** Read the original record and linked sources, Portfolio instructions, redesign brief, design reference and actual rail/drawer code. Checked the supported audience, project identity, ownership and distinction between initial and later navigation. No schema or browser run yet; final verification follows pass 3.

**Next pass:** Explain a concrete owner-directed revision, including what changed after rendered review and why the resulting hierarchy suits portfolio reading. Use the recorded later refinements without claiming synthetic or owner review as user validation.

## 2. Explain the work

**Findings:** Pass 1 established the project and implementation, but still treated the initial design direction as the main story and gave Rick too little concrete agency. Issue #39 and its archived owner-feedback record document an actual revision: the horizontal-header/serif pilot overcorrected; Rick preferred persistent orientation, rejected the serif voice and selected a lighter rail. Issue #43 and its archived selection record supply a controlled palette comparison and Rick's selection of candidate B. The current shell code confirms that the compact mobile bar opens a drawer; the pilot guide's shorter wording does not describe the full behavior.

**Changes:** Rebuilt the narrative around rendered review and selection. Added the before/choice/artifact chain for restoring the rail, explained Selected Work's priority, separated current mobile behavior into a concrete reading-width/focus decision, and described the palette comparison with other variables held fixed. Added the owner-feedback and palette-selection sources. Role attribution now comes from recorded choices; agent implementation remains explicit. Pass 2 has six sections and replaces most of pass 1's body copy.

**Checks:** Cross-checked first-person selections against accepted owner evidence and the controlled-study brief. Inspected current PersonalPracticeShell and responsive CSS rather than assuming the initial implementation remained the public shell. Kept layout/palette benefits as design reasoning and artifact outcomes; did not treat an owner preference, prototype or AI perspective as real-user validation. Schema/browser checks remain scheduled after pass 3.

**Next pass:** Remove repeated ownership and outcome recaps, tighten technical state detail, and connect review decisions into a readable hiring story. Preserve accurate chronology and every supported personal selection.

## 3. Make it readable and review the evidence

**Findings:** Pass 2 repeated ownership and recap language, isolated mobile behavior as a separate technical section, and gave the outcome paragraph too much summary work. The hiring reader needs the actual project, Rick's choices and the resulting interface. Palette preference is recorded, but a personal reason for choosing candidate B is not; the comparison's hypotheses cannot become Rick's rationale.

**Changes:** Reduced six sections to five connected sections. Rewrote the opening in direct first-person language, joined desktop/mobile navigation around reading space, reduced focus detail to the useful open/Escape example, tightened the palette explanation and replaced the repeated outcome recap with the built artifacts and design reference. Removed the unused brief source and kept evidence, publication boundaries, uncertainty and iteration commentary out of the reader-facing export. The final copy is materially shorter than pass 2 and has no invented metrics, employer work or usability findings.

**Checks:** Reviewed every personal attribution against confirmed direction or recorded owner feedback/selection. Checked navigation history against the actual current shell and CSS. Applied Human Prose structural/cadence and rhetoric review: removed bookkeeping, repeated conclusions, inflated claims and unnecessary standalone process explanation. JSON and story use the same final prose. The completed content checks and pending parent browser verification are recorded below.

**Remaining internal evidence gaps:** No real-user outcome measurements or detailed personal palette-selection rationale are supplied. Neither is necessary for the supported direction/review/artifact story. No critical owner question blocks this draft. Detailed agent implementation must remain distinct from Rick's design contribution.

### Final verification and handoff state

- All three substantive passes are complete; the final record has five sections and the readable export has 416 words including its title, summary, role and scope. No additional writing pass was added after the usage interruption.
- Passed 16 relevant checks: 9 existing case-study tests, 4 imported-content tests and 3 temporary candidate checks for the existing schema/source coverage, exact JSON/export parity and approval filtering. The first parity check caught an extra trailing blank line; it was corrected and the relevant run passed. The temporary candidate test was then removed.
- Command used the existing dependency junction and bundled runtime: `pnpm exec <bundled-node.exe> node_modules/vitest/vitest.mjs run tests/case-studies.test.ts tests/imported-content.test.ts tests/ui-design-story-check.test.ts`, with `pnpm_config_verify_deps_before_run=warn`. No install or lockfile change occurred.
- After resumption, confirmed the final JSON/readable export still match exactly and the candidate remains `review-ready`.
- **Parent desktop/mobile and publication verification pending.** A temporary isolated browser run was started on port 3194 before the interruption. Its completion output is no longer available; the retained last-run file reports failed desktop/mobile tests. The desktop temporary check expected `position: fixed`, but the existing rail CSS uses `position: sticky`; that assertion was inconsistent with the implementation. The mobile failure cause is unconfirmed from the retained snapshot. Text snapshots contain the final story, but no successful screenshot/visual check is claimed. No browser rerun or application change was made after the parent took over combined verification.
- Restored `content/drafts/case-studies.json` byte-for-byte from the verified pre-preview backup. Removed only the owned temporary `tests/e2e/ui-design-story.spec.ts`; no listener remains on port 3194. The original approved records and shared files have no remaining diff.
- Final deliverables: `ui-design-practices-revision.json`, `story.md` and this `iterations.md`, all inside the assigned example directory. The parent will integrate the JSON once, perform the combined renderer/publication checks, and reconcile CW-83 and PR #63. This chat does not update those shared surfaces or push, merge, publish or deploy.

Parent integration and final desktop/mobile/publication checks are complete; see [Work Order C16](../../work-order.md). The record remains review-ready.
