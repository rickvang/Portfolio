import { z } from "zod";

import importedContentSource from "../../content/imports/rickvang.com.json";

const sourcePageSchema = z.object({
  url: z.string().url(),
  role: z.string().min(1),
});

const solutionSectionSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
});

const importedProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.string().min(1),
  sourceUrl: z.string().url(),
  summary: z.string().min(1),
  discovery: z.string().min(1),
  outcomes: z.string().min(1),
  solutionSections: z.array(solutionSectionSchema).min(1),
  curationNotes: z.array(z.string().min(1)).min(1),
});

const importedContentSchema = z.object({
  source: z.object({
    site: z.literal("rickvang.com"),
    capturedAt: z.string().date(),
    reviewStatus: z.literal("draft"),
    clientIpDisclaimer: z.string().min(1),
    sourcePages: z.array(sourcePageSchema).min(1),
  }),
  profile: z.object({
    eyebrow: z.string().min(1),
    headline: z.string().min(1),
    summary: z.string().min(1),
    aboutHeading: z.string().min(1),
    aboutSummary: z.string().min(1),
    stats: z.array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      }),
    ).min(1),
  }),
  projects: z.array(importedProjectSchema).min(1),
});

export const importedContent = importedContentSchema.parse(importedContentSource);

export type ImportedContent = z.infer<typeof importedContentSchema>;
export type ImportedProject = ImportedContent["projects"][number];
