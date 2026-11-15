import type { Metadata } from "next";

import { designSystemCatalogUrl } from "@/lib/design-system-catalog";

export const metadata: Metadata = {
  title: "Library · Rick Vang",
  description: "Browse the UI patterns I’m building in Storybook.",
};

export default function LibraryPage() {
  return (
    <section
      aria-label="Design system library"
      className="practice-library"
      data-testid="practice-library"
    >
      <h1 className="practice-work-visually-hidden">Library</h1>
      <p className="practice-library-open">
        <a href={designSystemCatalogUrl} rel="noopener noreferrer" target="_blank">
          Open catalog in a new tab
        </a>
      </p>
      <iframe
        className="practice-library-frame"
        data-testid="practice-library-frame"
        src={designSystemCatalogUrl}
        title="Design system catalog"
      />
    </section>
  );
}
