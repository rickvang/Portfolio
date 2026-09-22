"use client";

import Link from "next/link";
import { useEffect } from "react";

import { logger } from "@/lib/logger";
import { publicRoutes } from "@/lib/public-routes";

export default function NotesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("notes_render_error", { digest: error.digest });
  }, [error]);

  return (
    <section className="public-page error-page">
      <p className="eyebrow">Notes unavailable</p>
      <h1>We could not load the published notes.</h1>
      <p className="lede">Try again, or return home while the content service recovers.</p>
      <div className="admin-actions">
        <button className="button" onClick={() => reset()} type="button">
          Try again
        </button>
        <Link className="button button-secondary" href={publicRoutes.home}>
          Return home
        </Link>
      </div>
    </section>
  );
}
