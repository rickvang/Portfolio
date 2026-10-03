import { notFound } from "next/navigation";

import { CaseStudyTemplate } from "@/components/case-study-template";
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

  if (params.view === "story") {
    return (
      <PersonalPracticeShell pathname="/work/multi-product-integrations">
        <div className="public-page" data-testid="case-study-story-review">
          <p className="case-study-review-banner" role="note">
            Working draft for review. <a href={`?slug=${caseStudy.slug}`}>Review sources and evidence</a>
          </p>
          <PersonalPracticeCaseStudy caseStudy={caseStudy} />
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
