import { CaseStudyList } from "@/components/case-study-list";
import { WorkThroughline } from "@/components/work-throughline";
import { getApprovedCaseStudies } from "@/lib/case-studies";

export default function WorkPage() {
  const caseStudies = getApprovedCaseStudies();

  return (
    <div className="public-page">
      <section aria-labelledby="work-page-heading" className="content-section work-index-intro">
        <h1 id="work-page-heading">Work</h1>
        <WorkThroughline />
      </section>

      <section aria-labelledby="work-index-heading" className="content-section work-index-projects">
        <div className="section-heading">
          <h2 id="work-index-heading">Selected projects</h2>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
      </section>
    </div>
  );
}

