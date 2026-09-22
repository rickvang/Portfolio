"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { publicRoutes } from "@/lib/public-routes";

const navigationItems = [
  { href: publicRoutes.home, label: "Home" },
  { href: publicRoutes.work, label: "Work" },
  { href: publicRoutes.notes, label: "Notes" },
  { href: publicRoutes.about, label: "About" },
  { href: publicRoutes.contact, label: "Contact" },
] as const;

function routeIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationLinksProps = {
  pathname: string;
  onNavigate?: () => void;
};

function NavigationLinks({ pathname, onNavigate }: NavigationLinksProps) {
  return (
    <nav aria-label="Primary navigation" className="rail-nav">
      {navigationItems.map((item) => {
        const active = routeIsActive(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={active ? "rail-link is-active" : "rail-link"}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <span>{item.label}</span>
            <span aria-hidden="true" className="rail-link-marker" />
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(({ returnFocus = true }: { returnFocus?: boolean } = {}) => {
    setDrawerOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDrawer, drawerOpen]);

  return (
    <div className="public-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <aside className="site-rail">
        <div>
          <Link className="rail-wordmark" href={publicRoutes.home}>
            Rick Vang
          </Link>
          <p className="rail-role">Portfolio · work and notes</p>
        </div>

        <NavigationLinks pathname={pathname} />

        <p className="rail-note">Work, notes, and practice.</p>
      </aside>

      <header className="mobile-nav-bar">
        <Link className="rail-wordmark" href={publicRoutes.home}>
          Rick Vang
        </Link>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? "Close site navigation" : "Open site navigation"}
          className="mobile-nav-toggle"
          onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
          ref={toggleRef}
          type="button"
        >
          <span aria-hidden="true">{drawerOpen ? "Close" : "Menu"}</span>
        </button>

        <noscript>
          <nav aria-label="Primary navigation" className="mobile-noscript-nav">
            {navigationItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </noscript>
      </header>

      {drawerOpen && (
        <div className="mobile-drawer-layer">
          <button
            aria-label="Close site navigation"
            className="mobile-drawer-backdrop"
            onClick={() => closeDrawer()}
            tabIndex={-1}
            type="button"
          />
          <div
            aria-label="Site navigation"
            aria-modal="true"
            className="mobile-drawer"
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
          >
            <div className="mobile-drawer-heading">
              <span>Navigate</span>
              <button className="mobile-drawer-close" onClick={() => closeDrawer()} type="button">
                Close
              </button>
            </div>
            <NavigationLinks
              pathname={pathname}
              onNavigate={() => {
                closeDrawer({ returnFocus: false });
                window.requestAnimationFrame(() => document.getElementById("main-content")?.focus());
              }}
            />
          </div>
        </div>
      )}

      <main className="public-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
