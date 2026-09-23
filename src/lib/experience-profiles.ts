import type { CaseStudySectionKind } from "@/lib/case-studies";
import { getCaseStudySectionItemId } from "@/lib/case-studies";

export type ExperienceEvidenceReference = {
  id: string;
  sourceId: string;
  sectionKind: CaseStudySectionKind;
  sourceNote: string;
  claim: string;
};

export type ExperienceProfile = {
  caseStudyId: string;
  thematicDirection: string;
  readerGoal: string;
  evidence: readonly ExperienceEvidenceReference[];
  observedWorkQualities: readonly {
    name: string;
    interpretation: string;
    evidenceIds: readonly string[];
  }[];
  experientialQualities: readonly {
    name: string;
    rationale: string;
  }[];
  intendedFeelingHypotheses: readonly {
    feeling: string;
    hypothesis: string;
    supportingObservation: string;
    contradictingObservation: string;
  }[];
  selectedPatterns: {
    primary: {
      name: string;
      rationale: string;
      evidenceIds: readonly string[];
    };
    supporting: readonly {
      name: string;
      rationale: string;
      evidenceIds: readonly string[];
    }[];
    alternatives: readonly {
      name: string;
      reasonNotSelected: string;
    }[];
    invalidatingConditions: readonly string[];
  };
  presentationContract: {
    semanticStructure: string;
    responsiveBehavior: string;
    motionBehavior: string;
    mediaBehavior: string;
    thinContentFallback: string;
  };
  presentation: PresentationDefinition;
};

export type PresentationDefinition =
  | {
      kind: "topology";
      title: string;
      intro: string;
      hub: { title: string; summary: string };
      relationshipLabel: string;
      itemIds: readonly string[];
      evidenceSectionKinds: readonly CaseStudySectionKind[];
    }
  | {
      kind: "matrix";
      title: string;
      intro: string;
      groups: readonly {
        id: string;
        title: string;
        rationale: string;
        itemIds: readonly string[];
      }[];
      contexts: readonly string[];
      contextNote: string;
      evidenceSectionKinds: readonly CaseStudySectionKind[];
    };

const systemItemId = (title: string) =>
  getCaseStudySectionItemId("system-practice", title);

export const experienceProfiles = [
  {
    caseStudyId: "multi-product-integrations",
    thematicDirection: "Connected operations across a shared product environment.",
    readerGoal:
      "Understand how documented product surfaces and workflows relate within the shared integration framework.",
    evidence: [
      {
        id: "integration-summary",
        sourceId: "multi-product-integrations-source",
        sectionKind: "overview",
        sourceNote: "Imported summary from the approved public source.",
        claim:
          "The source describes a unified framework for standardizing processes, consolidating data, and integrating workflows across a fragmented product ecosystem.",
      },
      {
        id: "integration-discovery",
        sourceId: "multi-product-integrations-source",
        sectionKind: "exploration",
        sourceNote: "Imported discovery material from the approved public source.",
        claim:
          "The source says core personas and their workflows were mapped to create reusable domain experiences.",
      },
      {
        id: "integration-solutions",
        sourceId: "multi-product-integrations-source",
        sectionKind: "system-practice",
        sourceNote: "Imported solution sections from the approved public source.",
        claim:
          "The source names modular layouts, persona-shaped dashboards, permission-aware records and chat, reusable settings, and workflow completion.",
      },
      {
        id: "integration-outcomes",
        sourceId: "multi-product-integrations-source",
        sectionKind: "outcomes",
        sourceNote: "Imported outcomes from the approved public source.",
        claim:
          "The source describes real-time operational views and reduced administrative work and UX-operations rework; it supplies no numeric measurements.",
      },
    ],
    observedWorkQualities: [
      {
        name: "Relational",
        interpretation:
          "A shared framework and mapped persona workflows relate product surfaces; this does not establish a directional sequence between those surfaces.",
        evidenceIds: ["integration-summary", "integration-discovery"],
      },
      {
        name: "Modular",
        interpretation:
          "The approved solution names modular layouts and reusable cross-application settings.",
        evidenceIds: ["integration-solutions"],
      },
      {
        name: "Stateful and operational",
        interpretation:
          "The source describes current entitled data, workflow progress, and real-time operational views without specifying system states or metrics.",
        evidenceIds: ["integration-solutions", "integration-outcomes"],
      },
    ],
    experientialQualities: [
      {
        name: "Legible relationships",
        rationale:
          "A shared framework heading and a plain list make the documented product surfaces read as related parts without drawing unsupported arrows.",
      },
      {
        name: "Precise navigation",
        rationale:
          "Links from the detail presentation to the source sections let a reader check where each explanation comes from.",
      },
    ],
    intendedFeelingHypotheses: [
      {
        feeling: "Orientation",
        hypothesis:
          "Readers may feel oriented if they can explain which documented capabilities belong to the shared framework.",
        supportingObservation:
          "A cold reader names the shared framework and several of its documented capabilities without relying on the profile vocabulary.",
        contradictingObservation:
          "A reader describes unrelated feature cards or infers an ordered workflow that the source never specifies.",
      },
      {
        feeling: "Justified confidence",
        hypothesis:
          "Readers may feel confident when the presentation makes its text evidence traceable and avoids implying unshown screens.",
        supportingObservation:
          "A reader can point to the source sections supporting the displayed relationships and recognizes that source images are deferred.",
        contradictingObservation:
          "A reader assumes the map is an exact architecture diagram, metric, or approved screenshot.",
      },
    ],
    selectedPatterns: {
      primary: {
        name: "Map",
        rationale:
          "A hub plus an unordered list exposes the stated shared framework and its named surfaces. The layout communicates membership, not direction, dependency, or task order.",
        evidenceIds: ["integration-summary", "integration-discovery", "integration-solutions"],
      },
      supporting: [
        {
          name: "Trace",
          rationale:
            "A small source-section trail links the detail view back to the approved overview, discovery, system, and outcomes content.",
          evidenceIds: [
            "integration-summary",
            "integration-discovery",
            "integration-solutions",
            "integration-outcomes",
          ],
        },
      ],
      alternatives: [
        {
          name: "Chronological workflow",
          reasonNotSelected:
            "The source mentions workflow mapping but does not provide a concrete step order for the product capabilities.",
        },
        {
          name: "Prose-only summary",
          reasonNotSelected:
            "Prose preserves the facts but makes the shared framework and its separate capabilities harder to scan together.",
        },
      ],
      invalidatingConditions: [
        "The approved source no longer supports a shared framework spanning the displayed items.",
        "A cold reader interprets visual position as a sequence or technical dependency.",
        "A displayed item cannot be traced to the approved source sections.",
      ],
    },
    presentationContract: {
      semanticStructure:
        "A named framework followed by an unordered list of sourced capabilities; no arrows or sequence markers.",
      responsiveBehavior:
        "The framework heading and capability list stack into one column at the existing narrow-content breakpoint.",
      motionBehavior:
        "The map is static. Reduced motion has the same content and reading order.",
      mediaBehavior:
        "Source media remains deferred. The content-derived map and text stay available without image placeholders.",
      thinContentFallback:
        "Use the approved summary and available authored items in source order, with no inferred map.",
    },
    presentation: {
      kind: "topology",
      title: "How the product parts relate",
      intro:
        "A shared framework connects capabilities across fragmented products. Their placement here is illustrative, not a workflow sequence.",
      hub: {
        title: "Unified framework",
        summary: "Standardize processes, consolidate data, and integrate workflows.",
      },
      relationshipLabel: "Includes",
      itemIds: [
        systemItemId("Standardized Layouts"),
        systemItemId("Dashboards"),
        systemItemId("Records and Chat"),
        systemItemId("Settings"),
        systemItemId("Workflow Completion"),
      ],
      evidenceSectionKinds: ["overview", "exploration", "system-practice", "outcomes"],
    },
  },
  {
    caseStudyId: "design-systems",
    thematicDirection: "A governed foundation that supports deliberate variation.",
    readerGoal:
      "Understand how collaboration, shared foundations, density choices, and reusable patterns support consistent variation.",
    evidence: [
      {
        id: "design-summary",
        sourceId: "design-systems-source",
        sectionKind: "overview",
        sourceNote: "Imported summary from the approved public source.",
        claim:
          "The source frames the system as a scalable way to improve consistency, speed development workflows, and extend legacy capabilities.",
      },
      {
        id: "design-discovery",
        sourceId: "design-systems-source",
        sectionKind: "exploration",
        sourceNote: "Imported discovery material from the approved public source.",
        claim:
          "The source describes auditing patterns and scenarios, then using workshops, usage analysis, user testing, and developer feedback to align goals and feasibility.",
      },
      {
        id: "design-system-practice",
        sourceId: "design-systems-source",
        sectionKind: "system-practice",
        sourceNote: "Imported solution sections from the approved public source.",
        claim:
          "The source names collaborator alignment, a core library, lightweight governance, reusable style and token foundations, density across two surface contexts, and workflow templates and patterns.",
      },
    ],
    observedWorkQualities: [
      {
        name: "Governed",
        interpretation:
          "Collaboration and feedback loops support implementation, adoption, and prioritization.",
        evidenceIds: ["design-discovery", "design-system-practice"],
      },
      {
        name: "Layered and reusable",
        interpretation:
          "A core library and foundations provide a shared base for design decisions.",
        evidenceIds: ["design-summary", "design-system-practice"],
      },
      {
        name: "Adaptable",
        interpretation:
          "The source distinguishes marketing from enterprise-product density needs, but does not specify per-context values.",
        evidenceIds: ["design-system-practice"],
      },
    ],
    experientialQualities: [
      {
        name: "Coherent",
        rationale:
          "Explicit groups make stewardship, shared foundations, and application visible as related parts of one system.",
      },
      {
        name: "Scannable and comparable",
        rationale:
          "A labelled matrix supports comparison without pretending that the source documents a rollout sequence or exact density scale.",
      },
    ],
    intendedFeelingHypotheses: [
      {
        feeling: "Clarity",
        hypothesis:
          "Readers may feel clear about the system's structure if they can distinguish shared foundations from governance and context-specific patterns.",
        supportingObservation:
          "A cold reader can describe how the three authored groups relate and can name both surface contexts tied to density.",
        contradictingObservation:
          "A reader treats governance as a visual token, assumes a fixed stage order, or believes exact density rules are shown.",
      },
      {
        feeling: "Competence",
        hypothesis:
          "Readers may infer a capable, repeatable practice if the examples make the reusable foundation and its application legible.",
        supportingObservation:
          "A reader can explain which decisions are shared and where the source says variation is needed.",
        contradictingObservation:
          "The matrix looks like a decorative taxonomy without a source-backed reason for its groups.",
      },
    ],
    selectedPatterns: {
      primary: {
        name: "Assemble",
        rationale:
          "Explicit group membership shows how governance, common foundations, and applied patterns fit together.",
        evidenceIds: ["design-discovery", "design-system-practice"],
      },
      supporting: [
        {
          name: "Compare",
          rationale:
            "The source names marketing and enterprise-product contexts, so the matrix can identify both without inventing their exact density settings.",
          evidenceIds: ["design-system-practice"],
        },
      ],
      alternatives: [
        {
          name: "Ordered stage diagram",
          reasonNotSelected:
            "The source describes related system concepts but does not establish a temporal rollout or dependency order.",
        },
        {
          name: "Density specification table",
          reasonNotSelected:
            "The source states that needs differ across surfaces but provides no measurements, rules, or approved media to populate a specification.",
        },
      ],
      invalidatingConditions: [
        "A group contains an item not named in the approved case study.",
        "A cold reader interprets matrix position as chronology.",
        "The interface implies specific density values or screen details absent from the source.",
      ],
    },
    presentationContract: {
      semanticStructure:
        "Three labelled groups with explicit authored item membership, plus a separate list of source-named contexts; not a sequence.",
      responsiveBehavior:
        "Groups and context labels stack at the existing narrow-content breakpoint without clipping or horizontal scroll.",
      motionBehavior:
        "The matrix is static. Reduced motion has the same content and reading order.",
      mediaBehavior:
        "Source media remains deferred. The text-backed matrix does not imitate or reconstruct client screens.",
      thinContentFallback:
        "Use the approved summary and available authored items in source order, with no inferred grouping.",
    },
    presentation: {
      kind: "matrix",
      title: "Governance, foundations, and use patterns",
      intro:
        "The approved case study ties team practice to a shared library and reusable patterns. Groups show authored membership, not a release sequence.",
      groups: [
        {
          id: "governance",
          title: "People and governance",
          rationale: "Collaboration and feedback loops support implementation and adoption.",
          itemIds: [
            systemItemId("Gathered collaborators"),
            systemItemId("Lightweight governance"),
          ],
        },
        {
          id: "foundation",
          title: "Shared library and foundations",
          rationale: "The library and foundations keep shared design decisions reusable.",
          itemIds: [
            systemItemId("Established a core library"),
            systemItemId("Foundations"),
          ],
        },
        {
          id: "application",
          title: "Density and workflow patterns",
          rationale:
            "The source names density needs across surfaces and reusable workflow templates and patterns.",
          itemIds: [
            systemItemId("Density"),
            systemItemId("Templates and patterns"),
          ],
        },
      ],
      contexts: ["Marketing surfaces", "Enterprise-product surfaces"],
      contextNote:
        "The source says density supported different needs in both contexts; it does not provide exact per-context settings.",
      evidenceSectionKinds: ["overview", "exploration", "system-practice"],
    },
  },
] as const satisfies readonly ExperienceProfile[];

