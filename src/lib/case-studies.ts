import { z } from "zod";

import authoredCaseStudySource from "../../content/drafts/case-studies.json";
import { importedContent, type ImportedProject } from "@/lib/imported-content";

export const CASE_STUDY_SECTION_ORDER = [
  "overview",
  "context",
  "personas",
  "problem",
  "exploration",
  "system-practice",
  "decisions",
  "outcomes",
  "reflection",
] as const;

const caseStudySectionKindSchema = z.enum(CASE_STUDY_SECTION_ORDER);
const reviewStatusSchema = z.enum(["draft", "approved"]);

export const caseStudySourceSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["source-page", "repository", "user-provided", "observed"]),
  label: z.string().min(1),
  url: z.string().url().optional(),
  capturedAt: z.string().date().optional(),
});

export const caseStudyEvidenceSchema = z.object({
  sourceId: z.string().min(1),
  note: z.string().min(1),
});

const caseStudySectionItemSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
});

const caseStudySectionSchema = z
  .object({
    kind: caseStudySectionKindSchema,
    title: z.string().min(1),
    body: z.string().min(1).optional(),
    items: z.array(caseStudySectionItemSchema).min(1).optional(),
    evidence: z.array(caseStudyEvidenceSchema).min(1),
  })
  .refine((section) => section.body !== undefined || section.items !== undefined, {
    message: "A case-study section needs body copy or structured items.",
  });

export const caseStudySchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    role: z.string().min(1).optional(),
    scope: z.string().min(1).optional(),
    reviewStatus: reviewStatusSchema,
    clientIpDisclaimer: z.string().min(1).optional(),
    sources: z.array(caseStudySourceSchema).min(1),
    sections: z.array(caseStudySectionSchema).min(1),
    curationNotes: z.array(z.string().min(1)).default([]),
  })
  .superRefine((caseStudy, context) => {
    const sourceIds = new Set(caseStudy.sources.map((source) => source.id));
    const sectionKinds = new Set<string>();
    let previousIndex = -1;

    caseStudy.sections.forEach((section, sectionIndex) => {
      if (sectionKinds.has(section.kind)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate case-study section: ${section.kind}`,
          path: ["sections", sectionIndex, "kind"],
        });
      }

      sectionKinds.add(section.kind);

      const currentIndex = CASE_STUDY_SECTION_ORDER.indexOf(section.kind);
      if (currentIndex <= previousIndex) {
        context.addIssue({
          code: "custom",
          message: "Case-study sections must follow the shared section sequence.",
          path: ["sections", sectionIndex, "kind"],
        });
      }
      previousIndex = currentIndex;

      section.evidence.forEach((evidence, evidenceIndex) => {
        if (!sourceIds.has(evidence.sourceId)) {
          context.addIssue({
            code: "custom",
            message: `Unknown evidence source: ${evidence.sourceId}`,
            path: ["sections", sectionIndex, "evidence", evidenceIndex, "sourceId"],
          });
        }
      });
    });
  });

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudySection = CaseStudy["sections"][number];
export type CaseStudySectionKind = z.infer<typeof caseStudySectionKindSchema>;
export type CaseStudyReviewStatus = z.infer<typeof reviewStatusSchema>;

function importedProjectToCaseStudy(project: ImportedProject): CaseStudy {
  const sourceId = `${project.id}-source`;
  const evidence = (note: string) => [{ sourceId, note }];

  return caseStudySchema.parse({
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    category: project.category,
    reviewStatus: importedContent.source.reviewStatus,
    clientIpDisclaimer: importedContent.source.clientIpDisclaimer,
    sources: [
      {
        id: sourceId,
        kind: "source-page",
        label: "Original public case study",
        url: project.sourceUrl,
        capturedAt: importedContent.source.capturedAt,
      },
    ],
    sections: [
      {
        kind: "overview",
        title: "Overview",
        body: project.summary,
        evidence: evidence("Imported summary; remains draft until reviewed."),
      },
      {
        kind: "exploration",
        title: "Exploration",
        body: project.discovery,
        evidence: evidence("Imported discovery material; remains draft until reviewed."),
      },
      {
        kind: "system-practice",
        title: "System / practice",
        items: project.solutionSections,
        evidence: evidence("Imported solution sections; remains draft until reviewed."),
      },
      {
        kind: "outcomes",
        title: "Outcomes",
        body: project.outcomes,
        evidence: evidence("Imported outcomes; remains draft until reviewed."),
      },
    ],
    curationNotes: project.curationNotes,
  });
}

export const importedCaseStudyDrafts = importedContent.projects.map(importedProjectToCaseStudy);

const authoredCaseStudyDraftsSchema = z
  .array(caseStudySchema)
  .min(1)
  .refine((caseStudies) => caseStudies.every((caseStudy) => caseStudy.reviewStatus === "draft"), {
    message: "Authored case-study draft sources must remain draft until explicitly approved elsewhere.",
  });

export const authoredCaseStudyDrafts = authoredCaseStudyDraftsSchema.parse(authoredCaseStudySource);

export const caseStudyCatalog: CaseStudy[] = [
  ...importedCaseStudyDrafts,
  ...authoredCaseStudyDrafts,
];

export function getApprovedCaseStudies(
  caseStudies: readonly CaseStudy[] = caseStudyCatalog,
): CaseStudy[] {
  return caseStudies.filter((caseStudy) => caseStudy.reviewStatus === "approved");
}

export function getCaseStudyBySlug(
  slug: string,
  caseStudies: readonly CaseStudy[] = importedCaseStudyDrafts,
): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}


export function getApprovedCaseStudyBySlug(
  slug: string,
  caseStudies: readonly CaseStudy[] = importedCaseStudyDrafts,
): CaseStudy | undefined {
  return getApprovedCaseStudies(caseStudies).find((caseStudy) => caseStudy.slug === slug);
}
