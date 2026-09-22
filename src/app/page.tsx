import { ContactForm } from "@/components/contact-form";
import { PostList } from "@/components/post-list";
import { ProjectList } from "@/components/project-list";
import { portfolioFixtures } from "@/lib/fixtures";
import { getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const { profile, projects } = portfolioFixtures;
  const posts = await getPublishedPosts();

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top">
          Rick Vang
        </a>
        <nav aria-label="Primary navigation" className="site-nav">
          <a href="#work">Work</a>
          <a href="#notes">Notes</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1>{profile.headline}</h1>
        <p className="lede">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button" href="#work">
            View work
          </a>
          <a className="button button-secondary" href="#contact">
            Start a conversation
          </a>
        </div>
      </section>

      <section className="content-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>A content-driven project list</h2>
        </div>
        <ProjectList projects={projects} />
      </section>

      <section className="content-section" id="notes">
        <div className="section-heading">
          <p className="eyebrow">Notes</p>
          <h2>Ideas can become a maintained content surface.</h2>
        </div>
        <PostList posts={posts} />
      </section>

      <section className="content-section split-section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Keep the system understandable.</h2>
        </div>
        <p>
          This first slice is intentionally small. Content, design decisions, and integrations should be added
          behind stable boundaries that remain easy to inspect and test.
        </p>
      </section>

      <section className="content-section split-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>A local-first contact flow.</h2>
        </div>
        <ContactForm />
      </section>

      <footer className="site-footer">
        <span>rickvang.com foundation</span>
        <a href="/dev/harness">Development harness</a>
      </footer>
    </main>
  );
}
