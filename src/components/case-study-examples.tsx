import Link from "next/link";
import Image from "next/image";

import type { CaseStudy } from "@/lib/case-studies";
import { publicRoutes } from "@/lib/public-routes";

import "@/app/integrations-example.css";
import "@/app/case-study-examples.css";

export function AiCouncilExample({ caseStudy }: { caseStudy: CaseStudy }) {
  const context = caseStudy.sections.find((section) => section.kind === "context");
  const exploration = caseStudy.sections.find((section) => section.kind === "exploration");
  const result = caseStudy.sections.find((section) => section.kind === "system-practice");
  const problem = caseStudy.sections.find((section) => section.kind === "problem");
  const method = caseStudy.sections.find((section) => section.kind === "decisions");

  return (
    <article className="integrations-example" aria-labelledby="council-title">
      <Link className="integrations-back" href={publicRoutes.work}>All work</Link>
      <header className="integrations-opening">
        <div>
          <h1 id="council-title">{caseStudy.title}</h1>
          <p className="integrations-intro">{caseStudy.summary}</p>
          <dl className="integrations-role">
            <div><dt>My contribution</dt><dd>{caseStudy.role}</dd></div>
            <div><dt>Context</dt><dd>{caseStudy.scope}</dd></div>
          </dl>
        </div>
        <figure className="example-council" aria-labelledby="council-diagram-title">
          <h2 id="council-diagram-title">From explaining value<br />to evaluating fit.</h2>
          <dl className="example-before-after">
            {problem?.items?.map((item) => <div key={item.id}><dt>{item.title}</dt><dd>{item.summary}</dd></div>)}
          </dl>
        </figure>
      </header>
      <section className="example-narrative" aria-labelledby="council-question-title">
        <h2 id="council-question-title">{exploration?.title}</h2>
        <div>
          <figure className="example-role-comparison" aria-labelledby="council-question-title">
            <blockquote className="example-request">{exploration?.items?.[0]?.summary}</blockquote>
            <ul className="example-council-roles">{exploration?.items?.filter((item) => item.id?.startsWith("priority-")).map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.summary}</span></li>)}</ul>
          </figure>
          <p>{exploration?.body}</p>
        </div>
      </section>
      <section className="example-persona-section" aria-labelledby="profile-title">
        <h2 id="profile-title">{context?.title}</h2>
        <p>{context?.body}</p>
        <figure className="example-persona-artifact" aria-labelledby="persona-artifact-title">
          <h3 id="persona-artifact-title">A generated profile: Minnesota contractor</h3>
          <dl>{context?.items?.filter((item) => item.id?.startsWith("contractor-")).map((item) => <div key={item.id}><dt>{item.title}</dt><dd>{item.summary}</dd></div>)}</dl>
        </figure>
        <p>{method?.body}</p>
      </section>
      <section className="integrations-outcome example-result" aria-labelledby="council-result-title">
        <h2 id="council-result-title">What changed for product and UX</h2>
        <div>
          <p>{result?.body}</p>
          <dl className="example-decision-impact">
            {result?.items?.map((item) => <div key={item.id}><dt>{item.title}</dt><dd>{item.summary}</dd></div>)}
          </dl>
        </div>
      </section>
    </article>
  );
}

export function DesignSystemExample({ caseStudy }: { caseStudy: CaseStudy }) {
  const overview = caseStudy.sections.find((section) => section.kind === "overview");
  const exploration = caseStudy.sections.find((section) => section.kind === "exploration");
  const foundations = caseStudy.sections.find((section) => section.kind === "system-practice");
  const reuse = caseStudy.sections.find((section) => section.kind === "decisions");
  const outcome = caseStudy.sections.find((section) => section.kind === "outcomes");

  return (
    <article className="integrations-example" aria-labelledby="design-system-title">
      <Link className="integrations-back" href={publicRoutes.work}>All work</Link>
      <header className="integrations-opening">
        <div>
          <h1 id="design-system-title">{caseStudy.title}</h1>
          <p className="integrations-intro">{caseStudy.summary}</p>
          <dl className="integrations-role">
            <div><dt>My contribution</dt><dd>{caseStudy.role}</dd></div>
            <div><dt>Context</dt><dd>{caseStudy.scope}</dd></div>
          </dl>
        </div>
        <figure className="example-foundations" aria-labelledby="foundations-title">
          <h2 id="foundations-title">Shared foundations.<br />Different surfaces.</h2>
          <div className="example-foundation-core"><strong>Core library</strong><span>Reusable styles and tokens</span></div>
          <dl className="example-surface-branches">
            {foundations?.items?.map((item) => <div key={item.id}><dt>{item.title}</dt><dd>{item.summary}</dd></div>)}
          </dl>
          <figcaption>Designers used the density guidance that matched the surface they were designing.</figcaption>
        </figure>
      </header>
      <section className="example-narrative" aria-labelledby="system-problem-title">
        <h2 id="system-problem-title">Organizing existing work into a shared library</h2>
        <p>{overview?.body}</p>
      </section>
      <section className="example-narrative" aria-labelledby="system-audit-title">
        <h2 id="system-audit-title">Choosing what belonged in the library</h2>
        <p>{exploration?.body}</p>
      </section>
      <section className="example-narrative" aria-labelledby="system-density-title">
        <h2 id="system-density-title">Where consistency needed room for differences</h2>
        <p>{foundations?.body}</p>
      </section>
      <section className="integrations-delivery" aria-labelledby="reuse-title">
        <h2 id="reuse-title">Reuse at two levels</h2>
        <p className="example-visible-body">{reuse?.body}</p>
        <figure className="example-template-flow" aria-labelledby="template-flow-title">
          <h3 id="template-flow-title">How a template entered a new use case</h3>
          <ol><li>Reusable screen</li><li>Duplicate the screen</li><li>Modify for the use case</li></ol>
          <figcaption>The screen gives a starting point; workflow patterns guide how users move through the task.</figcaption>
        </figure>
        <dl className="integrations-artifacts">
          <div><dt>Screen templates</dt><dd>{reuse?.items?.[0]?.summary}</dd></div>
          <div><dt>Workflow patterns</dt><dd><ul className="example-workflows">{reuse?.items?.slice(1).map((item) => <li key={item.id}>{item.title}</li>)}</ul></dd></div>
        </dl>
      </section>
      <section className="integrations-outcome example-result" aria-labelledby="system-outcome-title">
        <h2 id="system-outcome-title">Keeping the system useful</h2>
        <p>{outcome?.body}</p>
      </section>
      <p className="example-source-link"><a href={caseStudy.sources.find((source) => source.id === "original-design-systems-story")?.url}>View the original foundations, density and workflow artifacts</a></p>
      {caseStudy.clientIpDisclaimer && <aside className="integrations-ip-note" aria-label="Client intellectual property note"><p>{caseStudy.clientIpDisclaimer}</p></aside>}
    </article>
  );
}

export function UiPracticeExample({ caseStudy }: { caseStudy: CaseStudy }) {
  const overview = caseStudy.sections.find((section) => section.kind === "overview");
  const hierarchy = caseStudy.sections.find((section) => section.kind === "context");
  const navigation = caseStudy.sections.find((section) => section.kind === "exploration");
  const palette = caseStudy.sections.find((section) => section.kind === "decisions");
  const outcome = caseStudy.sections.find((section) => section.kind === "outcomes");

  return (
    <article className="integrations-example" aria-labelledby="ui-practice-title">
      <Link className="integrations-back" href={publicRoutes.work}>All work</Link>
      <header className="integrations-opening">
        <div>
          <h1 id="ui-practice-title">{caseStudy.title}</h1>
          <p className="integrations-intro">{caseStudy.summary}</p>
          <dl className="integrations-role">
            <div><dt>My contribution</dt><dd>{caseStudy.role}</dd></div>
            <div><dt>Implementation</dt><dd>AI agents built the interface; I directed and reviewed the revisions.</dd></div>
          </dl>
        </div>
        <figure className="example-ui-introduction" aria-labelledby="hierarchy-title">
          <h2 id="hierarchy-title">The portfolio I directed</h2>
          <a href="/work-media/portfolio-practice/home-introduction.png"><Image src="/work-media/portfolio-practice/home-introduction.png" width={849} height={580} alt="Built portfolio introduction using Inter, a prominent product-design statement and direct links to the work and background." /></a>
          <figcaption>The current homepage introduction. Open the image to inspect the typography at full size.</figcaption>
        </figure>
      </header>
      <section className="example-narrative" aria-labelledby="ui-brief-title">
        <h2 id="ui-brief-title">A portfolio for someone deciding whether to read further</h2>
        <p>{overview?.body}</p>
      </section>
      <section className="example-narrative" aria-labelledby="ui-hierarchy-title">
        <h2 id="ui-hierarchy-title">The work needed to lead</h2>
        <div><p>{hierarchy?.body}</p><ol className="example-reading-order">{hierarchy?.items?.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.summary}</span></li>)}</ol></div>
      </section>
      <section className="example-navigation-section" aria-labelledby="navigation-title">
        <div><h2 id="navigation-title">Returning to the rail, with a lighter treatment</h2><p>{navigation?.body}</p></div>
        <figure className="example-navigation" aria-labelledby="navigation-figure-title">
          <h3 id="navigation-figure-title">Same destinations, two layouts</h3>
          <div className="example-navigation-layouts">
            <div><h4>Built desktop rail</h4><a href="/work-media/portfolio-practice/desktop-navigation.png"><Image src="/work-media/portfolio-practice/desktop-navigation.png" width={218} height={900} alt="Actual light desktop rail with Rick's mark and Work, Notes, About and Contact destinations." /></a></div>
            <div><h4>Open mobile drawer</h4><a href="/work-media/portfolio-practice/mobile-navigation.png"><Image src="/work-media/portfolio-practice/mobile-navigation.png" width={344} height={844} alt="Actual mobile navigation drawer showing the same destinations with a Close control." /></a></div>
          </div>
          <figcaption>The mobile drawer moves keyboard focus inside; Escape closes it and returns focus to Menu.</figcaption>
        </figure>
      </section>
      <section className="example-palette-section" aria-labelledby="palette-title">
        <h2 id="palette-title">Choosing color in the actual pages</h2>
        <p>{palette?.body}</p>
        <div className="example-palette-images">
          {[
            { name: "Existing warm", file: "warm" },
            { name: "Less saturated warm · Selected", file: "reduced-warm" },
            { name: "Near-neutral", file: "neutral" },
          ].map((option) => <figure key={option.file} className={option.file === "reduced-warm" ? "example-palette-selected" : undefined}><a href={`/work-media/portfolio-practice/palette-${option.file}.png`}><Image src={`/work-media/portfolio-practice/palette-${option.file}.png`} width={849} height={580} alt={`${option.name} background applied to the same current portfolio introduction.`} /></a><figcaption>{option.name}</figcaption></figure>)}
        </div>
        <p className="example-artifact-caption">The three background colors applied to the same current introduction, using the recorded palette values. Content and typography stay fixed.</p>
        <dl className="example-palette-options">{palette?.items?.map((item) => <div key={item.id} className={item.id === "reduced-warm" ? "example-palette-selected" : undefined}><dt>{item.title}</dt><dd>{item.summary}</dd></div>)}</dl>
        <figure className="example-chosen-colors" aria-label="Selected portfolio colors">
          <div><span className="example-color-background" aria-hidden="true" />Warm background</div>
          <div><span className="example-color-surface" aria-hidden="true" />Light surface</div>
          <div><span className="example-color-accent" aria-hidden="true" />Original orange accent</div>
        </figure>
      </section>
      <section className="integrations-outcome example-result" aria-labelledby="ui-outcome-title">
        <h2 id="ui-outcome-title">The built portfolio</h2>
        <div><p>{outcome?.body}</p><Link className="example-built-link" href={publicRoutes.home}>See the built homepage</Link></div>
      </section>
    </article>
  );
}
