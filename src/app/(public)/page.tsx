import Link from "next/link";

import { PersonalPracticeHeroGraphic } from "@/components/personal-practice-visuals";
import { PersonalPracticeWorkIndex } from "@/components/personal-practice-work-index";
import { PostList } from "@/components/post-list";
import { ProfileStats } from "@/components/profile-stats";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { getApprovedImportedProfile } from "@/lib/imported-content";
import { getPublishedPosts } from "@/lib/posts";
import { publicRoutes } from "@/lib/public-routes";

const homepageWork = [
  {
    slug: "multi-product-integrations",
    summary:
      "I helped define shared workflow patterns and Figma libraries, and created a layout starter for teams working across applications.",
    visualKind: "integrations",
    previewCaption: "Shared service interfaces · client screens modified to protect intellectual property.",
  },
  {
    slug: "ai-systems",
    summary:
      "I built a research-grounded persona framework and mapped dependencies between roles to help AI reason about product ideas, workflows and information needs.",
    visualKind: "ai-systems",
    previewCaption: "Illustrative diagram",
  },
  {
    slug: "design-systems",
    summary:
      "I designed a platform framework within a shared core library, giving teams reusable screens and workflow patterns for redesigning legacy capabilities.",
    visualKind: "design-systems",
    previewCaption: "Design-system foundations · client screens modified to protect intellectual property.",
  },
  {
    slug: "ui-design-practices",
    summary:
      "I connect layout, information density and control states to reusable workflow patterns—drawing on enterprise product and design-system work.",
    visualKind: "ui-practice",
    previewCaption: "Illustrative diagram",
  },
] as const;

export default async function HomePage() {
  const profile = getApprovedImportedProfile();
  const caseStudies = getApprovedCaseStudies();
  const posts = await getPublishedPosts();

  const selectedWork = homepageWork.flatMap((item) => {
    const caseStudy = caseStudies.find((candidate) => candidate.slug === item.slug);
    return caseStudy
      ? [{ caseStudy, summary: item.summary, visualKind: item.visualKind, previewCaption: item.previewCaption }]
      : [];
  });

  return (
    <div className="public-page practice-home">
      <section
        aria-labelledby="home-title"
        className="practice-home-hero"
        id="top"
      >
        <div className="practice-home-copy">
          <h1 id="home-title">
            I make complex products easier to understand, build, and evolve.
          </h1>
          <p className="lede">
            I work across product strategy, systems design, and AI-assisted delivery—connecting
            fragmented workflows, shaping reusable foundations, and carrying decisions into
            implementation.
          </p>
          <div className="practice-hero-links">
            <a className="practice-text-link" href="#selected-work">
            See the work ↓
            </a>
            <Link className="practice-text-link" href={publicRoutes.about}>
              About me
            </Link>
          </div>
        </div>
        <PersonalPracticeHeroGraphic />
      </section>

      <section
        aria-labelledby="selected-work-heading"
        className="practice-section"
        id="selected-work"
      >
        <div className="practice-section-heading">
          <h2 id="selected-work-heading">Selected work</h2>
        </div>
        <PersonalPracticeWorkIndex items={selectedWork} />
      </section>

      <section
        aria-labelledby="throughline-heading"
        className="practice-section"
        id="how-i-work"
      >
        <div className="practice-section-heading">
          <h2 id="throughline-heading">How I work</h2>
        </div>

        <div className="practice-how-grid">
          <article className="practice-principle">
            <strong>Make complexity legible.</strong>
            <p>Map products, workflows, and responsibilities so teams can see what belongs together.</p>
          </article>
          <article className="practice-principle">
            <strong>Define the operating model.</strong>
            <p>Separate durable work from live context so people and AI can collaborate without losing the thread.</p>
          </article>
          <article className="practice-principle">
            <strong>Build reusable foundations.</strong>
            <p>Turn decisions into libraries, tokens, governance, and patterns that hold across product contexts.</p>
          </article>
          <article className="practice-principle">
            <strong>Carry it into implementation.</strong>
            <p>Specify interaction, accessibility, and verification so the experience survives contact with the browser.</p>
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
          </div>
        </div>

        {profile && <ProfileStats stats={profile.stats} />}
        <div className="practice-home-contact">
          <h2>Let’s talk about your next challenge.</h2>
          <Link className="practice-text-link" href={publicRoutes.contact}>
            Get in touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
