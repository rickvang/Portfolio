import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import HomePage from "@/app/(public)/page";
import { CaseStudyTemplate } from "@/components/case-study-template";
import { PersonalPracticeShell } from "@/components/personal-practice-shell";
import { getApprovedCaseStudyBySlug } from "@/lib/case-studies";

import styles from "./palette.module.css";

export const dynamic = "force-dynamic";

type PreviewColors = Record<
  | "--background" | "--surface" | "--surface-muted" | "--surface-strong"
  | "--foreground" | "--muted" | "--border"
  | "--accent" | "--accent-hover" | "--accent-ink"
  | "--focus" | "--focus-inner" | "--focus-outer"
  | "--rail" | "--rail-foreground" | "--rail-muted" | "--rail-accent" | "--rail-border"
  | "--practice-rail-surface" | "--accent-secondary" | "--accent-tint" | "--hero-mist",
  string
>;

type Palette = {
  id: string;
  name: string;
  description: string;
  colors: PreviewColors;
};

const palettes: readonly Palette[] = [
  {
    id: "ink-blue",
    name: "Ink Blue",
    description: "Blue ink on cool paper, with slate in the supporting details.",
    colors: {
      "--background": "#f0f3f7",
      "--surface": "#fafcff",
      "--surface-muted": "#e2eaf2",
      "--surface-strong": "#d4e0ec",
      "--foreground": "#1d2834",
      "--muted": "#505e6d",
      "--border": "#bdcbd8",
      "--accent": "#355e82",
      "--accent-hover": "#1f4163",
      "--accent-ink": "#264b70",
      "--focus": "#355e82",
      "--focus-inner": "#fafcff",
      "--focus-outer": "#355e82",
      "--rail": "#1f2936",
      "--rail-foreground": "#f1f6fb",
      "--rail-muted": "#adbdcf",
      "--rail-accent": "#aecdeb",
      "--rail-border": "rgb(241 246 251 / 14%)",
      "--practice-rail-surface": "#e8eef4",
      "--accent-secondary": "#7187a0",
      "--accent-tint": "#dce7f2",
      "--hero-mist": "#81959b",
    },
  },
  {
    id: "forest",
    name: "Forest",
    description: "Deep green on warm limestone, with sage in the supporting details.",
    colors: {
      "--background": "#f6f4ec",
      "--surface": "#fffcf5",
      "--surface-muted": "#e6ebe0",
      "--surface-strong": "#d8e0d3",
      "--foreground": "#202822",
      "--muted": "#526057",
      "--border": "#c7cec0",
      "--accent": "#376553",
      "--accent-hover": "#1f4837",
      "--accent-ink": "#285140",
      "--focus": "#376553",
      "--focus-inner": "#fffcf5",
      "--focus-outer": "#376553",
      "--rail": "#212d26",
      "--rail-foreground": "#f2f5eb",
      "--rail-muted": "#afbeb3",
      "--rail-accent": "#aad0b8",
      "--rail-border": "rgb(242 245 235 / 14%)",
      "--practice-rail-surface": "#edf0e7",
      "--accent-secondary": "#73917e",
      "--accent-tint": "#dde8da",
      "--hero-mist": "#8e9071",
    },
  },
  {
    id: "mulberry",
    name: "Mulberry",
    description: "Muted berry on rose-gray paper, with lavender in the supporting details.",
    colors: {
      "--background": "#f7f2f3",
      "--surface": "#fffbfc",
      "--surface-muted": "#eee3e8",
      "--surface-strong": "#e4d4dd",
      "--foreground": "#30252d",
      "--muted": "#63545d",
      "--border": "#d3c3cb",
      "--accent": "#783d58",
      "--accent-hover": "#51243b",
      "--accent-ink": "#65324a",
      "--focus": "#783d58",
      "--focus-inner": "#fffbfc",
      "--focus-outer": "#783d58",
      "--rail": "#30242b",
      "--rail-foreground": "#f9f0f4",
      "--rail-muted": "#c9b5c0",
      "--rail-accent": "#e6b2ca",
      "--rail-border": "rgb(249 240 244 / 14%)",
      "--practice-rail-surface": "#f0e6ea",
      "--accent-secondary": "#8d7d9b",
      "--accent-tint": "#e9dfed",
      "--hero-mist": "#a58c9a",
    },
  },
];

const views = [
  { id: "home", label: "Home" },
  { id: "ai-systems", label: "AI Systems" },
] as const;

type PreviewView = (typeof views)[number]["id"];

type PalettePageProps = {
  searchParams: Promise<{
    palette?: string | string[];
    view?: string | string[];
  }>;
};

function previewHref(palette: string, view: PreviewView) {
  return `?palette=${palette}&view=${view}`;
}

export default async function PalettePage({ searchParams }: PalettePageProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;
  const palette = palettes.find((option) => option.id === params.palette) ?? palettes[0];
  const view = params.view === "ai-systems" ? "ai-systems" : "home";
  const caseStudy = view === "ai-systems" ? getApprovedCaseStudyBySlug("ai-systems") : null;

  if (view === "ai-systems" && !caseStudy) {
    notFound();
  }

  return (
    <div className={styles.preview} style={palette.colors as CSSProperties}>
      <header className={styles.toolbar}>
        <div className={styles.controls}>
          <nav aria-label="Palette" className={styles.options}>
            {palettes.map((option) => (
              <Link
                aria-current={palette.id === option.id ? "true" : undefined}
                className={styles.option}
                href={previewHref(option.id, view)}
                key={option.id}
                scroll={false}
              >
                <span aria-hidden="true" className={styles.swatch} style={{ background: option.colors["--accent"] }} />
                {option.name}
              </Link>
            ))}
          </nav>
          <nav aria-label="Preview page" className={styles.options}>
            {views.map((option) => (
              <Link
                aria-current={view === option.id ? "page" : undefined}
                className={styles.option}
                href={previewHref(palette.id, option.id)}
                key={option.id}
              >
                {option.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className={styles.description} role="status">{palette.description}</p>
      </header>

      <PersonalPracticeShell key={palette.id} pathname={view === "home" ? "/" : "/work/ai-systems"}>
        {caseStudy ? (
          <div className="public-page">
            <CaseStudyTemplate caseStudy={caseStudy} />
          </div>
        ) : (
          <HomePage />
        )}
      </PersonalPracticeShell>
    </div>
  );
}
