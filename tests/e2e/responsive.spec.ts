import { expect, test } from "@playwright/test";

test("long-content harness state stays within the viewport", async ({ page }) => {
  await page.goto("/dev/harness?state=long-content");

  await expect(page.getByTestId("harness-root")).toHaveAttribute("data-harness-state", "long-content");
  await expect(page.getByRole("region", { name: "Project list" }).getByRole("article")).toHaveCount(8);
  await expect(page.getByRole("region", { name: "Posts preview" }).getByRole("article")).toHaveCount(4);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});


test("mobile public navigation traps focus and returns it on Escape", async ({ page }) => {
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open site navigation" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  const drawer = page.getByRole("dialog", { name: "Site navigation" });
  const closeButton = drawer.getByRole("button", { name: "Close" });

  await expect(drawer).toBeVisible();
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(drawer.getByRole("link", { name: "Contact" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(menuButton).toBeFocused();

  await menuButton.click();
  await page.getByRole("dialog", { name: "Site navigation" }).getByRole("link", { name: "Notes" }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.locator("#main-content")).toBeFocused();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});


test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("public shell renders motion patterns at their final state", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".public-page")).toHaveCSS("animation-name", "none");

    const menuButton = page.getByRole("button", { name: "Open site navigation" });
    await menuButton.click();

    await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCSS("animation-name", "none");
    await expect(page.locator(".mobile-drawer-backdrop")).toHaveCSS("animation-name", "none");
  });
});
