import { describe, expect, it } from "vitest";

import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";

describe("posts adapter", () => {
  it("does not expose deterministic fixtures when Supabase is unavailable", async () => {
    await expect(getPublishedPosts()).resolves.toEqual([]);
  });

  it("does not resolve fixture details through the public publication boundary", async () => {
    await expect(getPublishedPostBySlug("fixture-post")).resolves.toBeNull();
    await expect(getPublishedPostBySlug("missing-post")).resolves.toBeNull();
  });
});
