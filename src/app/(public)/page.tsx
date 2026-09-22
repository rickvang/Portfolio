import Link from "next/link";

import { CaseStudyList } from "@/components/case-study-list";
import { ContactForm } from "@/components/contact-form";
import { PostList } from "@/components/post-list";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { portfolioFixtures } from "@/lib/fixtures";
import { getPublishedPosts } from "@/lib/posts";
import { publicRoutes } from "@/lib/public-routes";

export default async function HomePage() {
  const { profile } = portfolioFixtures;
  const caseStudies = getApprovedCaseStudies();
  const posts = await getPublishedPosts();

  return (
    <div className="public-page">
      <section className="hero public-hero editorial-hero" id="top">
        <p className="hero-coordinate">{profile.name} / Product design leadership / 2026</p>
        <div className="editorial-hero-grid">
          <div className="editorial-hero-statement">
            <p className="eyebrow">{profile.eyebrow}</p>
            <h1>
              {profile.headline} <em>{profile.headlineEmphasis}</em>
            </h1>
          </div>
          <div className="editorial-hero-support">
            <p className="lede">{profile.summary}</p>
            <div className="hero-actions">
              <Link className="button" href={publicRoutes.work}>
                View work
              </Link>
              <Link className="button button-secondary" href={publicRoutes.contact}>
                Start a conversation
              </Link>
            </div>
            <div className="hero-index" aria-label="Portfolio orientation">
              <span>Selected work</span>
              <span>01 / 04</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section editorial-section" id="work">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">01 / Work</p>
          <h2>Systems that make complexity legible.</h2>
          <p>Selected case studies move from context and people through exploration, system decisions, and outcomes.</p>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
      </section>

      <section className="content-section editorial-section editorial-section-offset" id="notes">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">02 / Notes</p>
          <h2>Methods, systems, and the questions behind the work.</h2>
        </div>
        <PostList posts={posts} />
      </section>

      <section className="content-section split-section editorial-section" id="about">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">03 / Practice</p>
          <h2>Design the system around the work, not just the screen.</h2>
        </div>
        <div className="editorial-section-copy">
          <p>
            The practice spans product design, reusable interface systems, AI-assisted workflows, and the operating
            structures that keep complex work understandable.
          </p>
          <Link className="text-link" href={publicRoutes.about}>
            About this practice
          </Link>
        </div>
      </section>

      <section className="content-section split-section editorial-section" id="contact">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">04 / Contact</p>
          <h2>Start with the problem, not the deliverable.</h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
