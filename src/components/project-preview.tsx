import { ExperiencePresentation } from "@/components/experience-presentation";
import type { CaseStudy } from "@/lib/case-studies";

type ProjectPreviewProps = {
  caseStudy: CaseStudy;
  headingLevel: 3 | 4;
  reviewOnly?: boolean;
};

export function ProjectPreview({ caseStudy, headingLevel, reviewOnly = false }: ProjectPreviewProps) {
  return (
    <div className="project-preview-visual" data-project-visual={caseStudy.slug}>
      <div className="project-preview-meta">
        <span>{caseStudy.category}</span>
        <span>Text-derived view</span>
      </div>
      <ExperiencePresentation
        audience={reviewOnly ? "review" : "public"}
        caseStudy={caseStudy}
        headingLevel={headingLevel}
        mode="preview"
      />
    </div>
  );
}

