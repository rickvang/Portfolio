import { expect, test } from "@playwright/test";

test("homepage exposes the primary portfolio flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /clear home for work/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "View work" })).toHaveAttribute("href", "#work");
  await expect(page.getByRole("heading", { name: "A content-driven project list" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ideas can become a maintained content surface." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fixture post", exact: true })).toBeVisible();
});

test("public notes provide a list and detail route", async ({ page }) => {
  await page.goto("/notes");

  await expect(page.getByRole("heading", { name: "Latest notes" })).toBeVisible();
  await page.getByRole("link", { name: "Fixture post", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Fixture post", exact: true })).toBeVisible();
  await expect(page.getByText("Replace this fixture with approved content before production use.")).toBeVisible();
});

test("admin route explains missing Supabase configuration locally", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page.getByRole("heading", { name: "Supabase is not configured." })).toBeVisible();
});

test("health endpoint reports service readiness", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toMatchObject({
    checks: {
      app: "available",
      supabase: "not_configured",
    },
    readiness: {
      app: true,
      supabase: false,
    },
    service: "rickvang.com",
    status: "ok",
  });
});
