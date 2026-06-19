import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { chapters, findChapter } from "../lib/chapters";
import { Mermaid } from "../../../components/Mermaid";
import { remarkTermLinks } from "../../../glossary/remarkTermLinks";
import { useGlossaryStore } from "../../../glossary/store";

export default function ChapterView() {
  const { slug } = useParams();
  const chapter = findChapter(slug);

  if (!chapter) {
    return (
      <div className="chapter">
        <p>Question not found.</p>
        <Link to="/system-design">← Back home</Link>
      </div>
    );
  }

  const index = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <article className="chapter">
      <div className="chapter__head">
        <div className="chapter__num">
          Question {chapter.number} · {chapter.difficulty}
        </div>
        <h1 className="chapter__title">{chapter.title}</h1>
        <p className="chapter__tag">{chapter.tagline}</p>
      </div>

      <div className="chapter__body markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, [remarkTermLinks, ["be", "fe"]]]}
          rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
          components={{
            pre({ children }) {
              const child = Array.isArray(children) ? children[0] : children;
              const codeProps = (child as any)?.props;
              const className: string = codeProps?.className || "";
              if (/language-mermaid/.test(className)) {
                return <Mermaid chart={String(codeProps.children)} />;
              }
              return <pre>{children}</pre>;
            },
            a({ href, children }) {
              if (href?.startsWith("glossary:")) {
                const termId = href.slice("glossary:".length);
                return (
                  <button
                    type="button"
                    className="term-chip"
                    onClick={() => useGlossaryStore.getState().openTerm(termId)}
                  >
                    {children}
                  </button>
                );
              }
              return <a href={href}>{children}</a>;
            },
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>

      <nav className="chapter__nav">
        {prev ? (
          <Link to={`/system-design/c/${prev.slug}`} className="chapter__navlink">
            <span className="chapter__navdir">← Previous</span>
            <span className="chapter__navtitle">
              {prev.number} · {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/system-design/c/${next.slug}`} className="chapter__navlink chapter__navlink--right">
            <span className="chapter__navdir">Next →</span>
            <span className="chapter__navtitle">
              {next.number} · {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
