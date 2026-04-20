export type BlogPost = {
  content: string[];
  date: string;
  slug: string;
  summary: string;
  title: string;
};

export const blogStorageKey = "fabio-admin-posts-v1";

export const seedBlogPosts: BlogPost[] = [
  {
    slug: "building-a-personal-site-that-feels-intentional",
    title: "BUILDING A PERSONAL SITE THAT FEELS INTENTIONAL",
    date: "2026-04-20",
    summary:
      "Notes on motion, spacing, and how to keep a portfolio from feeling templated.",
    content: [
      "A personal site usually fails for one of two reasons: it either tries to say too much too early, or it looks like a generic landing page with your name pasted on top.",
      "The fix is usually restraint. Pick one strong gesture for the home screen, make the navigation obvious, and let the rest of the material reveal itself with rhythm instead of noise.",
      "That is why I like sparse homes with a single wordmark, strict spacing, and one or two transitions that create continuity between states.",
    ],
  },
  {
    slug: "shared-element-transitions-for-navigation",
    title: "SHARED ELEMENT TRANSITIONS FOR NAVIGATION",
    date: "2026-04-18",
    summary:
      "Using View Transitions to make route changes feel continuous instead of abrupt.",
    content: [
      "A route change is often treated as a hard cut. The problem is that hard cuts make the interface feel cheaper than it needs to.",
      "Shared element transitions solve that by letting one thing survive the navigation. A logo, a card, a heading, or a thumbnail can anchor the user's eye while the rest of the screen updates.",
      "The trick is to keep the choreography simple. If the element moves, other things should probably fade or slide with much less emphasis.",
    ],
  },
  {
    slug: "why-the-home-page-should-do-less",
    title: "WHY THE HOME PAGE SHOULD DO LESS",
    date: "2026-04-12",
    summary:
      "A sparse first screen can create more presence than stacking content immediately.",
    content: [
      "A lot of home pages are overloaded because designers are afraid of negative space. That anxiety is expensive.",
      "The first screen should not prove everything. It should establish confidence, hierarchy, and a reason to continue downward.",
      "Once the first impression is sharp, the deeper sections can do the explanatory work without feeling desperate.",
    ],
  },
  {
    slug: "black-white-and-one-accent-color",
    title: "BLACK, WHITE, AND ONE ACCENT COLOR",
    date: "2026-04-05",
    summary:
      "A restrained palette tends to age better when the typography is carrying the page.",
    content: [
      "If the layout is doing its job, you do not need six accent colors to make the page feel premium.",
      "Black gives contrast. White gives clarity. One electric accent tells the user what is interactive.",
      "The moment every element tries to speak in color, hierarchy starts to collapse.",
    ],
  },
  {
    slug: "how-to-make-a-hero-feel-calm",
    title: "HOW TO MAKE A HERO FEEL CALM",
    date: "2026-03-31",
    summary:
      "Reducing visual noise often does more for impact than adding one more animated layer.",
    content: [
      "Calm is usually a byproduct of constraint. Fewer moving pieces means every movement has a reason.",
      "In practical terms, that means fewer icons, fewer gradients, fewer decorative effects, and more attention to scale.",
      "A hero that feels calm usually has enough whitespace to let the typography breathe.",
    ],
  },
  {
    slug: "docking-a-logo-into-the-topbar",
    title: "DOCKING A LOGO INTO THE TOPBAR",
    date: "2026-03-24",
    summary:
      "A single moving mark reads cleaner than swapping between two separate elements.",
    content: [
      "When two copies of the same logo are visible during the same transition, the illusion breaks immediately.",
      "A better pattern is to let one mark travel and resize into the new state. That is how the user understands continuity without needing to think about it.",
      "This is especially important in minimal interfaces where the logo is the main actor.",
    ],
  },
  {
    slug: "view-transitions-in-the-app-router",
    title: "VIEW TRANSITIONS IN THE APP ROUTER",
    date: "2026-03-17",
    summary:
      "What shared elements do well, where they break, and how to keep the effect believable.",
    content: [
      "The API itself is not the hard part. The hard part is choosing what deserves to persist between states.",
      "If too many things animate, the transition becomes ornamental. If one good element survives, it feels intentional.",
      "The App Router is good enough for this pattern as long as you keep the shared parts predictable.",
    ],
  },
  {
    slug: "when-typography-is-the-brand",
    title: "WHEN TYPOGRAPHY IS THE BRAND",
    date: "2026-03-10",
    summary:
      "If the wordmark carries the screen, the spacing and scale have to be exact.",
    content: [
      "When there is no illustration, no photography, and no decorative frame, typography stops being content and becomes the interface.",
      "That means the wordmark cannot be treated casually. Width, tracking, weight, and docking position all matter more than usual.",
      "A logo that is five percent too low can make the whole page look accidental.",
    ],
  },
  {
    slug: "why-black-backgrounds-expose-bad-layouts",
    title: "WHY BLACK BACKGROUNDS EXPOSE BAD LAYOUTS",
    date: "2026-03-04",
    summary:
      "Dark interfaces can look premium, but they also make sloppy alignment obvious instantly.",
    content: [
      "Black is unforgiving. It does not hide imbalance the way busy backgrounds often do.",
      "When the page is dark, spacing errors become structural instead of decorative.",
      "That is why dark sites only feel expensive when the grid is disciplined.",
    ],
  },
  {
    slug: "scroll-as-a-state-machine",
    title: "SCROLL AS A STATE MACHINE",
    date: "2026-02-25",
    summary:
      "Treating scroll positions as transition states keeps motion design coherent and debuggable.",
    content: [
      "Scroll is usually implemented as a pile of small reactions. That makes motion hard to reason about.",
      "A cleaner model is to map the scroll range into a normalized progress value and derive all transformations from it.",
      "Once you do that, timing becomes composable instead of accidental.",
    ],
  },
];

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
