import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

test("UI Systems Lab remains review-only until the source record is approved", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "UI Systems Lab" })).toHaveCount(0);
  await page.goto("/work/ui-systems-lab");
  await expect(page).toHaveTitle("Case study not found | Rick Vang");

  await page.goto("/dev/harness/case-study?slug=ui-systems-lab");
  await expect(page.getByText("Review-ready content.")).toBeVisible();
  await expect(page.getByText("Source provenance", { exact: true })).toBeVisible();
  await page.locator(".case-study-evidence").first().locator("summary").click();
  await expect(page.getByText("The owner specified one Storybook project", { exact: false })).toBeVisible();
});

test("Storybook-first draft is readable and linked across screen widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dev/harness/case-study?slug=ui-systems-lab&view=story");
    await expect(page.getByRole("heading", { level: 1, name: "UI Systems Lab." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore the Storybook catalog" })).toHaveAttribute(
      "href", "https://ui-starter.rickvang.com",
    );
    await expect(page.getByRole("img", { name: /Illustrative map of the Storybook catalog/ })).toBeVisible();
    await expect(page.locator(".lab-catalog-item")).toHaveCount(5);
    await expect(page.locator(".lab-workspace")).toHaveCount(2);
    await expect(page.getByRole("link", { name: /View Vite source/ })).toHaveAttribute(
      "href", /github.com\/rickvang\/ui-starter\/blob/,
    );
    await expect(page.getByRole("link", { name: /View TanStack Start source/ })).toHaveAttribute(
      "href", /github.com\/rickvang\/ui-startertanstack\/blob/,
    );
    await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: /Prototype spaces/ }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Two spaces for trying ideas" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  }
});
