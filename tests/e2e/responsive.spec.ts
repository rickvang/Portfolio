import { expect, test } from "@playwright/test";

test("long-content harness state stays within the viewport", async ({ page }) => {
  await page.goto("/dev/harness?state=long-content");

  await expect(page.getByTestId("harness-root")).toHaveAttribute("data-harness-state", "long-content");
  await expect(page.getByRole("region", { name: "Project list" }).getByRole("article")).toHaveCount(8);
  await expect(page.getByRole("region", { name: "Posts preview" }).getByRole("article")).toHaveCount(4);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});
