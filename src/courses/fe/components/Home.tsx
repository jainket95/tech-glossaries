import { Link } from "react-router-dom";
import { chapters } from "../lib/chapters";

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          Frontend <em>system design</em>, written out long-form.
        </h1>
        <p className="home__lede">
          Eleven chapters covering rendering, performance, state, networking,
          components, reliability, security, cross-cutting concerns, and the
          system-design primitives that travel from client to server. Plus a
          curated engineering blog reading list and an eight-week study plan to
          tie it together.
        </p>
        <div className="home__cta">
          <Link to="/fe/c/rendering" className="btn btn--primary">
            Start reading →
          </Link>
          <Link to="/fe/c/study-plan" className="btn">
            Jump to the study plan
          </Link>
        </div>
      </header>

      <section className="home__grid">
        {chapters.map((c) => (
          <Link to={`/fe/c/${c.slug}`} key={c.slug} className="card">
            <div className="card__num">{c.number}</div>
            <div className="card__title">{c.title}</div>
            <div className="card__tag">{c.tagline}</div>
          </Link>
        ))}
      </section>

      <footer className="home__foot">
        <p>
          The premise: as the “wire-up-a-form” layer gets commoditised, the
          differentiator is judgment about <em>why</em> apps are architected
          the way they are — under load, on flaky networks, across teams, at
          scale. This document tries to be the place you’d send a smart junior
          colleague who wanted to skip the years it took you.
        </p>
      </footer>
    </article>
  );
}
