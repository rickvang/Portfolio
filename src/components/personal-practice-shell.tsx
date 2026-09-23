import Link from "next/link";

import { publicRoutes } from "@/lib/public-routes";

const navigationItems = [
  { href: publicRoutes.work, label: "Work" },
  { href: publicRoutes.notes, label: "Notes" },
  { href: publicRoutes.about, label: "About" },
  { href: publicRoutes.contact, label: "Contact" },
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

      <header className="practice-header">
        <Link
          aria-label="Rick Vang, home"
          className="practice-wordmark"
          href={publicRoutes.home}
        >
          Rick Vang
        </Link>

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
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="practice-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
