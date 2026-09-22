import Link from "next/link";

import { PostList } from "@/components/post-list";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Rick Vang
        </Link>
        <Link className="button button-secondary" href="/">
          Back home
        </Link>
      </header>

      <section className="hero notes-hero">
        <p className="eyebrow">Notes</p>
        <h1>A maintained place for ideas.</h1>
        <p className="lede">Published notes will come from the Supabase content boundary when it is connected.</p>
      </section>

      <section aria-labelledby="notes-heading" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Published</p>
          <h2 id="notes-heading">Latest notes</h2>
        </div>
        <PostList posts={posts} />
      </section>
    </main>
  );
}
