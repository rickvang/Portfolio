import { PersonalPracticeWorkIndex } from "@/components/personal-practice-work-index";
import { getApprovedCaseStudies } from "@/lib/case-studies";

const workPageItems = [
  {
    slug: "multi-product-integrations",
    summary:
      "Turning a fragmented ecosystem of products, workflows, and data into a shared framework for a more coherent product experience.",
    visualKind: "integrations",
  },
  {
    slug: "ai-systems",
    summary:
      "Building a durable operating system for collaborating with specialized AI agents across repositories, tools, and interruptions.",
    visualKind: "ai-systems",
  },
  {
    slug: "design-systems",
    summary:
      "Creating reusable product foundations and lightweight governance to improve consistency across a complex legacy environment.",
    visualKind: "design-systems",
  },
  {
    slug: "ui-design-practices",
    summary:
      "Turning design principles into a repeatable design-to-implementation practice with explicit interaction, accessibility, and verification contracts.",
    visualKind: "ui-practice",
  },
] as const;

export default function WorkPage() {
  const caseStudies = getApprovedCaseStudies();
  const selectedWork = workPageItems.flatMap((item) => {
    const caseStudy = caseStudies.find((candidate) => candidate.slug === item.slug);
    return caseStudy
      ? [{ caseStudy, summary: item.summary, visualKind: item.visualKind }]
      : [];
  });

  return (
    <div className="public-page practice-work-page">
      <section aria-labelledby="work-page-heading" className="practice-work-hero">
        <div className="practice-work-hero-copy">
          <h1 id="work-page-heading">
            <span className="practice-work-title-wide">
              From fragmented workflows to reusable foundations.
            </span>
            <span className="practice-work-title-compact">Work</span>
          </h1>
        </div>

        <div className="practice-work-hero-aside">
          <p>
            Each case study follows the decisions, foundations, and interfaces that shaped the
            work.
          </p>
          <dl className="practice-work-facts">
            <div>
              <dt>Case studies</dt>
              <dd>{selectedWork.length}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Product · systems · AI</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-label="Selected work"
        className="practice-section practice-work-collection"
      >
        <PersonalPracticeWorkIndex items={selectedWork} />
      </section>
    </div>
  );
}

