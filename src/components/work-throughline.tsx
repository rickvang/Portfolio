import Link from "next/link";

import { workHref } from "@/lib/public-routes";

export function WorkThroughline() {
  return (
    <p className="work-throughline">
      <strong>Across these separate projects, the common thread is systems design:</strong>{" "}
      <Link href={workHref("multi-product-integrations")}>Multi Product Integrations</Link>{" "}
      connects workflows across a fragmented product ecosystem;{" "}
      <Link href={workHref("design-systems")}>Design Systems</Link>{" "}
      gives teams shared, governed foundations for consistent patterns across distinct contexts.
    </p>
  );
}
