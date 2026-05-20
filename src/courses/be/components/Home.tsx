import { Link } from "react-router-dom";
import { chapters } from "../lib/chapters";

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          Backend <em>system design</em>, written out long-form.
        </h1>
        <p className="home__lede">
          Fifteen chapters covering APIs, databases, caching, queues,
          distributed systems, consistency, scaling, architecture, reliability,
          observability, and security. Every topic is framed around its
          tradeoffs — because in backend engineering, there is no free lunch,
          only a bill you choose to pay somewhere else.
        </p>
        <div className="home__cta">
          <Link to="/be/c/foundations" className="btn btn--primary">
            Start reading →
          </Link>
          <Link to="/be/c/study-plan" className="btn">
            Jump to the study plan
          </Link>
        </div>
      </header>

      <section className="home__grid">
        {chapters.map((c) => (
          <Link to={`/be/c/${c.slug}`} key={c.slug} className="card">
            <div className="card__num">{c.number}</div>
            <div className="card__title">{c.title}</div>
            <div className="card__tag">{c.tagline}</div>
          </Link>
        ))}
      </section>

      <footer className="home__foot">
        <p>
          The premise: backend engineering is the discipline of making
          deliberate tradeoffs under constraints you don't fully control —
          unreliable networks, finite memory, partial failures, traffic you
          didn't predict. The senior skill isn't knowing the one right answer.
          It's knowing <em>which answer fits which constraints</em>, and being
          able to defend the choice when the constraints change.
        </p>
      </footer>
    </article>
  );
}
