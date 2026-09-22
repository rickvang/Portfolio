import seed from "../../fixtures/seed.json";

export type HarnessState =
  | "success"
  | "loading"
  | "empty"
  | "error"
  | "disabled"
  | "long-content";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type PostFixture = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived";
  publishedAt: string | null;
};

export const portfolioFixtures = seed as {
  profile: {
    name: string;
    eyebrow: string;
    headline: string;
    summary: string;
  };
  projects: Project[];
  posts: PostFixture[];
};

export const harnessStates: HarnessState[] = [
  "success",
  "loading",
  "empty",
  "error",
  "disabled",
  "long-content",
];

export function projectsForState(state: HarnessState): Project[] {
  if (state === "long-content") {
    return Array.from({ length: 8 }, (_, index) => ({
      id: `long-project-${index + 1}`,
      title: `Long-content fixture ${index + 1}`,
      description:
        "This deliberately longer fixture checks wrapping, density, and the page rhythm used by the work list.",
      tags: ["Long content", "Fixture"],
    }));
  }

  return state === "success" || state === "disabled"
    ? portfolioFixtures.projects
    : [];
}

export function isHarnessState(value: string | undefined): value is HarnessState {
  return value !== undefined && harnessStates.includes(value as HarnessState);
}

export function postsForState(state: HarnessState): PostFixture[] {
  if (state === "long-content") {
    return Array.from({ length: 4 }, (_, index) => ({
      id: `long-post-${index + 1}`,
      slug: `long-post-${index + 1}`,
      title: `Long-content note ${index + 1}`,
      excerpt:
        "This deliberately longer fixture checks wrapping, density, and the content rhythm used by the future posts surface.",
      content:
        "This content is intentionally verbose so the harness can reveal overflow, wrapping, and card-height regressions before a real content source is connected.",
      status: "published" as const,
      publishedAt: "2026-09-20T12:00:00.000Z",
    }));
  }

  return state === "success" || state === "disabled" ? portfolioFixtures.posts : [];
}
