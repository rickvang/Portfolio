"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { publicRoutes } from "@/lib/public-routes";

const navigationItems = [
  { href: publicRoutes.work, index: "01", label: "Work" },
  { href: publicRoutes.about, index: "02", label: "About" },
  { href: publicRoutes.contact, index: "03", label: "Contact" },
] as const;

type ColorCandidate = "a" | "b" | "c";

const colorCandidateLabels: Record<ColorCandidate, string> = {
  a: "A · current",
  b: "B · reduced warm chroma",
  c: "C · near-neutral",
};

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
  const [colorStudy, setColorStudy] = useState<{
    enabled: boolean;
    candidate: ColorCandidate;
  }>({ enabled: false, candidate: "a" });

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("color");
    const candidate: ColorCandidate =
      requested === "b" || requested === "c" ? requested : "a";

    setColorStudy({
      enabled: requested === "a" || requested === "b" || requested === "c",
      candidate,
    });
  }, []);

  return (
    <div
      className={`practice-shell practice-color-${colorStudy.candidate}`}
      data-color-candidate={colorStudy.candidate}
      data-testid="personal-practice-shell"
    >
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

      {colorStudy.enabled && (
        <aside aria-label="Color study controls" className="practice-color-study">
          <p>Background study</p>
          <nav aria-label="Color candidates">
            {(["a", "b", "c"] as const).map((candidate) => (
              <a
                aria-current={colorStudy.candidate === candidate ? "page" : undefined}
                href={`${pathname}?color=${candidate}`}
                key={candidate}
              >
                {colorCandidateLabels[candidate]}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
