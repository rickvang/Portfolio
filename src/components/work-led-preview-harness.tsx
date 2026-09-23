import { ArtifactFrame } from "@/components/artifact-frame";
import { ProjectPreview } from "@/components/project-preview";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { presentationHarnessFixtures } from "@/lib/presentation-harness-fixtures";

export function WorkLedPreviewHarness() {
  const caseStudies = getApprovedCaseStudies();

  return (
    <section
      className="harness-section"
      aria-labelledby="project-preview-patterns-heading"
      data-testid="project-preview-harness"
    >
      <div>
        <p className="eyebrow">Work-led patterns</p>
        <h2 id="project-preview-patterns-heading">Project preview and artifact states</h2>
        <p className="lede">
          Approved project structure drives the visual grammar. Source media stays explicitly deferred until it is
          ready for reuse.
        </p>
      </div>
      <div className="project-preview-list">
        {caseStudies.map((caseStudy) => (
          <ProjectPreview caseStudy={caseStudy} headingLevel={3} key={caseStudy.id} />
        ))}
      </div>
      <div aria-label="Text and long-content fallback examples" className="presentation-fixture-list">
        <article className="presentation-fixture">
          <p className="eyebrow">Synthetic harness fixture</p>
          <h3>Text-only fallback</h3>
          <p>This example has no structured client details or images; it is not client work.</p>
          <ProjectPreview caseStudy={presentationHarnessFixtures.textOnly} headingLevel={4} reviewOnly />
        </article>
        <article className="presentation-fixture">
          <p className="eyebrow">Synthetic harness fixture</p>
          <h3>Long and dense content</h3>
          <p>This example tests wrapping and density; it is not client work.</p>
          <ProjectPreview caseStudy={presentationHarnessFixtures.longContent} headingLevel={4} reviewOnly />
        </article>
      </div>
      <ArtifactFrame
        label="Deferred source artifact"
        note="This state represents unavailable media directly instead of filling the gap with invented interface work."
        state="deferred"
      />
      <ArtifactFrame
        label="Redacted source artifact"
        note="This local-only example withholds source detail and shows no replacement screen or illustration."
        state="redacted"
      />
    </section>
  );
}

