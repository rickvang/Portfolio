import { caseStudySchema, type CaseStudy } from "@/lib/case-studies";
import { portfolioFixtures } from "@/lib/fixtures";

function createHarnessCaseStudy(
  id: string,
  title: string,
  summary: string,
  items: readonly { id: string; title: string; summary: string }[] = [],
): CaseStudy {
  const sourceId = id + "-source";
  const note = "Synthetic harness content; this example does not describe client work.";

  return caseStudySchema.parse({
    id,
    slug: id,
    title,
    summary,
    category: "Harness example",
    reviewStatus: "draft",
    sources: [
      {
        id: sourceId,
        kind: "user-provided",
        label: "Synthetic harness fixture — not client work",
      },
    ],
    sections: [
      {
        kind: "overview",
        title: "Overview",
        body: summary,
        evidence: [{ sourceId, note }],
      },
      {
        kind: "system-practice",
        title: "System / practice",
        ...(items.length > 0
          ? { items: items.map((item) => ({ ...item })) }
          : { body: "No structured project details are provided in this text-only fixture." }),
        evidence: [{ sourceId, note }],
      },
    ],
    curationNotes: [note, "This fixture is only included in the local development harness."],
  });
}

const textOnly = portfolioFixtures.experienceHarness.textOnly;
const longContent = portfolioFixtures.experienceHarness.longContent;

export const presentationHarnessFixtures = {
  textOnly: createHarnessCaseStudy(textOnly.id, textOnly.title, textOnly.summary),
  longContent: createHarnessCaseStudy(
    longContent.id,
    longContent.title,
    longContent.summary,
    longContent.items,
  ),
};

