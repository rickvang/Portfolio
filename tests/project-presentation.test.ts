import { describe, expect, it } from "vitest";

import { getApprovedCaseStudies } from "@/lib/case-studies";
import { getProjectPresentation } from "@/lib/project-presentation";

describe("project presentation", () => {
  const approved = getApprovedCaseStudies();

  it("maps the integration project to a topology", () => {
    const project = approved.find((caseStudy) => caseStudy.slug === "multi-product-integrations");
    expect(project).toBeDefined();

    const presentation = getProjectPresentation(project!);
    expect(presentation.kind).toBe("topology");
    if (presentation.kind === "topology") {
      expect(presentation.items.map((item) => item.title)).toContain("Workflow Completion");
    }
  });

  it("maps the design-system project to a matrix", () => {
    const project = approved.find((caseStudy) => caseStudy.slug === "design-systems");
    expect(project).toBeDefined();

    const presentation = getProjectPresentation(project!);
    expect(presentation.kind).toBe("matrix");
    if (presentation.kind === "matrix") {
      expect(presentation.groups.flatMap((group) => group.items.map((item) => item.title))).toContain(
        "Templates and patterns",
      );
    }
  });
});
