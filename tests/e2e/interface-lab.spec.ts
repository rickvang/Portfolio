import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

test("the approved UI Systems Lab is linked from Work", async ({ page }) => {
  await page.goto("/work");
  const card = page.getByRole("link", { name: /UI Systems Lab/ });
  await expect(card).toHaveCount(1);
  await card.click();
  await expect(page).toHaveURL(/\/work\/ui-systems-lab$/);
  await expect(page.getByRole("heading", { level: 1, name: "Building a place to think in UI." })).toBeVisible();
  await expect(page.getByText("Review-ready content.")).toHaveCount(0);
});

test("the approved story and illustrations work across screen widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/ui-systems-lab");
    await expect(page.getByRole("heading", { level: 2, name: "Putting the pieces together" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Trying a flow in context" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore Storybook/ })).toHaveAttribute("href", "https://ui-starter.rickvang.com");
    await expect(page.getByText(/does not persist a record/)).toBeVisible();
    await expect(page.getByText(/not a screenshot or a record of a completed study/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Vite source/ })).toHaveAttribute("href", /github.com\/rickvang\/ui-starter\/blob/);
    await expect(page.getByRole("link", { name: /TanStack source/ })).toHaveAttribute("href", /github.com\/rickvang\/ui-startertanstack\/blob/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  }
});
