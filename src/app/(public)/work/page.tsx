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
          <h1 id="work-page-heading">Work</h1>
        </div>
        <p className="practice-work-hero-scope">
          Product architecture, design systems, and AI-assisted delivery.
        </p>
      </section>

      <section
        aria-labelledby="work-case-studies-heading"
        className="practice-section practice-work-collection"
      >
        <h2 className="practice-work-visually-hidden" id="work-case-studies-heading">
          Case studies
        </h2>
        <PersonalPracticeWorkIndex items={selectedWork} />
      </section>
    </div>
  );
}

