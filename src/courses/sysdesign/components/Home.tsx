import { Link } from "react-router-dom";
import { PART_LABELS, chaptersByPart, type Part } from "../lib/chapters";

const PARTS: Part[] = ["components", "applications", "emerging", "mechanisms"];

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          System design interviews, <em>solved end-to-end</em>.
        </h1>
        <p className="home__lede">
          Thirty frontend system-design interview questions, each answered on
          two connected tracks: a frontend solution using the RADIO
          framework, and a backend solution using its own idiomatic
          structure — explicitly wired together at the API contract, the way
          a real product actually works. Not a cheat sheet — the judgment
          behind why one design beats the alternative.
        </p>
        <div className="home__cta">
          <Link to="/system-design/c/chat-messaging" className="btn btn--primary">
            Start with Chat / Messaging →
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
                <Link to={`/system-design/c/${c.slug}`} key={c.slug} className="card">
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
          Every question follows the same shape: clarify requirements, design
          the frontend (RADIO), design the backend, then make the seam
          between them explicit — the API shape, who owns what, how errors
          propagate. That seam is usually where a good answer becomes a
          senior answer.
        </p>
      </footer>
    </article>
  );
}
