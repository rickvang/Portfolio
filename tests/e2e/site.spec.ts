import { expect, test } from "@playwright/test";

test("homepage introduces project evidence and ends with contact on desktop and mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [{ width: 1280, height: 720 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByTestId("practice-rail").getByText("Rick Vang", { exact: true })).toBeInViewport();
    const firstProject = page.getByRole("heading", { name: "Multi Product Integrations", exact: true });
    await expect(firstProject).toBeInViewport();
    if (viewport.width > 620) {
      await expect(page.locator(".practice-work-art").first()).toBeInViewport();
    }
    await page.screenshot({ path: `test-results/visual-snapshots/home-ux-first-${viewport.width}.png` });

    for (const figure of await page.locator(".practice-work-visual").all()) {
      const art = await figure.locator(".practice-work-art").boundingBox();
      const caption = await figure.locator("figcaption").boundingBox();
      expect(art).not.toBeNull();
      expect(caption).not.toBeNull();
      expect(caption!.y).toBeGreaterThanOrEqual(art!.y + art!.height);
    }
    const stats = page.locator(".practice-home .profile-stats");
    const contact = page.getByRole("link", { name: "Get in touch →", exact: true });
    const statsBox = await stats.boundingBox();
    const contactBox = await contact.boundingBox();
    expect(statsBox).not.toBeNull();
    expect(contactBox).not.toBeNull();
    expect(contactBox!.y).toBeGreaterThanOrEqual(statsBox!.y + statsBox!.height);
    if (viewport.width <= 620) expect(statsBox!.height).toBeLessThan(180);
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeInViewport();
    await expect(contact).toHaveAttribute("href", "/contact");
    await page.screenshot({ path: `test-results/visual-snapshots/home-ux-close-${viewport.width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
});

test("hero flows normally and stays drawn and still with reduced motion after resize", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const frame = page.locator('[data-practice-canvas="hero"]');
  const canvas = frame.locator("canvas");
  await expect(frame).toHaveAttribute("data-canvas-ready", "true");
  const pixels = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  const movingFrame = await pixels();
  await expect.poll(pixels).not.toBe(movingFrame);

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await expect.poll(() => canvas.evaluate((element: HTMLCanvasElement) => {
      const context = element.getContext("2d")!;
      return context.getImageData(0, 0, element.width, element.height).data.some((value, index) => index % 4 === 3 && value > 0);
    })).toBe(true);
    // Allow ResizeObserver and the media-query change to settle before comparing frames.
    await page.waitForTimeout(200);
    const stillFrame = await pixels();
    await page.mouse.move(200, 300);
    await page.waitForTimeout(250);
    expect(await pixels()).toBe(stillFrame);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    await page.screenshot({ path: `test-results/visual-snapshots/hero-flow-${width}.png` });
  }
});

test("contact offers usable direct links", async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    const email = page.getByRole("link", { name: "rick@rickvang.com", exact: true });
    const linkedIn = page.getByRole("link", { name: "Connect on LinkedIn", exact: true });
    await expect(email).toHaveAttribute("href", "mailto:rick@rickvang.com");
    await expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/rick-vang");
    await expect(email).toBeVisible();
    await expect(linkedIn).toBeVisible();
    await expect(email).toBeInViewport();
    await linkedIn.scrollIntoViewIfNeeded();
    await expect(linkedIn).toBeInViewport();
    await email.focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", {name:"Copy email"})).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(linkedIn).toBeFocused();
    await expect(page.getByRole("button", { name: /send/i })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    await page.screenshot({ path: `test-results/visual-snapshots/contact-${width}.png`, fullPage: true });
  }
});

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
    selectedWork.getByText(/I helped define shared workflow patterns and Figma libraries/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/I built a research-grounded persona framework/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/I designed a platform framework within a shared core library/i),
  ).toBeVisible();
  await expect(
    selectedWork.getByText(/I connect layout, information density and control states/i),
  ).toBeVisible();
  await expect(selectedWork.locator(".practice-work-visual-image")).toHaveCount(2);
  await expect(selectedWork.locator(".practice-work-visual figcaption")).toHaveText([
    "Shared service interfaces · client screens modified to protect intellectual property.",
    "Illustrative diagram",
    "Design-system foundations · client screens modified to protect intellectual property.",
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
  await expect(page.getByRole("heading", { name: "How I work", exact: true })).toBeVisible();
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

  await expect(page.getByRole("heading", { name: /I’m most useful/ })).toBeVisible();
  await expect(page.getByText(/Over 13 years, I’ve worked at the intersection of product design/i)).toBeVisible();
  await expect(page.getByText("Years of Experience", { exact: true })).toBeVisible();
  await expect(page.getByText("Companies", { exact: true })).toBeVisible();
  await expect(page.getByText("Projects Delivered", { exact: true })).toBeVisible();
});

test("approved imported work is public through the shared case-study routes", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1, name: /Designing the parts/ })).toBeVisible();
  const caseStudies = page.getByRole("region", { name: "Case studies" });
  await expect(caseStudies).toBeVisible();
  await expect(caseStudies.locator(".project")).toHaveCount(4);
  await expect(caseStudies.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
  await expect(caseStudies.getByRole("heading", { name: "Design Systems", exact: true })).toBeVisible();
  await expect(caseStudies.locator(".gallery-note")).toHaveCount(1);

  await page.goto("/work/multi-product-integrations");
  await expect(page).toHaveTitle("Multi Product Integrations | Rick Vang");
  await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
  await expect(page.getByTestId("practice-nav-marker")).toHaveAttribute("data-visible", "true");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shared patterns.Room for different work.");
  await expect(page.getByText(/I worked with three teammates/)).toBeVisible();
  await expect(page.getByText(/Illustrative UI with fictional records/)).toBeVisible();

  await page.goto("/work/design-systems");
  await expect(page).toHaveTitle("Design Systems | Rick Vang");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A common foundation.");
  await expect(page.getByText(/I designed the platform framework/)).toBeVisible();
  await expect(page.getByText(/Illustrative comparison with fictional content/)).toBeVisible();
});

test("existing authored AI work is public through its intended routes", async ({ page }) => {
  await page.goto("/work/ai-systems");
  await expect(page).toHaveTitle("AI Systems | Rick Vang");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Give AI a model");
  await expect(page.locator(".approved-story .intro")).toContainText("map of how their roles depended on each other");

  await page.goto("/work/ui-design-practices");
  await expect(page).toHaveTitle("UI Design Practices | Rick Vang");
  await expect(page.getByRole("heading", { name: "How I approach interface design.", exact: true })).toBeVisible();
  await expect(page.locator(".craft-intro")).toContainText("user workflows, visual hierarchy and reusable patterns");

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
