import Link from "next/link";

import { workHref } from "@/lib/public-routes";

export function WorkThroughline() {
  return (
    <p className="work-throughline">
      <strong>Shared thread:</strong> system design at two scopes.{" "}
      <Link href={workHref("multi-product-integrations")}>Multi Product Integrations</Link>{" "}
      connects product surfaces and workflows within a shared framework;{" "}
      <Link href={workHref("design-systems")}>Design Systems</Link>{" "}
      organizes shared foundations, governance, and reusable patterns across contexts.
    </p>
  );
}
