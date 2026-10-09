import { existsSync, readFileSync } from 'node:fs';
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

console.log('Design progressive-disclosure contract OK');
