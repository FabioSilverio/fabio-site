import { HomeScene } from "@/components/home-scene";
import { getPosts, getSiteConfig } from "@/lib/cms";

export default async function Home() {
  const [posts, siteConfig] = await Promise.all([getPosts(), getSiteConfig()]);

  return (
    <HomeScene
      brandText={siteConfig.siteTitle}
      latestPosts={posts}
      navItems={siteConfig.navLinks}
    />
  );
}
