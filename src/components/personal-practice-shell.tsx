"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

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
  const navRef = useRef<HTMLElement>(null);
  const [markerTop, setMarkerTop] = useState<number | null>(null);

  const positionMarker = useCallback((link: HTMLElement | null) => {
    const nav = navRef.current;

    if (!nav || !link) {
      setMarkerTop(null);
      return;
    }

    const navBounds = nav.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    setMarkerTop(linkBounds.top - navBounds.top + linkBounds.height / 2);
  }, []);

  const restoreActiveMarker = useCallback(() => {
    const activeLink =
      navRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null;
    positionMarker(activeLink);
  }, [positionMarker]);

  const restoreFocusedOrActiveMarker = useCallback(() => {
    const nav = navRef.current;
    const focusedElement = document.activeElement;
    const focusedLink =
      nav && focusedElement instanceof HTMLElement && nav.contains(focusedElement)
        ? focusedElement.closest<HTMLElement>(".practice-nav-link")
        : null;

    if (focusedLink) {
      positionMarker(focusedLink);
      return;
    }

    restoreActiveMarker();
  }, [positionMarker, restoreActiveMarker]);

  useLayoutEffect(() => {
    restoreActiveMarker();
  }, [pathname, restoreActiveMarker]);

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

        <nav
          aria-label="Primary navigation"
          className="practice-nav"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              restoreActiveMarker();
            }
          }}
          onMouseLeave={restoreFocusedOrActiveMarker}
          ref={navRef}
        >
          <span
            aria-hidden="true"
            className="practice-nav-marker"
            data-testid="practice-nav-marker"
            data-visible={markerTop === null ? "false" : "true"}
            style={{ top: markerTop ?? undefined }}
          />
          {navigationItems.map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={active ? "practice-nav-link is-active" : "practice-nav-link"}
                href={item.href}
                key={item.href}
                onFocus={(event) => positionMarker(event.currentTarget)}
                onMouseEnter={(event) => positionMarker(event.currentTarget)}
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
