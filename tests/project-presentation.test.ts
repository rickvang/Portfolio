import { describe, expect, it } from "vitest";

import { getApprovedCaseStudies, type CaseStudy } from "@/lib/case-studies";
import { experienceProfiles } from "@/lib/experience-profiles";
import { getProjectPresentation } from "@/lib/project-presentation";

const approved = getApprovedCaseStudies();

function copyCaseStudy(caseStudy: CaseStudy): CaseStudy {
  return {
    ...caseStudy,
    sections: caseStudy.sections.map((section) => ({
      ...section,
      items: section.items?.map((item) => ({ ...item })),
      evidence: section.evidence.map((item) => ({ ...item })),
    })),
  };
}

function getProject(slug: string): CaseStudy {
  const project = approved.find((caseStudy) => caseStudy.slug === slug);
  expect(project).toBeDefined();
  return project!;
}

describe("project presentation", () => {
  it("maps integrations to a hub and an unordered membership list", () => {
    const presentation = getProjectPresentation(getProject("multi-product-integrations"));

    expect(presentation.kind).toBe("topology");
    if (presentation.kind === "topology") {
      expect(presentation.hub.title).toBe("Unified framework");
      expect(presentation.items.map((item) => item.title)).toEqual([
        "Standardized Layouts",
        "Dashboards",
        "Records and Chat",
        "Settings",
        "Workflow Completion",
      ]);
      expect(presentation.evidenceSectionKinds).toEqual([
        "overview",
        "exploration",
        "system-practice",
        "outcomes",
      ]);
    }
  });

  it("maps Design Systems to explicit authored groups and named contexts", () => {
    const presentation = getProjectPresentation(getProject("design-systems"));

    expect(presentation.kind).toBe("matrix");
    if (presentation.kind === "matrix") {
      expect(presentation.groups.map((group) => [
        group.title,
        group.items.map((item) => item.title),
      ])).toEqual([
        ["People and governance", ["Gathered collaborators", "Lightweight governance"]],
        ["Shared library and foundations", ["Established a core library", "Foundations"]],
        ["Density and workflow patterns", ["Density", "Templates and patterns"]],
      ]);
      expect(presentation.contexts).toEqual([
        "Marketing surfaces",
        "Enterprise-product surfaces",
      ]);
    }
  });

  it("keeps profile membership stable when source items are reordered", () => {
    const project = copyCaseStudy(getProject("multi-product-integrations"));
    const system = project.sections.find((section) => section.kind === "system-practice");
    expect(system?.items).toBeDefined();
    system!.items!.reverse();

    const presentation = getProjectPresentation(project);

    expect(presentation.kind).toBe("topology");
    if (presentation.kind === "topology") {
      expect(presentation.items[0]?.title).toBe("Standardized Layouts");
    }
  });

  it("uses text-first source order when an approved profile no longer matches its items", () => {
    const project = copyCaseStudy(getProject("design-systems"));
    const system = project.sections.find((section) => section.kind === "system-practice");
    expect(system?.items).toBeDefined();
    system!.items!.pop();

    const presentation = getProjectPresentation(project);

    expect(presentation.kind).toBe("text-first");
    if (presentation.kind === "text-first") {
      expect(presentation.items.map((item) => item.title)).toEqual([
        "Gathered collaborators",
        "Established a core library",
        "Lightweight governance",
        "Foundations",
        "Density",
      ]);
    }
  });

  it("uses text-first source order when profile evidence is no longer available", () => {
    const project = copyCaseStudy(getProject("multi-product-integrations"));
    const overview = project.sections.find((section) => section.kind === "overview");
    expect(overview).toBeDefined();
    overview!.evidence = [];

    expect(getProjectPresentation(project).kind).toBe("text-first");
  });

  it("keeps unapproved work unavailable publicly and text-only in review mode", () => {
    const draft = {
      ...getProject("multi-product-integrations"),
      reviewStatus: "review-ready" as const,
    };

    expect(getProjectPresentation(draft).kind).toBe("unavailable");
    const review = getProjectPresentation(draft, "review");
    expect(review.kind).toBe("text-first");
  });

  it("records all seven translation layers in authored project profiles", () => {
    expect(experienceProfiles).toHaveLength(2);

    for (const profile of experienceProfiles) {
      expect(profile.thematicDirection).not.toBe("");
      expect(profile.evidence.length).toBeGreaterThan(0);
      expect(profile.readerGoal).not.toBe("");
      expect(profile.observedWorkQualities.length).toBeGreaterThan(0);
      expect(profile.experientialQualities.length).toBeGreaterThan(0);
      expect(profile.intendedFeelingHypotheses.length).toBeGreaterThan(0);
      expect(profile.selectedPatterns.primary.name).not.toBe("");
      expect(profile.selectedPatterns.alternatives.length).toBeGreaterThan(0);
      expect(profile.selectedPatterns.invalidatingConditions.length).toBeGreaterThan(0);
      expect(profile.presentationContract.semanticStructure).not.toBe("");
      expect(profile.presentationContract.thinContentFallback).not.toBe("");
    }
  });
});

