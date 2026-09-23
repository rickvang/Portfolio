import { ArtifactFrame } from "@/components/artifact-frame";
import { ProjectPreview } from "@/components/project-preview";
import { getApprovedCaseStudies } from "@/lib/case-studies";

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
          <ProjectPreview caseStudy={caseStudy} key={caseStudy.id} />
        ))}
      </div>
      <ArtifactFrame
        label="Deferred source artifact"
        note="This state represents unavailable media directly instead of filling the gap with invented interface work."
        state="deferred"
      />
    </section>
  );
}
