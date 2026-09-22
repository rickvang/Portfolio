# Work Order — Issue #5 visual-quality rubric and workflow

## Header

- Work Order ID: `WO-2026-09-22-issue-5-visual-quality`
- Status: active
- Created: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `codex/issue-5-visual-quality-rubric`, based on open PR #31 head `5cb26d1`
- GitHub issue: https://github.com/rickvang/Portfolio/issues/5
- Related reusable-method issue: https://github.com/rickvang/SkillRepo/issues/9
- Current Work: `CW-42`
- Current Work URL: https://app.notion.com/p/3e3cd82535ff81ac9e53f6f28e6b2068
- Parent workstream: `CW-39` / Portfolio Issue #30
- Requester: Rick
- Owner: Riley Morgan / Codex
- Request mode: update
- Operating Route: Riley Morgan / `ai-orchestrator` → direct implementation in isolated Portfolio and SkillRepo checkouts → reconcile the Portfolio adapter to the canonical SkillRepo method.

## Objective

Formalize the Portfolio-specific visual-quality rubric and review workflow in `DESIGN.md`, and implement the portable aesthetic-reasoning method and refinement library in SkillRepo. Keep each repository's content with its owner and link across the boundary.

## Authorization and boundaries

- The user requested implementation of Portfolio #5 and SkillRepo #9. Changes are limited to those two repositories.
- Issue #5 excludes a redesign, production publishing/deployment, new component or design-tool dependencies, and copied Persona-Library or Operating Pack content.
- Do not create or modify Persona-Library records or Operating Pack files. Use those repositories only for read-only comparison.
- Do not introduce a numerical beauty/quality score or an automatic theme/feeling-to-layout rule.
- PR #31 remains an open draft with a cold-reader review pending. This work is stacked on its current head and must not be merged or deployed as part of Issue #30.

## Scope

- Add the Portfolio-specific ten-dimension visual-quality review and compact review template to `DESIGN.md`.
- Define the steps and decision gates for exploration, selection, implementation authorization, implementation, design QA, and refinement.
- Review a realistic Portfolio page and reusable component, with an initial scan of Notes, Contact, the development harness, and the admin posts workflow.
- Add a SkillRepo method under `codex/methods/` with worked examples from Portfolio #30 and one independent interface scenario.
- Give the SkillRepo method a maintained, evidence-backed language and pattern library with definitions, examples, counterexamples, uncertainty, ownership, status, review triggers, and change rationale.

## Ownership and related guidance

| Concern | Canonical owner | Boundary |
| --- | --- | --- |
| Portfolio-specific rubric, workflow, and application | Portfolio `DESIGN.md` and this Work Order | Describe this site's tokens, surfaces, constraints, and review evidence. |
| Reusable aesthetic-reasoning method and language library | SkillRepo `codex/methods/aesthetic-reasoning/` | Generalize only when evidence supports reuse across projects; retain scope and counterexamples. |
| Material layout alternatives | Persona-Library `layout-lab` | Use its isolated comparison workflow when a layout decision is unsettled; selection is not implementation authorization. |
| Component, token, accessibility, and system review | Design System Operating Pack | Retain its project-contextual design-system ownership; do not restate its SOP in the SkillRepo method. |
| Broad creative divergence and synthesis | SkillRepo `concept-explorer` | Use for open-ended concept exploration; it does not own the evidence-to-interface aesthetic method. |

The comparison found a gap for a portable method connecting evidence, thematic words, observable interface qualities, feeling hypotheses, and design decisions. Existing UX, creative, layout, and component guidance remains authoritative for its own scope; it is not copied here.

## Evidence and baseline

- Portfolio #30's seven-layer translation and both source-backed examples live in `DESIGN.md` and the linked Issue #30 Work Order. Its current state is open PR #31 at head `5cb26d1`.
- PR #31's latest CI run passed and generated a `visual-verification-captures` artifact. The artifact was not opened during this source-level review.
- The independent cold-reader evaluation for Issue #30 remains pending. Feeling statements remain hypotheses.
- The initial review record is [initial-visual-quality-review.md](initial-visual-quality-review.md). It inspects source structure, realistic content, design rules, and state boundaries; it does not claim rendered visual sign-off.

## Completion boundary

Complete when `DESIGN.md` contains the Portfolio-specific rubric, review record, decision gates, and refinement ownership; the portable SkillRepo package contains its method, examples, and governed library; the initial source-level review is recorded; applicable documentation/package checks are reported accurately; and Current Work is reconciled. Keep the linked issues open for normal repository review. No production deployment is in scope.

## Current phase and next action

- Phase: local implementation complete; repository review pending.
- Blocker: the Skill Creator validator could not start because the bundled Python runtime does not include PyYAML. Manual front-matter, whitespace, and local-link checks passed.
- Next action: refresh the issue-specific review PRs' checks and feedback, then record any required fixes. Keep Portfolio PR #31 and its dependent #5 PR in draft; do not merge or deploy as part of this work.

## Validation record

- Baseline evidence: PR #31 CI passed at `5cb26d1`; this is not verification of Issue #5 changes.
- Portfolio documentation diff check: `git diff --check` passed; only `DESIGN.md` is modified in the issue-5 source diff, with the Work Order and initial review as new documents.
- SkillRepo package documentation check: required `name`/`description` front matter, no trailing whitespace, and all relative Markdown links verified across five package documents. The packaged Skill Creator `quick_validate.py` could not run (`ModuleNotFoundError: No module named 'yaml'`).
- Portfolio `pnpm verify` was not run. Its script includes lint, typecheck, Vitest, and build; these changes are documentation-only, and tests were not requested.
- Rendered visual sign-off remains unclaimed: PR #31's screenshot artifact was not opened, and the independent cold-reader review remains pending.
