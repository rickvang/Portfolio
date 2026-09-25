import Link from "next/link";

import {
  PersonalPracticeWorkVisual,
  type PracticeWorkVisualKind,
} from "@/components/personal-practice-visuals";
import type { CaseStudy } from "@/lib/case-studies";
import { workHref } from "@/lib/public-routes";

type PersonalPracticeWorkItem = {
  caseStudy: CaseStudy;
  summary?: string;
  visualKind?: PracticeWorkVisualKind;
};

type PersonalPracticeWorkIndexProps = {
  items: readonly PersonalPracticeWorkItem[];
};

export function PersonalPracticeWorkIndex({
  items,
}: PersonalPracticeWorkIndexProps) {
  if (items.length === 0) {
    return (
      <div className="practice-empty-state">
        <p>Case studies are under review.</p>
      </div>
    );
  }

  return (
    <div aria-label="Selected work" className="practice-work-index">
      {items.map(({ caseStudy, summary, visualKind }) => (
        <article
          className="practice-work-row"
          data-practice-work={caseStudy.slug}
          key={caseStudy.id}
        >
          <Link
            aria-label={`Read ${caseStudy.title} case study`}
            className="practice-work-card-link"
            href={workHref(caseStudy.slug)}
          >
            <div className="practice-work-copy">
              <p className="practice-work-meta">{caseStudy.category}</p>
              <h3>{caseStudy.title}</h3>
              <p>{summary ?? caseStudy.summary}</p>
            </div>

            {visualKind && <PersonalPracticeWorkVisual kind={visualKind} />}

            <span aria-hidden="true" className="practice-work-arrow">
              <span>→</span>
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
