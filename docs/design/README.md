# Portfolio design references

`../../DESIGN.md` is the compact universal design contract. These files are progressive-disclosure references for tasks that need deeper procedure, examples, or historical rationale.

| Need | Read |
| --- | --- |
| Visual-quality review method, selection/authorization gates, critique template | `visual-quality-review.md` |
| Evidence-to-experience translation, worked examples, reasoning scaffold | `work-to-experience.md` |
| Detailed motion matrix, timing, interruption, repetition, reduced motion | `motion.md` |
| Interaction-spec template and representative component contracts | `interaction-specifications.md` |
| Home or Multi Product Integrations visual changes, plus other Personal Practice / Working Archive pilot-specific guidance | `examples/personal-practice-pilot.md` |
| Release-hardening and prior design-selection rationale | `history/release-history.md` |

## Routing rule

Start with `DESIGN.md`. Load **one** reference when the task actually needs it; load more only when the task spans those concerns.

Examples:
- change a spacing token → `DESIGN.md` only;
- critique a new project composition → `DESIGN.md` + `visual-quality-review.md`;
- translate approved project evidence into a new case-study presentation → `DESIGN.md` + `work-to-experience.md`;
- change drawer animation timing → `DESIGN.md` + `motion.md`;
- expand a reusable interactive component → `DESIGN.md` + `interaction-specifications.md`;
- change Home or Multi Product Integrations visually → `DESIGN.md` + `examples/personal-practice-pilot.md`;
- understand why a past palette/pilot decision exists → history/example reference only after the core contract.

## Footprint

Issue #57 baseline:
- previous mandatory `DESIGN.md`: 64,619 characters;
- compact mandatory `DESIGN.md`: 25,288 characters;
- reduction: approximately 60.9%.

This is a text-footprint measurement, not measured model usage. The goal is progressive disclosure, not a size target.
