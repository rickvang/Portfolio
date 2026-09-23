import Link from "next/link";

import type { HarnessState } from "@/lib/fixtures";
import { noteHref } from "@/lib/public-routes";

type PostListProps = {
  posts: PostListItem[];
  state?: HarnessState;
  showStatus?: boolean;
  headingLevel?: 2 | 3;
};

type PostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  status: "draft" | "published" | "archived";
};

export function PostList({
  posts,
  state = "success",
  showStatus = false,
  headingLevel = 3,
}: PostListProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  if (state === "loading") {
    return (
      <div aria-busy="true" aria-label="Loading posts" className="state-card" data-testid="posts-state">
        <span aria-hidden="true" className="spinner" />
        <p>Loading notes…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="state-card state-card-error" data-testid="posts-state" role="alert">
        <p className="state-card-title">Notes could not load.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="state-card" data-testid="posts-state">
        <p className="state-card-title">No notes published yet.</p>
      </div>
    );
  }

  return (
    <div aria-label="Posts" className="post-grid" data-testid="posts-state">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          {showStatus && <p className="eyebrow">{post.status}</p>}
          <Heading>
            <Link href={noteHref(post.slug)}>{post.title}</Link>
          </Heading>
          <p>{post.excerpt ?? "No excerpt yet."}</p>
        </article>
      ))}
    </div>
  );
}
