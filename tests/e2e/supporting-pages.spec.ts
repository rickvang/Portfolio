import { expect, test } from "@playwright/test";

test("contact copy confirms success and gives visible recovery when clipboard access fails", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => sessionStorage.setItem("copied-email", text) },
    });
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => sessionStorage.getItem("copied-email"))).toBe("rick@rickvang.com");

  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: async () => { throw new Error("Clipboard denied"); } },
    });
  });
  await page.getByRole("button", { name: "Copied", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Could not copy. Select rick@rickvang.com to copy it manually.");
  await expect(page.getByRole("status")).toBeVisible();
  await expect(page.getByRole("link", { name: "rick@rickvang.com", exact: true })).toHaveAttribute("href", "mailto:rick@rickvang.com");
});

test("supporting pages preserve navigation and fit a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["work", "about", "contact"]) {
    await page.goto(`/${route}`);
    await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/visual-snapshots/supporting-${route}-mobile.png`, fullPage: true });
  }
  await page.getByRole("button", { name: "Open site navigation" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "See AI Systems" })).toHaveAttribute("href", "/work/ai-systems");
});
