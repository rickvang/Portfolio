import { describe, expect, it } from "vitest";

import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";

describe("posts adapter", () => {
  it("uses deterministic published fixtures when Supabase is not configured", async () => {
    const posts = await getPublishedPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      slug: "fixture-post",
      status: "published",
    });
  });

  it("resolves the fixture detail through the same public boundary", async () => {
    const post = await getPublishedPostBySlug("fixture-post");

    expect(post?.title).toBe("Fixture post");
    await expect(getPublishedPostBySlug("missing-post")).resolves.toBeNull();
  });
});
