import { CaseStudyList } from "@/components/case-study-list";
import { getApprovedCaseStudies } from "@/lib/case-studies";

export default function WorkPage() {
  const caseStudies = getApprovedCaseStudies();

  return (
    <div className="public-page">
      <section className="hero public-hero">
        <p className="eyebrow">Work</p>
        <h1>Recent projects.</h1>
        <p className="lede">
          Two client-protective case studies from the existing portfolio, now carried forward through the shared typed
          content model.
        </p>
      </section>

      <section aria-labelledby="work-index-heading" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Case studies</p>
          <h2 id="work-index-heading">Selected work</h2>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
      </section>
    </div>
  );
}
