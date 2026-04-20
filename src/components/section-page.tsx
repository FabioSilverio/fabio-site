import { InnerHeader } from "@/components/inner-header";
import type { NavItem } from "@/lib/cms-shared";

type SectionItem = {
  date: string;
  summary: string;
  title: string;
};

type SectionPageProps = {
  brandText: string;
  items: SectionItem[];
  navItems: NavItem[];
  title: string;
  type: "posts";
};

export function SectionPage({
  brandText,
  items,
  navItems,
  title,
}: SectionPageProps) {
  return (
    <div className="section-page">
      <InnerHeader brandText={brandText} navItems={navItems} />

      <div className="section-page-inner">
        <h1 className="section-title">{title}</h1>

        <div className="section-list">
          {items.map((item) => (
            <article className="section-row" key={`${item.date}-${item.title}`}>
              <div className="section-row-main">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </div>
              <div className="section-row-date">{item.date}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
