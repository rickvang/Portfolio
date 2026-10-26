import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { InterfaceLabStory } from "@/content/interface-lab-story";
import { getApprovedCaseStudyBySlug, getCaseStudyBySlug, caseStudyCatalog } from "@/lib/case-studies";

const lab = getCaseStudyBySlug("ui-systems-lab")!;

describe("UI Systems Lab portfolio presentation", () => {
  it("is a single review-ready work item, not three publicly visible case studies", () => {
    expect(caseStudyCatalog.filter((item) => item.slug === lab.slug)).toHaveLength(1);
    expect(lab.reviewStatus).toBe("review-ready");
    expect(getApprovedCaseStudyBySlug(lab.slug)).toBeUndefined();
    expect(lab.sections.map((section) => section.kind)).toEqual([
      "overview", "exploration", "system-practice", "reflection",
    ]);
    expect(lab.sections.find((section) => section.kind === "exploration")?.items?.map((item) => item.id)).toEqual([
      "vite-workspace", "tanstack-workspace",
    ]);
  });

  it("makes Storybook the primary destination, with prototype source links secondary", () => {
    const html = renderToStaticMarkup(<InterfaceLabStory caseStudy={lab} />);
    expect(html).toContain('class="lab-primary-link"');
    expect(html).toContain('href="https://ui-starter.rickvang.com"');
    expect(html).toContain("Explore the Storybook catalog");
    expect(html).toContain("View Vite source");
    expect(html).toContain("View TanStack Start source");
    expect(html).toContain('href="https://github.com/rickvang/ui-starter/blob/master/README.md"');
    expect(html).toContain('href="https://github.com/rickvang/ui-startertanstack/blob/master/README.md"');
    expect(html).toContain("not a screenshot");
    expect(html).toContain('aria-label="On this page"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("names the five documented catalog groups without invented product screens", () => {
    const groups = lab.sections.find((section) => section.kind === "system-practice")?.items ?? [];
    expect(groups.map((item) => item.title)).toEqual([
      "Foundations", "Layout", "Components", "Modules", "Patterns",
    ]);
    expect(lab.sources.filter((source) => source.kind === "repository")).toHaveLength(2);
  });
});
