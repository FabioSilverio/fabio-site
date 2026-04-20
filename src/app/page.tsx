import { SplitText } from "@/components/split-text";
import { TransitionLink } from "@/components/transition-link";

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="eyebrow">portfólio em movimento</div>
        <SplitText
          as="h1"
          text="fabio"
          className="display-title"
          accentIndexes={[1, 3]}
          transitionName="page-heading"
        />
        <p className="hero-copy">
          Um site com presença editorial, trocas suaves entre páginas e texto
          que entra no ritmo certo. A ideia aqui é parecer autoral desde o
          primeiro segundo.
        </p>
        <div className="button-row">
          <TransitionLink href="/projetos" className="button button-primary">
            ver projetos
          </TransitionLink>
          <TransitionLink href="/sobre" className="button button-secondary">
            entender a proposta
          </TransitionLink>
        </div>
      </section>

      <section className="panel-grid">
        <article className="glass-card">
          <span className="card-kicker">01</span>
          <h2>transição que não quebra a leitura</h2>
          <p>
            A navegação usa a View Transitions API para manter continuidade
            visual entre as telas em vez de trocar tudo de uma vez.
          </p>
        </article>
        <article className="glass-card">
          <span className="card-kicker">02</span>
          <h2>tipografia com contraste</h2>
          <p>
            Serif expressiva no título, sans limpa no corpo e detalhes em itálico
            para dar o mesmo clima refinado do site de referência.
          </p>
        </article>
        <article className="glass-card">
          <span className="card-kicker">03</span>
          <h2>base pronta para evoluir</h2>
          <p>
            Dá para plugar seus projetos reais, links sociais, formulário,
            analytics e domínio próprio sem desmontar a estética.
          </p>
        </article>
      </section>

      <section className="statement-panel">
        <p className="statement-line">presença</p>
        <p className="statement-line statement-line-muted">ritmo</p>
        <p className="statement-line">memorabilidade</p>
      </section>
    </div>
  );
}
