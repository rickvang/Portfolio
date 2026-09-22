import { expect, test } from "@playwright/test";

test("homepage is driven by approved portfolio content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Hi, I'm Rick.", exact: true })).toBeVisible();
  await expect(page.getByText(/product design leader driven by creating systems/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "View work" })).toHaveAttribute("href", "/work");
  await expect(page.getByRole("heading", { name: "Recent projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A decade-long craft defined with empathy" })).toBeVisible();
  await expect(page.getByText("11+", { exact: true })).toBeVisible();
  await expect(page.getByText("14+", { exact: true })).toBeVisible();
  await expect(page.getByText("30+", { exact: true })).toBeVisible();

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  await expect(navigation.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  await expect(navigation.getByRole("link", { name: "Notes" })).toHaveAttribute("href", "/notes");
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  await expect(navigation.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  await expect(page.locator('a[href^="/dev/harness"]')).toHaveCount(0);
});

test("about page renders the approved biography and experience summary", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: "A decade-long craft defined with empathy" })).toBeVisible();
  await expect(page.getByText(/spent over a decade designing and building software/i)).toBeVisible();
  await expect(page.getByRole("term", { name: "Years of Experience" })).toBeVisible();
  await expect(page.getByRole("term", { name: "Companies" })).toBeVisible();
  await expect(page.getByRole("term", { name: "Projects Delivered" })).toBeVisible();
});

test("approved imported work is public through the shared case-study routes", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(page.getByTestId("case-study-list-empty")).toHaveCount(0);

  await page.goto("/work/multi-product-integrations");
  await expect(page).toHaveTitle("Multi Product Integrations | Rick Vang");
  await expect(page.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Case study chapters" })).toContainText("Exploration");
  await expect(page.getByText(/client intellectual property/i)).toBeVisible();

  await page.goto("/work/design-systems");
  await expect(page).toHaveTitle("Design Systems | Rick Vang");
  await expect(page.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(page.getByText("Lightweight governance", { exact: true })).toBeVisible();
  await expect(page.getByText(/client intellectual property/i)).toBeVisible();
});

test("authored editorial drafts remain unavailable on public routes", async ({ page }) => {
  for (const slug of ["ai-systems", "ui-design-practices"]) {
    await page.goto(`/work/${slug}`);
    await expect(page).toHaveTitle("Case study not found | Rick Vang");
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  }

  await page.goto("/notes/persona-led-design-discovery");
  await expect(page).toHaveTitle("Note not found | Rick Vang");
  await expect(page.getByText(/AI personas are most useful to my design process/i)).toHaveCount(0);
});

test("public notes provide a list and detail route", async ({ page }) => {
  await page.goto("/notes");

  await expect(page.getByRole("heading", { name: "Latest notes" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Notes" }),
  ).toHaveAttribute("aria-current", "page");
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
      overall: false,
      supabase: false,
    },
    service: "rickvang.com",
    status: "degraded",
  });
});
