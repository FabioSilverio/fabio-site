import type { Metadata } from "next";
import { SplitText } from "@/components/split-text";

export const metadata: Metadata = {
  title: "sobre",
};

export default function SobrePage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="eyebrow">sobre</div>
        <SplitText
          as="h1"
          text="fabio"
          className="page-title"
          accentIndexes={[1, 3]}
          transitionName="page-heading"
        />
        <p className="hero-copy">
          A proposta é fugir do portfólio genérico. O site prioriza impacto
          visual, movimento elegante e uma leitura que parece mais direção de
          arte do que template.
        </p>
      </section>

      <section className="panel-grid panel-grid-wide">
        <article className="glass-card">
          <span className="card-kicker">direção</span>
          <h2>um layout que respira</h2>
          <p>
            Muito espaço negativo, um eixo tipográfico forte e contraste entre
            blocos densos e respiros largos para fazer a navegação parecer mais
            cara.
          </p>
        </article>
        <article className="glass-card">
          <span className="card-kicker">movimento</span>
          <h2>animação com intenção</h2>
          <p>
            As letras entram com atraso progressivo, blur curto e deslocamento
            vertical controlado. O efeito fica vivo sem parecer exagerado.
          </p>
        </article>
      </section>

      <section className="quote-panel">
        <p>
          “menos efeito solto, mais sensação de continuidade entre marca,
          página e conteúdo.”
        </p>
      </section>
    </div>
  );
}
