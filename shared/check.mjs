import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const roots = ['Web', 'AdminDashboard/src', 'Plyobox/src'];
const patterns = [
  ['PLY OBOX', /PLY OBOX/],
  ['PLYObox', /PLYObox/],
  ['per visit', /per visit/i],
  ['payment-approved', /payment-approved/],
  ['transfer', /['"]transfer['"]/],
  ['accepted booking status', /['"]accepted['"]/],
  ['Daily as data literal', /['"]Daily['"]/],
  ['Monthly as data literal', /['"]Monthly['"]/],
  ['Daily Session as data literal', /['"]Daily Session['"]/],
  ['Monthly Membership as data literal', /['"]Monthly Membership['"]/],
  ['Mika', /\bMika\b/],
];
let failed = false;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'shared'].includes(entry.name)) walk(file);
    } else if (/\.(ts|tsx|css|json|md)$/.test(entry.name)) {
      const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
      lines.forEach((line, index) => {
        if (line.includes('check-ignore:')) return;
        for (const [name, pattern] of patterns) {
          if (pattern.test(line)) {
            console.error(`${path.relative(root, file)}:${index + 1}: ${name}: ${line.trim()}`);
            failed = true;
          }
        }
      });
    }
  }
}

for (const directory of roots) walk(path.join(root, directory));
if (failed) process.exit(1);
