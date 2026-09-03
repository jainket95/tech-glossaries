import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { chapters } from "../lib/chapters";
import "../styles/global.css";
import { TermDrawer } from "../../../glossary/TermDrawer";

export default function Layout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="course-besd layout">
      <header className="topbar">
        <button
          className="topbar__menu"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <NavLink to="/backend-interviews" end className="topbar__brand">
          <span className="topbar__mark">▤</span>
          <span className="topbar__title">Backend Interview Solutions</span>
          <span className="topbar__sub">/ a glossary</span>
        </NavLink>
        <Link className="topbar__github" to="/" style={{ marginLeft: 0 }}>
          ← All glossaries
        </Link>
        <a
          className="topbar__github"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub →
        </a>
      </header>

      <div className="shell">
        <nav className={`sidebar ${navOpen ? "sidebar--open" : ""}`}>
          <div className="sidebar__label">Questions</div>
          <ol className="sidebar__list">
            {chapters.map((c) => (
              <li key={c.slug}>
                <NavLink
                  to={`/backend-interviews/c/${c.slug}`}
                  className={({ isActive }) =>
                    "sidebar__link" + (isActive ? " sidebar__link--active" : "")
                  }
                >
                  <span className="sidebar__num">{c.number}</span>
                  <span>
                    <span className="sidebar__title">{c.title}</span>
                    <span className="sidebar__tag">{c.tagline}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ol>
          <div className="sidebar__footnote">
            Built as a reference. PRs welcome.
          </div>
        </nav>

        <main className="content">
          <Outlet />
        </main>
      </div>

      <TermDrawer />
    </div>
  );
}
