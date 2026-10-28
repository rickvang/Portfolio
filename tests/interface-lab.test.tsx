import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseStudyTemplate } from "@/components/case-study-template";
import { getApprovedCaseStudyBySlug, getCaseStudyBySlug, caseStudyCatalog } from "@/lib/case-studies";

const lab = getCaseStudyBySlug("ui-systems-lab")!;

describe("UI Systems Lab portfolio presentation", () => {
  it("publishes one approved work item through the shared gate", () => {
    expect(caseStudyCatalog.filter((item) => item.slug === lab.slug)).toHaveLength(1);
    expect(lab.reviewStatus).toBe("approved");
    expect(getApprovedCaseStudyBySlug(lab.slug)).toEqual(lab);
    expect(lab.sections.map((section) => section.kind)).toEqual([
      "overview", "context", "exploration", "system-practice", "reflection",
    ]);
  });

  it("renders the approved concept with honest illustrations and source links", () => {
    const html = renderToStaticMarkup(<CaseStudyTemplate caseStudy={lab} />);
    expect(html).toContain("Building a place to");
    expect(html).toContain("Putting the pieces together");
    expect(html).toContain("Trying a flow in context");
    expect(html).toContain("not a screenshot or a record of a completed study");
    expect(html).toContain("does not persist a record");
    expect(html).toContain('href="https://ui-starter.rickvang.com"');
    expect(html).toContain('href="https://github.com/rickvang/ui-starter/blob/master/README.md"');
    expect(html).toContain('href="https://github.com/rickvang/ui-startertanstack/blob/master/README.md"');
  });

  it("retains the five documented catalog groups", () => {
    const groups = lab.sections.find((section) => section.kind === "system-practice")?.items ?? [];
    expect(groups.map((item) => item.title)).toEqual([
      "Foundations", "Layout", "Components", "Modules", "Patterns",
    ]);
  });
});
