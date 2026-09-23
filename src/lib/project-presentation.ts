import {
  getCaseStudySectionItemId,
  type CaseStudy,
  type CaseStudySectionKind,
} from "@/lib/case-studies";
import {
  experienceProfiles,
  type ExperienceProfile,
  type PresentationDefinition,
} from "@/lib/experience-profiles";

export type PresentationItem = {
  id: string;
  title: string;
  summary: string;
};

type PresentationEvidence = {
  evidenceSectionKinds: readonly CaseStudySectionKind[];
};

export type ProjectPresentationAudience = "public" | "review";

export type ProjectPresentation =
  | ({
      kind: "topology";
      title: string;
      intro: string;
      hub: { title: string; summary: string };
      relationshipLabel: string;
      items: PresentationItem[];
    } & PresentationEvidence)
  | ({
      kind: "matrix";
      title: string;
      intro: string;
      groups: {
        id: string;
        title: string;
        rationale: string;
        items: PresentationItem[];
      }[];
      contexts: readonly string[];
      contextNote: string;
    } & PresentationEvidence)
  | ({
      kind: "text-first";
      title: string;
      intro: string;
      items: PresentationItem[];
      emptyMessage: string;
    } & PresentationEvidence)
  | {
      kind: "unavailable";
      title: string;
      message: string;
    };

function getSystemItems(caseStudy: CaseStudy): PresentationItem[] {
  const section = caseStudy.sections.find((item) => item.kind === "system-practice");
  const items = section?.items ?? [];

  return items.map((item) => ({
    id: item.id ?? getCaseStudySectionItemId("system-practice", item.title),
    title: item.title,
    summary: item.summary,
  }));
}

function evidenceIsAvailable(caseStudy: CaseStudy, profile: ExperienceProfile): boolean {
  const sources = new Set(caseStudy.sources.map((source) => source.id));

  return profile.evidence.every((reference) => {
    const section = caseStudy.sections.find((item) => item.kind === reference.sectionKind);

    return (
      sources.has(reference.sourceId) &&
      section?.evidence.some(
        (item) =>
          item.sourceId === reference.sourceId &&
          item.note === reference.sourceNote,
      ) === true
    );
  });
}

function profileEvidenceIsWellFormed(profile: ExperienceProfile): boolean {
  const evidenceIds = new Set(profile.evidence.map((reference) => reference.id));
  const referencedEvidenceIds = [
    ...profile.observedWorkQualities.flatMap((quality) => quality.evidenceIds),
    ...profile.selectedPatterns.primary.evidenceIds,
    ...profile.selectedPatterns.supporting.flatMap((pattern) => pattern.evidenceIds),
  ];

  return referencedEvidenceIds.every((id) => evidenceIds.has(id));
}

function getPresentationItemIds(definition: PresentationDefinition): string[] {
  if (definition.kind === "topology") {
    return [...definition.itemIds];
  }

  return definition.groups.flatMap((group) => [...group.itemIds]);
}

function hasCompleteStableMembership(
  definition: PresentationDefinition,
  items: readonly PresentationItem[],
): boolean {
  const configuredIds = getPresentationItemIds(definition);
  const availableIds = new Set(items.map((item) => item.id));
  const configuredSet = new Set(configuredIds);

  return (
    configuredIds.length === configuredSet.size &&
    configuredSet.size === availableIds.size &&
    configuredIds.every((id) => availableIds.has(id))
  );
}

function resolveItems(
  itemIds: readonly string[],
  itemsById: ReadonlyMap<string, PresentationItem>,
): PresentationItem[] {
  return itemIds.flatMap((id) => {
    const item = itemsById.get(id);
    return item ? [item] : [];
  });
}

function toTextFirst(caseStudy: CaseStudy, items: PresentationItem[]): ProjectPresentation {
  return {
    kind: "text-first",
    title: "Project structure",
    intro: caseStudy.summary,
    items,
    emptyMessage:
      "This source does not include structured system details for a visual grouping.",
    evidenceSectionKinds: caseStudy.sections.map((section) => section.kind),
  };
}

function materializePresentation(
  definition: PresentationDefinition,
  items: readonly PresentationItem[],
): ProjectPresentation {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (definition.kind === "topology") {
    return {
      kind: "topology",
      title: definition.title,
      intro: definition.intro,
      hub: definition.hub,
      relationshipLabel: definition.relationshipLabel,
      items: resolveItems(definition.itemIds, itemsById),
      evidenceSectionKinds: definition.evidenceSectionKinds,
    };
  }

  return {
    kind: "matrix",
    title: definition.title,
    intro: definition.intro,
    groups: definition.groups.map((group) => ({
      ...group,
      items: resolveItems(group.itemIds, itemsById),
    })),
    contexts: definition.contexts,
    contextNote: definition.contextNote,
    evidenceSectionKinds: definition.evidenceSectionKinds,
  };
}

export function getProjectPresentation(
  caseStudy: CaseStudy,
  audience: ProjectPresentationAudience = "public",
): ProjectPresentation {
  if (caseStudy.reviewStatus !== "approved") {
    if (audience === "review") {
      return toTextFirst(caseStudy, getSystemItems(caseStudy));
    }

    return {
      kind: "unavailable",
      title: "Presentation unavailable",
      message: "This case study is not approved for public presentation.",
    };
  }

  const items = getSystemItems(caseStudy);
  const profile = experienceProfiles.find((candidate) => candidate.caseStudyId === caseStudy.id);

  if (!profile || !evidenceIsAvailable(caseStudy, profile) || !profileEvidenceIsWellFormed(profile)) {
    return toTextFirst(caseStudy, items);
  }

  if (!hasCompleteStableMembership(profile.presentation, items)) {
    return toTextFirst(caseStudy, items);
  }

  return materializePresentation(profile.presentation, items);
}

