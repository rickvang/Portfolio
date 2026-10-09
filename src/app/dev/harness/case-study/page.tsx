import { notFound } from "next/navigation";

import { CaseStudyTemplate } from "@/components/case-study-template";
import { AiCouncilExample, DesignSystemExample, UiPracticeExample } from "@/components/case-study-examples";
import { IntegrationsCaseStudyExample } from "@/components/integrations-case-study-example";
import { PersonalPracticeCaseStudy } from "@/components/personal-practice-case-study";
import { PersonalPracticeShell } from "@/components/personal-practice-shell";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const dynamic = "force-dynamic";

type CaseStudyHarnessPageProps = {
  searchParams: Promise<{ slug?: string | string[]; view?: string | string[] }>;
};

export default async function CaseStudyHarnessPage({ searchParams }: CaseStudyHarnessPageProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;
  const requestedSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const slug = requestedSlug ?? "multi-product-integrations";
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const examples = [
    { slug: "multi-product-integrations-revision", title: "Integrations", component: IntegrationsCaseStudyExample },
    { slug: "ai-systems-revision", title: "AI Systems", component: AiCouncilExample },
    { slug: "design-systems-revision", title: "Design Systems", component: DesignSystemExample },
    { slug: "ui-design-practices-revision", title: "UI Design Practices", component: UiPracticeExample },
  ];
  const Example = examples.find((example) => example.slug === caseStudy.slug)?.component;

  if (params.view === "example" && !Example) {
    notFound();
  }

  if (params.view === "story" || params.view === "example") {
    return (
      <PersonalPracticeShell pathname="/work/multi-product-integrations">
        <div className="public-page" data-testid="case-study-story-review">
          <p className="case-study-review-banner" role="note">
            Working draft for review. <a href={`?slug=${caseStudy.slug}`}>Review sources and evidence</a>
          </p>
          {params.view === "example" && (
            <nav className="case-study-review-links" aria-label="Case-study examples">
              {examples.map((example) => <a key={example.slug} href={`?slug=${example.slug}&view=example`} aria-current={example.slug === caseStudy.slug ? "page" : undefined}>{example.title}</a>)}
            </nav>
          )}
          {params.view === "example" && Example ? (
            <Example caseStudy={caseStudy} />
          ) : (
            caseStudy.practicePresentation ? <CaseStudyTemplate caseStudy={caseStudy} /> : <PersonalPracticeCaseStudy caseStudy={caseStudy} />
          )}
        </div>
      </PersonalPracticeShell>
    );
  }

  return (
    <main className="site-shell case-study-harness" data-testid="case-study-harness">
      <header className="harness-header">
        <div>
          <p className="eyebrow">Local-only case-study verification</p>
          <h1>Case-study harness</h1>
          <p className="lede">
            The shared detail renderer with review provenance and evidence visible for deterministic visual, responsive, long-content, and accessibility checks.
          </p>
        </div>
        <a className="button button-secondary" href="/dev/harness">
          Back to harness
        </a>
      </header>

      <section className="harness-section harness-section-single" aria-labelledby="case-study-harness-heading">
        <div>
          <p className="eyebrow">{caseStudy.reviewStatus} fixture</p>
          <h2 id="case-study-harness-heading">{caseStudy.title}</h2>
        </div>
        <CaseStudyTemplate caseStudy={caseStudy} mode="review" />
      </section>
    </main>
  );
}
