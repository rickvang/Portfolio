import Link from "next/link";

import type { CaseStudy } from "@/lib/case-studies";
import { publicRoutes } from "@/lib/public-routes";

import "@/app/integrations-example.css";

export function IntegrationsCaseStudyExample({ caseStudy }: { caseStudy: CaseStudy }) {
  const context = caseStudy.sections.find((section) => section.kind === "context");
  const overview = caseStudy.sections.find((section) => section.kind === "overview");
  const patterns = caseStudy.sections.find((section) => section.kind === "problem");
  const adoption = caseStudy.sections.find((section) => section.kind === "exploration");
  const artifacts = caseStudy.sections.find((section) => section.kind === "system-practice");
  const outcomes = caseStudy.sections.find((section) => section.kind === "outcomes");

  return (
    <article className="integrations-example" aria-labelledby="integrations-example-title">
      <Link className="integrations-back" href={publicRoutes.work}>All work</Link>

      <header className="integrations-opening">
        <div>
          <h1 id="integrations-example-title">{caseStudy.title}</h1>
          <p className="integrations-intro">{caseStudy.summary}</p>
          <dl className="integrations-role">
            <div><dt>My contribution</dt><dd>{caseStudy.role}</dd></div>
            <div><dt>Context</dt><dd>{caseStudy.scope}</dd></div>
          </dl>
        </div>

        <figure className="integrations-comparison" aria-labelledby="comparison-title">
          <h2 id="comparison-title">One decision.<br />Two arrangements.</h2>
          <div className="integrations-pair">
            <h3>Horizontal</h3>
            <dl className="integrations-pair-horizontal"><dt>Label</dt><dd>Value</dd></dl>
          </div>
          <div className="integrations-pair">
            <h3>Vertical</h3>
            <dl className="integrations-pair-vertical"><dt>Label</dt><dd>Value</dd></dl>
          </div>
          <figcaption>{patterns?.illustration?.caption}</figcaption>
        </figure>
      </header>

      <section className="integrations-decisions" aria-labelledby="decisions-title">
        <h2 id="decisions-title">The shared decisions</h2>
        <dl>
          {patterns?.items?.map((item) => (
            <div key={item.id ?? item.title}><dt>{item.title}</dt><dd>{item.summary}</dd></div>
          ))}
        </dl>
      </section>

      <section className="integrations-adoption" aria-labelledby="adoption-title">
        <div className="integrations-adoption-copy">
          <h2 id="adoption-title">A better pattern came from another team</h2>
          <p>{adoption?.body}</p>
        </div>
        <figure className="integrations-record-pattern" aria-labelledby="record-pattern-title">
          <h3 id="record-pattern-title">From a team workflow to a shared pattern</h3>
          <ol className="integrations-pattern-flow">
            {adoption?.items?.map((item) => (
              <li key={item.id ?? item.title}><strong>{item.title}</strong><span>{item.summary}</span></li>
            ))}
          </ol>
        </figure>
      </section>

      <section className="integrations-delivery" aria-labelledby="delivery-title">
        <h2 id="delivery-title">What teams could reuse</h2>
        <dl className="integrations-artifacts">
          {artifacts?.items?.map((item) => (
            <div key={item.id ?? item.title}><dt>{item.title}</dt><dd>{item.summary}</dd></div>
          ))}
        </dl>
        <div className="integrations-outcome">
          <h3>Adoption took collaboration</h3>
          <p>{outcomes?.body}</p>
        </div>
      </section>

      <details className="integrations-working-detail">
        <summary>My contribution and how we worked</summary>
        <div>
          <p>{context?.body}</p>
          <p>{artifacts?.body}</p>
          <p>{overview?.body}</p>
        </div>
      </details>

      {caseStudy.clientIpDisclaimer && (
        <aside className="integrations-ip-note" aria-label="Client intellectual property note">
          <p>{caseStudy.clientIpDisclaimer}</p>
        </aside>
      )}
    </article>
  );
}
