// Tests for the AiEDs totals generator. Offline: no network, no secrets.
// Run: node --test scripts/aieds-totals.test.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITES,
  REQUIRED_SENTENCES,
  buildTotals,
  displayFor,
  loadFactors,
  reduceInput,
  serialize,
} from "./aieds-totals.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const readJson = (p) => JSON.parse(read(p));

const F = loadFactors();
const SCHEMA = readJson("aieds/aieds-totals.schema.json");
const INPUT = readJson("aieds/input/aieds-totals-input.json");
const COMMITTED = readJson("aieds/aieds-totals.json");
const clone = (x) => JSON.parse(JSON.stringify(x));

// ---- a small JSON Schema checker (only the keywords the schema uses) -------

function validate(value, schema, root = SCHEMA, path = "$") {
  const errors = [];
  const s = schema.$ref ? resolve(schema.$ref, root) : schema;
  if (s.anyOf) {
    const ok = s.anyOf.some((alt) => validate(value, alt, root, path).length === 0);
    return ok ? [] : [`${path}: matches none of anyOf`];
  }
  if (s === false) return [`${path}: not allowed`];
  if ("const" in s && value !== s.const) errors.push(`${path}: not ${JSON.stringify(s.const)}`);
  if (s.type) {
    const types = Array.isArray(s.type) ? s.type : [s.type];
    const t = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
    const okType = types.some((x) => x === t || (x === "integer" && t === "number" && Number.isInteger(value)));
    if (!okType) return [...errors, `${path}: type ${t} not in ${types}`];
  }
  if (typeof value === "string" && s.pattern && !new RegExp(s.pattern).test(value)) errors.push(`${path}: pattern`);
  if (typeof value === "number" && s.minimum !== undefined && value < s.minimum) errors.push(`${path}: below minimum`);
  if (Array.isArray(value)) {
    if (s.minItems !== undefined && value.length < s.minItems) errors.push(`${path}: too few items`);
    if (s.maxItems !== undefined && value.length > s.maxItems) errors.push(`${path}: too many items`);
    value.forEach((v, i) => {
      const item = s.prefixItems?.[i] ?? s.items;
      if (item !== undefined) errors.push(...validate(v, item, root, `${path}[${i}]`));
    });
  }
  if (value && typeof value === "object" && !Array.isArray(value) && s.properties) {
    for (const k of s.required ?? []) if (!(k in value)) errors.push(`${path}.${k}: required`);
    for (const [k, v] of Object.entries(value)) {
      if (!(k in s.properties)) {
        if (s.additionalProperties === false) errors.push(`${path}.${k}: unknown key`);
      } else errors.push(...validate(v, s.properties[k], root, `${path}.${k}`));
    }
  }
  return errors;
}

function resolve(ref, root) {
  return ref
    .replace(/^#\//, "")
    .split("/")
    .reduce((o, k) => o[k], root);
}

function objectPaths(value, path = []) {
  const out = [];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    out.push(path);
    for (const [k, v] of Object.entries(value)) out.push(...objectPaths(v, [...path, k]));
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => out.push(...objectPaths(v, [...path, i])));
  }
  return out;
}

function strings(value, path = "$") {
  if (typeof value === "string") return [[path, value]];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  }
  return [];
}

// ---- schema ---------------------------------------------------------------

test("the committed totals file validates against the schema", () => {
  assert.deepEqual(validate(COMMITTED, SCHEMA), []);
});

test("an unknown key at any depth fails the schema", () => {
  const paths = objectPaths(COMMITTED);
  assert.ok(paths.length > 20, "walked the whole tree");
  for (const p of paths) {
    const copy = clone(COMMITTED);
    const node = p.reduce((o, k) => o[k], copy);
    node.surprise = 1;
    const errors = validate(copy, SCHEMA);
    assert.ok(errors.length > 0, `no failure at ${p.join(".") || "root"}`);
  }
});

test("a missing required key fails the schema", () => {
  const copy = clone(COMMITTED);
  delete copy.asOf;
  assert.ok(validate(copy, SCHEMA).length > 0);
});

// ---- reproducibility and a stale-data field -------------------------------

test("the committed file is reproduced byte for byte from the committed input", () => {
  assert.equal(serialize(buildTotals(INPUT, F)), read("aieds/aieds-totals.json"));
});

test("asOf is present, is a date, and is the last day of data", () => {
  assert.match(COMMITTED.asOf, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(COMMITTED.asOf, COMMITTED.coverage.to);
  assert.ok(COMMITTED.generatedAt.startsWith(COMMITTED.asOf) || COMMITTED.generatedAt >= COMMITTED.asOf);
});

test("the factors mirror matches the methodology the file claims", () => {
  assert.equal(F.methodologyVersion, COMMITTED.methodology.version);
  assert.equal(F.impactModelVersion, COMMITTED.methodology.impactModelVersion);
  assert.equal(F.grid, 429);
  assert.equal(F.waterPerKWh, 4.88);
  assert.equal(F.waterLowPerKWh, 1.77);
  assert.equal(F.waterHighPerKWh, 11.3);
});

// ---- arithmetic -----------------------------------------------------------

const rows = (t) => [t.company, t.sharedUnplaced, ...SITES.map((n) => t.sites[n])].filter((r) => r.energyKWh !== null);

test("carbon, Tree-Time and water recompute from energy", () => {
  for (const r of rows(COMMITTED)) {
    const g = r.energyKWh * 429;
    assert.ok(Math.abs(r.gCO2e - g) <= 1e-3 + 1e-9 * g, "gCO2e");
    const tree = (r.gCO2e / 21000) * 525600;
    assert.ok(Math.abs(r.treeTimeMinutes - tree) <= 1e-2 + 1e-9 * tree, "tree-time");
    assert.ok(Math.abs(r.water.waterL - r.energyKWh * 4.88) <= 1e-3 + 1e-9 * r.water.waterL, "water");
    assert.ok(Math.abs(r.water.rangeL.low - r.energyKWh * 1.77) <= 1e-3 + 1e-9 * r.water.waterL, "low");
    assert.ok(Math.abs(r.water.rangeL.high - r.energyKWh * 11.3) <= 1e-3 + 1e-9 * r.water.waterL, "high");
  }
});

test("shared / unplaced equals the company total minus the six sites", () => {
  const sum = (f) => SITES.reduce((s, n) => s + (COMMITTED.sites[n][f] ?? 0), 0);
  const c = COMMITTED.company;
  const sh = COMMITTED.sharedUnplaced;
  assert.ok(Math.abs(sh.energyKWh - (c.energyKWh - sum("energyKWh"))) < 1e-5);
  assert.ok(Math.abs(sh.tokens - (c.tokens - sum("tokens"))) <= SITES.length + 1);
  assert.ok(Math.abs(sh.gCO2e - (c.gCO2e - sum("gCO2e"))) < 0.01);
  assert.ok(sh.energyKWh >= 0);
});

test("water: low <= value <= high, US average label", () => {
  for (const r of rows(COMMITTED)) {
    assert.ok(r.water.rangeL.low <= r.water.waterL && r.water.waterL <= r.water.rangeL.high);
    assert.equal(r.water.gridBasis, "US average");
    assert.equal(r.confidence, "low");
  }
});

test("input that disagrees with the standard's constants fails the build", () => {
  const bad = clone(INPUT);
  bad.company.gCO2e *= 1.01;
  assert.throws(() => reduceInput(bad, F), /gCO2e/);
  const bad2 = clone(INPUT);
  bad2.sites.llc.water.waterL *= 1.01;
  assert.throws(() => reduceInput(bad2, F), /waterL/);
  const bad3 = clone(INPUT);
  bad3.company.treeTimeMinutes *= 1.01;
  assert.throws(() => reduceInput(bad3, F), /treeTimeMinutes/);
});

test("company energy in the output is the input's", () => {
  assert.ok(Math.abs(COMMITTED.company.energyKWh - INPUT.company.energyKWh) < 5e-7);
  assert.equal(COMMITTED.company.tokens, Math.round(INPUT.company.tokens));
});

// ---- nulls ----------------------------------------------------------------

test("a site with no placed work is null, never zero", () => {
  const input = clone(INPUT);
  delete input.sites.llc;
  input.sites.knightly = null;
  const out = buildTotals(input, F);
  for (const n of ["llc", "knightly"]) {
    assert.deepEqual(out.sites[n], {
      tokens: null,
      energyKWh: null,
      gCO2e: null,
      treeTimeMinutes: null,
      water: null,
      confidence: "low",
    });
    assert.equal(out.display.sites[n], null);
  }
  assert.deepEqual(validate(out, SCHEMA), []);
  // The parts still add up, now with the two nulls left out of the sum.
  const placed = SITES.reduce((s, n) => s + (out.sites[n].energyKWh ?? 0), 0);
  assert.ok(Math.abs(out.sharedUnplaced.energyKWh - (out.company.energyKWh - placed)) < 1e-5);
  assert.ok(!JSON.stringify(out.sites.llc).includes(": 0"));
});

// ---- required sentences and copy ------------------------------------------

test("required sentences are verbatim", () => {
  assert.deepEqual(COMMITTED.requiredSentences, [
    "Energy and carbon are modeled estimates.",
    "Tree-Time and equivalents are educational comparisons.",
    "Water is a modeled estimate.",
  ]);
  assert.deepEqual(REQUIRED_SENTENCES, COMMITTED.requiredSentences);
  const spec = readFileSync(join(ROOT, "aieds", "input", "aieds-factors.json"), "utf8");
  assert.ok(spec.length > 0);
});

test("no banned water word appears anywhere in the output text", () => {
  const banned = /\b(offset|credit|neutral|positive|saved|restored|replenished)\b/i;
  for (const [p, s] of strings(COMMITTED)) assert.ok(!banned.test(s), `${p}: ${s}`);
});

test("display strings are 2 significant figures with the right unit step", () => {
  const d = displayFor(COMMITTED.company);
  assert.equal(d.tokens.text, "about 40 billion");
  assert.equal(d.energy.text, "about 6.9 MWh");
  assert.equal(d.treeTime.text, "about 140 years (1 tree)");
  assert.equal(d.treeTime.note, "(1 tree)");
  assert.equal(d.water.text, "about 34,000 L (12,000 to 78,000)");
  assert.equal(d.water.basis, "US average");
  assert.deepEqual(COMMITTED.display.company, d);
  // 2 significant figures at most, in every value string.
  for (const [p, s] of strings(COMMITTED.display)) {
    if (!p.endsWith(".value") && !p.endsWith(".low") && !p.endsWith(".high")) continue;
    const digits = s.replace(/[,.]/g, "").replace(/0+$/, "");
    assert.ok(digits.length <= 2, `${p}: ${s}`);
  }
  // A unit step is re-checked after rounding.
  const edge = displayFor({
    tokens: 999_600,
    energyKWh: 0.9996,
    gCO2e: 999_600,
    treeTimeMinutes: 59.7,
    water: { waterL: 0.0999, rangeL: { low: 0.05, high: 0.2 } },
  });
  assert.equal(edge.tokens.text, "about 1 million");
  assert.equal(edge.energy.text, "about 1 kWh");
  assert.equal(edge.carbon.text, "about 1 t CO2e");
  assert.equal(edge.treeTime.text, "about 1 hour (1 tree)");
  assert.equal(edge.water.unit, "L");
});

// ---- PII gate -------------------------------------------------------------

const PII = [
  ["backslash", /\\/],
  ["drive letter", /(^|[^A-Za-z])[A-Za-z]:[\\/]/],
  ["at sign", /@/],
  ["uuid", /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i],
  ["dot dot", /\.\./],
  ["session word", /session[ _-]?id|cwd|prompt|branch|worktree|clone|lane/i],
  ["model id", /claude|gpt|gemini|opus|sonnet|haiku|codex|o[134]-/i],
  ["lane or branch shape", /--|lane\/|feat\/|fix\//],
  ["dash", /[\u2013\u2014]/],
  ["non ascii", /[^\x00-\x7f]/],
];

function gate(output) {
  const bad = [];
  for (const [p, s] of strings(output)) {
    const isUrl = p === "$.methodology.url";
    for (const [name, re] of PII) {
      if (re.test(s)) bad.push(`${p} (${name}): ${s}`);
    }
    // A path separator is only allowed in the one fixed URL.
    if (!isUrl && /[\\/]/.test(s)) bad.push(`${p} (path separator): ${s}`);
  }
  return bad;
}

test("PII gate: the committed output carries no path, id or private name", () => {
  assert.deepEqual(gate(COMMITTED), []);
  assert.equal(COMMITTED.methodology.url, "https://standard.rand0m.ai/aieds/v2/methodology.md");
  assert.deepEqual(Object.keys(COMMITTED.sites), SITES);
});

test("PII gate: the committed input and output are ASCII with no em or en dash", () => {
  for (const p of ["aieds/aieds-totals.json", "aieds/aieds-totals.schema.json", "aieds/input/aieds-totals-input.json", "aieds/README-totals.md", "scripts/aieds-totals.mjs", "scripts/aieds-totals.test.mjs"]) {
    assert.ok(!/[^\x00-\x7f]/.test(read(p)), `${p} has a non-ASCII character`);
  }
});

test("PII gate: a laptop-shaped input full of private fields yields none of them", () => {
  const secrets = [
    "C:\\rand0m\\private-folder",
    "d1f4a7c2-1b2c-4d3e-8f90-123456789abc",
    "lane/rand0m--secret-lane-1102",
    "feat/secret-branch",
    "secret-clone-name",
    "please summarize my private plan",
    "claude-opus-5",
    "owner@example.com",
  ];
  const full = {
    ...clone(INPUT),
    repos: {},
    otherRepos: {},
    sharedUnplaced: null,
    cwd: secrets[0],
    sessionId: secrets[1],
    attributionRule: secrets[5],
  };
  // Rebuild a laptop-shaped file: sites as repos, plus a private repo, plus the remainder.
  const siteEnergy = SITES.reduce((s, n) => s + INPUT.sites[n].energyKWh, 0);
  const siteTokens = SITES.reduce((s, n) => s + INPUT.sites[n].tokens, 0);
  for (const n of SITES) full.repos[n] = { ...clone(INPUT.sites[n]), repository: secrets[2], agentsName: secrets[4], cwd: secrets[0], model: secrets[6] };
  const rest = (f) => INPUT.company[f] - (f === "tokens" ? siteTokens : siteEnergy);
  const e = rest("energyKWh");
  const t = rest("tokens");
  const half = (x) => x / 2;
  const mk = (energy, tokens) => ({
    tokens,
    energyKWh: energy,
    gCO2e: energy * 429,
    treeTimeMinutes: ((energy * 429) / 21000) * 525600,
    water: {
      siteL: energy * 0.36,
      gridL: energy * 4.52,
      waterL: energy * 4.88,
      rangeL: { low: energy * 1.77, high: energy * 11.3 },
      gridBasis: "US average",
    },
    confidence: "low",
    branch: secrets[3],
    prompt: secrets[5],
    email: secrets[7],
    sessionId: secrets[1],
  });
  full.repos["private-repo-name"] = mk(half(e), half(t));
  full.sharedUnplaced = mk(e - half(e), t - half(t));
  delete full.sites;
  full.coverage = { ...full.coverage, rows: 5, cwd: secrets[0] };

  const reduced = reduceInput(full, F);
  const out = serialize(buildTotals(reduced, F));
  for (const s of secrets) assert.ok(!out.includes(s), `leaked ${s}`);
  assert.ok(!serialize(reduced).includes("private-repo-name"));
  for (const k of ["cwd", "sessionId", "branch", "prompt", "email", "model", "repository", "agentsName"]) {
    assert.ok(!out.includes(`"${k}"`), `leaked key ${k}`);
  }
  assert.deepEqual(gate(JSON.parse(out)), []);
  assert.deepEqual(validate(JSON.parse(out), SCHEMA), []);
});

test("PII gate: a free-text field in the input is refused, not copied", () => {
  const bad = clone(INPUT);
  bad.methodology.countRule = "see C:\\rand0m\\notes and mail me@example.com";
  assert.throws(() => reduceInput(bad, F), /countRule/);
});

test("the laptop file's parts must add up to the company total", () => {
  const full = {
    ...clone(INPUT),
    repos: Object.fromEntries(SITES.map((n) => [n, clone(INPUT.sites[n])])),
    sharedUnplaced: clone(INPUT.company),
  };
  delete full.sites;
  assert.throws(() => reduceInput(full, F), /parts sum/);
});
