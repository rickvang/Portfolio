import type { CaseStudy } from "@/lib/case-studies";

type CaseStudyTemplateProps = {
  caseStudy: CaseStudy;
  mode?: "public" | "review";
};

export function CaseStudyTemplate({ caseStudy, mode = "public" }: CaseStudyTemplateProps) {
  const reviewMode = mode === "review";

  return (
    <article
      className={reviewMode ? "case-study case-study-review" : "case-study"}
      data-case-study-status={caseStudy.reviewStatus}
      data-testid={reviewMode ? `case-study-review-${caseStudy.slug}` : undefined}
    >
      {reviewMode && (
        <div className="case-study-review-banner" role="note">
          <strong>Draft review surface.</strong> This content is not eligible for public rendering until its status is
          explicitly changed to approved.
        </div>
      )}

      <header className="case-study-hero">
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
      </header>

      <div className="case-study-body">
        <nav aria-label="Case study sections" className="case-study-index">
          <p className="eyebrow">In this case study</p>
          <ol>
            {caseStudy.sections.map((section) => (
              <li key={section.kind}>
                <a href={`#${caseStudy.slug}-${section.kind}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-study-sections">
          {caseStudy.sections.map((section) => (
            <section
              aria-labelledby={`${caseStudy.slug}-${section.kind}-heading`}
              className="case-study-section"
              id={`${caseStudy.slug}-${section.kind}`}
              key={section.kind}
            >
              <p className="eyebrow">{section.kind.replace("-", " / ")}</p>
              <h2 id={`${caseStudy.slug}-${section.kind}-heading`}>{section.title}</h2>

              {section.body && <p className="case-study-copy">{section.body}</p>}

              {section.items && (
                <div className="case-study-item-grid">
                  {section.items.map((item) => (
                    <article className="case-study-item" key={item.title}>
                      <h3>{item.title}</h3>
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
