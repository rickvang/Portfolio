import { expect, test } from "@playwright/test";

test("approved work uses content-derived project grammar", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByText("System topology", { exact: true })).toBeVisible();
  await expect(page.getByText("Unified framework", { exact: true })).toBeVisible();
  await expect(page.getByText("Design system structure", { exact: true })).toBeVisible();
  await expect(page.getByText("Collaboration and governance", { exact: true })).toBeVisible();
});

test("harness shows the deferred source-media state", async ({ page }) => {
  await page.goto("/dev/harness");

  const previewHarness = page.getByTestId("project-preview-harness");
  await expect(previewHarness).toContainText("Project preview and artifact states");
  await expect(previewHarness).toContainText("Source media deferred");
});
