import Link from "next/link";

import { CaseStudyIllustration } from "@/components/case-study-illustration";
import type { CaseStudy } from "@/lib/case-studies";
import { publicRoutes } from "@/lib/public-routes";

type PersonalPracticeCaseStudyProps = {
  caseStudy: CaseStudy;
};

export function PersonalPracticeCaseStudy({ caseStudy }: PersonalPracticeCaseStudyProps) {
  return (
    <article className="practice-case-study">
      <header className="practice-case-study-hero">
        <Link className="practice-back-link" href={publicRoutes.work}>
          <span aria-hidden="true">←</span> All work
        </Link>
        <h1>{caseStudy.title}</h1>
        <p className="lede">{caseStudy.summary}</p>
        {(caseStudy.role || caseStudy.scope) && (
          <dl className="case-study-meta">
            {caseStudy.role && <div><dt>My role</dt><dd>{caseStudy.role}</dd></div>}
            {caseStudy.scope && <div><dt>Scope</dt><dd>{caseStudy.scope}</dd></div>}
          </dl>
        )}
      </header>

      {caseStudy.sections.map((section, index) => (
        <section
          aria-labelledby={`${caseStudy.slug}-${section.kind}-heading`}
          className="practice-case-study-section"
          id={`${caseStudy.slug}-${section.kind}`}
          key={section.kind}
        >
          <p aria-hidden="true" className="practice-section-index">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h2 id={`${caseStudy.slug}-${section.kind}-heading`}>
              {section.title === "System / practice" ? "The shared patterns." : section.title}
            </h2>
            {section.body && <p className="practice-case-study-copy">{section.body}</p>}
            {section.illustration && <CaseStudyIllustration illustration={section.illustration} />}
            {section.items && (
              <ul className="practice-case-study-patterns">
                {section.items.map((item) => (
                  <li key={item.id ?? item.title}>
                    <h3>{item.title}</h3>
                    <p className="practice-case-study-copy">{item.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      {caseStudy.clientIpDisclaimer && (
        <aside className="practice-case-study-note" aria-label="Client intellectual property note">
          <p>{caseStudy.clientIpDisclaimer}</p>
        </aside>
      )}
    </article>
  );
}
