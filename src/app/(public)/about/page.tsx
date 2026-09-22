import { ProfileStats } from "@/components/profile-stats";
import { getApprovedImportedProfile } from "@/lib/imported-content";

export default function AboutPage() {
  const profile = getApprovedImportedProfile();

  if (!profile) {
    throw new Error("The public About page requires an approved imported profile.");
  }

  return (
    <div className="public-page">
      <section className="hero public-hero">
        <p className="eyebrow">About</p>
        <h1>{profile.aboutHeading}</h1>
        <p className="lede">{profile.aboutSummary}</p>
      </section>

      <section aria-labelledby="experience-heading" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-heading">Work summary</h2>
        </div>
        <ProfileStats stats={profile.stats} />
      </section>
    </div>
  );
}
