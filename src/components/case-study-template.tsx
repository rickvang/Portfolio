import Link from "next/link";

import { ExperiencePresentation } from "@/components/experience-presentation";
import { CaseStudyIllustration } from "@/components/case-study-illustration";
import { PersonalPracticeCaseStudy } from "@/components/personal-practice-case-study";
import { UiPracticeCaseStudy } from "@/components/ui-practice-case-study";
import { getCaseStudyChapters, type CaseStudy } from "@/lib/case-studies";

type CaseStudyTemplateProps = {
  caseStudy: CaseStudy;
  mode?: "public" | "review";
};

export function CaseStudyTemplate({ caseStudy, mode = "public" }: CaseStudyTemplateProps) {
  if (mode === "public" && caseStudy.practicePresentation) {
    return <UiPracticeCaseStudy caseStudy={caseStudy} />;
  }
  if (mode === "public" && caseStudy.slug === "multi-product-integrations") {
    return <PersonalPracticeCaseStudy caseStudy={caseStudy} />;
  }

  const reviewMode = mode === "review";
  const practiceOverview = caseStudy.practiceOverview;
  const chapters = getCaseStudyChapters(caseStudy);
  const statusLabel =
    caseStudy.reviewStatus === "approved"
      ? "Approved content."
      : caseStudy.reviewStatus === "review-ready"
        ? "Review-ready content."
        : "Draft review surface.";
  const statusMessage =
    caseStudy.reviewStatus === "approved"
      ? "This source-backed content is eligible for public rendering."
      : "This content is not eligible for public rendering until its status is explicitly changed to approved.";

  return (
    <article
      className={[
        "case-study",
        reviewMode && "case-study-review",
        practiceOverview && "case-study-practice",
      ].filter(Boolean).join(" ")}
      data-case-study-status={caseStudy.reviewStatus}
      data-testid={reviewMode ? `case-study-review-${caseStudy.slug}` : undefined}
    >
      {reviewMode && (
        <div className="case-study-review-banner" role="note">
          <strong>{statusLabel}</strong> {statusMessage}
        </div>
      )}

      <header className="case-study-hero">
        {practiceOverview && <Link className="practice-back-link" href="/work">← All work</Link>}
        <div className={practiceOverview ? "design-practice-intro" : undefined}>
          <div>
            <p className="eyebrow">{caseStudy.category}</p>
            <h1>{caseStudy.title}</h1>
            <p className="lede">{caseStudy.summary}</p>

            {(caseStudy.role || caseStudy.scope) && (
              <dl className="case-study-meta">
                {caseStudy.role && (
                  <div>
                    <dt>Role</dt>
                    <dd>{caseStudy.role}</dd>
                  </div>
                )}
                {caseStudy.scope && (
                  <div>
                    <dt>Scope</dt>
                    <dd>{caseStudy.scope}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>

        <nav className="case-study-chapter-path" aria-label="Case study chapter path">
          {chapters.map((chapter, index) => (
            <a href={`#${caseStudy.slug}-chapter-${chapter.id}`} key={chapter.id}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {chapter.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="case-study-body">
        <nav aria-label="Case study chapters" className="case-study-index">
          <p className="eyebrow">Chapters</p>
          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <a href={`#${caseStudy.slug}-chapter-${chapter.id}`}>
                  <span aria-hidden="true" className="case-study-index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{chapter.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-study-chapters">
          {chapters.map((chapter, chapterIndex) => (
            <section
              aria-labelledby={`${caseStudy.slug}-chapter-${chapter.id}-heading`}
              className="case-study-chapter"
              data-case-study-chapter={chapter.id}
              id={`${caseStudy.slug}-chapter-${chapter.id}`}
              key={chapter.id}
            >
              <header className="case-study-chapter-heading">
                <p className="eyebrow">
                  {String(chapterIndex + 1).padStart(2, "0")} / {chapter.label}
                </p>
                <h2 id={`${caseStudy.slug}-chapter-${chapter.id}-heading`}>{chapter.label}</h2>
              </header>

              {practiceOverview && chapter.id === "system" && (
                <figure className="design-practice-map" aria-labelledby={`${caseStudy.slug}-practice-map-title`}>
                  <figcaption id={`${caseStudy.slug}-practice-map-title`}>
                    <span className="eyebrow">Build sequence</span>
                    <strong>{practiceOverview.title}</strong>
                  </figcaption>
                  <ol>
                    {practiceOverview.phases.map((phase, index) => (
                      <li key={phase.title}>
                        <span className="design-practice-phase-number" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <strong>{phase.title}</strong>
                          <p>{phase.summary}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </figure>
              )}

              {chapter.sections.map((section, sectionIndex) => {
                const showSectionHeading = section.title !== chapter.label || sectionIndex > 0;

                return (
                  <div
                    className="case-study-section"
                    id={`${caseStudy.slug}-${section.kind}`}
                    key={section.kind}
                  >
                    {showSectionHeading && <h3>{section.title}</h3>}

                    {section.body && <p className="case-study-copy">{section.body}</p>}
                    {section.illustration && <CaseStudyIllustration illustration={section.illustration} />}

                    {section.items &&
                      section.kind === "system-practice" &&
                      !practiceOverview &&
                      caseStudy.reviewStatus === "approved" && (
                        <ExperiencePresentation
                          caseStudy={caseStudy}
                          headingLevel={showSectionHeading ? 4 : 3}
                          mode="detail"
                        />
                      )}

                    {section.items &&
                      (practiceOverview || section.kind !== "system-practice" || caseStudy.reviewStatus !== "approved") && (
                        <div className="case-study-item-grid">
                          {section.items.map((item) => (
                            <article className="case-study-item" key={item.id ?? item.title}>
                              {showSectionHeading ? <h4>{item.title}</h4> : <h3>{item.title}</h3>}
                              <p>{item.summary}</p>
                            </article>
                          ))}
                        </div>
                      )}

                    {reviewMode && (
                    <details className="case-study-evidence">
                      <summary>Review evidence</summary>
                      <ul>
                        {section.evidence.map((evidence) => (
                          <li key={`${section.kind}-${evidence.sourceId}-${evidence.note}`}>
                            <code>{evidence.sourceId}</code>: {evidence.note}
                          </li>
                        ))}
                      </ul>
                    </details>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </div>

      {caseStudy.clientIpDisclaimer && (
        <aside className="case-study-disclaimer" aria-label="Client intellectual property note">
          <p className="eyebrow">Client work note</p>
          <p>{caseStudy.clientIpDisclaimer}</p>
        </aside>
      )}

      {reviewMode && (
        <footer className="case-study-review-footer">
          <div>
            <p className="eyebrow">Source provenance</p>
            <ul>
              {caseStudy.sources.map((source) => (
                <li key={source.id}>
                  {source.url ? (
                    <a href={source.url}>{source.label}</a>
                  ) : (
                    source.label
                  )}
                  {source.capturedAt ? ` · captured ${source.capturedAt}` : ""}
                </li>
              ))}
            </ul>
          </div>
          {caseStudy.curationNotes.length > 0 && (
            <div>
              <p className="eyebrow">Curation notes</p>
              <ul>
                {caseStudy.curationNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}

