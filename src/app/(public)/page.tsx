import Link from "next/link";

import { PersonalPracticeWorkIndex } from "@/components/personal-practice-work-index";
import { PostList } from "@/components/post-list";
import { ProfileStats } from "@/components/profile-stats";
import { ProjectPreview } from "@/components/project-preview";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { getApprovedImportedProfile } from "@/lib/imported-content";
import { getPublishedPosts } from "@/lib/posts";
import { publicRoutes } from "@/lib/public-routes";

export default async function HomePage() {
  const profile = getApprovedImportedProfile();
  const caseStudies = getApprovedCaseStudies();
  const [featuredCaseStudy] = caseStudies;
  const posts = await getPublishedPosts();

  return (
    <div className="public-page practice-home">
      <section
        aria-labelledby="home-title"
        className="practice-home-hero"
        id="top"
      >
        <div className="practice-home-copy">
          <p className="practice-kicker">Design · Systems · People</p>
          <h1 id="home-title">Designing human-centered systems for what&apos;s next.</h1>
          <p className="lede">
            I design product and design systems for complex environments—turning fragmented
            products and ways of working into clearer, more useful experiences.
          </p>
          <div className="practice-hero-links">
            <a className="practice-text-link" href="#selected-work">
              See selected work ↓
            </a>
            <Link className="practice-text-link" href={publicRoutes.notes}>
              Read notes
            </Link>
          </div>
        </div>

        {featuredCaseStudy ? (
          <article className="practice-hero-artifact" aria-label="Featured source-backed project structure">
            <div className="practice-hero-artifact-label">
              <span className="practice-kicker">A current systems view</span>
              <span>Source-backed</span>
            </div>
            <ProjectPreview caseStudy={featuredCaseStudy} headingLevel={2} />
          </article>
        ) : (
          <div className="practice-hero-artifact practice-empty-state" data-testid="home-work-empty">
            <p>Case studies are under review.</p>
          </div>
        )}
      </section>

      <section
        aria-labelledby="selected-work-heading"
        className="practice-section"
        id="selected-work"
      >
        <div className="practice-section-heading">
          <div>
            <p className="practice-kicker">Selected work</p>
            <h2 id="selected-work-heading">Different problems. A consistent systems approach.</h2>
          </div>
          <p>
            The work is presented as an index first: what changed, what the system needed to
            support, and the evidence behind it.
          </p>
        </div>
        <PersonalPracticeWorkIndex caseStudies={caseStudies} />
      </section>

      <section
        aria-labelledby="practice-notes-heading"
        className="practice-section practice-home-notes"
        id="notes"
      >
        <div className="practice-section-heading">
          <div>
            <p className="practice-kicker">Notes</p>
            <h2 id="practice-notes-heading">Ideas and observations from the work.</h2>
          </div>
          <Link className="practice-text-link" href={publicRoutes.notes}>
            View all notes →
          </Link>
        </div>
        <PostList posts={posts} />
      </section>

      <section
        aria-labelledby="practice-heading"
        className="practice-section practice-practice-grid"
        id="practice"
      >
        <div>
          <p className="practice-kicker">Practice</p>
          <h2 id="practice-heading">A systems approach to product design.</h2>
          <p className="practice-practice-copy">
            I care about the product and the conditions around it: the shared structures,
            patterns, and ways of working that make useful experiences easier to sustain.
          </p>
        </div>

        <ol className="practice-principles">
          <li>
            <span aria-hidden="true">01</span>
            <div>
              <strong>Connect fragmented products.</strong>
              <p>Use shared frameworks to make separate workflows and capabilities easier to understand together.</p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">02</span>
            <div>
              <strong>Build reusable foundations.</strong>
              <p>Create shared libraries, patterns, and governance that can support different product contexts.</p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">03</span>
            <div>
              <strong>Improve the system around the work.</strong>
              <p>Use experience architecture to make the underlying way a product is designed and operated more coherent.</p>
            </div>
          </li>
        </ol>
      </section>

      <section
        aria-labelledby="practice-about-heading"
        className="practice-section practice-about-grid"
        id="about"
      >
        <div>
          <p className="practice-kicker">About</p>
          <h2 id="practice-about-heading">{profile?.aboutHeading ?? "About Rick Vang"}</h2>
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
