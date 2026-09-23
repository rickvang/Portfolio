import Link from "next/link";

import { CaseStudyList } from "@/components/case-study-list";
import { ContactForm } from "@/components/contact-form";
import { PostList } from "@/components/post-list";
import { ProfileStats } from "@/components/profile-stats";
import { ProjectPreview } from "@/components/project-preview";
import { WorkThroughline } from "@/components/work-throughline";
import { getApprovedCaseStudies } from "@/lib/case-studies";
import { getApprovedImportedProfile } from "@/lib/imported-content";
import { getPublishedPosts } from "@/lib/posts";
import { publicRoutes, workHref } from "@/lib/public-routes";

export default async function HomePage() {
  const profile = getApprovedImportedProfile();
  const caseStudies = getApprovedCaseStudies();
  const [featuredCaseStudy, ...additionalCaseStudies] = caseStudies;
  const posts = await getPublishedPosts();

  return (
    <div className="public-page">
      <section
        aria-labelledby="home-title"
        className="content-section home-work-hero"
        id="top"
      >
        <div className="home-work-copy">
          <p className="hero-coordinate">{profile?.eyebrow ?? "Portfolio"}</p>
          <p className="eyebrow">Product design leadership</p>
          <h1 id="home-title">{profile?.headline ?? "Rick Vang"}</h1>
          <p className="lede">{profile?.summary ?? "Profile content is under review."}</p>
          <div className="hero-actions">
            <Link className="button" href={publicRoutes.work}>
              View all work
            </Link>
            <Link className="button button-secondary" href={publicRoutes.about}>
              About me
            </Link>
          </div>
        </div>

        {featuredCaseStudy ? (
          <article className="home-featured-work">
            <div className="home-featured-heading">
              <p className="eyebrow">Featured project</p>
              <h2>
                <Link href={workHref(featuredCaseStudy.slug)}>{featuredCaseStudy.title}</Link>
              </h2>
              <p>{featuredCaseStudy.summary}</p>
              <WorkThroughline />
              <Link className="text-link" href={workHref(featuredCaseStudy.slug)}>
                Explore the case study
              </Link>
            </div>
            <ProjectPreview caseStudy={featuredCaseStudy} headingLevel={3} />
          </article>
        ) : (
          <div className="home-featured-work state-card" data-testid="home-work-empty">
            <p className="state-card-title">Case studies are under review.</p>
            <p>Draft source material stays out of public routes until it is explicitly approved.</p>
          </div>
        )}
      </section>

      {additionalCaseStudies.length > 0 && (
        <section
          aria-labelledby="home-more-work-heading"
          className="content-section"
          id="work"
        >
          <div className="section-heading">
            <p className="eyebrow">More selected work</p>
            <h2 id="home-more-work-heading">Other approved case studies</h2>
          </div>
          <CaseStudyList caseStudies={additionalCaseStudies} />
        </section>
      )}

      <section className="content-section split-section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>{profile?.aboutHeading ?? "About Rick Vang"}</h2>
        </div>
        <div>
          <p>{profile?.aboutSummary ?? "Profile content is under review."}</p>
          <Link className="text-link" href={publicRoutes.about}>
            More about my work
          </Link>
        </div>
        {profile && <ProfileStats stats={profile.stats} />}
      </section>

      <section className="content-section editorial-section-offset" id="notes">
        <div className="section-heading">
          <p className="eyebrow">Notes</p>
          <h2>Methods, systems, and the questions behind the work.</h2>
        </div>
        <PostList posts={posts} />
      </section>

      <section className="content-section split-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Start a conversation.</h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}

