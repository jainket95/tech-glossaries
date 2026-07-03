import { readFileSync, readdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const cssFile = readdirSync('dist/assets').find((f) => f.endsWith('.css'));
const css = readFileSync(`dist/assets/${cssFile}`, 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html><head><style>${css}</style></head><body>
  <div class="course-fe layout">
    <div class="shell">
      <main class="content">
        <article class="chapter">
          <div class="chapter__body markdown">
            <p>Inline <code id="inline1">someFunction()</code> in a paragraph.</p>
            <blockquote id="bq"><p><strong>TL;DR:</strong> uses <code id="inline2">fetch()</code> inside a callout.</p></blockquote>
            <table><tbody><tr><td><code id="inline3">td-code</code></td></tr></tbody></table>
            <pre id="fenced"><code id="fencedcode">const x = 1;</code></pre>
          </div>
        </article>
      </main>
    </div>
  </div>
</body></html>`, { pretendToBeVisual: true });

const doc = dom.window.document;
const win = dom.window;

for (const id of ['inline1', 'inline2', 'inline3', 'fencedcode']) {
  const el = doc.getElementById(id);
  const style = win.getComputedStyle(el);
  console.log(`#${id}: color=${style.color}  background-color=${style.backgroundColor}`);
}
const pre = doc.getElementById('fenced');
console.log(`#fenced (pre): color=${win.getComputedStyle(pre).color}  background-color=${win.getComputedStyle(pre).backgroundColor}`);
