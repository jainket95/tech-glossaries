import { Link } from "react-router-dom";
import { PART_LABELS, chaptersByPart, type Part } from "../lib/chapters";

const PARTS: Part[] = ["sde1", "sde2", "sde3"];

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          Backend system design interviews, <em>solved by level</em>.
        </h1>
        <p className="home__lede">
          Thirty-six classic backend system-design questions — the ones asked in
          general SDE loops, not frontend-specific ones — worked end-to-end and
          graded by seniority: Fresher/SDE-1 through Senior/SDE-3. Requirements,
          estimation, API and data model, architecture, the bottlenecks that
          actually bite, and the tradeoffs a strong answer defends out loud.
        </p>
        <div className="home__cta">
          <Link to="/backend-interviews/c/url-shortener" className="btn btn--primary">
            Start with URL Shortener →
          </Link>
        </div>
      </header>

      {PARTS.map((part) => {
        const inPart = chaptersByPart(part);
        if (inPart.length === 0) return null;
        return (
          <section key={part} className="home__grid-section">
            <h2 className="home__grid-heading">{PART_LABELS[part]}</h2>
            <div className="home__grid">
              {inPart.map((c) => (
                <Link to={`/backend-interviews/c/${c.slug}`} key={c.slug} className="card">
                  <div className="card__num">
                    {c.number} · {c.difficulty}
                  </div>
                  <div className="card__title">{c.title}</div>
                  <div className="card__tag">{c.tagline}</div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <footer className="home__foot">
        <p>
          Every question follows the same shape: clarify requirements, estimate
          the scale, design the API and data model, draw the architecture, then
          defend it — what breaks first, and why you rejected the obvious
          alternative. That defense is usually where a good answer becomes a
          senior answer.
        </p>
      </footer>
    </article>
  );
}
