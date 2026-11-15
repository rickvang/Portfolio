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
      "I worked with designers to define shared workflow patterns and Figma libraries, then made a layout starter for new problem spaces.",
    visualKind: "integrations",
    previewCaption: "Shared service interfaces · client screens modified to protect intellectual property.",
  },
  {
    slug: "ai-systems",
    summary:
      "I gave AI role profiles based on public research, then mapped how those roles depend on one another at work.",
    visualKind: "ai-systems",
    previewCaption: "Illustrative persona framework",
  },
  {
    slug: "design-systems",
    summary:
      "I designed a platform framework within a shared library for teams redesigning legacy products.",
    visualKind: "design-systems",
    previewCaption: "Design-system foundations · client screens modified to protect intellectual property.",
  },
  {
    slug: "ui-design-practices",
    summary:
      "I look at how layout, information density and control states affect a task, drawing on enterprise product and design-system work.",
    visualKind: "ui-practice",
    previewCaption: "Illustrative interface guidance",
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
            I design interfaces for complex workflows.
          </h1>
          <p className="lede">
            I work across product design, design systems and AI-assisted workflows. I map how work happens,
            find patterns teams can reuse, and help carry design decisions into implementation.
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
            <strong>Map the task and handoffs.</strong>
            <p>I map the tasks, decisions and handoffs behind a screen before deciding what the interface needs.</p>
          </article>
          <article className="practice-principle">
            <strong>Give AI role-specific context.</strong>
            <p>I connect public research to people’s responsibilities, decisions and dependencies at work.</p>
          </article>
          <article className="practice-principle">
            <strong>Turn decisions into patterns.</strong>
            <p>I turn shared design choices into libraries and patterns, with room for teams to adapt them.</p>
          </article>
          <article className="practice-principle">
            <strong>Work through build details.</strong>
            <p>I make interaction and accessibility decisions clear enough for developers to build and review.</p>
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
          <h2>Have a product problem to work through?</h2>
          <Link className="practice-text-link" href={publicRoutes.contact}>
            Get in touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
