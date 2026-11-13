import { describe, expect, it } from "vitest";

import {
  getPublishedEditorialNoteBySlug,
  getPublishedEditorialNotes,
  personaLedDesignDraft,
  taskosaurWorkspaceDraft,
  thinkingWithDocumentationDraft,
} from "@/lib/editorial-drafts";

describe("new Notes publication boundary", () => {
  it.each([taskosaurWorkspaceDraft, thinkingWithDocumentationDraft])(
    "publishes the approved $slug article",
    (draft) => {
      expect(draft.reviewStatus).toBe("published");
      expect(draft.publishedOn).toBe("2026-11-13");
      expect(getPublishedEditorialNotes()).toContain(draft);
      expect(getPublishedEditorialNoteBySlug(draft.slug)).toEqual(draft);
    },
  );
  it("excludes records that have not been approved for publication", () => {
    const unpublished = { ...taskosaurWorkspaceDraft, reviewStatus: "review-ready" as const, publishedOn: undefined };
    expect(getPublishedEditorialNotes([unpublished])).toEqual([]);
    expect(getPublishedEditorialNoteBySlug(unpublished.slug, [unpublished])).toBeUndefined();
  });
});

describe("persona-led design editorial draft", () => {
  it("is explicitly published and source-backed", () => {
    expect(personaLedDesignDraft.reviewStatus).toBe("published");
    expect(personaLedDesignDraft.publishedOn).toBe("2026-09-23");
    expect(personaLedDesignDraft.slug).toBe("persona-led-design-discovery");
    expect(personaLedDesignDraft.sections).toHaveLength(6);
    expect(getPublishedEditorialNotes()).toContain(personaLedDesignDraft);
    expect(getPublishedEditorialNoteBySlug("persona-led-design-discovery")).toEqual(personaLedDesignDraft);

    const sourceIds = new Set(personaLedDesignDraft.sources.map((source) => source.id));
    for (const section of personaLedDesignDraft.sections) {
      expect(section.evidence.length).toBeGreaterThan(0);
      expect(section.evidence.every((evidence) => sourceIds.has(evidence.sourceId))).toBe(true);
    }
  });

  it("keeps synthetic-persona evidence limits explicit", () => {
    expect(personaLedDesignDraft.excerpt).toContain("without mistaking synthetic perspective for user evidence");
    expect(personaLedDesignDraft.curationNotes.join(" ")).toContain("not framed as observed user research");
  });
});
