import Link from "next/link";

import type { CaseStudy } from "@/lib/case-studies";
import { workHref } from "@/lib/public-routes";

type PersonalPracticeWorkIndexProps = {
  caseStudies: readonly CaseStudy[];
};

const homepageSummaries: Partial<Record<CaseStudy["slug"], string>> = {
  "multi-product-integrations":
    "Turning a fragmented ecosystem of products, workflows, and data into a shared framework for a more coherent product experience.",
  "ai-systems":
    "Building a durable operating system for collaborating with specialized AI agents across repositories, tools, and interruptions.",
  "design-systems":
    "Creating reusable product foundations and lightweight governance to improve consistency across a complex legacy environment.",
  "ui-design-practices":
    "Turning design principles into a repeatable design-to-implementation practice with explicit interaction, accessibility, and verification contracts.",
};

export function PersonalPracticeWorkIndex({
  caseStudies,
}: PersonalPracticeWorkIndexProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="practice-empty-state">
        <p>Case studies are under review.</p>
      </div>
    );
  }

  return (
    <div aria-label="Selected work" className="practice-work-index">
      {caseStudies.map((caseStudy, index) => (
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
            <p>{homepageSummaries[caseStudy.slug] ?? caseStudy.summary}</p>
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
