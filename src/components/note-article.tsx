import type { PublishedPost } from "@/lib/posts";

type NoteArticleProps = {
  post: Pick<PublishedPost, "id" | "slug" | "title" | "excerpt" | "content" | "sections">;
  preview?: boolean;
};

export function NoteArticle({ post, preview = false }: NoteArticleProps) {
  return (
    <article className="post-detail public-page">
      <p className="eyebrow">{preview ? "Note preview" : "Published note"}</p>
      <h1>{post.title}</h1>
      {post.excerpt && <p className="lede">{post.excerpt}</p>}
      <div className="post-content">
        {post.content.map((paragraph, index) => (
          <p key={`${post.id}-intro-${index}`}>{paragraph}</p>
        ))}
        {post.sections.map((section) => (
          <section aria-labelledby={`${post.slug}-${section.id}`} key={section.id}>
            <h2 id={`${post.slug}-${section.id}`}>{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={`${post.id}-${section.id}-${index}`}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
