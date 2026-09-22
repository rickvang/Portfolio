import { expect, test } from "@playwright/test";

test("harness can switch and reset deterministic states", async ({ page }) => {
  await page.goto("/dev/harness");

  await expect(page.getByRole("heading", { name: "Development harness" })).toBeVisible();
  await expect(page.getByTestId("harness-root")).toHaveAttribute("data-harness-state", "success");
  await page.getByRole("button", { name: "error", exact: true }).click();
  await expect(page.getByRole("region", { name: "Project list" }).getByRole("alert")).toContainText(
    "could not load",
  );

  await page.getByRole("button", { name: "Reset harness" }).click();
  await expect(page.getByRole("heading", { name: "Project placeholder", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fixture post", exact: true })).toBeVisible();
});

test("harness can deep-link to a fixture state", async ({ page }) => {
  await page.goto("/dev/harness?state=empty");

  await expect(page.getByTestId("harness-root")).toHaveAttribute("data-harness-state", "empty");
  await expect(page.getByTestId("posts-state")).toContainText("No posts yet.");
  await expect(page.getByTestId("admin-workflow-preview")).toHaveAttribute("data-workflow-state", "empty");
});
