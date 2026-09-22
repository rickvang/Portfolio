import Link from "next/link";

import { ProjectPreview } from "@/components/project-preview";
import type { CaseStudy } from "@/lib/case-studies";
import { workHref } from "@/lib/public-routes";

type CaseStudyListProps = {
  caseStudies: readonly CaseStudy[];
  emptyTitle?: string;
  emptyMessage?: string;
};

export function CaseStudyList({
  caseStudies,
  emptyTitle = "Case studies are under review.",
  emptyMessage = "Draft source material stays out of public routes until it is explicitly approved.",
}: CaseStudyListProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="state-card" data-testid="case-study-list-empty">
        <div>
          <p className="state-card-title">{emptyTitle}</p>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div aria-label="Case studies" className="project-preview-list">
      {caseStudies.map((caseStudy) => (
        <article className="project-preview" data-project-preview={caseStudy.slug} key={caseStudy.id}>
          <div className="project-card-meta">
            <span className="tag">{caseStudy.category}</span>
          </div>
          <h3>
            <Link href={workHref(caseStudy.slug)}>{caseStudy.title}</Link>
          </h3>
          <p>{caseStudy.summary}</p>
          <Link className="text-link" href={workHref(caseStudy.slug)}>
            Read case study
          </Link>
          <ProjectPreview caseStudy={caseStudy} />
        </article>
      ))}
    </div>
  );
}
