import { describe, expect, it } from "vitest";

import { portfolioFixtures, postsForState, projectsForState } from "@/lib/fixtures";

describe("portfolio fixtures", () => {
  it("stays deterministic", () => {
    expect(portfolioFixtures.projects).toHaveLength(2);
    expect(projectsForState("success")).toEqual(portfolioFixtures.projects);
  });

  it("provides a long-content state for responsive checks", () => {
    expect(projectsForState("long-content")).toHaveLength(8);
  });

  it("provides a deterministic post preview for the content boundary", () => {
    expect(portfolioFixtures.posts[0]?.slug).toBe("fixture-post");
    expect(postsForState("success")).toHaveLength(1);
    expect(postsForState("empty")).toHaveLength(0);
  });
});
