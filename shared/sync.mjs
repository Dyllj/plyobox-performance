import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const header = '// GENERATED from /shared by shared/sync.mjs. Edit the source, not this copy.';
const copies = [
  ['contract.ts', path.join(root, 'Web/lib/shared/contract.ts')],
  ['contract.ts', path.join(root, 'AdminDashboard/src/shared/contract.ts')],
  ['contract.ts', path.join(root, 'Plyobox/src/lib/shared/contract.ts')],
  ['seed.ts', path.join(root, 'Web/lib/shared/seed.ts')],
  ['seed.ts', path.join(root, 'AdminDashboard/src/shared/seed.ts')],
  ['seed.ts', path.join(root, 'Plyobox/src/lib/shared/seed.ts')],
];

const check = process.argv.includes('--check');
let failed = false;

for (const [sourceName, destination] of copies) {
  const source = path.join(root, 'shared', sourceName);
  const generated = `${header}\n${fs.readFileSync(source, 'utf8')}`;
  if (check) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== generated) {
      console.error(`Out of sync: ${path.relative(root, destination)}`);
      failed = true;
    }
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, generated);
  }
}

const tokens = JSON.parse(fs.readFileSync(path.join(root, 'shared/tokens.json'), 'utf8'));
const adminTokens = `/* GENERATED from /shared/tokens.json by shared/sync.mjs. */\n:root {\n${[
  ['ground', tokens.ground],
  ['ground-raised', tokens.groundRaised],
  ['ground-deep', tokens.groundDeep],
  ['card', tokens.card],
  ['card-soft', tokens.cardSoft],
  ['line', tokens.line],
  ['line-strong', tokens.lineStrong],
  ['text', tokens.text],
  ['muted', tokens.muted],
  ['subtle', tokens.subtle],
  ['lime', tokens.lime],
  ['lime-ink', tokens.limeInk],
  ['lime-deep', tokens.limeDeep],
  ['lime-rgb', tokens.limeRgb],
  ['amber', tokens.amber],
  ['danger', tokens.danger],
  ['info', tokens.info],
  ['violet', tokens.violet],
  ['success', tokens.success],
  ['radius-sm', `${tokens.radii.sm}px`],
  ['radius-md', `${tokens.radii.md}px`],
  ['radius-lg', `${tokens.radii.lg}px`],
].map(([name, value]) => `  --${name}: ${value};`).join('\n')}\n}\n`;

const mobileTheme = `// GENERATED from /shared/tokens.json by shared/sync.mjs.\nexport const PlyoboxTheme = {\n  background: '${tokens.ground}',\n  surface: '${tokens.groundRaised}',\n  card: '${tokens.card}',\n  cardRaised: '${tokens.cardRaised}',\n  cardHover: '${tokens.cardHover}',\n  border: '${tokens.line}',\n  lineStrong: '${tokens.lineStrong}',\n  text: '${tokens.text}',\n  muted: '${tokens.muted}',\n  subtle: '${tokens.subtle}',\n  accent: '${tokens.lime}',\n  accentInk: '${tokens.limeInk}',\n  danger: '${tokens.danger}',\n  info: '${tokens.info}',\n  violet: '${tokens.violet}',\n  amber: '${tokens.amber}',\n  success: '${tokens.success}',\n  accentTint: '${tokens.accentTint}',\n  accentTintStrong: '${tokens.accentTintStrong}',\n  onAccentMuted: '${tokens.onAccentMuted}',\n  onAccentSubtle: '${tokens.onAccentSubtle}',\n  warning: '${tokens.warning}',\n  warningTint: '${tokens.warningTint}',\n  successTint: '${tokens.successTint}',\n  dangerTint: '${tokens.dangerTint}',\n} as const;\n\nexport const Layout = {\n  contentMaxWidth: 1080,\n  gutter: 20,\n  radius: ${tokens.radii.lg},\n} as const;\n\nexport const Type = {\n  caption: ${tokens.type.caption},\n  small: ${tokens.type.small},\n  body: ${tokens.type.body},\n  title: ${tokens.type.title},\n  display: ${tokens.type.display},\n} as const;\n`;

if (check) {
  const adminPath = path.join(root, 'AdminDashboard/src/tokens.css');
  const mobilePath = path.join(root, 'Plyobox/src/constants/plyobox-theme.ts');
  for (const [file, expected] of [[adminPath, adminTokens], [mobilePath, mobileTheme]]) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== expected) {
      console.error(`Out of sync: ${path.relative(root, file)}`);
      failed = true;
    }
  }
  const webTokens = fs.readFileSync(path.join(root, 'Web/styles/tokens.css'), 'utf8');
  for (const [key, value] of [
    ['ground', tokens.ground], ['ground-raised', tokens.groundRaised], ['card', tokens.card],
    ['line', tokens.line], ['line-strong', tokens.lineStrong], ['text', tokens.text],
    ['muted', tokens.muted], ['subtle', tokens.subtle], ['lime', tokens.lime],
    ['lime-ink', tokens.limeInk],
  ]) {
    if (!webTokens.includes(`--${key}: ${value};`)) {
      console.error(`Web tokens differ for --${key}`);
      failed = true;
    }
  }
} else {
  fs.mkdirSync(path.join(root, 'AdminDashboard/src'), { recursive: true });
  fs.writeFileSync(path.join(root, 'AdminDashboard/src/tokens.css'), adminTokens);
  fs.writeFileSync(path.join(root, 'Plyobox/src/constants/plyobox-theme.ts'), mobileTheme);
}

if (failed) process.exit(1);
