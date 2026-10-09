import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const stories = [
  { slug: "multi-product-integrations", title: "Shared patterns.", example: ".record-ui" },
  { slug: "design-systems", title: "A common foundation.", example: ".density-demo" },
  { slug: "ai-systems", title: "Give AI a model", example: ".dependency-example" },
];

for (const story of stories) {
  test(`${story.slug} preserves the site shell and readable examples`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/work/${story.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(story.title);
    await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
    await expect(page.getByText("CONCEPTS FOR REVIEW", { exact: true })).toHaveCount(0);
    await expect(page.locator(".review, .rail, .signature")).toHaveCount(0);
    await expect(page.locator('.approved-story a[href^="http"]')).toHaveCount(0);
    if (story.slug !== "ai-systems") {
      await expect(page.getByRole("complementary", { name: "Client intellectual property note" })).toContainText("client intellectual property");
    }
    await mkdir("test-results/visual-snapshots", { recursive: true });
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
      await expect(page.locator(story.example)).toBeVisible();
      if (width === 1440 || width === 390) {
        await page.screenshot({ path: `test-results/visual-snapshots/${story.slug}-${width}.png`, fullPage: true });
      }
    }
    const returnLink = page.locator(".approved-story .closing a");
    await returnLink.scrollIntoViewIfNeeded();
    await returnLink.focus();
    await expect(returnLink).toBeFocused();
    await returnLink.press("Enter");
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("heading", { level: 1, name: /Designing the parts/ })).toBeVisible();
  });
}
