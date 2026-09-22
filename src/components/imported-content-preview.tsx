import type { ImportedContent } from "@/lib/imported-content";

type ImportedContentPreviewProps = {
  content: ImportedContent;
};

export function ImportedContentPreview({ content }: ImportedContentPreviewProps) {
  return (
    <section aria-labelledby="imported-content-heading" data-testid="imported-content-preview">
      <div className="section-heading">
        <p className="eyebrow">Source import</p>
        <h2 id="imported-content-heading">Public content draft</h2>
      </div>
      <div className="surface-grid">
        <article className="surface-card">
          <p className="eyebrow">Review status: {content.source.reviewStatus}</p>
          <h3>{content.profile.headline}</h3>
          <p>{content.profile.summary}</p>
          <p>{content.profile.aboutSummary}</p>
          <p className="state-card-note">{content.source.clientIpDisclaimer}</p>
          <p>
            <a href={content.source.sourcePages[0]?.url}>Review the captured source</a>
          </p>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Imported case studies</p>
          <div className="project-grid">
            {content.projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-meta">
                  <span className="tag">{project.category}</span>
                  <span className="tag">Draft</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <p className="state-card-note">
                  {project.solutionSections.length} structured solution sections ready for review.
                </p>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
