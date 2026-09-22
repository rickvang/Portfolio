import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminSetupState } from "@/components/admin-setup-state";
import { PostStatusActions } from "@/components/post-status-actions";
import { signOut } from "@/app/admin/posts/actions";
import { getCurrentUser } from "@/lib/auth";
import { getAuthorPosts, hasSupabaseConfig } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  if (!hasSupabaseConfig()) return <AdminSetupState />;

  const user = await getCurrentUser();
  if (!user) redirect("/admin/login?next=/admin/posts");

  const posts = await getAuthorPosts(user.id);

  return (
    <main className="site-shell admin-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Author workflow</p>
          <h1 className="admin-heading">Posts</h1>
        </div>
        <div className="admin-header-actions">
          <Link className="button button-secondary" href="/notes">
            View public notes
          </Link>
          <form action={signOut}>
            <button className="button button-secondary" type="submit">Sign out</button>
          </form>
        </div>
      </header>

      <section className="content-section" aria-labelledby="admin-posts-heading">
        <div className="section-heading admin-section-heading">
          <div>
            <p className="eyebrow">Your content</p>
            <h2 id="admin-posts-heading">Maintain the notes surface.</h2>
          </div>
          <Link className="button" href="/admin/posts/new">New draft</Link>
        </div>

        {posts.length === 0 ? (
          <div className="state-card">
            <p className="state-card-title">No posts yet.</p>
            <p>Create your first draft to begin the publishing workflow.</p>
          </div>
        ) : (
          <div className="admin-post-list" aria-label="Author posts">
            {posts.map((post) => (
              <article className="admin-post-row" key={post.id}>
                <div>
                  <p className="eyebrow">{post.status}</p>
                  <h3><Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link></h3>
                  <p>{post.excerpt ?? "No excerpt yet."}</p>
                </div>
                <PostStatusActions postId={post.id} status={post.status} />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
