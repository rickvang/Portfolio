export const publicRoutes = {
  home: "/",
  work: "/work",
  workDetail: "/work/[slug]",
  notes: "/notes",
  noteDetail: "/notes/[slug]",
  about: "/about",
  contact: "/contact",
} as const;

export type PublicRouteName = keyof typeof publicRoutes;

export function workHref(slug: string): string {
  return `/work/${slug}`;
}

export function noteHref(slug: string): string {
  return `/notes/${slug}`;
}
