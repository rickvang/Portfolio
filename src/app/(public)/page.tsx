import Link from "next/link";

import { PersonalPracticeWorkIndex } from "@/components/personal-practice-work-index";
import { PostList } from "@/components/post-list";
import { ProfileStats } from "@/components/profile-stats";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { getApprovedImportedProfile } from "@/lib/imported-content";
import { getPublishedPosts } from "@/lib/posts";
import { publicRoutes } from "@/lib/public-routes";

export default async function HomePage() {
  const profile = getApprovedImportedProfile();
  const caseStudies = getApprovedCaseStudies();
  const posts = await getPublishedPosts();

  return (
    <div className="public-page practice-home">
      <section
        aria-labelledby="home-title"
        className="practice-home-hero"
        id="top"
      >
        <div className="practice-home-copy">
          <h1 id="home-title">Designing human-centered systems for what&apos;s next.</h1>
          <p className="lede">
            I design product and design systems for complex environments—turning fragmented
            products and ways of working into clearer, more useful experiences.
          </p>
          <div className="practice-hero-links">
            <a className="practice-text-link" href="#selected-work">
              View selected work ↓
            </a>
            <Link className="practice-text-link" href={publicRoutes.about}>
              About me
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="selected-work-heading"
        className="practice-section"
        id="selected-work"
      >
        <div className="practice-section-heading">
          <h2 id="selected-work-heading">Selected work</h2>
          <p>Complex product and system problems, shown through the decisions and structures behind them.</p>
        </div>
        <PersonalPracticeWorkIndex caseStudies={caseStudies} />
      </section>

      <section
        aria-labelledby="how-i-work-heading"
        className="practice-section"
        id="how-i-work"
      >
        <div className="practice-section-heading">
          <h2 id="how-i-work-heading">How I work</h2>
          <p>Make the product clearer while improving the system around the work.</p>
        </div>

        <div className="practice-how-grid">
          <article className="practice-principle">
            <span aria-hidden="true">01</span>
            <strong>Connect fragmented products.</strong>
            <p>Use shared frameworks to make separate workflows and capabilities easier to understand together.</p>
          </article>
          <article className="practice-principle">
            <span aria-hidden="true">02</span>
            <strong>Build reusable foundations.</strong>
            <p>Create shared libraries, patterns, and governance that can support different product contexts.</p>
          </article>
          <article className="practice-principle">
            <span aria-hidden="true">03</span>
            <strong>Improve how teams work.</strong>
            <p>Shape the structures and decisions around delivery so useful experiences are easier to sustain.</p>
          </article>
        </div>
      </section>

      {posts.length > 0 && (
        <section
          aria-labelledby="practice-notes-heading"
          className="practice-section practice-home-notes"
          id="notes"
        >
          <div className="practice-section-heading">
            <h2 id="practice-notes-heading">Notes</h2>
            <Link className="practice-text-link" href={publicRoutes.notes}>
              View all notes →
            </Link>
          </div>
          <PostList posts={posts} />
        </section>
      )}

      <section
        aria-labelledby="practice-about-heading"
        className="practice-section practice-about-grid"
        id="about"
      >
        <div>
          <h2 id="practice-about-heading">About</h2>
          <p className="practice-about-copy">
            {profile?.aboutSummary ?? "Profile content is under review."}
          </p>
          <div className="practice-hero-links">
            <Link className="practice-text-link" href={publicRoutes.about}>
              More about me →
            </Link>
            <Link className="practice-text-link" href={publicRoutes.contact}>
              Get in touch →
            </Link>
          </div>
        </div>

        {profile && <ProfileStats stats={profile.stats} />}
      </section>
    </div>
  );
}
