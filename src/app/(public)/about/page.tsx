import { AboutPageContent } from "@/content/supporting-pages";
import { getApprovedImportedProfile } from "@/lib/imported-content";

export default function AboutPage() {
  const profile = getApprovedImportedProfile();
  if (!profile) {
    return (
      <div className="public-page">
        <section className="hero public-hero">
          <p className="eyebrow">About</p>
          <h1>Rick Vang</h1>
          <p className="lede">Profile content is under review.</p>
        </section>
      </div>
    );
  }

  return <AboutPageContent stats={profile.stats} />;
}
