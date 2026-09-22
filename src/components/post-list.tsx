import Link from "next/link";

import type { HarnessState } from "@/lib/fixtures";
import { noteHref } from "@/lib/public-routes";

type PostListProps = {
  posts: PostListItem[];
  state?: HarnessState;
};

type PostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  status: "draft" | "published" | "archived";
};

export function PostList({ posts, state = "success" }: PostListProps) {
  if (state === "loading") {
    return (
      <div aria-busy="true" aria-label="Loading posts" className="state-card" data-testid="posts-state">
        <span aria-hidden="true" className="spinner" />
        <p>Loading posts…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="state-card state-card-error" data-testid="posts-state" role="alert">
        <p className="state-card-title">Posts could not load.</p>
        <p>Use the retry path once the Supabase adapter is connected.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="state-card" data-testid="posts-state">
        <p className="state-card-title">No posts yet.</p>
        <p>Create the first approved post in the content workflow.</p>
      </div>
    );
  }

  return (
    <div aria-label="Posts" className="post-grid" data-testid="posts-state">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <p className="eyebrow">{post.status}</p>
          <h3>
            <Link href={noteHref(post.slug)}>{post.title}</Link>
          </h3>
          <p>{post.excerpt ?? "No excerpt yet."}</p>
        </article>
      ))}
    </div>
  );
}
