import { ExperiencePresentation } from "@/components/experience-presentation";
import type { CaseStudy } from "@/lib/case-studies";

type ProjectPreviewProps = {
  caseStudy: CaseStudy;
  reviewOnly?: boolean;
};

export function ProjectPreview({ caseStudy, reviewOnly = false }: ProjectPreviewProps) {
  return (
    <div className="project-preview-visual" data-project-visual={caseStudy.slug}>
      <div className="project-preview-meta">
        <span>{caseStudy.category}</span>
        <span>Text-derived view</span>
      </div>
      <ExperiencePresentation
        audience={reviewOnly ? "review" : "public"}
        caseStudy={caseStudy}
        mode="preview"
      />
    </div>
  );
}

