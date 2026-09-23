import Link from "next/link";

import { publicRoutes } from "@/lib/public-routes";

const navigationItems = [
  { href: publicRoutes.work, index: "01", label: "Work" },
  { href: publicRoutes.about, index: "02", label: "About" },
  { href: publicRoutes.contact, index: "03", label: "Contact" },
] as const;

function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type PersonalPracticeShellProps = Readonly<{
  children: React.ReactNode;
  pathname: string;
}>;

export function PersonalPracticeShell({
  children,
  pathname,
}: PersonalPracticeShellProps) {
  return (
    <div className="practice-shell" data-testid="personal-practice-shell">
      <a className="skip-link practice-skip-link" href="#main-content">
        Skip to content
      </a>

      <aside className="practice-rail" data-testid="practice-rail">
        <div className="practice-rail-identity">
          <Link
            aria-label="Rick Vang, home"
            className="practice-wordmark"
            href={publicRoutes.home}
          >
            Rick Vang
          </Link>
          <p>Product designer</p>
        </div>

        <nav aria-label="Primary navigation" className="practice-nav">
          {navigationItems.map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={active ? "practice-nav-link is-active" : "practice-nav-link"}
                href={item.href}
                key={item.href}
              >
                <span aria-hidden="true" className="practice-nav-index">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <p className="practice-rail-note">
          Products, systems, and the ways teams work through complexity.
        </p>
      </aside>

      <main className="practice-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
