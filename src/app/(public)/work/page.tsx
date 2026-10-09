import { WorkPageContent } from "@/content/supporting-pages";
import { getApprovedCaseStudies } from "@/lib/case-studies";

export default function WorkPage() {
  return <WorkPageContent approvedSlugs={getApprovedCaseStudies().map(study => study.slug)} />;
}
