"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("app_render_error", { digest: error.digest });
  }, [error]);

  return (
    <main className="site-shell error-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not render this page.</h1>
      <button className="button" onClick={() => reset()} type="button">
        Try again
      </button>
    </main>
  );
}
