import { InnerHeader } from "@/components/inner-header";

type SectionItem = {
  date: string;
  summary: string;
  title: string;
};

type SectionPageProps = {
  items: SectionItem[];
  title: string;
  type: "posts";
};

export function SectionPage({ items, title }: SectionPageProps) {
  return (
    <div className="section-page">
      <InnerHeader />

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
