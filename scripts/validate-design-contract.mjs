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

// Every stylesheet under src/ (global and CSS modules), as repo paths.
// Sheets in src/app are keyed by file name, everything else by repo path.
const stylesheets = readdirSync(path.join(root, 'src'), { recursive: true })
  .map((file) => file.split(path.sep).join('/'))
  .filter((file) => file.endsWith('.css') && !file.split('/').includes('node_modules'))
  .map((file) => `src/${file}`);
const sheetKey = (file) => (file.startsWith('src/app/') ? file.slice('src/app/'.length) : file);

// Tokens: :root tokens in globals.css must match the table by name and value.
const globals = readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');
const rootBlock = /:root\s*\{([^}]*)\}/.exec(globals)?.[1] ?? '';
const rootTokens = new Map(
  [...rootBlock.matchAll(/^\s*(--[a-z0-9-]+):\s*(.+?);\s*$/gm)].map(([, name, value]) => [name, value])
);

// Scoped tokens: every custom property declared in a stylesheet outside the :root block, with its value.
const declaredScoped = new Set();
for (const file of stylesheets) {
  let css = readFileSync(path.join(root, file), 'utf8');
  if (file === 'src/app/globals.css') css = css.replace(/:root\s*\{[^}]*\}/, '');
  for (const [, token, value] of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;}]+)/g)) {
    declaredScoped.add(`${file} | ${token} | ${value.trim()}`);
  }
}

const documentedRootTokens = [];
const documentedScoped = [];
for (const [token, value, , source] of tableRows('### Token reference')) {
  if (source === ':root') {
    documentedRootTokens.push(token);
    if (!rootTokens.has(token)) {
      problems.push(`Token ${token} is documented but not declared in the globals.css :root block`);
    } else if (rootTokens.get(token) !== value) {
      problems.push(`Token ${token} is ${value} in DESIGN.md but ${rootTokens.get(token)} in globals.css`);
    }
  } else if (source.endsWith('.css')) {
    documentedScoped.push(`${source} | ${token} | ${value}`);
  } else {
    // Tokens set from code (for example a next/font variable) can only be checked by name.
    const file = path.join(root, source);
    if (!existsSync(file) || !readFileSync(file, 'utf8').includes(token)) {
      problems.push(`Token ${token} was not found in ${source}`);
    }
  }
}
compareSets('Token', [...rootTokens.keys()], documentedRootTokens);
compareSets('Scoped declaration', [...declaredScoped], documentedScoped);

// Component ownership: every file in src/components, and every stylesheet it names must exist.
const sheetKeys = stylesheets.map(sheetKey);
const componentFiles = readdirSync(path.join(root, 'src/components')).filter((file) => /\.tsx?$/.test(file));
const componentRows = tableRows('### Component ownership');
compareSets('Component file', componentFiles, componentRows.map(([file]) => file));
for (const [file, css] of componentRows) {
  for (const sheet of css.match(/[\w/.-]+\.css/g) ?? []) {
    if (!sheetKeys.some((key) => key === sheet || key.endsWith(`/${sheet}`))) {
      problems.push(`${file} names ${sheet} as owning CSS, which does not exist under src/`);
    }
  }
}

// CSS ownership: every stylesheet under src/.
compareSets('Stylesheet', sheetKeys, tableRows('### CSS file ownership').map(([file]) => file));

if (problems.length > 0) {
  throw new Error(`DESIGN.md is out of sync with the code:\n- ${problems.join('\n- ')}`);
}

console.log('Design progressive-disclosure contract OK');
console.log('Design token reference, component ownership and CSS ownership match the code');
