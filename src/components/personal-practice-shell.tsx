"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { publicRoutes } from "@/lib/public-routes";

const fullNavigationItems = [
  { href: publicRoutes.work, index: "01", label: "Work" },
  { href: publicRoutes.notes, index: "02", label: "Notes" },
  { href: publicRoutes.about, index: "03", label: "About" },
  { href: publicRoutes.contact, index: "04", label: "Contact" },
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
  const navigationItems = fullNavigationItems;
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  useLayoutEffect(() => {
    restoreActiveMarker();
  }, [pathname, restoreActiveMarker]);

  const closeDrawer = useCallback(({ returnFocus = true }: { returnFocus?: boolean } = {}) => {
    setDrawerOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    }
  }, []);

  useLayoutEffect(() => {
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
            <Image
              alt="Rick Vang"
              height={38}
              priority
              src="/brand/rick-vang-logo-vector.svg"
              width={78}
            />
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
          onMouseLeave={restoreActiveMarker}
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

        <button
          aria-controls="practice-mobile-navigation"
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? "Close site navigation" : "Open site navigation"}
          className="practice-mobile-toggle"
          onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
          ref={toggleRef}
          type="button"
        >
          <span aria-hidden="true">{drawerOpen ? "Close" : "Menu"}</span>
        </button>

        <p className="practice-rail-note">
          Products, systems, and the ways teams work through complexity.
        </p>
      </aside>

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
            id="practice-mobile-navigation"
            ref={drawerRef}
            role="dialog"
          >
            <div className="mobile-drawer-heading">
              <span>Navigate</span>
              <button className="mobile-drawer-close" onClick={() => closeDrawer()} type="button">
                Close
              </button>
            </div>
            <nav aria-label="Primary navigation" className="practice-nav">
              {fullNavigationItems.map((item) => {
                const active = routeIsActive(pathname, item.href);

                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={active ? "practice-nav-link is-active" : "practice-nav-link"}
                    href={item.href}
                    key={item.href}
                    onClick={() => {
                      closeDrawer({ returnFocus: false });
                      window.requestAnimationFrame(() => document.getElementById("main-content")?.focus());
                    }}
                  >
                    <span aria-hidden="true" className="practice-nav-index">
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <main className="practice-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
