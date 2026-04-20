import { Buffer } from "node:buffer";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  slugifyTitle,
  sortPosts,
  type BlogPost,
  type NavItem,
  type SiteConfig,
} from "@/lib/cms-shared";

type EditableBlogPost = {
  content: string;
  date: string;
  previousSlug?: string;
  slug?: string;
  summary: string;
  title: string;
};

const contentDirectory = path.join(process.cwd(), "content");
const postsFilePath = path.join(contentDirectory, "posts.json");
const siteFilePath = path.join(contentDirectory, "site.json");

const defaultSiteConfig: SiteConfig = {
  siteTitle: "fabio",
  footerText: "All Rights Reserved.",
  navLinks: [
    { id: "blog", label: "BLOG", href: "/blog" },
    { id: "talks", label: "TALKS", href: "/talks" },
    { id: "media", label: "MEDIA", href: "/media" },
    { id: "projects", label: "PROJECTS", href: "/projects" },
  ],
};

function sanitizeParagraphs(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);
}

function sanitizePost(value: unknown): BlogPost | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const entry = value as Partial<BlogPost>;
  const title = typeof entry.title === "string" ? entry.title.trim() : "";
  const date = typeof entry.date === "string" ? entry.date.trim() : "";
  const summary = typeof entry.summary === "string" ? entry.summary.trim() : "";
  const slugSource = typeof entry.slug === "string" ? entry.slug.trim() : title;
  const slug = slugifyTitle(slugSource);
  const content = sanitizeParagraphs(entry.content);

  if (!title || !date || !summary || !slug || !content.length) {
    return null;
  }

  return {
    title: title.toUpperCase(),
    date,
    summary,
    slug,
    content,
  };
}

function sanitizePosts(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const entries = value
    .map((entry) => sanitizePost(entry))
    .filter((entry): entry is BlogPost => entry !== null);

  return sortPosts(entries);
}

function sanitizeNavItem(value: unknown, fallbackIndex: number): NavItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const entry = value as Partial<NavItem>;
  const label = typeof entry.label === "string" ? entry.label.trim() : "";
  const href = typeof entry.href === "string" ? entry.href.trim() : "";

  if (!label || !href || !href.startsWith("/")) {
    return null;
  }

  const idSource =
    typeof entry.id === "string" && entry.id.trim()
      ? entry.id.trim()
      : `${label}-${fallbackIndex + 1}`;

  return {
    id: slugifyTitle(idSource) || `item-${fallbackIndex + 1}`,
    label: label.toUpperCase(),
    href,
  };
}

function sanitizeSiteConfig(value: unknown): SiteConfig {
  if (!value || typeof value !== "object") {
    return defaultSiteConfig;
  }

  const entry = value as Partial<SiteConfig>;
  const siteTitle =
    typeof entry.siteTitle === "string" && entry.siteTitle.trim()
      ? entry.siteTitle.trim()
      : defaultSiteConfig.siteTitle;
  const footerText =
    typeof entry.footerText === "string" && entry.footerText.trim()
      ? entry.footerText.trim()
      : defaultSiteConfig.footerText;
  const navLinks = Array.isArray(entry.navLinks)
    ? entry.navLinks
        .map((item, index) => sanitizeNavItem(item, index))
        .filter((item): item is NavItem => item !== null)
    : defaultSiteConfig.navLinks;

  return {
    siteTitle,
    footerText,
    navLinks: navLinks.length ? navLinks : defaultSiteConfig.navLinks,
  };
}

async function readJsonFile(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as unknown;
}

function getGitHubConfig() {
  const owner = process.env.GITHUB_CONTENT_OWNER?.trim();
  const repo = process.env.GITHUB_CONTENT_REPO?.trim();
  const branch = process.env.GITHUB_CONTENT_BRANCH?.trim() || "main";
  const token = process.env.GITHUB_CONTENT_TOKEN?.trim();

  if (!owner || !repo || !token || process.env.VERCEL !== "1") {
    return null;
  }

  return { owner, repo, branch, token };
}

export function getContentStorageMode() {
  return getGitHubConfig() ? "github" : "local";
}

async function commitFileToGitHub(relativePath: string, content: string, message: string) {
  const config = getGitHubConfig();

  if (!config) {
    throw new Error("GitHub content storage is not configured.");
  }

  const endpoint = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${relativePath}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${config.token}`,
    "User-Agent": "fabio-site-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const existingResponse = await fetch(`${endpoint}?ref=${config.branch}`, {
    headers,
    cache: "no-store",
  });

  let sha: string | undefined;

  if (existingResponse.status === 200) {
    const payload = (await existingResponse.json()) as { sha?: string };
    sha = payload.sha;
  } else if (existingResponse.status !== 404) {
    throw new Error(`Unable to read ${relativePath} from GitHub.`);
  }

  const updateResponse = await fetch(endpoint, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      branch: config.branch,
      content: Buffer.from(content).toString("base64"),
      message,
      sha,
    }),
  });

  if (!updateResponse.ok) {
    throw new Error(`Unable to write ${relativePath} to GitHub.`);
  }
}

async function writeContentFile(relativePath: string, absolutePath: string, value: unknown, message: string) {
  const serialized = `${JSON.stringify(value, null, 2)}\n`;

  if (getGitHubConfig()) {
    await commitFileToGitHub(relativePath, serialized, message);
    return;
  }

  await fs.writeFile(absolutePath, serialized, "utf8");
}

export async function getPosts() {
  return sanitizePosts(await readJsonFile(postsFilePath));
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getSiteConfig() {
  return sanitizeSiteConfig(await readJsonFile(siteFilePath));
}

export async function savePosts(posts: BlogPost[]) {
  const normalized = sortPosts(posts);

  await writeContentFile(
    "content/posts.json",
    postsFilePath,
    normalized,
    "Update posts via admin panel",
  );

  return normalized;
}

export async function saveSiteConfig(config: SiteConfig) {
  const normalized = sanitizeSiteConfig(config);

  await writeContentFile(
    "content/site.json",
    siteFilePath,
    normalized,
    "Update site settings via admin panel",
  );

  return normalized;
}

export async function upsertPost(input: EditableBlogPost) {
  const title = input.title.trim();
  const summary = input.summary.trim();
  const date = input.date.trim();
  const slug = slugifyTitle(input.slug?.trim() || title);
  const previousSlug = slugifyTitle(input.previousSlug?.trim() || "");
  const content = input.content
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!title || !summary || !date || !slug || !content.length) {
    throw new Error("Missing required post fields.");
  }

  const nextPost: BlogPost = {
    slug,
    title: title.toUpperCase(),
    date,
    summary,
    content,
  };

  const currentPosts = await getPosts();
  const nextPosts = currentPosts.filter(
    (post) => post.slug !== slug && (!previousSlug || post.slug !== previousSlug),
  );

  const savedPosts = await savePosts([...nextPosts, nextPost]);

  return {
    post: savedPosts.find((entry) => entry.slug === slug) ?? nextPost,
    posts: savedPosts,
    storageMode: getContentStorageMode(),
  };
}

export async function removePost(slug: string) {
  const normalizedSlug = slugifyTitle(slug);
  const currentPosts = await getPosts();
  const nextPosts = currentPosts.filter((post) => post.slug !== normalizedSlug);
  const savedPosts = await savePosts(nextPosts);

  return {
    posts: savedPosts,
    storageMode: getContentStorageMode(),
  };
}
