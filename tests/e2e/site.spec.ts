import { expect, test } from "@playwright/test";

test("homepage is driven by approved portfolio content", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "I make complex products easier to understand, build, and evolve.",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/I work across product strategy, systems design, and AI-assisted delivery/i),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "See the work ↓" })).toHaveAttribute(
    "href",
    "#selected-work",
  );

  await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
  await expect(page.getByTestId("practice-rail")).toBeVisible();
  await expect(page.getByTestId("practice-nav-marker")).toHaveAttribute("data-visible", "false");
  await expect(page.locator(".practice-header")).toHaveCount(0);

  await expect(page.getByRole("heading", { name: "Selected work", exact: true })).toBeVisible();
  const selectedWork = page.locator("#selected-work");
  const workRows = selectedWork.locator(".practice-work-row");
  await expect(workRows).toHaveCount(4);
  await expect(workRows.nth(0).getByRole("heading")).toHaveText("Multi Product Integrations");
  await expect(workRows.nth(1).getByRole("heading")).toHaveText("AI Systems");
  await expect(workRows.nth(2).getByRole("heading")).toHaveText("Design Systems");
  await expect(workRows.nth(3).getByRole("heading")).toHaveText("UI Design Practices");
  await expect(
    selectedWork.getByText(/Turning a fragmented ecosystem of products, workflows, and data/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/Building a durable operating system for collaborating with specialized AI agents/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/Creating reusable product foundations and lightweight governance/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/Turning design principles into a repeatable design-to-implementation practice/i),
  ).toBeVisible();
  await expect(selectedWork.locator(".practice-work-visual-image")).toHaveCount(2);
  await expect(selectedWork.locator(".practice-work-visual figcaption")).toHaveText([
    "Selected interface studies for shared service workflows. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
    "Selected design-system foundations and reusable patterns. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
  ]);
  await expect(selectedWork.locator(".practice-work-visual-image img").nth(0)).toHaveAttribute(
    "alt",
    "Overlapping service interfaces showing work-order records, service listings, inventory, and a map-based activity view.",
  );
  await expect(selectedWork.locator(".practice-work-visual-image img").nth(1)).toHaveAttribute(
    "alt",
    "Collage of interface patterns, color and contrast scales, and typography examples from a design system.",
  );
  await expect(page.getByRole("heading", { name: "The throughline", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Persona-led Design Starts Before the Screen", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "About", exact: true })).toBeVisible();

  await expect(page.getByText("Fixture post", { exact: true })).toHaveCount(0);

  await expect(page.getByText("13+", { exact: true })).toBeVisible();
  await expect(page.getByText("14+", { exact: true })).toBeVisible();
  await expect(page.getByText("30+", { exact: true })).toBeVisible();

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  await expect(navigation.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  await expect(navigation.getByRole("link", { name: "Notes" })).toHaveAttribute("href", "/notes");
  await expect(page.getByRole("link", { name: "Rick Vang, home" })).toHaveAttribute("href", "/");
  await expect(page.locator('a[href^="/dev/harness"]')).toHaveCount(0);
});

test("about page renders the approved biography and experience summary", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: "A decade-long craft defined with empathy" })).toBeVisible();
  await expect(page.getByText(/Over 13 years, I've worked at the intersection of product design/i)).toBeVisible();
  await expect(page.getByText("Years of Experience", { exact: true })).toBeVisible();
  await expect(page.getByText("Companies", { exact: true })).toBeVisible();
  await expect(page.getByText("Projects Delivered", { exact: true })).toBeVisible();
});

test("approved imported work is public through the shared case-study routes", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1, name: "Work", exact: true })).toBeVisible();
  await expect(
    page.getByText("Product architecture, design systems, and AI-assisted delivery.", {
      exact: true,
    }),
  ).toBeVisible();
  const caseStudies = page.getByRole("region", { name: "Case studies" });
  await expect(caseStudies).toBeVisible();
  await expect(caseStudies.getByRole("heading", { level: 2, name: "Case studies" })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(caseStudies.locator(".practice-work-row")).toHaveCount(4);
  await expect(caseStudies.locator(".practice-work-visual-image")).toHaveCount(2);
  await expect(caseStudies.locator(".practice-work-visual figcaption")).toHaveText([
    "Selected interface studies for shared service workflows. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
    "Selected design-system foundations and reusable patterns. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
  ]);
  await expect(page.locator(".practice-work-facts")).toHaveCount(0);
  await expect(page.locator(".project-preview")).toHaveCount(0);

  await page.goto("/work/multi-product-integrations");
  await expect(page).toHaveTitle("Multi Product Integrations | Rick Vang");
  await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
  await expect(page.getByTestId("practice-nav-marker")).toHaveAttribute("data-visible", "true");
  await expect(page.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fragmentation was the starting condition." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Start with people and workflows." })).toBeVisible();
  await expect(page.getByText(/client intellectual property/i)).toBeVisible();

  await page.goto("/work/design-systems");
  await expect(page).toHaveTitle("Design Systems | Rick Vang");
  await expect(page.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(page.getByText("Lightweight governance", { exact: true })).toBeVisible();
  await expect(page.getByText(/client intellectual property/i)).toBeVisible();
});

test("existing authored AI work is public through its intended routes", async ({ page }) => {
  await page.goto("/work/ai-systems");
  await expect(page).toHaveTitle("AI Systems | Rick Vang");
  await expect(page.getByRole("heading", { name: "AI Systems", exact: true })).toBeVisible();
  await expect(page.locator(".case-study-hero .lede")).toContainText("repository-backed orchestration system");

  await page.goto("/work/ui-design-practices");
  await expect(page).toHaveTitle("UI Design Practices | Rick Vang");
  await expect(page.getByRole("heading", { name: "UI Design Practices", exact: true })).toBeVisible();
  await expect(page.locator(".case-study-hero .lede")).toContainText("staged design-to-implementation practice");

  await page.goto("/notes/persona-led-design-discovery");
  await expect(page).toHaveTitle("Persona-led Design Starts Before the Screen | Rick Vang");
  await expect(
    page.getByRole("heading", { name: "Persona-led Design Starts Before the Screen", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/AI personas are most useful to my design process/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Frame the problem before selecting personas" })).toBeVisible();
});

test("public notes include source-controlled publications without fixture leakage", async ({ page }) => {
  await page.goto("/notes");

  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Persona-led Design Starts Before the Screen", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Fixture post", { exact: true })).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Notes" }),
  ).toHaveAttribute("aria-current", "page");

  await page.goto("/notes/fixture-post");
  await expect(page).toHaveTitle("Note not found | Rick Vang");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
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
