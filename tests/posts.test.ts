import { describe, expect, it } from "vitest";

import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";

describe("posts adapter", () => {
  it("publishes source-controlled authored notes without fixture fallback", async () => {
    const posts = await getPublishedPosts();

    expect(posts.map((post) => post.slug)).toContain("persona-led-design-discovery");
    expect(posts.find((post) => post.slug === "persona-led-design-discovery")).toMatchObject({
      source: "source-controlled",
      status: "published",
      title: "Persona-led Design Starts Before the Screen",
    });
    expect(posts.map((post) => post.slug)).not.toContain("fixture-post");
  });

  it("resolves the published authored article and rejects fixture details", async () => {
    const article = await getPublishedPostBySlug("persona-led-design-discovery");

    expect(article?.sections).toHaveLength(6);
    expect(article?.content[0]).toContain("AI personas are most useful");
    await expect(getPublishedPostBySlug("fixture-post")).resolves.toBeNull();
    await expect(getPublishedPostBySlug("missing-post")).resolves.toBeNull();
  });
});
