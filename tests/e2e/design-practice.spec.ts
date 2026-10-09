import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

// Multiple cold-compiled routes and optimized images can exceed the default 30s locally.
test.setTimeout(60_000);

test("approved craft story supports chapter navigation, evidence inspection and return to Work", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/work/ui-design-practices");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How I approach interface design.");
  await expect(page.getByText(/primary contributor working with three teammates/)).toBeVisible();
  await expect(page.getByText(/libraries were generally adopted/)).toBeVisible();
  await expect(page.getByText("Build sequence", { exact: true })).toHaveCount(0);
  await expect(page.locator('a[href*="rickvang.com"]')).toHaveCount(0);
  const chapters = page.getByRole("navigation", { name: "On this page" });
  await expect(chapters.getByRole("link")).toHaveCount(3);
  for (const link of await chapters.getByRole("link").all()) {
    const target = (await link.getAttribute("href"))!;
    await expect(page.locator(target)).toHaveCount(1);
    await expect(page.locator(target).locator(".craft-label").first()).toContainText((await link.innerText()).slice(2).trim());
  }
  const decisionLink = chapters.getByRole("link", { name: "Make design decisions" });
  await decisionLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#decisions$/);
  await expect(page.getByRole("heading", { name: "The same system. Different design decisions." })).toBeInViewport();
  const tabs = page.getByRole("tablist", { name: "Explore design decisions" });
  const layout = tabs.getByRole("tab", { name: "Layout & context" });
  await layout.focus();
  await page.keyboard.press("ArrowRight");
  const density = tabs.getByRole("tab", { name: "Density & hierarchy" });
  await expect(density).toBeFocused();
  await expect(density).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("third-party reference UI");
  const enlarge = page.getByRole("button", { name: "Enlarge the selected illustration" });
  await enlarge.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(enlarge).toBeFocused();
  await tabs.getByRole("tab", { name: "Foundations & patterns" }).click();
  const image = page.getByRole("tabpanel").getByRole("img");
  await expect(image).toHaveAttribute("src", /foundations/);
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await enlarge.click();
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(enlarge).toBeFocused();
  await layout.click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("heading", { level: 1 }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir("test-results/visual-snapshots", { recursive: true });
  await page.screenshot({ path: "test-results/visual-snapshots/ui-practice-desktop.png", fullPage: true });
  await page.getByRole("navigation", { name: "Return to work" }).getByRole("link", { name: "Back to all work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("link", { name: /UI Design Practices/ }).first()).toBeVisible();
});

test("craft examples fit narrow screens and reduced-motion navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/ui-design-practices");
  for (const width of [1440, 1024, 900, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ["Layout & context", "Density & hierarchy", "Foundations & patterns"]) {
      await page.getByRole("tab", { name }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    }
    await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Build a shared practice" }).click();
    await expect(page.getByRole("heading", { name: "A design system is also a way of working together." })).toBeInViewport();
    if (width <= 900) expect((await page.locator("#practice").boundingBox())!.y).toBeGreaterThanOrEqual(76);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Layout & context" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir("test-results/visual-snapshots", { recursive: true });
  await page.screenshot({ path: "test-results/visual-snapshots/ui-practice-mobile.png", fullPage: true });
});

test("the harness retains evidence and unpublished revisions remain private", async ({ page }) => {
  await page.goto("/dev/harness/case-study?slug=ui-design-practices&view=story");
  await expect(page.getByRole("heading", { level: 1, name: "How I approach interface design." })).toBeVisible();
  await page.goto("/dev/harness/case-study?slug=ui-design-practices");
  await expect(page.getByText("Source provenance", { exact: true })).toBeVisible();
  await page.goto("/work/ui-design-practices-revision", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle("Case study not found | Rick Vang");
});
