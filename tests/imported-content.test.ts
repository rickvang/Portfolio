import { describe, expect, it } from "vitest";

import {
  getApprovedImportedProfile,
  importedContent,
} from "@/lib/imported-content";

describe("imported source content", () => {
  it("tracks source review separately from record publication", () => {
    expect(importedContent.source.captureStatus).toBe("reviewed");
    expect(importedContent.source.sourcePages).toHaveLength(5);
    expect(importedContent.source.clientIpDisclaimer).toContain("client intellectual property");
    expect(importedContent.profile.reviewStatus).toBe("approved");
    expect(importedContent.projects.every((project) => project.reviewStatus === "approved")).toBe(true);
    expect(getApprovedImportedProfile()).toEqual(importedContent.profile);
  });

  it("contains the first curated case-study set without deferred personal material", () => {
    expect(importedContent.projects.map((project) => project.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
    ]);
    expect(importedContent.projects.every((project) => project.solutionSections.length > 0)).toBe(true);
    expect(importedContent.profile).not.toHaveProperty("email");
    expect(importedContent.profile).not.toHaveProperty("phone");
    expect(importedContent).not.toHaveProperty("testimonials");
    expect(importedContent).not.toHaveProperty("credentials");
  });

  it("keeps a withdrawn profile out of the public adapter", () => {
    const reviewContent = {
      ...importedContent,
      profile: {
        ...importedContent.profile,
        reviewStatus: "draft" as const,
      },
    };

    expect(getApprovedImportedProfile(reviewContent)).toBeUndefined();
  });

  it("keeps publication status on each project record", () => {
    const pendingProject = {
      ...importedContent.projects[0]!,
      id: "future-project",
      slug: "future-project",
      reviewStatus: "draft" as const,
    };

    expect(pendingProject.reviewStatus).toBe("draft");
    expect(importedContent.projects[0]?.reviewStatus).toBe("approved");
  });
});
