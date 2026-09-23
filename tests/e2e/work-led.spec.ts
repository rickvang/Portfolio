import { expect, test } from "@playwright/test";

test("approved work index presents each project's distinct structure", async ({ page }) => {
  await page.goto("/work");

  const throughline = page.locator(".work-throughline");
  await expect(throughline).toContainText(
    "Across these separate projects, the common thread is systems design:",
  );
  await expect(throughline).toContainText("connects workflows across a fragmented product ecosystem");
  await expect(throughline).toContainText(
    "gives teams shared, governed foundations for consistent patterns across distinct contexts.",
  );
  await expect(
    throughline.getByRole("link", { name: "Multi Product Integrations" }),
  ).toHaveAttribute("href", "/work/multi-product-integrations");
  await expect(throughline.getByRole("link", { name: "Design Systems" })).toHaveAttribute(
    "href",
    "/work/design-systems",
  );

  await expect(page.getByRole("heading", { name: "How the product parts relate" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Unified framework" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance, foundations, and use patterns" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "People and governance" })).toBeVisible();
  await expect(page.getByText("Marketing surfaces", { exact: true })).toBeVisible();
  await expect(page.getByText("Enterprise-product surfaces", { exact: true })).toBeVisible();
  await expect(page.locator(".project-preview img")).toHaveCount(0);
});

test("mobile home reveals a concrete project signal in the first viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const featuredProject = page.getByRole("heading", {
    level: 2,
    name: "Multi Product Integrations",
    exact: true,
  });
  await expect(featuredProject).toBeInViewport({ ratio: 1 });
  await expect(
    page.getByText(/A shared framework connects capabilities/),
  ).toBeInViewport({ ratio: 1 });
  await expect(
    page.getByRole("heading", { name: "How the product parts relate", exact: true }),
  ).toBeInViewport({ ratio: 1 });
  await expect(page.getByText("Unified framework", { exact: true })).toBeInViewport();
  await expect(page.locator(".project-topology-node").first()).toBeInViewport({ ratio: 0.8 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.locator("nextjs-portal").evaluateAll((portals) => {
    portals.forEach((portal) => portal.remove());
  });
  await page.screenshot({
    animations: "disabled",
    path: "test-results/visual-snapshots/home-mobile-first-viewport.png",
  });
});

test("detail pages trace the presentation to visible source sections", async ({ page }) => {
  await page.goto("/work/multi-product-integrations");

  const trace = page.getByRole("navigation", { name: "Source sections for this presentation" });
  const overviewLink = trace.getByRole("link", { name: "Overview" });
  await expect(overviewLink).toBeVisible();
  await expect(trace.getByRole("link", { name: "Exploration" })).toBeVisible();
  await expect(trace.getByRole("link", { name: "System / practice" })).toBeVisible();
  await expect(trace.getByRole("link", { name: "Outcomes" })).toBeVisible();
  await expect(page.getByText("No original product screens are shown or reconstructed; this visual summarizes the approved case-study text.")).toBeVisible();

  await overviewLink.focus();
  await expect(overviewLink).toBeFocused();
  await overviewLink.click();
  await expect(page).toHaveURL(/#multi-product-integrations-overview$/);
  await expect(page.locator("#multi-product-integrations-overview")).toBeVisible();
});

test("unapproved case studies remain out of public work routes", async ({ page }) => {
  await page.goto("/work/ai-systems");

  await expect(page).toHaveTitle("Case study not found | Rick Vang");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("Draft review surface.")).toHaveCount(0);
});

test("harness separates approved examples from synthetic fallback fixtures", async ({ page }) => {
  await page.goto("/dev/harness");

  const previewHarness = page.getByTestId("project-preview-harness");
  await expect(previewHarness).toContainText("Project preview and artifact states");
  await expect(previewHarness.getByText("Text-only fallback", { exact: true })).toBeVisible();
  await expect(previewHarness.getByText("Long and dense content", { exact: true })).toBeVisible();
  await expect(previewHarness).toContainText("not client work");
  await expect(previewHarness).toContainText("Source media deferred");
  await expect(previewHarness).toContainText("Redacted source artifact");
  await expect(previewHarness.locator("img")).toHaveCount(0);
});

test("both work patterns stay visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work");

  await expect(page.getByRole("heading", { name: "How the product parts relate" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance, foundations, and use patterns" })).toBeVisible();
  await expect(page.locator(".public-page")).toHaveCSS("animation-name", "none");
});
