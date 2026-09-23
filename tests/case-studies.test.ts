import { describe, expect, it } from "vitest";

import {
  CASE_STUDY_SECTION_ORDER,
  authoredCaseStudies,
  caseStudyCatalog,
  caseStudySchema,
  getApprovedCaseStudies,
  getApprovedCaseStudyBySlug,
  getCaseStudyBySlug,
  getCaseStudyChapters,
  importedCaseStudies,
} from "@/lib/case-studies";

describe("case-study content contract", () => {
  it("promotes explicitly approved imported and authored projects", () => {
    expect(importedCaseStudies.map((caseStudy) => caseStudy.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
    ]);
    expect(importedCaseStudies.every((caseStudy) => caseStudy.reviewStatus === "approved")).toBe(true);
    expect(authoredCaseStudies.map((caseStudy) => caseStudy.slug)).toEqual([
      "ai-systems",
      "ui-design-practices",
    ]);
    expect(authoredCaseStudies.every((caseStudy) => caseStudy.reviewStatus === "approved")).toBe(true);
    expect(getApprovedCaseStudies().map((caseStudy) => caseStudy.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
      "ai-systems",
      "ui-design-practices",
    ]);
  });

  it("keeps explicitly approved authored case studies public through the shared gate", () => {
    expect(caseStudyCatalog).toHaveLength(4);
    expect(getCaseStudyBySlug("ai-systems")).toEqual(authoredCaseStudies[0]);
    expect(getApprovedCaseStudyBySlug("ai-systems")).toEqual(authoredCaseStudies[0]);
    expect(getApprovedCaseStudyBySlug("ui-design-practices")).toEqual(authoredCaseStudies[1]);
  });

  it("groups evidence-backed sections into the reusable chapter model", () => {
    const aiSystems = getCaseStudyBySlug("ai-systems")!;
    expect(getCaseStudyChapters(aiSystems).map((chapter) => chapter.label)).toEqual([
      "Context",
      "Personas",
      "Exploration",
      "System",
      "Outcomes",
    ]);

    const imported = importedCaseStudies[0]!;
    expect(getCaseStudyChapters(imported).map((chapter) => chapter.label)).toEqual([
      "Context",
      "Exploration",
      "System",
      "Outcomes",
    ]);
  });

  it("keeps imported source provenance attached to every section", () => {
    for (const caseStudy of importedCaseStudies) {
      const sourceIds = new Set(caseStudy.sources.map((source) => source.id));

      expect(caseStudy.clientIpDisclaimer).toContain("client intellectual property");
      expect(caseStudy.sources[0]?.url).toBeTruthy();

      for (const section of caseStudy.sections) {
        expect(section.evidence.length).toBeGreaterThan(0);
        expect(section.evidence.every((evidence) => sourceIds.has(evidence.sourceId))).toBe(true);
      }
    }
  });

  it("keeps authored case-study evidence resolvable", () => {
    for (const caseStudy of authoredCaseStudies) {
      const sourceIds = new Set(caseStudy.sources.map((source) => source.id));

      for (const section of caseStudy.sections) {
        expect(section.evidence.length).toBeGreaterThan(0);
        expect(section.evidence.every((evidence) => sourceIds.has(evidence.sourceId))).toBe(true);
      }
    }
  });

  it("keeps available sections in the shared sequence without inventing missing sections", () => {
    expect(importedCaseStudies[0]?.sections.map((section) => section.kind)).toEqual([
      "overview",
      "exploration",
      "system-practice",
      "outcomes",
    ]);

    const positions = importedCaseStudies[0]?.sections.map((section) =>
      CASE_STUDY_SECTION_ORDER.indexOf(section.kind),
    );

    expect(positions).toEqual([...positions!].sort((left, right) => left - right));
  });

  it("rejects sections that violate the shared sequence", () => {
    const caseStudy = importedCaseStudies[0]!;
    const result = caseStudySchema.safeParse({
      ...caseStudy,
      sections: [caseStudy.sections[1], caseStudy.sections[0], ...caseStudy.sections.slice(2)],
    });

    expect(result.success).toBe(false);
  });

  it("filters mixed approval states without publishing review-ready authored work", () => {
    const reviewReady = caseStudySchema.parse({
      ...importedCaseStudies[0],
      reviewStatus: "review-ready",
    });

    const mixed = [importedCaseStudies[1]!, reviewReady];

    expect(getApprovedCaseStudies(mixed)).toEqual([importedCaseStudies[1]]);
    expect(getApprovedCaseStudyBySlug("multi-product-integrations", mixed)).toBeUndefined();
    expect(getApprovedCaseStudyBySlug("design-systems", mixed)).toEqual(importedCaseStudies[1]);
    expect(importedCaseStudies[0]?.reviewStatus).toBe("approved");
  });
});
