import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { chapters, findChapter } from "../lib/chapters";
import { Mermaid } from "../../../components/Mermaid";

export default function ChapterView() {
  const { slug } = useParams();
  const chapter = findChapter(slug);

  if (!chapter) {
    return (
      <div className="chapter">
        <p>Chapter not found.</p>
        <Link to="/design">← Back home</Link>
      </div>
    );
  }

  const index = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <article className="chapter">
      <div className="chapter__head">
        <div className="chapter__num">Chapter {chapter.number}</div>
        <h1 className="chapter__title">{chapter.title}</h1>
        <p className="chapter__tag">{chapter.tagline}</p>
      </div>

      <div className="chapter__body markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
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
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>

      <nav className="chapter__nav">
        {prev ? (
          <Link to={`/design/c/${prev.slug}`} className="chapter__navlink">
            <span className="chapter__navdir">← Previous</span>
            <span className="chapter__navtitle">
              {prev.number} · {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/design/c/${next.slug}`} className="chapter__navlink chapter__navlink--right">
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
