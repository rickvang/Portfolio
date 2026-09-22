import { z } from "zod";

import editorialDraftSource from "../../content/drafts/persona-led-design.json";
import { caseStudyEvidenceSchema, caseStudySourceSchema } from "@/lib/case-studies";

const editorialSectionSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
  evidence: z.array(caseStudyEvidenceSchema).min(1),
});

const editorialDraftSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    reviewStatus: z.literal("draft"),
    sources: z.array(caseStudySourceSchema).min(1),
    intro: z.array(z.string().min(1)).min(1),
    sections: z.array(editorialSectionSchema).min(1),
    curationNotes: z.array(z.string().min(1)).min(1),
  })
  .superRefine((draft, context) => {
    const sourceIds = new Set(draft.sources.map((source) => source.id));
    const sectionIds = new Set<string>();

    draft.sections.forEach((section, sectionIndex) => {
      if (sectionIds.has(section.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate editorial section id: ${section.id}`,
          path: ["sections", sectionIndex, "id"],
        });
      }
      sectionIds.add(section.id);

      section.evidence.forEach((evidence, evidenceIndex) => {
        if (!sourceIds.has(evidence.sourceId)) {
          context.addIssue({
            code: "custom",
            message: `Unknown editorial evidence source: ${evidence.sourceId}`,
            path: ["sections", sectionIndex, "evidence", evidenceIndex, "sourceId"],
          });
        }
      });
    });
  });

export const personaLedDesignDraft = editorialDraftSchema.parse(editorialDraftSource);

export type EditorialDraft = z.infer<typeof editorialDraftSchema>;
