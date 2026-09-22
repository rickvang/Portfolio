import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const snapshotDirectory = join(process.cwd(), "test-results", "visual-snapshots");

async function prepareSnapshotDirectory() {
  await mkdir(snapshotDirectory, { recursive: true });
}

test.beforeAll(async () => {
  await prepareSnapshotDirectory();
});

test("captures the home first viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.screenshot({
    animations: "disabled",
    path: join(snapshotDirectory, "home-first-viewport.png"),
  });
});

test("captures the mobile drawer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dev/harness/shell?route=work&drawer=open");

  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();

  await page.screenshot({
    animations: "disabled",
    path: join(snapshotDirectory, "mobile-drawer.png"),
  });
});

test("captures a case-study first viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/dev/harness/case-study?slug=multi-product-integrations");

  const caseStudy = page.getByTestId("case-study-review-multi-product-integrations");
  await expect(caseStudy).toBeVisible();
  await caseStudy.scrollIntoViewIfNeeded();

  await page.screenshot({
    animations: "disabled",
    path: join(snapshotDirectory, "case-study-first-viewport.png"),
  });
});

test("captures a reduced-motion public state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/dev/harness/shell?route=notes&drawer=open");

  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCSS("animation-name", "none");

  await page.screenshot({
    animations: "disabled",
    path: join(snapshotDirectory, "reduced-motion-drawer.png"),
  });
});
