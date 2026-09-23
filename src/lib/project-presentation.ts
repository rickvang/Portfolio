import type { CaseStudy } from "@/lib/case-studies";

export type ProjectStructureItem = {
  title: string;
  summary: string;
};

export type ProjectPresentation =
  | {
      kind: "topology";
      label: string;
      hub: { title: string; summary: string };
      items: ProjectStructureItem[];
    }
  | {
      kind: "matrix";
      label: string;
      groups: Array<{ label: string; items: ProjectStructureItem[] }>;
    }
  | {
      kind: "summary";
      label: string;
      items: ProjectStructureItem[];
    };

function getSystemPracticeItems(caseStudy: CaseStudy): ProjectStructureItem[] {
  return caseStudy.sections.find((section) => section.kind === "system-practice")?.items ?? [];
}

export function getProjectPresentation(caseStudy: CaseStudy): ProjectPresentation {
  const items = getSystemPracticeItems(caseStudy);

  if (caseStudy.slug === "multi-product-integrations") {
    return {
      kind: "topology",
      label: "System topology",
      hub: {
        title: "Unified framework",
        summary: caseStudy.summary,
      },
      items,
    };
  }

  if (caseStudy.slug === "design-systems") {
    return {
      kind: "matrix",
      label: "Design system structure",
      groups: [
        { label: "Collaboration and governance", items: items.slice(0, 3) },
        { label: "System layers", items: items.slice(3) },
      ],
    };
  }

  return {
    kind: "summary",
    label: "Project structure",
    items,
  };
}
