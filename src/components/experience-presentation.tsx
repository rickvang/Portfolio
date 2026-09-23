import { ArtifactFrame } from "@/components/artifact-frame";
import type { CaseStudy, CaseStudySectionKind } from "@/lib/case-studies";
import {
  getProjectPresentation,
  type ProjectPresentationAudience,
} from "@/lib/project-presentation";

type ExperiencePresentationProps = {
  caseStudy: CaseStudy;
  headingLevel: 3 | 4;
  mode: "preview" | "detail";
  audience?: ProjectPresentationAudience;
};

function renderItems(items: readonly { id: string; title: string; summary: string }[]) {
  return (
    <ul className="project-topology-nodes">
      {items.map((item) => (
        <li className="project-topology-node" key={item.id}>
          <strong>{item.title}</strong>
          <span>{item.summary}</span>
        </li>
      ))}
    </ul>
  );
}

function getEvidenceSections(
  caseStudy: CaseStudy,
  sectionKinds: readonly CaseStudySectionKind[],
) {
  return sectionKinds.flatMap((kind) => {
    const section = caseStudy.sections.find((candidate) => candidate.kind === kind);
    return section ? [section] : [];
  });
}

export function ExperiencePresentation({
  audience = "public",
  caseStudy,
  headingLevel,
  mode,
}: ExperiencePresentationProps) {
  const presentation = getProjectPresentation(caseStudy, audience);
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const Subheading = headingLevel === 3 ? "h4" : "h5";
  const headingId = "experience-" + caseStudy.id + "-" + mode + "-heading";
  const contextsHeadingId = caseStudy.id + "-" + mode + "-contexts-heading";

  if (presentation.kind === "unavailable") {
    return (
      <section
        aria-labelledby={headingId}
        className="experience-presentation experience-presentation-unavailable"
        data-presentation-kind="unavailable"
      >
        <Heading className="experience-presentation-title" id={headingId}>{presentation.title}</Heading>
        <p>{presentation.message}</p>
      </section>
    );
  }

  const evidenceSections = getEvidenceSections(caseStudy, presentation.evidenceSectionKinds);

  return (
    <section
      aria-labelledby={headingId}
      className={"experience-presentation experience-presentation-" + presentation.kind}
      data-presentation-kind={presentation.kind}
    >
      <Heading className="experience-presentation-title" id={headingId}>{presentation.title}</Heading>
      <p className="experience-presentation-intro">{presentation.intro}</p>

      {presentation.kind === "topology" && (
        <div className="project-topology">
          <div className="project-topology-hub">
            <div>
              <Subheading>{presentation.hub.title}</Subheading>
              <p>{presentation.hub.summary}</p>
            </div>
          </div>
          <div className="project-topology-members">
            <p>{presentation.relationshipLabel}</p>
            {renderItems(presentation.items)}
          </div>
        </div>
      )}

      {presentation.kind === "matrix" && (
        <>
          <div className="pattern-matrix">
            {presentation.groups.map((group) => (
              <section className="pattern-matrix-group" key={group.id}>
                <Subheading>{group.title}</Subheading>
                <p>{group.rationale}</p>
                {renderItems(group.items)}
              </section>
            ))}
          </div>
          <section
            aria-labelledby={contextsHeadingId}
            className="experience-contexts"
          >
            <Subheading id={contextsHeadingId}>Contexts named in the source</Subheading>
            <ul>
              {presentation.contexts.map((context) => (
                <li key={context}>{context}</li>
              ))}
            </ul>
            <p>{presentation.contextNote}</p>
          </section>
        </>
      )}

      {presentation.kind === "text-first" && (
        <>
          {presentation.items.length > 0 ? (
            <ul className="project-structure-list">
              {presentation.items.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="experience-presentation-empty">{presentation.emptyMessage}</p>
          )}
        </>
      )}

      {mode === "detail" && evidenceSections.length > 0 && (
        <nav aria-label="Source sections for this presentation" className="experience-source-trace">
          <Subheading>Source trail</Subheading>
          <ul>
            {evidenceSections.map((section) => (
              <li key={section.kind}>
                <a href={"#" + caseStudy.slug + "-" + section.kind}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {mode === "detail" && (
        <ArtifactFrame
          label="Original interface imagery"
          note="No original product screens are shown or reconstructed; this visual summarizes the approved case-study text."
          state="deferred"
        />
      )}
    </section>
  );
}

