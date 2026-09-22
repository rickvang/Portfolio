import Link from "next/link";

import { CaseStudyList } from "@/components/case-study-list";
import { ContactForm } from "@/components/contact-form";
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
    <div className="public-page">
      <section className="hero public-hero editorial-hero" id="top">
        <p className="hero-coordinate">{profile?.eyebrow ?? "Portfolio"}</p>
        <div className="editorial-hero-grid">
          <div className="editorial-hero-statement">
            <p className="eyebrow">Rick Vang / Product design leader</p>
            <h1>{profile?.headline ?? "Rick Vang"}</h1>
          </div>
          <div className="editorial-hero-support">
            <p className="lede">{profile?.summary ?? "Profile content is under review."}</p>
            <div className="hero-actions">
              <Link className="button" href={publicRoutes.work}>
                View work
              </Link>
              <Link className="button button-secondary" href={publicRoutes.about}>
                About me
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section editorial-section" id="work">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">Work</p>
          <h2>Recent projects</h2>
        </div>
        <CaseStudyList caseStudies={caseStudies} />
      </section>

      <section className="content-section split-section editorial-section" id="about">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">About</p>
          <h2>{profile?.aboutHeading ?? "About Rick Vang"}</h2>
        </div>
        <div className="editorial-section-copy">
          <p>{profile?.aboutSummary ?? "Profile content is under review."}</p>
          <Link className="text-link" href={publicRoutes.about}>
            More about my work
          </Link>
        </div>
        {profile && <ProfileStats stats={profile.stats} />}
      </section>

      <section className="content-section editorial-section editorial-section-offset" id="notes">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">Notes</p>
          <h2>Methods, systems, and the questions behind the work.</h2>
        </div>
        <PostList posts={posts} />
      </section>

      <section className="content-section split-section editorial-section" id="contact">
        <div className="section-heading editorial-section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Start a conversation.</h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
