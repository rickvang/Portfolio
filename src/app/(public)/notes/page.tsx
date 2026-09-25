import { PostList } from "@/components/post-list";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="public-page">
      <section className="hero notes-hero">
        <h1>Notes</h1>
        <p className="lede">Short observations and ideas from ongoing design work.</p>
      </section>

      <section aria-label="Published notes" className="content-section notes-index-section">
        <PostList headingLevel={2} posts={posts} />
      </section>
    </div>
  );
}
