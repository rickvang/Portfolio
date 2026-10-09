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

const legacyOverview = { title: "Build sequence", phases: [{ title: "Structure", summary: "Define the page structure." }], evidence: [{ sourceId: "cw97-approved", note: "Synthetic legacy overview fixture." }] };

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
      "multi-product-integrations-revision",
      "ai-systems-revision",
      "design-systems-revision",
      "ui-design-practices-revision",
    ]);
    expect(getApprovedCaseStudies(authoredCaseStudies).map((caseStudy) => caseStudy.slug)).toEqual([
      "ai-systems",
      "ui-design-practices",
    ]);
    expect(getApprovedCaseStudies().map((caseStudy) => caseStudy.slug)).toEqual([
      "multi-product-integrations",
      "design-systems",
      "ai-systems",
      "ui-design-practices",
    ]);
  });

  it("keeps explicitly approved authored case studies public through the shared gate", () => {
    expect(caseStudyCatalog).toHaveLength(8);
    expect(getCaseStudyBySlug("ai-systems")).toEqual(authoredCaseStudies[0]);
    expect(getApprovedCaseStudyBySlug("ai-systems")).toEqual(authoredCaseStudies[0]);
    expect(getApprovedCaseStudyBySlug("ui-design-practices")).toEqual(authoredCaseStudies[1]);
  });

  it("keeps the case-study replacements reviewable without publishing them", () => {
    for (const slug of [
      "multi-product-integrations-revision",
      "ai-systems-revision",
      "design-systems-revision",
      "ui-design-practices-revision",
    ]) {
      const revision = getCaseStudyBySlug(slug)!;
      expect(revision.reviewStatus).toBe("review-ready");
      expect(getApprovedCaseStudyBySlug(revision.slug)).toBeUndefined();
    }
    for (const slug of ["multi-product-integrations-revision", "ai-systems-revision"]) {
      expect(getCaseStudyBySlug(slug)!.sources.some((source) => source.kind === "user-provided")).toBe(true);
    }
    expect(getApprovedCaseStudyBySlug("multi-product-integrations")).toEqual(importedCaseStudies[0]);
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

  it("rejects a practice overview that refers to a missing evidence source", () => {
    const caseStudy = getApprovedCaseStudyBySlug("ui-design-practices")!;
    const result = caseStudySchema.safeParse({
      ...caseStudy,
      practiceOverview: {
        ...legacyOverview,
        evidence: [{ sourceId: "missing-source", note: "Unsupported phase sequence" }],
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["practiceOverview", "evidence", 0, "sourceId"]);
    }
  });

  it("requires a System chapter for a practice overview", () => {
    const caseStudy = { ...getApprovedCaseStudyBySlug("ui-design-practices")!, practicePresentation: undefined, practiceOverview: legacyOverview };
    const withoutSystem = caseStudy.sections.filter(
      (section) => section.kind !== "system-practice" && section.kind !== "decisions",
    );
    const result = caseStudySchema.safeParse({ ...caseStudy, sections: withoutSystem });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(expect.objectContaining({ path: ["practiceOverview"] }));
    }
    expect(caseStudySchema.safeParse({ ...caseStudy, practiceOverview: undefined, sections: withoutSystem }).success).toBe(true);
    for (const kind of ["system-practice", "decisions"]) {
      expect(caseStudySchema.safeParse({
        ...caseStudy,
        sections: [{ kind, title: "System", body: "Synthetic system section.", evidence: legacyOverview.evidence }],
      }).success).toBe(true);
    }
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

  it("rejects incomplete examples and duplicate tab identities in the craft presentation", () => {
    const current = getApprovedCaseStudyBySlug("ui-design-practices")!;
    const incomplete = structuredClone(current);
    const examples = incomplete.sections.find((section) => section.kind === "system-practice")!.items!;
    examples[1].id = examples[0].id;
    examples[0].media = undefined;
    expect(caseStudySchema.safeParse(incomplete).success).toBe(false);
    expect(caseStudySchema.safeParse(current).success).toBe(true);
  });
});
