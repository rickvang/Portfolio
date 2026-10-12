import { expect, test } from "@playwright/test";

for (const width of [1280, 390]) {
  test(`navigation contact actions copy the address and preserve LinkedIn at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { document.documentElement.dataset.copiedEmail = text; } } });
    });
    await page.goto("/work");
    if (width < 900) await page.getByRole("button", { name: "Open site navigation" }).click();
    const group = page.getByRole("group", { name: "Contact Rick" });
    const copy = group.getByRole("button", { name: "Copy email address" });
    const linkedIn = group.getByRole("link", { name: "LinkedIn, opens in a new tab" });
    await expect(page.getByRole("navigation").getByRole("link", { name: "Contact", exact: true })).toHaveCount(0);
    await expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/rick-vang");
    for (const action of [copy, linkedIn]) {
      await expect(action).toHaveCSS("width", "44px");
      await expect(action).toHaveCSS("height", "44px");
      await expect.poll(async () => {
        const box = await action.boundingBox();
        return box ? Math.round(Math.min(box.width, box.height) * 100) / 100 : 0;
      }).toBeGreaterThanOrEqual(44);
    }
    await page.keyboard.press("Tab");
    await copy.focus();
    await expect(copy).toHaveCSS("outline-width", "2px");
    await expect(copy).toHaveCSS("outline-color", width < 900 ? "rgb(247, 242, 235)" : "rgb(183, 55, 28)");
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-copied-email", "rick@rickvang.com");
    await expect(group.getByRole("status")).toHaveText("Email address copied.");
    await expect(copy).toBeFocused();
    await expect(group.getByRole("status")).toHaveCSS("width", "1px");
    await page.screenshot({ path: `test-results/visual-snapshots/contact-navigation-${width}.png` });
    await expect(copy).toHaveAttribute("data-copied", "false");
    await linkedIn.focus();
    await page.keyboard.press("Tab");
    await page.screenshot({ path: `test-results/visual-snapshots/contact-navigation-rest-${width}.png` });
    if (width < 900) {
      await linkedIn.focus();
      await page.keyboard.press("Tab");
      await expect(page.getByRole("dialog").getByRole("button", { name: "Close", exact: true })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Open site navigation" })).toBeFocused();
    }
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

for (const width of [1280, 390]) {
test(`clipboard rejection allows manual copy at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("blocked"); } } });
  });
  await page.goto("/work");
  const group = page.getByRole("group", { name: "Contact Rick" });
  const copy = group.getByRole("button", { name: "Copy email address" });
  if (width < 900) await page.getByRole("button", { name: "Open site navigation" }).click();
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(group.getByRole("status")).toBeVisible();
  await expect(group.getByRole("status")).toContainText("Could not copy. Select and copy:");
  const fallback = group.getByRole("textbox", { name: "Email address to copy manually" });
  await expect(fallback).toHaveValue("rick@rickvang.com");
  await expect(fallback).toBeFocused();
  expect(await fallback.evaluate((element) => (element as HTMLInputElement).selectionEnd)).toBe(17);
  await expect(page).toHaveURL(/\/work$/);
});

}
