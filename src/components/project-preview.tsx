import type { CaseStudy } from "@/lib/case-studies";
import { getProjectPresentation } from "@/lib/project-presentation";

type ProjectPreviewProps = {
  caseStudy: CaseStudy;
};

export function ProjectPreview({ caseStudy }: ProjectPreviewProps) {
  const presentation = getProjectPresentation(caseStudy);

  return (
    <div className="project-preview-visual" data-project-visual={caseStudy.slug}>
      <div className="project-preview-meta">
        <span>{caseStudy.category}</span>
        <span>{presentation.label}</span>
      </div>

      {presentation.kind === "topology" && (
        <div className="project-topology">
          <div className="project-topology-hub">
            <strong>{presentation.hub.title}</strong>
            <p>{presentation.hub.summary}</p>
          </div>
          <ul className="project-topology-nodes">
            {presentation.items.map((item) => (
              <li className="project-topology-node" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {presentation.kind === "matrix" && (
        <div className="pattern-matrix">
          {presentation.groups.map((group) => (
            <section className="pattern-matrix-group" key={group.label}>
              <h4>{group.label}</h4>
              <ul>
                {group.items.map((item) => (
                  <li className="pattern-matrix-item" key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.summary}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {presentation.kind === "summary" && (
        <ul className="project-structure-list">
          {presentation.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.summary}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
