# Visual quality review

Visual quality is contextual: the interface should make its purpose, content, and behavior perceptible for its audience and task. This rubric makes design judgment inspectable; it does not define universal beauty or produce a score. Use the five qualitative prompts in [Agent-facing reasoning scaffold](work-to-experience.md#agent-facing-reasoning-scaffold) alongside the ten review dimensions below. The ten dimensions provide coverage; the five prompts guide critique.

For each dimension, record the evidence or check, finding, consequence, owner, and unresolved uncertainty. Use qualitative dispositions such as **supports current direction**, **needs change**, or **not checked**. Do not total or rank the results.

| Dimension | Quality question | Evidence or check |
| --- | --- | --- |
| Context and intent | Is the audience, task, product promise, medium, tone, constraint, and decision owner clear? | Brief, source content, audience assumptions, platform and brand constraints, success criteria. |
| Hierarchy and reading path | What receives attention first, what action is clear, and do scale, contrast, grouping, and spacing support that order? | First viewport, headings and labels, primary task/action, source and route sequence. |
| Composition quality | Do proportion, balance, rhythm, alignment, density, whitespace, typography, color, and content length work together? | Realistic content at supported widths, including long, sparse, and dense cases. |
| Visual language and semantic tokens | Is the visual system coherent and meaningful for this context without becoming generic or rigid? | Existing token meanings, component conventions, examples, and the reason for any variation. |
| Interaction completeness | Are the applicable default, hover, focus, pressed, selected, disabled, loading, empty, error, success, recovery, and long-content states defined? | Interaction specification, state matrix, working controls, feedback and cancellation behavior. |
| Responsive and environmental behavior | Does the experience adapt to viewport, input mode, zoom, motion preference, touch, and realistic data? | Representative desktop/mobile widths, zoom, keyboard/touch, reduced motion, and varied content. |
| Accessibility and inclusion | Are semantics, keyboard/focus, contrast, state communication, reduced motion, assistive technology, and equivalent task value supported? | Semantic markup, focus path, contrast and status checks, assistive-technology behavior where applicable. |
| Reuse and component boundaries | Is there a real recurring need, and does the change reuse or compose existing patterns before creating a new boundary? | Existing tokens/components, component purpose and API, consumers, composition, and explicit limits. |
| Implementation fidelity and QA | Does the built experience preserve intended hierarchy and behavior across supported routes and states? | Rendered implementation, harness states, route coverage, browser/assistive checks, and documented differences. |
| Evidence and rationale | What observed evidence supports the choice, which parts are preference or hypothesis, and what would change the decision? | Source evidence, prototype comparison, reader response, alternatives, tradeoffs, unresolved questions. |

### Review workflow

1. **Frame the task.** Name the audience, reader goal, content, success signal, constraints, and decision owner. Separate source facts from assumptions.
2. **Inspect the existing system.** Read this contract, relevant architecture/decision records, tokens, components, patterns, examples, harness fixtures, and known failure modes.
3. **Define observable quality signals.** State what a reader should understand or do. Apply the five reflection prompts below; do not substitute an adjective for a check.
4. **Explore when the direction is unsettled.** For a material layout or information-architecture choice, use [Persona-Library Layout Lab](https://github.com/rickvang/Persona-Library/tree/main/.agents/skills/layout-lab) with identical content, tasks, states, responsive conditions, and accessibility expectations. Keep alternatives isolated and reversible.
5. **Specify the experience before polish.** Define hierarchy, composition, visual language, states, responsive behavior, accessibility, and fallback. Reuse the [interaction specification](interaction-specifications.md), [state matrix](../../DESIGN.md#state-matrix), and the [component-builder method](https://github.com/rickvang/SkillRepo/blob/codex/root-agents-md-140/codex/methods/component-builder/SKILL.md) where they apply.
6. **Prototype the riskiest question.** Use the cheapest credible fidelity that can expose the relevant content or interaction risk. Keep synthetic data clearly labeled.
7. **Select and authorize separately.** Record the choice, alternatives, evidence, tradeoffs, limits, and unresolved questions. A selected direction or successful prototype does not authorize implementation. Mark who explicitly approved implementation.
8. **Implement the smallest coherent change.** Preserve the repository's semantic tokens, component boundaries, content source, and local-only harness contract.
9. **Review the built experience.** Use realistic content, routes, states, desktop/mobile widths, keyboard/focus, contrast, zoom, touch, and reduced motion as applicable. Compare the build with the written intent and record any gap.
10. **Refine with evidence.** Record accepted, revised, deferred, or rejected guidance with its scope, evidence, counterexample, uncertainty, owner, and rationale. Revisit the project contract when the implementation or reader response changes the decision.

### Decision gates

- **Exploration** produces reversible candidates and testable hypotheses.
- **Selection** records a preferred direction or an explicit no-selection outcome.
- **Authorization** is an explicit decision by the owner to implement; it is not implied by selection.
- **Implementation** changes the consuming project within its local contract.
- **Design QA** checks the rendered implementation and reports what remains unverified.

Call a direction **ready for implementation** only when its audience/task and evidence are named, material alternatives and tradeoffs are recorded when relevant, required interaction/accessibility/responsive behavior is specified, the riskiest assumption has a credible check or explicit uncertainty, and the decision owner has authorized implementation.

### Compact review template

- **Surface and scope:** page / design-system change / component; route or consumers.
- **Audience and task:** who needs to do what, with which content.
- **Context and evidence:** facts, interpretations, feeling hypotheses, observed reader response, and source limits.
- **Thematic direction:** phrase in words, why it fits, and what it does not imply.
- **Existing system inspected:** tokens, components, patterns, states, harness examples, and reference methods.
- **Alternatives:** candidates, rationale, tradeoffs, comparison conditions, and invalidating evidence.
- **Dimension findings:** for each rubric dimension, record evidence/check, finding, consequence, owner, and uncertainty.
- **Five-lens critique:** answer the Clarity, Compose, Differentiate, Refine, and Reduce noise prompts in the work-to-experience scaffold.
- **Experience contract:** states, responsive behavior, accessibility, motion, fallback, and realistic-content checks.
- **Decision:** selected direction or no selection; decision owner; implementation authorization state.
- **Design QA:** what was inspected, commands/checks run, known differences, and remaining gaps.
- **Refinement disposition:** accepted / revised / deferred / rejected; canonical owner and location if reusable.

### Ownership and refinement

Portfolio owns this rubric and its local adaptations in `DESIGN.md`; Portfolio maintainers are responsible for its project-specific review. The cross-project method and maintained language library belong in SkillRepo at `codex/methods/aesthetic-reasoning/`, tracked by [SkillRepo Issue #9](https://github.com/rickvang/SkillRepo/issues/9) and maintained by SkillRepo maintainers. Keep portfolio facts and application here; link to shared guidance rather than copying its canonical content.

Review a reusable candidate when work in a materially different project repeats it, contradicts it, produces reader feedback that changes the judgment, or fails to express the intended experience after implementation. Record its definition, evidence, example, counterexample, uncertainty, disposition, owner, and change rationale in the SkillRepo library when that scope is authorized. One project example does not establish a universal pattern. Reconcile any shared change back to this local contract only where the evidence affects Portfolio.
