import Link from "next/link";

import type { CaseStudy } from "@/lib/case-studies";
import { workHref } from "@/lib/public-routes";

type PersonalPracticeWorkItem = {
  caseStudy: CaseStudy;
  summary?: string;
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
      {items.map(({ caseStudy, summary }, index) => (
        <article
          className="practice-work-row"
          data-practice-work={caseStudy.slug}
          key={caseStudy.id}
        >
          <p aria-hidden="true" className="practice-work-number">
            {String(index + 1).padStart(2, "0")}
          </p>

          <div className="practice-work-copy">
            <p className="practice-work-meta">{caseStudy.category}</p>
            <h3>
              <Link href={workHref(caseStudy.slug)}>{caseStudy.title}</Link>
            </h3>
            <p>{summary ?? caseStudy.summary}</p>
          </div>

          <Link
            aria-label={`Read ${caseStudy.title} case study`}
            className="practice-work-arrow"
            href={workHref(caseStudy.slug)}
          >
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
