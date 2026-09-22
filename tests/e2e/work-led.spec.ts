import { expect, test } from "@playwright/test";

test("approved work index presents each project's distinct structure", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { name: "How the product parts relate" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Unified framework" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance, foundations, and use patterns" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "People and governance" })).toBeVisible();
  await expect(page.getByText("Marketing surfaces", { exact: true })).toBeVisible();
  await expect(page.getByText("Enterprise-product surfaces", { exact: true })).toBeVisible();
  await expect(page.locator(".project-preview img")).toHaveCount(0);
});

test("detail pages trace the presentation to visible source sections", async ({ page }) => {
  await page.goto("/work/multi-product-integrations");

  const trace = page.getByRole("navigation", { name: "Source sections for this presentation" });
  const overviewLink = trace.getByRole("link", { name: "Overview" });
  await expect(overviewLink).toBeVisible();
  await expect(trace.getByRole("link", { name: "Exploration" })).toBeVisible();
  await expect(trace.getByRole("link", { name: "System / practice" })).toBeVisible();
  await expect(trace.getByRole("link", { name: "Outcomes" })).toBeVisible();
  await expect(page.getByText("Source media remains deferred pending ownership, client-IP, and disclosure review.")).toBeVisible();

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

