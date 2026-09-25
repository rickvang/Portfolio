import { expect, test } from "@playwright/test";

test("long-content harness state stays within the viewport", async ({ page }) => {
  await page.goto("/dev/harness?state=long-content");

  await expect(page.getByTestId("harness-root")).toHaveAttribute("data-harness-state", "long-content");
  await expect(page.getByRole("region", { name: "Project list" }).getByRole("article")).toHaveCount(8);
  await expect(page.getByRole("region", { name: "Posts preview" }).getByRole("article")).toHaveCount(4);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test("work index stacks and wraps without horizontal overflow", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("region", { name: "Selected work" })).toBeVisible();
  await expect(page.locator(".practice-work-row")).toHaveCount(4);
  await expect(page.locator(".practice-work-card-link")).toHaveCount(4);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});


test("mobile public navigation traps focus and returns it on Escape", async ({ page }) => {
  await page.goto("/work");

  const menuButton = page.getByRole("button", { name: "Open site navigation" });
  await expect(menuButton).toBeVisible();

  const menuBox = await menuButton.boundingBox();
  expect(menuBox?.width).toBeGreaterThanOrEqual(44);
  expect(menuBox?.height).toBeGreaterThanOrEqual(44);

  await menuButton.click();

  const drawer = page.getByRole("dialog", { name: "Site navigation" });
  const closeButton = drawer.getByRole("button", { name: "Close" });

  await expect(drawer).toBeVisible();
  await expect(closeButton).toBeFocused();

  const closeBox = await closeButton.boundingBox();
  expect(closeBox?.width).toBeGreaterThanOrEqual(44);
  expect(closeBox?.height).toBeGreaterThanOrEqual(44);

  await page.keyboard.press("Shift+Tab");
  await expect(drawer.getByRole("link", { name: "Contact" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveCSS("outline-width", "2px");
  await expect(menuButton).toHaveCSS("outline-color", "rgb(247, 242, 235)");
  await expect(menuButton).toHaveCSS("box-shadow", /rgb\(242, 76, 39\).*5px/);

  await menuButton.click();
  await page.getByRole("dialog", { name: "Site navigation" }).getByRole("link", { name: "Notes" }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.locator("#main-content")).toBeFocused();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});


test.describe("reduced motion", () => {
  test("public shell renders motion patterns at their final state", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work");

    await expect(page.locator(".public-page")).toHaveCSS("animation-name", "none");

    const menuButton = page.getByRole("button", { name: "Open site navigation" });
    await menuButton.click();

    await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCSS("animation-name", "none");
    await expect(page.locator(".mobile-drawer-backdrop")).toHaveCSS("animation-name", "none");
  });

  test("case-study chapters render immediately at their final state", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/dev/harness/case-study?slug=ai-systems");

    const contextChapter = page.locator('[data-case-study-chapter="context"]');
    await expect(contextChapter).toBeVisible();
    await expect(contextChapter).toHaveCSS("animation-name", "none");
    await expect(contextChapter).toHaveCSS("opacity", "1");
    await expect(contextChapter).toHaveCSS("transform", "none");
  });
});


test("mobile drawer entry can be interrupted immediately", async ({ page }) => {
  await page.goto("/dev/harness/shell?route=contact");

  const menuButton = page.getByRole("button", { name: "Open site navigation" });
  await menuButton.click();
  await page.keyboard.press("Escape");

  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  await expect(menuButton).toBeFocused();
  await expect(page.getByTestId("shell-harness-page")).toBeVisible();
});

