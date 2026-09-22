import { describe, expect, it } from "vitest";

import { noteHref, publicRoutes, workHref } from "@/lib/public-routes";

describe("public route contract", () => {
  it("keeps the redesign information architecture stable", () => {
    expect(publicRoutes).toEqual({
      home: "/",
      work: "/work",
      workDetail: "/work/[slug]",
      notes: "/notes",
      noteDetail: "/notes/[slug]",
      about: "/about",
      contact: "/contact",
    });
  });

  it("builds detail links from typed slugs", () => {
    expect(workHref("design-systems")).toBe("/work/design-systems");
    expect(noteHref("persona-led-design")).toBe("/notes/persona-led-design");
  });
});
