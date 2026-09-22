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
      <section className="hero public-hero" id="top">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1>{profile.headline}</h1>
        <p className="lede">{profile.summary}</p>
        <div className="hero-actions">
          <Link className="button" href={publicRoutes.work}>
            View work
          </Link>
          <Link className="button button-secondary" href={publicRoutes.contact}>
            Start a conversation
          </Link>
        </div>
      </section>

      <section className="content-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Selected case studies</h2>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
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
        <div>
          <p>
            This first slice is intentionally small. Content, design decisions, and integrations should be added
            behind stable boundaries that remain easy to inspect and test.
          </p>
          <Link className="text-link" href={publicRoutes.about}>
            About this practice
          </Link>
        </div>
      </section>

      <section className="content-section split-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>A local-first contact flow.</h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
