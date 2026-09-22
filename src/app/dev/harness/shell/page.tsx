import { notFound } from "next/navigation";

import { SiteShellFrame } from "@/components/site-shell";
import { publicRoutes } from "@/lib/public-routes";

export const dynamic = "force-dynamic";

const routeOptions = {
  home: publicRoutes.home,
  work: publicRoutes.work,
  notes: publicRoutes.notes,
  about: publicRoutes.about,
  contact: publicRoutes.contact,
} as const;

type ShellHarnessPageProps = {
  searchParams: Promise<{
    drawer?: string | string[];
    route?: string | string[];
  }>;
};

export default async function ShellHarnessPage({ searchParams }: ShellHarnessPageProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;
  const routeParam = Array.isArray(params.route) ? params.route[0] : params.route;
  const drawerParam = Array.isArray(params.drawer) ? params.drawer[0] : params.drawer;
  const routeKey = routeParam && routeParam in routeOptions ? (routeParam as keyof typeof routeOptions) : "home";
  const pathname = routeOptions[routeKey];
  const drawerOpen = drawerParam === "open";

  return (
    <SiteShellFrame initialDrawerOpen={drawerOpen} pathname={pathname}>
      <div className="public-page shell-harness-page" data-testid="shell-harness-page">
        <section className="hero public-hero">
          <p className="eyebrow">Local-only shell verification</p>
          <h1>Navigation shell harness.</h1>
          <p className="lede">
            Deterministic rail, drawer, route-state, focus, responsive, and reduced-motion verification using the
            production public-shell component.
          </p>
          <dl className="case-study-meta">
            <div>
              <dt>Active route</dt>
              <dd>{routeKey}</dd>
            </div>
            <div>
              <dt>Initial drawer</dt>
              <dd>{drawerOpen ? "open" : "closed"}</dd>
            </div>
          </dl>
        </section>

        <section className="content-section" aria-labelledby="shell-harness-content-heading">
          <div className="section-heading">
            <p className="eyebrow">Verification content</p>
            <h2 id="shell-harness-content-heading">Stable content for visual and interaction checks.</h2>
          </div>
          <div className="surface-grid">
            <article className="surface-card">
              <h3>Route continuity</h3>
              <p>The rail or drawer should preserve orientation without becoming a separate navigation system.</p>
            </article>
            <article className="surface-card">
              <h3>Responsive behavior</h3>
              <p>The desktop rail becomes the mobile drawer while this content remains readable and overflow-free.</p>
            </article>
          </div>
        </section>
      </div>
    </SiteShellFrame>
  );
}
