import Link from "next/link";

import { InterfaceLabCatalogMap } from "@/components/interface-lab-catalog-map";
import type { CaseStudy } from "@/lib/case-studies";

function sourceUrl(caseStudy: CaseStudy, sourceId: string): string | undefined {
  return caseStudy.sources.find((source) => source.id === sourceId)?.url;
}

export function InterfaceLabStory({ caseStudy }: { caseStudy: CaseStudy }) {
  const catalog = caseStudy.sections.find((section) => section.kind === "system-practice");
  const prototypes = caseStudy.sections.find((section) => section.kind === "exploration");
  const overview = caseStudy.sections.find((section) => section.kind === "overview");
  const reflection = caseStudy.sections.find((section) => section.kind === "reflection");

  const storybookUrl = sourceUrl(caseStudy, "storybook-catalog");
  const prototypeUrls = [
    sourceUrl(caseStudy, "vite-repository"),
    sourceUrl(caseStudy, "tanstack-repository"),
  ];

  return (
    <article className="interface-lab" data-case-study-status={caseStudy.reviewStatus}>
      <Link href="/work" className="lab-back">← All work</Link>

      <header className="lab-hero">
        <p className="lab-eyebrow">{caseStudy.category}</p>
        <h1>UI Systems <em>Lab.</em></h1>
        <p className="lab-intro">{caseStudy.summary}</p>
        <div className="lab-actions">
          {storybookUrl ? (
            <a className="lab-primary-link" href={storybookUrl} target="_blank" rel="noopener noreferrer">
              Explore the Storybook catalog <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="lab-missing-source">Storybook link pending source verification.</p>
          )}
          <span className="lab-primary-note">One catalog. Two spaces for prototyping.</span>
        </div>
        <dl className="lab-meta">
          <div><dt>Role</dt><dd>{caseStudy.role}</dd></div>
          <div><dt>Scope</dt><dd>{caseStudy.scope}</dd></div>
          <div><dt>Status</dt><dd>Ongoing independent practice</dd></div>
        </dl>
      </header>

      <figure className="lab-feature">
        <InterfaceLabCatalogMap />
        <figcaption>
          Diagram of the catalog taxonomy documented in the two starter repositories.
          This is an explanatory illustration, not a screenshot of the live Storybook.
        </figcaption>
      </figure>

      <nav aria-label="On this page" className="lab-chapter-nav">
        <a href="#lab-catalog">01 <span>Storybook catalog</span></a>
        <a href="#lab-prototypes">02 <span>Prototype spaces</span></a>
        <a href="#lab-practice">03 <span>Why this exists</span></a>
      </nav>

      <section id="lab-catalog" className="lab-section" aria-labelledby="lab-catalog-title">
        <div className="lab-section-heading">
          <p className="lab-eyebrow">01 / One Storybook project</p>
          <h2 id="lab-catalog-title">{catalog?.title ?? "The interface catalog"}</h2>
          {catalog?.body && <p>{catalog.body}</p>}
        </div>
        <div className="lab-catalog-list" aria-label="Storybook catalog categories">
          {catalog?.items?.map((item, index) => (
            <div className="lab-catalog-item" key={item.id ?? item.title}>
              <span aria-hidden="true">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="lab-prototypes" className="lab-section" aria-labelledby="lab-prototypes-title">
        <div className="lab-section-heading">
          <p className="lab-eyebrow">02 / Supporting workspaces</p>
          <h2 id="lab-prototypes-title">{prototypes?.title ?? "Prototype spaces"}</h2>
          {prototypes?.body && <p>{prototypes.body}</p>}
        </div>
        <div className="lab-workspace-grid">
          {prototypes?.items?.map((item, index) => (
            <article className="lab-workspace" key={item.id ?? item.title}>
              <p className="lab-workspace-label">Prototype space 0{index + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {prototypeUrls[index] && (
                <a href={prototypeUrls[index]} target="_blank" rel="noopener noreferrer">
                  {index === 0 ? "View Vite source" : "View TanStack Start source"}
                  <span aria-hidden="true"> ↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
        <p className="lab-source-note">
          These are separate, parallel starter repositories. They are not presented as one
          automatically shared codebase or two additional portfolio projects.
        </p>
      </section>

      <section id="lab-practice" className="lab-section lab-section-closing" aria-labelledby="lab-practice-title">
        <div className="lab-section-heading">
          <p className="lab-eyebrow">03 / Working practice</p>
          <h2 id="lab-practice-title">{reflection?.title ?? "A working reference"}</h2>
          {overview?.body && <p>{overview.body}</p>}
          {reflection?.body && <p>{reflection.body}</p>}
        </div>
        {storybookUrl && (
          <a className="lab-text-link" href={storybookUrl} target="_blank" rel="noopener noreferrer">
            Browse the catalog <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      <footer className="lab-footer">
        <Link href="/work">← Back to all work</Link>
      </footer>
    </article>
  );
}
