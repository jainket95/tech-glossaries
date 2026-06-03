import { Link } from "react-router-dom";
import { chapters } from "../lib/chapters";

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          Design, <em>from a frontend engineer's seat</em>.
        </h1>
        <p className="home__lede">
          Thirteen chapters covering visual design, typography, color, perception,
          design tokens, component design, interaction and motion, information
          architecture, usability heuristics, accessibility, design process, and
          how a real design system gets built and governed. The goal isn't to
          make you a designer — it's the roughly 80% of a senior designer's
          judgment that lets you build, critique, and own design decisions
          without waiting for permission.
        </p>
        <div className="home__cta">
          <Link to="/design/c/foundations" className="btn btn--primary">
            Start reading →
          </Link>
          <Link to="/design/c/study-plan" className="btn">
            Jump to the study plan
          </Link>
        </div>
      </header>

      <section className="home__grid">
        {chapters.map((c) => (
          <Link to={`/design/c/${c.slug}`} key={c.slug} className="card">
            <div className="card__num">{c.number}</div>
            <div className="card__title">{c.title}</div>
            <div className="card__tag">{c.tagline}</div>
          </Link>
        ))}
      </section>

      <footer className="home__foot">
        <p>
          The premise: design is not a layer of paint applied after the
          engineering is done — it's a set of deliberate decisions about how a
          thing should look, behave, and feel, made under the same kind of
          constraints engineering is made under. The senior skill isn't taste
          in the abstract. It's knowing <em>why this decision serves the
          person using it</em>, and being able to explain that to a designer,
          a PM, or a skeptical teammate in the room.
        </p>
      </footer>
    </article>
  );
}
