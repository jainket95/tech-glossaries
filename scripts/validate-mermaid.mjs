// Extracts every ```mermaid fenced block from course content markdown and
// validates its syntax with mermaid.parse() (no layout/rendering — jsdom
// can't compute SVG text metrics, so this only checks the diagram parses).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { pretendToBeVisual: true });
global.window = dom.window;
global.document = dom.window.document;
global.SVGElement = dom.window.SVGElement || class {};
global.CSSStyleSheet = dom.window.CSSStyleSheet || class { replaceSync() {} };
global.Element = dom.window.Element;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.getComputedStyle = dom.window.getComputedStyle;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });

const mermaid = (await import('mermaid')).default;
mermaid.initialize({ startOnLoad: false, theme: 'base' });

const courses = process.argv.slice(2);
if (courses.length === 0) courses.push('be', 'fe', 'design', 'fde', 'sysdesign', 'besd');

let total = 0;
let failed = 0;

for (const course of courses) {
  const dir = join('src/courses', course, 'content');
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    continue;
  }
  for (const file of files) {
    const text = readFileSync(join(dir, file), 'utf8');
    const blocks = [...text.matchAll(/```mermaid\n([\s\S]*?)```/g)].map((m) => m[1]);
    for (let i = 0; i < blocks.length; i++) {
      total++;
      try {
        await mermaid.parse(blocks[i].trim());
      } catch (err) {
        failed++;
        console.error(`FAIL ${course}/${file} block #${i + 1}: ${err.message}`);
        console.error('  ---');
        console.error(
          blocks[i]
            .trim()
            .split('\n')
            .map((l) => '  ' + l)
            .join('\n')
        );
      }
    }
  }
}

console.log(`\n${total - failed}/${total} mermaid blocks valid across: ${courses.join(', ')}`);
process.exit(failed > 0 ? 1 : 0);
