import { describe, expect, it } from "vitest";

import { importedContent } from "@/lib/imported-content";

describe("imported source content", () => {
  it("is a typed draft with source provenance", () => {
    expect(importedContent.source.reviewStatus).toBe("draft");
    expect(importedContent.source.sourcePages).toHaveLength(5);
    expect(importedContent.source.clientIpDisclaimer).toContain("client intellectual property");
  });

  it("contains the first curated case-study set", () => {
    expect(importedContent.projects.map((project) => project.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
    ]);
    expect(importedContent.projects.every((project) => project.solutionSections.length > 0)).toBe(true);
  });
});
