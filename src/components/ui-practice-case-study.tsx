import Image from "next/image";
import Link from "next/link";

import { PracticeExamples } from "@/components/ui-practice-examples";
import type { CaseStudy } from "@/lib/case-studies";

export function UiPracticeCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const presentation = caseStudy.practicePresentation!;
  const context = caseStudy.sections.find((section) => section.kind === "context")!;
  const decisions = caseStudy.sections.find((section) => section.kind === "system-practice")!;
  const practice = caseStudy.sections.find((section) => section.kind === "outcomes")!;
  const [lead, ...story] = context.body!.split("\n\n");
  const labels = presentation.chapterLabels;
  const chapters = [
    { id: "context", label: labels.context },
    { id: "decisions", label: labels.system },
    { id: "practice", label: labels.outcomes },
  ];

  return (
    <article className="ui-craft" data-case-study-status={caseStudy.reviewStatus}>
      <Link className="craft-back" href="/work">← All work</Link>
      <header className="craft-hero">
        <div>
          <p className="craft-label">UI design practice</p>
          <h1>{presentation.headlineLead} <em>{presentation.headlineEmphasis}</em></h1>
          <p className="craft-intro">{caseStudy.summary}</p>
        </div>
        <figure>
          <div className="craft-hero-image">
            <Image src={presentation.heroMedia.src} alt={presentation.heroMedia.alt}
              width={presentation.heroMedia.width} height={presentation.heroMedia.height}
              sizes="(max-width: 800px) 90vw, 42vw" priority />
          </div>
          <figcaption>{presentation.heroMedia.caption}</figcaption>
        </figure>
      </header>
      <nav className="craft-index" aria-label="On this page">
        {chapters.map((chapter, index) => (
          <a href={`#${chapter.id}`} key={chapter.id}>
            <span aria-hidden="true">0{index + 1}</span>{chapter.label}
          </a>
        ))}
      </nav>

      <section className="craft-chapter" id="context" aria-labelledby="craft-context-title">
        <p className="craft-label">01 / {labels.context}</p>
        <h2 id="craft-context-title">{context.title}</h2>
        <p className="craft-lead">{lead}</p>
        <div className="craft-body-grid">
          <div>
            <h3>{presentation.contextSubtitle}</h3>
            {story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ol className="craft-rows" aria-label="The decision in practice">
            {context.items!.map((item, index) => (
              <li key={item.title}><span aria-hidden="true">0{index + 1}</span><div><strong>{item.title}</strong><p>{item.summary}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="craft-chapter" id="decisions" aria-labelledby="craft-decisions-title">
        <div className="craft-study-heading">
          <div><p className="craft-label">02 / {labels.system}</p><h2 id="craft-decisions-title">{decisions.title}</h2></div>
          <p>{decisions.body}</p>
        </div>
        <PracticeExamples examples={decisions.items!} />
        <p className="craft-note">{caseStudy.clientIpDisclaimer}</p>
      </section>

      <section className="craft-chapter craft-team" id="practice" aria-labelledby="craft-practice-title">
        <div>
          <p className="craft-label">03 / {labels.outcomes}</p>
          <h2 id="craft-practice-title">{practice.title}</h2>
          {practice.body!.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ol className="craft-rows craft-steps">
          {practice.items!.map((item, index) => (
            <li key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div></li>
          ))}
        </ol>
      </section>
      <nav className="craft-closing" aria-label="Return to work"><Link href="/work">← Back to all work</Link></nav>
    </article>
  );
}
