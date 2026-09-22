import { describe, expect, it } from "vitest";

import {
  getApprovedImportedContent,
  getApprovedImportedProfile,
  importedContent,
} from "@/lib/imported-content";

describe("imported source content", () => {
  it("is explicitly approved with source provenance", () => {
    expect(importedContent.source.reviewStatus).toBe("approved");
    expect(importedContent.source.sourcePages).toHaveLength(5);
    expect(importedContent.source.clientIpDisclaimer).toContain("client intellectual property");
    expect(getApprovedImportedContent()).toEqual(importedContent);
    expect(getApprovedImportedProfile()).toEqual(importedContent.profile);
  });

  it("contains the first curated case-study set", () => {
    expect(importedContent.projects.map((project) => project.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
    ]);
    expect(importedContent.projects.every((project) => project.solutionSections.length > 0)).toBe(true);
  });

  it("keeps draft packets out of the public adapter", () => {
    const draft = {
      ...importedContent,
      source: {
        ...importedContent.source,
        reviewStatus: "draft" as const,
      },
    };

    expect(getApprovedImportedContent(draft)).toBeUndefined();
    expect(getApprovedImportedProfile(draft)).toBeUndefined();
  });
});
