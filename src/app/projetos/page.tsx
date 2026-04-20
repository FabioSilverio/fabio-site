import type { Metadata } from "next";
import { SplitText } from "@/components/split-text";

const projects = [
  {
    title: "landing autoral",
    text: "Página de apresentação com hero cinematográfico, blocos editoriais e CTA limpo para conversão.",
  },
  {
    title: "portfolio narrativo",
    text: "Sequência de projetos com transição suave, foco em detalhes e leitura em camadas.",
  },
  {
    title: "presença de marca",
    text: "Sistema visual para deixar o nome Fabio forte já no primeiro scroll, sem depender de excesso de conteúdo.",
  },
];

export const metadata: Metadata = {
  title: "projetos",
};

export default function ProjetosPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="eyebrow">projetos</div>
        <SplitText
          as="h1"
          text="seleção"
          className="page-title"
          accentIndexes={[1, 3, 5]}
          transitionName="page-heading"
        />
        <p className="hero-copy">
          Estruturei a página como vitrine. Você pode trocar esses textos pelos
          seus cases reais sem mexer na mecânica de transição.
        </p>
      </section>

      <section className="project-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <span className="card-kicker">{String(index + 1).padStart(2, "0")}</span>
            <h2>{project.title}</h2>
            <p>{project.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
