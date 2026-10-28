import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const design = readFileSync(path.join(root, 'DESIGN.md'), 'utf8');
const agents = readFileSync(path.join(root, 'AGENTS.md'), 'utf8');

const references = [
  'docs/design/project-profile.md',
  'docs/design/pattern-index.md',
  'docs/design/visual-quality-review.md',
  'docs/design/work-to-experience.md',
  'docs/design/motion.md',
  'docs/design/interaction-specifications.md',
  'docs/design/examples/personal-practice-pilot.md',
  'docs/design/history/release-history.md'
];

for (const ref of references) {
  if (!design.includes(ref)) throw new Error(`DESIGN.md missing selective reference: ${ref}`);
  if (!existsSync(path.join(root, ref))) throw new Error(`Missing design reference file: ${ref}`);
}

if (!agents.includes('load only the task-specific reference from `docs/design/`')) {
  throw new Error('AGENTS.md must activate progressive design-reference loading');
}

for (const movedHeading of [
  '## Visual quality review',
  '## Work-to-experience translation',
  '## Cinematic motion contract',
  '## Interaction specifications',
  '## Release-hardening audit closure',
  '## Approved pilot — Personal Practice / Working Archive'
]) {
  if (design.includes(movedHeading)) throw new Error(`Conditional section still on mandatory DESIGN.md path: ${movedHeading}`);
}

// DESIGN.md must describe the code that exists: tokens, components and stylesheets.
const problems = [];
const bare = (cell) => cell.replaceAll('`', '').trim();

function tableRows(heading) {
  const lines = design.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) {
    problems.push(`DESIGN.md is missing the "${heading}" section`);
    return [];
  }
  const rows = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,6}\s/.test(line)) break;
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map(bare);
    if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows.slice(1);
}

function compareSets(label, actual, documented) {
  for (const name of actual) {
    if (!documented.includes(name)) problems.push(`${label} ${name} exists in the code but is missing from DESIGN.md`);
  }
  for (const name of documented) {
    if (!actual.includes(name)) problems.push(`${label} ${name} is listed in DESIGN.md but does not exist`);
  }
}

// Token reference: every :root token in globals.css, with its value, plus scoped tokens found in their source file.
const globals = readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');
const rootBlock = /:root\s*\{([^}]*)\}/.exec(globals)?.[1] ?? '';
const rootTokens = new Map(
  [...rootBlock.matchAll(/^\s*(--[a-z0-9-]+):\s*(.+?);\s*$/gm)].map(([, name, value]) => [name, value])
);
const documentedRootTokens = [];
for (const [token, value, , source] of tableRows('### Token reference')) {
  if (source === ':root') {
    documentedRootTokens.push(token);
    if (!rootTokens.has(token)) {
      problems.push(`Token ${token} is documented but not declared in the globals.css :root block`);
    } else if (rootTokens.get(token) !== value) {
      problems.push(`Token ${token} is ${value} in DESIGN.md but ${rootTokens.get(token)} in globals.css`);
    }
  } else {
    const file = path.join(root, source);
    if (!existsSync(file) || !readFileSync(file, 'utf8').includes(token)) {
      problems.push(`Scoped token ${token} was not found in ${source}`);
    }
  }
}
compareSets('Token', [...rootTokens.keys()], documentedRootTokens);

// Component ownership: every file in src/components, and every stylesheet it names must exist.
const componentFiles = readdirSync(path.join(root, 'src/components')).filter((file) => /\.tsx?$/.test(file));
const componentRows = tableRows('### Component ownership');
compareSets('Component file', componentFiles, componentRows.map(([file]) => file));
for (const [file, css] of componentRows) {
  for (const sheet of css.match(/[\w-]+\.css/g) ?? []) {
    if (!existsSync(path.join(root, 'src/app', sheet))) {
      problems.push(`${file} names ${sheet} as owning CSS, which does not exist in src/app`);
    }
  }
}

// CSS ownership: every stylesheet in src/app.
const cssFiles = readdirSync(path.join(root, 'src/app')).filter((file) => file.endsWith('.css'));
compareSets('Stylesheet', cssFiles, tableRows('### CSS file ownership').map(([file]) => file));

if (problems.length > 0) {
  throw new Error(`DESIGN.md is out of sync with the code:\n- ${problems.join('\n- ')}`);
}

console.log('Design progressive-disclosure contract OK');
console.log('Design token reference, component ownership and CSS ownership match the code');
