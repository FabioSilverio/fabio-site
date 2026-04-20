import type { Metadata } from "next";
import { SplitText } from "@/components/split-text";
import { TransitionLink } from "@/components/transition-link";

export const metadata: Metadata = {
  title: "contato",
};

export default function ContatoPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="eyebrow">contato</div>
        <SplitText
          as="h1"
          text="vamos falar"
          className="page-title"
          accentIndexes={[1, 6, 9]}
          transitionName="page-heading"
        />
        <p className="hero-copy">
          Se quiser, o próximo passo é só trocar os textos placeholders pelos
          seus dados reais e conectar domínio, analytics e formulário.
        </p>
      </section>

      <section className="panel-grid panel-grid-wide">
        <article className="glass-card">
          <span className="card-kicker">github</span>
          <h2>perfil já conectado</h2>
          <p>
            Seu perfil já está acessível e pode virar um dos pontos de saída do
            site.
          </p>
          <a
            className="button button-primary"
            href="https://github.com/FabioSilverio"
            target="_blank"
            rel="noreferrer"
          >
            abrir GitHub
          </a>
        </article>
        <article className="glass-card">
          <span className="card-kicker">próximo passo</span>
          <h2>deploy e ajustes finos</h2>
          <p>
            Depois do primeiro deploy, vale incluir seu email, redes e cases
            definitivos.
          </p>
          <TransitionLink href="/" className="button button-secondary">
            voltar ao início
          </TransitionLink>
        </article>
      </section>
    </div>
  );
}
