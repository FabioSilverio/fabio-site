export type BlogPost = {
  content: string[];
  date: string;
  slug: string;
  summary: string;
  title: string;
};

export type NavItem = {
  href: string;
  id: string;
  label: string;
};

export type SiteConfig = {
  footerText: string;
  navLinks: NavItem[];
  siteTitle: string;
};

export function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((left, right) => right.date.localeCompare(left.date));
}
