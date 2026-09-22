import type { EditorialDraft } from "@/lib/editorial-drafts";

type EditorialDraftPreviewProps = {
  draft: EditorialDraft;
};

export function EditorialDraftPreview({ draft }: EditorialDraftPreviewProps) {
  return (
    <article
      className="editorial-draft-review"
      data-editorial-status={draft.reviewStatus}
      data-testid={`editorial-draft-${draft.slug}`}
    >
      <div className="case-study-review-banner" role="note">
        <strong>{draft.reviewStatus === "review-ready" ? "Review-ready article." : "Draft article."}</strong>{" "}
        This article is not connected to the public posts adapter and remains unpublished.
      </div>

      <header className="editorial-draft-header">
        <p className="eyebrow">{draft.reviewStatus === "review-ready" ? "Review-ready article" : "Draft article"}</p>
        <h2>{draft.title}</h2>
        <p className="lede">{draft.excerpt}</p>
      </header>

      <div className="editorial-draft-body">
        {draft.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {draft.sections.map((section) => (
          <section aria-labelledby={`${draft.slug}-${section.id}-heading`} key={section.id}>
            <h3 id={`${draft.slug}-${section.id}-heading`}>{section.heading}</h3>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <details className="case-study-evidence">
              <summary>Review evidence</summary>
              <ul>
                {section.evidence.map((evidence) => (
                  <li key={`${section.id}-${evidence.sourceId}-${evidence.note}`}>
                    <code>{evidence.sourceId}</code>: {evidence.note}
                  </li>
                ))}
              </ul>
            </details>
          </section>
        ))}
      </div>

      <footer className="case-study-review-footer">
        <div>
          <p className="eyebrow">Sources</p>
          <ul>
            {draft.sources.map((source) => (
              <li key={source.id}>
                {source.url ? <a href={source.url}>{source.label}</a> : source.label}
                {source.capturedAt ? ` · captured ${source.capturedAt}` : ""}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Curation notes</p>
          <ul>
            {draft.curationNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </footer>
    </article>
  );
}
