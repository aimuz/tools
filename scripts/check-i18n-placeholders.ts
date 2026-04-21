#!/usr/bin/env bun
// Verify {placeholder} tokens inside i18n strings against the zh-CN baseline.
// See CLAUDE.md 硬约束 #11 — placeholders are replaced literally at runtime via
// interpolate(), so translating {size} → {taille} renders the raw braces to
// the user. Rule: other-locale placeholders must be a SUBSET of baseline.
// Omitting a placeholder is a legitimate per-locale style choice (the extra
// value passed to interpolate is harmless); introducing a new token is always
// a bug (interpolate has no value for it).
import { zhCN } from '../src/i18n/locales/zh-CN';
import { zhTW } from '../src/i18n/locales/zh-TW';
import { en } from '../src/i18n/locales/en';
import { ja } from '../src/i18n/locales/ja';
import { ko } from '../src/i18n/locales/ko';
import { es } from '../src/i18n/locales/es';

const PLACEHOLDER_RE = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;

type Leaves = Map<string, Set<string>>;

function walk(node: unknown, path: string, out: Leaves): void {
  if (typeof node === 'string') {
    out.set(path, new Set(node.match(PLACEHOLDER_RE) ?? []));
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${path}[${i}]`, out));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      walk(v, path ? `${path}.${k}` : k, out);
    }
  }
}

function collect(root: unknown): Leaves {
  const m: Leaves = new Map();
  walk(root, '', m);
  return m;
}

const BASELINE_NAME = 'zh-CN';
const BASELINE = collect(zhCN);
const OTHERS: Array<[string, Leaves]> = [
  ['zh-TW', collect(zhTW)],
  ['en', collect(en)],
  ['ja', collect(ja)],
  ['ko', collect(ko)],
  ['es', collect(es)],
];

function diff(other: Set<string>, baseline: Set<string>): string[] {
  const extras: string[] = [];
  for (const x of other) if (!baseline.has(x)) extras.push(x);
  return extras.sort();
}

function fmt(s: Set<string>): string {
  return s.size ? [...s].sort().join(' ') : '(none)';
}

let errors = 0;
for (const [name, leaves] of OTHERS) {
  for (const [path, baselinePh] of BASELINE) {
    const otherPh = leaves.get(path);
    if (otherPh === undefined) continue; // missing key — tsc catches this separately
    const extras = diff(otherPh, baselinePh);
    if (extras.length === 0) continue;
    errors++;
    console.error(
      `[${name}] ${path}\n  ${BASELINE_NAME}: ${fmt(baselinePh)}\n  ${name.padEnd(5)}: ${fmt(otherPh)}\n  unknown: ${extras.join(' ')}\n`,
    );
  }
}

if (errors > 0) {
  console.error(
    `${errors} placeholder mismatch(es) across ${OTHERS.length} locale(s). See CLAUDE.md 硬约束 #11.`,
  );
  process.exit(1);
}
console.log(
  `OK — placeholders consistent across all 6 locales (${BASELINE.size} string leaves checked).`,
);
