import { Fragment, type ReactNode } from 'react';
import type { Term } from '../types';
import { escapeRegex } from '../lib/escapeRegex';
import { TermChip } from './TermChip';
import { Mermaid } from '../../../components/Mermaid';

function renderInline(text: string, keyTerms: Term[], used: Set<string>, keyPrefix: string): ReactNode[] {
  if (keyTerms.length === 0) {
    return renderBoldAndCode(text, keyPrefix);
  }

  const sorted = [...keyTerms].sort((a, b) => b.term.length - a.term.length);
  const termPattern = sorted.map((t) => escapeRegex(t.term)).join('|');
  const regex = new RegExp(`\\*\\*(.+?)\\*\\*|\`([^\`]+?)\`|\\b(${termPattern})\\b`, 'gi');

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`${keyPrefix}-t${idx++}`}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [full, bold, code, termMatch] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${idx++}`}>{bold}</strong>);
    } else if (code !== undefined) {
      nodes.push(<code key={`${keyPrefix}-c${idx++}`}>{code}</code>);
    } else if (termMatch !== undefined) {
      const term = sorted.find((t) => t.term.toLowerCase() === termMatch.toLowerCase());
      if (term && !used.has(term.id)) {
        used.add(term.id);
        nodes.push(<TermChip key={`${keyPrefix}-x${idx++}`} termId={term.id} label={termMatch} />);
      } else {
        nodes.push(<Fragment key={`${keyPrefix}-p${idx++}`}>{termMatch}</Fragment>);
      }
    } else {
      nodes.push(<Fragment key={`${keyPrefix}-u${idx++}`}>{full}</Fragment>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-e${idx++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

function renderBoldAndCode(text: string, keyPrefix: string): ReactNode[] {
  const regex = /\*\*(.+?)\*\*|`([^`]+?)`/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`${keyPrefix}-t${idx++}`}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    if (match[1] !== undefined) nodes.push(<strong key={`${keyPrefix}-b${idx++}`}>{match[1]}</strong>);
    else if (match[2] !== undefined) nodes.push(<code key={`${keyPrefix}-c${idx++}`}>{match[2]}</code>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-e${idx++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

const TABLE_SEPARATOR = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

export function Prose({ body, keyTerms }: { body: string; keyTerms: Term[] }) {
  const blocks = body.trim().split(/\n\s*\n/);
  const used = new Set<string>();

  return (
    <div className="prose-lesson">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        // Fenced code block — only ```mermaid is meaningfully supported;
        // any other language renders as a plain code block.
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const lang = lines[0].slice(3).trim();
          const last = lines[lines.length - 1].trim() === '```' ? lines.length - 1 : lines.length;
          const code = lines.slice(1, last).join('\n');
          if (lang === 'mermaid') {
            return <Mermaid key={i} chart={code} />;
          }
          return (
            <pre key={i}>
              <code>{code}</code>
            </pre>
          );
        }

        // Callout — a single-paragraph blockquote, same "> **Label:** ..."
        // convention used across be/fe/design/fde.
        const rawLines = trimmed.split('\n');
        if (rawLines.every((l) => l.startsWith('> '))) {
          const text = rawLines.map((l) => l.slice(2)).join(' ');
          return <blockquote key={i}>{renderInline(text, keyTerms, used, `bq${i}`)}</blockquote>;
        }

        if (trimmed.startsWith('### ')) {
          return <h3 key={i}>{renderInline(trimmed.slice(4), keyTerms, used, `h${i}`)}</h3>;
        }

        // GFM-style pipe table.
        if (rawLines.length >= 2 && rawLines[0].trim().startsWith('|') && TABLE_SEPARATOR.test(rawLines[1].trim())) {
          const header = splitTableRow(rawLines[0]);
          const rows = rawLines.slice(2).map(splitTableRow);
          return (
            <table key={i}>
              <thead>
                <tr>
                  {header.map((h, j) => (
                    <th key={j}>{renderInline(h, keyTerms, used, `th${i}-${j}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{renderInline(cell, keyTerms, used, `td${i}-${r}-${c}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

        const lines = trimmed.split('\n').map((l) => l.trim());
        const isUl = lines.every((l) => l.startsWith('- '));
        const isOl = lines.every((l) => /^\d+\.\s/.test(l));
        if (isUl) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2), keyTerms, used, `ul${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (isOl) {
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\d+\.\s/, ''), keyTerms, used, `ol${i}-${j}`)}</li>
              ))}
            </ol>
          );
        }
        return <p key={i}>{renderInline(trimmed, keyTerms, used, `p${i}`)}</p>;
      })}
    </div>
  );
}
