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
  await expect(page.getByTestId("posts-state")).toContainText("No notes published yet.");
  await expect(page.getByTestId("admin-workflow-preview")).toHaveAttribute("data-workflow-state", "empty");
});

test("contact form exposes success and disabled interaction states", async ({ page }) => {
  await page.goto("/dev/harness?state=success");

  const contactForm = page.getByTestId("contact-form");
  await expect(contactForm.getByLabel("Name")).toBeEnabled();
  await contactForm.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByTestId("contact-feedback")).toContainText("Message ready to send.");

  await page.goto("/dev/harness?state=disabled");
  await expect(page.getByTestId("contact-form").getByLabel("Name")).toBeDisabled();
  await expect(page.getByTestId("contact-form").getByRole("button", { name: "Send message" })).toBeDisabled();
});

test("harness previews the attributed approved public source", async ({ page }) => {
  await page.goto("/dev/harness");

  const preview = page.getByTestId("imported-content-preview");
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("Profile status: approved");
  await expect(preview).toContainText("Source capture: reviewed");
  await expect(preview).toContainText("Multi Product Integrations");
  await expect(preview).toContainText("Design Systems");
  await expect(preview.getByRole("link", { name: "Review the captured source" })).toHaveAttribute(
    "href",
    "https://www.rickvang.com/",
  );
});

test("harness exercises approved imported work through the shared case-study template", async ({ page }) => {
  await page.goto("/dev/harness");

  const integrations = page.getByTestId("case-study-review-multi-product-integrations");
  const designSystems = page.getByTestId("case-study-review-design-systems");

  await expect(integrations).toHaveAttribute("data-case-study-status", "approved");
  await expect(designSystems).toHaveAttribute("data-case-study-status", "approved");

  await expect(integrations.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(designSystems.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();

  await expect(integrations.getByRole("navigation", { name: "Case study chapters" })).toContainText("Context");
  await expect(integrations.getByRole("navigation", { name: "Case study chapters" })).toContainText("Outcomes");
  await expect(designSystems.getByText("Lightweight governance", { exact: true })).toBeVisible();

  await expect(integrations).toContainText("Approved content.");
  await expect(integrations).toContainText("eligible for public rendering");
  await expect(integrations.getByText(/client intellectual property/i)).toBeVisible();
  await expect(designSystems.getByText(/client intellectual property/i)).toBeVisible();
});

test("harness exposes authored editorial sources with their publication state", async ({ page }) => {
  await page.goto("/dev/harness");

  const aiSystems = page.getByTestId("case-study-review-ai-systems");
  const uiPractices = page.getByTestId("case-study-review-ui-design-practices");
  const article = page.getByTestId("editorial-draft-persona-led-design-discovery");

  await expect(aiSystems).toHaveAttribute("data-case-study-status", "approved");
  await expect(uiPractices).toHaveAttribute("data-case-study-status", "approved");
  await expect(article).toHaveAttribute("data-editorial-status", "published");

  await expect(aiSystems.getByRole("heading", { name: "AI Systems", exact: true })).toBeVisible();
  await expect(uiPractices.getByRole("heading", { name: "UI Design Practices", exact: true })).toBeVisible();
  await expect(article.getByRole("heading", { name: "Persona-led Design Starts Before the Screen" })).toBeVisible();

  const chapterNav = aiSystems.getByRole("navigation", { name: "Case study chapters" });
  for (const chapter of ["Context", "Personas", "Exploration", "System", "Outcomes"]) {
    await expect(chapterNav).toContainText(chapter);
  }

  await expect(aiSystems.getByRole("heading", { level: 3, name: "Context", exact: true })).toBeVisible();
  await expect(aiSystems.getByRole("heading", { level: 3, name: "System / practice", exact: true })).toBeVisible();
  await expect(aiSystems.getByRole("heading", { level: 4, name: "Current Work", exact: true })).toBeVisible();

  await expect(article).toContainText("Synthetic persona responses are explicitly not framed as observed user research.");
});

test("shell harness exposes deterministic active-route state", async ({ page }) => {
  await page.goto("/dev/harness/shell?route=work");

  const shell = page.getByTestId("site-shell-frame");
  await expect(shell).toBeVisible();
  await expect(page.getByTestId("shell-harness-page")).toContainText("Active route");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }),
  ).toHaveAttribute("aria-current", "page");
});

test("case-study harness can deep-link to an authored draft", async ({ page }) => {
  await page.goto("/dev/harness/case-study?slug=ai-systems");

  const caseStudy = page.getByTestId("case-study-review-ai-systems");
  await expect(caseStudy).toHaveAttribute("data-case-study-status", "approved");
  await expect(caseStudy.getByRole("heading", { name: "AI Systems", exact: true })).toBeVisible();
  await expect(caseStudy).toContainText("eligible for public rendering");
});

test("destructive post action requires explicit confirmation", async ({ page }) => {
  await page.goto("/dev/harness");

  const form = page.getByTestId("delete-post-form");
  const confirmation = form.getByRole("checkbox", {
    name: "I understand this permanently deletes the post.",
  });
  const deleteButton = form.getByRole("button", { name: "Delete" });

  await expect(confirmation).toHaveAttribute("required", "");
  await deleteButton.click();

  await expect(confirmation).toBeFocused();
  await expect(form.getByRole("alert")).toHaveCount(0);

  await confirmation.check();
  await deleteButton.click();

  await expect(form.getByRole("alert")).toContainText("Supabase is not configured for this environment.");
});
