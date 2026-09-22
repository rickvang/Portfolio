import { CaseStudyList } from "@/components/case-study-list";
import { getApprovedCaseStudies } from "@/lib/case-studies";

export default function WorkPage() {
  const caseStudies = getApprovedCaseStudies();

  return (
    <div className="public-page">
      <section className="hero public-hero">
        <p className="eyebrow">Work</p>
        <h1>Selected work.</h1>
        <p className="lede">
          Public case studies appear here only after their imported or authored content has been reviewed and approved.
        </p>
      </section>

      <section aria-labelledby="work-index-heading" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Case studies</p>
          <h2 id="work-index-heading">Approved work</h2>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
      </section>
    </div>
  );
}
