import { expect, test } from "@playwright/test";

test("practice overview and chapter links support scanning and keyboard navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/work/ui-design-practices");

  const overview = page.getByRole("figure", { name: "Build sequence From structure to a working interface" });
  await expect(overview).toBeVisible();
  await expect(page.locator(".case-study-hero").getByRole("figure")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "System", exact: true }).getByRole("figure")).toHaveCount(1);
  await expect(overview.getByRole("listitem")).toHaveCount(4);
  await expect(page.getByText("Source media deferred", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Project structure", exact: true })).toHaveCount(0);

  const chapters = page.getByRole("navigation", { name: "Case study chapter path", exact: true });
  await expect(chapters.getByRole("link")).toHaveCount(5);
  const systemLink = chapters.getByRole("link", { name: "System", exact: true });
  await systemLink.focus();
  await expect(systemLink).toBeFocused();
  await expect(systemLink).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#ui-design-practices-chapter-system$/);
  await expect(page.getByRole("heading", { level: 2, name: "System", exact: true })).toBeInViewport();
  await expect(overview).toBeInViewport();

  for (const link of await chapters.getByRole("link").all()) {
    const target = await link.getAttribute("href");
    expect(target).toBeTruthy();
    await expect(page.locator(target!)).toHaveCount(1);
  }
});

test("practice stays readable at narrow widths and with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/ui-design-practices");

  for (const width of [1440, 1024, 900, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    const index = page.getByRole("navigation", { name: "Case study chapters", exact: true });
    if (width <= 900) await expect(index).toBeHidden();
    else await expect(index).toBeVisible();
    const chapterPath = page.getByRole("navigation", { name: "Case study chapter path", exact: true });
    const outcomesLink = chapterPath.getByRole("link", { name: "Outcomes", exact: true });
    await outcomesLink.click();
    const target = page.locator("#ui-design-practices-chapter-outcomes");
    await expect(target).toHaveCSS("animation-name", "none");
    await expect(page.getByRole("heading", { name: "Outcomes", level: 2, exact: true })).toBeInViewport();
    if (width <= 900) {
      expect((await target.boundingBox())!.y).toBeGreaterThanOrEqual(76);
    }
  }

  await page.goto("/dev/harness/case-study?slug=ui-design-practices");
  await expect(page.getByRole("figure", { name: "Build sequence From structure to a working interface" })).toBeVisible();
  await expect(page.getByText("Source provenance", { exact: true })).toBeVisible();

  await page.goto("/work/ui-design-practices-revision");
  await expect(page).toHaveTitle("Case study not found | Rick Vang");
});
