import { Link } from "react-router-dom";
import { chapters } from "../lib/chapters";

export default function Home() {
  return (
    <article className="home">
      <header className="home__hero">
        <div className="home__eyebrow">A working reference · 2026</div>
        <h1 className="home__title">
          Forward Deployed Engineering, <em>from the inside</em>.
        </h1>
        <p className="home__lede">
          Thirteen chapters on the role turning up at the center of enterprise
          software and applied-AI companies: engineers embedded with
          customers, building and shipping real systems against ambiguous
          requirements, messy data, and someone else's infrastructure. Not a
          certification — the judgment, habits, and vocabulary that separate
          an FDE who becomes indispensable from one who's just an expensive
          contractor.
        </p>
        <div className="home__cta">
          <Link to="/fde/c/foundations" className="btn btn--primary">
            Start reading →
          </Link>
          <Link to="/fde/c/study-plan" className="btn">
            Jump to the study plan
          </Link>
        </div>
      </header>

      <section className="home__grid">
        {chapters.map((c) => (
          <Link to={`/fde/c/${c.slug}`} key={c.slug} className="card">
            <div className="card__num">{c.number}</div>
            <div className="card__title">{c.title}</div>
            <div className="card__tag">{c.tagline}</div>
          </Link>
        ))}
      </section>

      <footer className="home__foot">
        <p>
          The premise: a Forward Deployed Engineer is not a support engineer
          with a nicer title, and not a consultant who happens to write code.
          It's someone who can sit in a room with a client who doesn't trust
          your product yet, figure out in days what would actually move
          their business, and ship something real enough that they do. The
          senior skill isn't the stack — it's knowing which corners are safe
          to cut, which trust to build first, and when to say no to a demo
          that would work today and break the relationship in a month.
        </p>
      </footer>
    </article>
  );
}
