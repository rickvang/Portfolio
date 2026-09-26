import { expect, test } from "@playwright/test";

test("work index pairs each project with a scoped illustrative visual", async ({ page }) => {
  await page.goto("/work");

  const hero = page.locator(".practice-work-hero");
  await expect(hero.getByRole("heading", { level: 1, name: "Work", exact: true })).toBeVisible();
  await expect(
    hero.getByText("Product architecture, design systems, and AI-assisted delivery.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(hero.getByText("4", { exact: true })).toHaveCount(0);
  await expect(hero.getByText("Product · systems · AI", { exact: true })).toHaveCount(0);

  const caseStudies = page.getByRole("region", { name: "Case studies" });
  await expect(caseStudies).toBeVisible();
  await expect(caseStudies.getByRole("heading", { level: 2, name: "Case studies" })).toHaveCount(1);

  const workRows = caseStudies.locator(".practice-work-row");
  await expect(workRows).toHaveCount(4);
  await expect(workRows.nth(0).getByRole("heading")).toHaveText("Multi Product Integrations");
  await expect(workRows.nth(1).getByRole("heading")).toHaveText("AI Systems");
  await expect(workRows.nth(2).getByRole("heading")).toHaveText("Design Systems");
  await expect(workRows.nth(3).getByRole("heading")).toHaveText("UI Design Practices");
  await expect(caseStudies.locator(".practice-work-visual")).toHaveCount(4);
  await expect(caseStudies.locator(".practice-work-visual-image")).toHaveCount(0);
  await expect(caseStudies.locator(".practice-work-visual figcaption")).toHaveText([
    "Illustrative diagram",
    "Illustrative diagram",
    "Illustrative diagram",
    "Illustrative diagram",
  ]);
  await expect(caseStudies.locator(".practice-work-card-link")).toHaveCount(4);
});

test("mobile home uses the working-index structure without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I make complex products easier to understand, build, and evolve.",
      exact: true,
    }),
  ).toBeInViewport({ ratio: 1 });

  const selectedWork = page.getByRole("heading", {
    level: 2,
    name: "Selected work",
    exact: true,
  });
  await selectedWork.scrollIntoViewIfNeeded();
  await expect(selectedWork).toBeVisible();
  await expect(page.getByTestId("practice-rail")).toBeVisible();

  const integrationRow = page.locator('[data-practice-work="multi-product-integrations"]');
  await expect(integrationRow.getByRole("heading", { name: "Multi Product Integrations" })).toBeVisible();
  await expect(integrationRow.locator(".practice-work-preview")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.locator("nextjs-portal").evaluateAll((portals) => {
    portals.forEach((portal) => portal.remove());
  });
  await page.screenshot({
    animations: "disabled",
    fullPage: true,
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

test("unknown case studies remain out of public work routes", async ({ page }) => {
  await page.goto("/work/not-a-published-case-study");

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

  await expect(page.getByRole("heading", { level: 1, name: "Work", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Case studies" })).toBeVisible();
  await expect(page.locator(".practice-work-row")).toHaveCount(4);
  await expect(page.locator(".practice-work-visual figcaption")).toHaveCount(4);
  await expect(page.locator(".public-page")).toHaveCSS("animation-name", "none");
});
