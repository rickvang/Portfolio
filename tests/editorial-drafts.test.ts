import { describe, expect, it } from "vitest";

import { personaLedDesignDraft } from "@/lib/editorial-drafts";

describe("persona-led design editorial draft", () => {
  it("stays draft and source-backed", () => {
    expect(personaLedDesignDraft.reviewStatus).toBe("draft");
    expect(personaLedDesignDraft.slug).toBe("persona-led-design-discovery");
    expect(personaLedDesignDraft.sections).toHaveLength(6);

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
