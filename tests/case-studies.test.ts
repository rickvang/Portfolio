import { describe, expect, it } from "vitest";

import {
  CASE_STUDY_SECTION_ORDER,
  authoredCaseStudyDrafts,
  caseStudyCatalog,
  caseStudySchema,
  getApprovedCaseStudies,
  getApprovedCaseStudyBySlug,
  getCaseStudyBySlug,
  getCaseStudyChapters,
  importedCaseStudyDrafts,
} from "@/lib/case-studies";

describe("case-study content contract", () => {
  it("adapts imported projects without promoting them", () => {
    expect(importedCaseStudyDrafts.map((caseStudy) => caseStudy.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
    ]);
    expect(importedCaseStudyDrafts.every((caseStudy) => caseStudy.reviewStatus === "draft")).toBe(true);
    expect(getApprovedCaseStudies()).toEqual([]);
  });

  it("keeps authored editorial case studies review-ready but unpublished", () => {
    expect(authoredCaseStudyDrafts.map((caseStudy) => caseStudy.slug)).toEqual([
      "ai-systems",
      "ui-design-practices",
    ]);
    expect(authoredCaseStudyDrafts.every((caseStudy) => caseStudy.reviewStatus === "review-ready")).toBe(true);
    expect(caseStudyCatalog).toHaveLength(4);
    expect(getCaseStudyBySlug("ai-systems")).toEqual(authoredCaseStudyDrafts[0]);
    expect(getApprovedCaseStudyBySlug("ai-systems")).toBeUndefined();
    expect(getApprovedCaseStudies()).toEqual([]);
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

    const imported = importedCaseStudyDrafts[0]!;
    expect(getCaseStudyChapters(imported).map((chapter) => chapter.label)).toEqual([
      "Context",
      "Exploration",
      "System",
      "Outcomes",
    ]);
  });

  it("keeps imported source provenance attached to every section", () => {
    for (const caseStudy of importedCaseStudyDrafts) {
      const sourceIds = new Set(caseStudy.sources.map((source) => source.id));

      expect(caseStudy.clientIpDisclaimer).toContain("client intellectual property");
      expect(caseStudy.sources[0]?.url).toBeTruthy();

      for (const section of caseStudy.sections) {
        expect(section.evidence.length).toBeGreaterThan(0);
        expect(section.evidence.every((evidence) => sourceIds.has(evidence.sourceId))).toBe(true);
      }
    }
  });

  it("keeps authored draft evidence resolvable", () => {
    for (const caseStudy of authoredCaseStudyDrafts) {
      const sourceIds = new Set(caseStudy.sources.map((source) => source.id));

      for (const section of caseStudy.sections) {
        expect(section.evidence.length).toBeGreaterThan(0);
        expect(section.evidence.every((evidence) => sourceIds.has(evidence.sourceId))).toBe(true);
      }
    }
  });

  it("keeps available sections in the shared sequence without inventing missing sections", () => {
    expect(importedCaseStudyDrafts[0]?.sections.map((section) => section.kind)).toEqual([
      "overview",
      "exploration",
      "system-practice",
      "outcomes",
    ]);

    const positions = importedCaseStudyDrafts[0]?.sections.map((section) =>
      CASE_STUDY_SECTION_ORDER.indexOf(section.kind),
    );

    expect(positions).toEqual([...positions!].sort((left, right) => left - right));
  });

  it("rejects sections that violate the shared sequence", () => {
    const caseStudy = importedCaseStudyDrafts[0]!;
    const result = caseStudySchema.safeParse({
      ...caseStudy,
      sections: [caseStudy.sections[1], caseStudy.sections[0], ...caseStudy.sections.slice(2)],
    });

    expect(result.success).toBe(false);
  });

  it("allows explicit approval without changing draft source data", () => {
    const approved = caseStudySchema.parse({
      ...importedCaseStudyDrafts[0],
      reviewStatus: "approved",
    });

    const mixed = [importedCaseStudyDrafts[1]!, approved];

    expect(getApprovedCaseStudies(mixed)).toEqual([approved]);
    expect(getApprovedCaseStudyBySlug("multi-product-integrations", mixed)).toEqual(approved);
    expect(getApprovedCaseStudyBySlug("design-systems", mixed)).toBeUndefined();
    expect(importedCaseStudyDrafts[0]?.reviewStatus).toBe("draft");
  });
});
