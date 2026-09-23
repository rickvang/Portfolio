import Link from "next/link";

import { ExperiencePresentation } from "@/components/experience-presentation";
import type { CaseStudy, CaseStudySectionKind } from "@/lib/case-studies";
import { publicRoutes } from "@/lib/public-routes";

type PersonalPracticeCaseStudyProps = {
  caseStudy: CaseStudy;
};

function findSection(caseStudy: CaseStudy, kind: CaseStudySectionKind) {
  return caseStudy.sections.find((section) => section.kind === kind);
}

export function PersonalPracticeCaseStudy({
  caseStudy,
}: PersonalPracticeCaseStudyProps) {
  const overview = findSection(caseStudy, "overview");
  const exploration = findSection(caseStudy, "exploration");
  const system = findSection(caseStudy, "system-practice");
  const outcomes = findSection(caseStudy, "outcomes");

  return (
    <article className="practice-case-study">
      <header className="practice-case-study-hero">
        <Link className="practice-back-link" href={publicRoutes.work}>
          <span aria-hidden="true">←</span> All work
        </Link>
        <p className="practice-kicker">{caseStudy.category}</p>
        <h1>{caseStudy.title}</h1>
        <p className="lede">{caseStudy.summary}</p>
      </header>

      {overview?.body && (
        <section
          aria-labelledby={`${caseStudy.slug}-overview-heading`}
          className="practice-case-study-section"
          id={`${caseStudy.slug}-overview`}
        >
          <p className="practice-section-index">01</p>
          <div>
            <p className="practice-kicker">The system I inherited</p>
            <h2 id={`${caseStudy.slug}-overview-heading`}>Fragmentation was the starting condition.</h2>
            <p className="practice-case-study-copy">{overview.body}</p>
          </div>
        </section>
      )}

      {exploration?.body && (
        <section
          aria-labelledby={`${caseStudy.slug}-exploration-heading`}
          className="practice-case-study-section"
          id={`${caseStudy.slug}-exploration`}
        >
          <p className="practice-section-index">02</p>
          <div>
            <p className="practice-kicker">How the problem was framed</p>
            <h2 id={`${caseStudy.slug}-exploration-heading`}>Start with people and workflows.</h2>
            <p className="practice-case-study-copy">{exploration.body}</p>
          </div>
        </section>
      )}

      {system?.items && (
        <section
          aria-labelledby={`${caseStudy.slug}-system-practice-heading`}
          className="practice-case-study-section practice-case-study-system"
          id={`${caseStudy.slug}-system-practice`}
        >
          <p className="practice-section-index">03</p>
          <div>
            <p className="practice-kicker">The resulting framework</p>
            <h2 id={`${caseStudy.slug}-system-practice-heading`}>A shared system, without pretending the work was linear.</h2>
            <ExperiencePresentation
              caseStudy={caseStudy}
              headingLevel={3}
              mode="detail"
            />
          </div>
        </section>
      )}

      {outcomes?.body && (
        <section
          aria-labelledby={`${caseStudy.slug}-outcomes-heading`}
          className="practice-case-study-section"
          id={`${caseStudy.slug}-outcomes`}
        >
          <p className="practice-section-index">04</p>
          <div>
            <p className="practice-kicker">Evidence and outcomes</p>
            <h2 id={`${caseStudy.slug}-outcomes-heading`}>What the work enabled.</h2>
            <p className="practice-case-study-copy">{outcomes.body}</p>
          </div>
        </section>
      )}

      {caseStudy.clientIpDisclaimer && (
        <aside className="practice-case-study-note" aria-label="Client intellectual property note">
          <p className="practice-kicker">Client work note</p>
          <p>{caseStudy.clientIpDisclaimer}</p>
        </aside>
      )}
    </article>
  );
}
