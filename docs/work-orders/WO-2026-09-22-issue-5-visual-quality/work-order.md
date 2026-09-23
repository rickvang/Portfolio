# Work Order — Issue #5 visual-quality rubric and workflow

## Header

- Work Order ID: `WO-2026-09-22-issue-5-visual-quality`
- Status: active
- Created: 2026-09-22
- Repository: `rickvang/Portfolio`
- Branch: `codex/issue-5-visual-quality-rubric`, based on `main` after PR #31 merged (base `9bbb820`).
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
- Portfolio PR #31 merged to `main` on 2026-09-23. Its model-based cold-reader evaluation is complete and remains distinct from human usability research.
- The prior instruction to keep PR #32 draft/unmerged was superseded by the requester's explicit merge authorization on 2026-09-23. Issue #5 remains open unless separately closed; PR #32 uses `Refs #5`, not a closing keyword.

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

- Portfolio #30's seven-layer translation and both source-backed examples merged to `main` through PR #31 (merge `9bbb8207b6f2d5140180c5be4a82e468817c4a56`).
- The independent Issue #30 cold-reader evaluation is complete as a model-based review. It found the throughline understandable and the projects distinguishable, while concrete examples/outcomes remain abstract; source media remains unapproved and outcomes are unquantified. Feeling statements remain hypotheses.
- The initial review record is [initial-visual-quality-review.md](initial-visual-quality-review.md); it now includes a rendered supplement for Home and Work/`ProjectPreview` at 1440×1000 and 390×844, with explicit evidence limits.

## Completion boundary

Complete when `DESIGN.md` contains the Portfolio-specific rubric, review record, decision gates, and refinement ownership; the portable SkillRepo package contains its method, examples, and governed library; the initial source-level review is recorded; applicable documentation/package checks are reported accurately; and Current Work is reconciled. Keep the linked issues open for normal repository review. No production deployment is in scope.

## Current phase and next action

- Phase: Portfolio rubric and rendered review complete; final PR #32 preflight and merge pending.
- Validation limitation: the SkillRepo Skill Creator validator could not start because its bundled Python runtime lacked PyYAML; manual front-matter, whitespace, and local-link checks passed before PR #10 merged.
- Next action: refresh PR #32 head/base, checks, reviews, unresolved threads, and linked-issue effects; then merge on `main` as authorized. Leave Issue #5 open unless separately authorized for closure.

## Validation record

- Baseline evidence: PR #31 CI passed at `5cb26d1`; this is not verification of Issue #5 changes.
- Portfolio documentation diff check: `git diff --check` passed; only `DESIGN.md` is modified in the issue-5 source diff, with the Work Order and initial review as new documents.
- SkillRepo package documentation check: required `name`/`description` front matter, no trailing whitespace, and all relative Markdown links verified across five package documents. The packaged Skill Creator `quick_validate.py` could not run (`ModuleNotFoundError: No module named 'yaml'`).
- Portfolio `pnpm verify` was not run. Its script includes lint, typecheck, Vitest, and build; these changes are documentation-only, and tests were not requested.
- Rendered review completed on the PR #32 preview: Home and Work/`ProjectPreview` at 1440×1000 and 390×844. No 390px horizontal overflow; mobile navigation opens/closes with Escape and returns focus. The first mobile preview is approximately 1,155 CSS px tall. Sample token contrast values and all review limits are recorded in the linked review file.
- Evidence limits: source images remain deferred; no tablet, zoom, reduced-motion, assistive-technology, Work-console, or human usability review is claimed. The model-based #30 cold read is complete and is not human testing.
