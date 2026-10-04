import { expect, test } from "@playwright/test";

test("work index pairs each project with its approved image or labelled illustration", async ({ page }) => {
  await page.goto("/work");

  const hero = page.locator(".practice-work-hero");
  await expect(hero.getByRole("heading", { level: 1, name: "Work", exact: true })).toBeVisible();
  await expect(
    hero.getByText("Product architecture, design systems, and AI-assisted delivery.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(hero.getByText("4", { exact: true })).toHaveCount(0);
  await expect(hero.getByText("Product · systems · AI", { exact: true })).toHaveCount(0);

  const caseStudies = page.getByRole("region", { name: "Case studies" });
  await expect(caseStudies).toBeVisible();
  await expect(caseStudies.getByRole("heading", { level: 2, name: "Case studies" })).toHaveCount(1);

  const workRows = caseStudies.locator(".practice-work-row");
  await expect(workRows).toHaveCount(4);
  await expect(workRows.nth(0).getByRole("heading")).toHaveText("Multi Product Integrations");
  await expect(workRows.nth(1).getByRole("heading")).toHaveText("AI Systems");
  await expect(workRows.nth(2).getByRole("heading")).toHaveText("Design Systems");
  await expect(workRows.nth(3).getByRole("heading")).toHaveText("UI Design Practices");
  await expect(caseStudies.locator(".practice-work-visual")).toHaveCount(4);
  await expect(caseStudies.locator(".practice-work-visual-image")).toHaveCount(2);
  await expect(caseStudies.locator(".practice-work-visual figcaption")).toHaveText([
    "Selected interface studies for shared service workflows. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
    "Selected design-system foundations and reusable patterns. Screens are modified to protect client intellectual property.",
    "Illustrative diagram",
  ]);
  await expect(caseStudies.locator(".practice-work-visual-image img").nth(0)).toHaveAttribute(
    "alt",
    "Overlapping service interfaces showing work-order records, service listings, inventory, and a map-based activity view.",
  );
  await expect(caseStudies.locator(".practice-work-visual-image img").nth(1)).toHaveAttribute(
    "alt",
    "Collage of interface patterns, color and contrast scales, and typography examples from a design system.",
  );
  await expect(caseStudies.locator(".practice-work-card-link")).toHaveCount(4);
});

test("mobile home uses the working-index structure without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I make complex products easier to understand, build, and evolve.",
      exact: true,
    }),
  ).toBeInViewport({ ratio: 1 });

  const selectedWork = page.getByRole("heading", {
    level: 2,
    name: "Selected work",
    exact: true,
  });
  await selectedWork.scrollIntoViewIfNeeded();
  await expect(selectedWork).toBeVisible();
  await expect(page.getByTestId("practice-rail")).toBeVisible();

  const integrationRow = page.locator('[data-practice-work="multi-product-integrations"]');
  await expect(integrationRow.getByRole("heading", { name: "Multi Product Integrations" })).toBeVisible();
  await expect(integrationRow.locator(".practice-work-preview")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.locator("nextjs-portal").evaluateAll((portals) => {
    portals.forEach((portal) => portal.remove());
  });
  await page.screenshot({
    animations: "disabled",
    fullPage: true,
    path: "test-results/visual-snapshots/home-mobile-first-viewport.png",
  });
});

test("integrations detail explains approved patterns without the generated diagram", async ({ page }) => {
  await page.goto("/work/multi-product-integrations");

  const patterns = page.getByRole("region", { name: "The shared patterns." });
  await expect(patterns.getByRole("heading", { name: "Standardized Layouts" })).toBeVisible();
  await expect(patterns.getByRole("heading", { name: "Workflow Completion" })).toBeVisible();
  await expect(patterns.getByRole("listitem")).toHaveCount(5);
  await expect(page.getByRole("navigation", { name: "Source sections for this presentation" })).toHaveCount(0);
  await expect(page.getByText("Media not included", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "All work" })).toHaveAttribute("href", "/work");
});

test("owner-interview story is readable in review and excluded from publication", async ({ page }) => {
  await page.goto("/dev/harness/case-study?slug=multi-product-integrations-revision");
  const revision = page.getByTestId("case-study-review-multi-product-integrations-revision");
  await expect(revision.getByText("Review-ready content.", { exact: true })).toBeVisible();
  await expect(revision.getByRole("heading", { name: "Learning from another team's record workflow" })).toBeVisible();
  await expect(revision.getByText(/I worked with three teammates/)).toBeVisible();
  await expect(revision.getByText(/frontend team implemented the code/)).toBeVisible();
  await page.screenshot({ path: "test-results/visual-snapshots/integrations-story-review.png", fullPage: true });
  await page.goto("/work/multi-product-integrations-revision");
  await expect(page).toHaveTitle("Case study not found | Rick Vang");
});

test("the expanded draft can be reviewed in the actual story presentation", async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dev/harness/case-study?slug=multi-product-integrations-revision&view=story");
    const story = page.getByTestId("case-study-story-review");
    await expect(page.getByTestId("personal-practice-shell")).toBeVisible();
    await expect(story.getByRole("heading", { name: "Multi Product Integrations", exact: true })).toBeVisible();
    await expect(story.getByRole("heading", { name: "Learning from another team's record workflow" })).toBeVisible();
    await expect(story.getByText(/We adopted the slide-in workflow/)).toBeVisible();
    await expect(story.getByText(/more sophisticated dashboards and rules for progressive disclosure/)).toBeVisible();
    await expect(story.getByText(/I worked with three teammates/)).toBeVisible();
    await expect(story.getByText(/frontend team implemented the code/)).toBeVisible();
    await expect(story.getByRole("link", { name: "Review sources and evidence" })).toHaveAttribute(
      "href", "?slug=multi-product-integrations-revision",
    );
    const illustrations = story.getByRole("img");
    await expect(illustrations).toHaveCount(2);
    for (let index = 0; index < 2; index++) {
      const illustration = illustrations.nth(index);
      await illustration.scrollIntoViewIfNeeded();
      await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      const source = await illustration.evaluate((img: HTMLImageElement) => img.currentSrc);
      expect(source.endsWith("-mobile.svg")).toBe(width === 390);
      await story.getByRole("figure").nth(index).screenshot({
        path: `test-results/visual-snapshots/integrations-figure-${index}-${width}.png`,
      });
    }
    await expect(story).not.toContainText(/derived from the interview|as I recall|as I remember|recollection/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    await page.screenshot({ path: `test-results/visual-snapshots/integrations-story-${width}.png`, fullPage: true });
  }
});

test("the one-project example shows the work and keeps collaboration detail accessible", async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dev/harness/case-study?slug=multi-product-integrations-revision&view=example");
    const article = page.getByTestId("case-study-story-review").locator("article");
    await expect(article.getByRole("heading", { level: 1, name: "Multi Product Integrations" })).toBeVisible();
    await expect(article).toContainText("Designers were repeating similar workflow decisions");
    await expect(article).toContainText("Primary contributor to workflow patterns");
    await expect(article.getByRole("figure", { name: "One decision. Two arrangements." })).toBeVisible();
    await expect(article.getByRole("heading", { name: "A better pattern came from another team" })).toBeVisible();
    await expect(article.getByRole("heading", { name: "From a team workflow to a shared pattern", exact: true })).toBeVisible();
    await expect(article.getByText("Figma libraries", { exact: true })).toBeVisible();
    const disclosure = article.locator("summary");
    await disclosure.focus();
    await page.keyboard.press("Enter");
    await expect(article.locator("details")).toHaveAttribute("open", "");
    await expect(article.getByText(/I worked with three teammates/)).toBeVisible();
    await expect(article.getByText(/frontend team implemented the code/)).toBeVisible();
    await expect(article).not.toContainText(/derived from the interview|as I remember|recollection/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  }
  await page.goto("/work/multi-product-integrations-revision");
  await expect(page).toHaveTitle("Case study not found | Rick Vang");
  await page.goto("/dev/harness/case-study?slug=ai-systems-revision&view=example");
  await expect(page.getByRole("heading", { level: 1, name: "AI council for product decisions" })).toBeVisible();
});

test("project-specific examples explain supported work across desktop and mobile", async ({ page }) => {
  test.setTimeout(60_000);
  const examples = [
    { slug: "ai-systems-revision", title: "AI council for product decisions", figure: "From explaining value to evaluating fit.", ownership: /Created the persona framework and AI council/, result: "What changed for product and UX", reasoning: /Each AI persona answered through its compiled role profile/ },
    { slug: "design-systems-revision", title: "Design Systems", figure: "Shared foundations. Different surfaces.", ownership: /I designed the platform framework/, result: "Keeping the system useful", reasoning: /We audited existing design patterns alongside user scenarios/ },
    { slug: "ui-design-practices-revision", title: "UI Design Practices", figure: "The portfolio I directed", ownership: /AI agents built the interface/, result: "The built portfolio", reasoning: /preferred the persistent rail and rejected the serif voice/ },
  ];
  for (const example of examples) {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/dev/harness/case-study?slug=${example.slug}&view=example`);
      const article = page.getByTestId("case-study-story-review").locator("article");
      await expect(article.getByRole("heading", { level: 1, name: example.title })).toBeVisible();
      await expect(article.getByRole("figure", { name: example.figure })).toBeVisible();
      await expect(article.getByRole("heading", { name: example.result, exact: true })).toBeVisible();
      await expect(article.getByText(example.reasoning)).toBeVisible();
      await expect(article).toContainText(example.ownership);
      await expect(article).not.toContainText(/owner interview|as I remember|recollection|drafting process/i);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
      if (example.slug === "ai-systems-revision") {
        const generator = article.getByRole("figure", { name: "A generated profile: Minnesota contractor" });
        await expect(generator).toContainText("Which jobs to bid");
        await expect(generator).toContainText("What gets lost between you, the client, the crew and subcontractors?");
        await expect(article).toContainText("The generator separated evidence from assumptions");
        await expect(article).toContainText("Before treating an idea as a priority");
        await expect(article).toContainText("what each role needed to see");
      }
      if (example.slug === "ui-design-practices-revision") {
        await expect(article.getByRole("img")).toHaveCount(6);
        for (const artifact of await article.getByRole("img").all()) {
          await artifact.scrollIntoViewIfNeeded();
          await expect(artifact).toBeVisible();
          await expect.poll(() => artifact.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
        }
      }
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, 0); });
      await page.screenshot({ path: `test-results/visual-snapshots/${example.slug}-example-${width}.png`, fullPage: true });
      await expect(page.getByRole("navigation", { name: "Case-study examples" }).getByRole("link")).toHaveCount(4);
    }
    await page.goto(`/work/${example.slug}`);
    await expect(page).toHaveTitle("Case study not found | Rick Vang");
  }
  await page.goto("/dev/harness/case-study?slug=ai-systems&view=example");
  await expect(page.getByTestId("case-study-story-review")).toHaveCount(0);
});

test("unknown case studies remain out of public work routes", async ({ page }) => {
  await page.goto("/work/not-a-published-case-study");

  await expect(page).toHaveTitle("Case study not found | Rick Vang");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("Draft review surface.")).toHaveCount(0);
});

test("harness separates approved examples from synthetic fallback fixtures", async ({ page }) => {
  await page.goto("/dev/harness");

  const previewHarness = page.getByTestId("project-preview-harness");
  await expect(previewHarness).toContainText("Project preview and artifact states");
  await expect(previewHarness.getByText("Text-only fallback", { exact: true })).toBeVisible();
  await expect(previewHarness.getByText("Long and dense content", { exact: true })).toBeVisible();
  await expect(previewHarness).toContainText("not client work");
  await expect(previewHarness).toContainText("Source media deferred");
  await expect(previewHarness).toContainText("Redacted source artifact");
  await expect(previewHarness.locator("img")).toHaveCount(0);
});

test("both work patterns stay visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1, name: "Work", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Case studies" })).toBeVisible();
  await expect(page.locator(".practice-work-row")).toHaveCount(4);
  await expect(page.locator(".practice-work-visual figcaption")).toHaveCount(4);
  await expect(page.locator(".public-page")).toHaveCSS("animation-name", "none");
});
