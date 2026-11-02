// Generate aieds/aieds-totals.json, the public counts-only AiEDs totals file.
//
// Two steps, both offline:
//   1. reduceInput: the laptop file (aieds-repo-totals) is cross-checked and cut
//      down, by allowlist, to company totals plus the six site rows. Only that
//      reduced file is committed (aieds/input/aieds-totals-input.json), because
//      the laptop file also names repositories that are private.
//   2. buildTotals: the reduced input becomes the public output. Carbon,
//      Tree-Time and water are recomputed from energy with the constants in
//      aieds/input/aieds-factors.json (a verbatim mirror of
//      standard/spec/v2/aieds-factors.json) and must agree with the input.
//
// Usage: node scripts/aieds-totals.mjs [--in <path>] [--out <path>]
//          [--reduced-out <path>] [--factors <path>]
// Default --in is the committed reduced input. A full laptop file is detected
// by its "repos" key; then the reduced input is rewritten as well.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DEFAULT_IN = join(ROOT, "aieds", "input", "aieds-totals-input.json");
export const DEFAULT_REDUCED = DEFAULT_IN;
export const DEFAULT_OUT = join(ROOT, "aieds", "aieds-totals.json");
export const DEFAULT_FACTORS = join(ROOT, "aieds", "input", "aieds-factors.json");

export const SCHEMA_VERSION = 1;
export const SITES = ["rand0m", "randomly", "knightly", "xyz", "llc", "org"];
export const METHODOLOGY_URL = "https://standard.rand0m.ai/aieds/v2/methodology.md";
export const MEANING = "AI agent sessions that built these sites";
export const SHARED_MEANING =
  "Everything that is not one of the six sites, such as other repositories, shared tooling and work not placed on a site. Sites plus this row equal the company total.";
export const KNOWN_MISSING = ["other computers", "sessions not yet recorded"];
export const REQUIRED_SENTENCES = [
  "Energy and carbon are modeled estimates.",
  "Tree-Time and equivalents are educational comparisons.",
  "Water is a modeled estimate.",
];
const GRID_BASIS = "US average";
const SAFE_TEXT = /^[A-Za-z0-9 .,()'-]{1,200}$/;
// The input is a recorded value, so it must agree with a recomputation to far
// better than any display rounding.
const REL_TOL = 1e-6;

export function loadFactors(path = DEFAULT_FACTORS) {
  const f = JSON.parse(readFileSync(path, "utf8"));
  const siteW = f.water.siteWue;
  const gridW = f.water.gridWaterIntensity;
  return {
    methodologyVersion: f.methodologyVersion,
    impactModelVersion: f.impactModelVersion,
    grid: f.gridIntensity.responseSurfacePinned.value,
    treeGramsPerYear: f.constants.matureReferenceTreeCo2eGramsPerYear.value,
    minutesPerYear: f.constants.minutesPerYear.value,
    waterPerKWh: r6(siteW.value + gridW.value),
    waterSitePerKWh: siteW.value,
    waterGridPerKWh: gridW.value,
    waterLowPerKWh: r6(siteW.low + gridW.low),
    waterHighPerKWh: r6(siteW.high + gridW.high),
    waterConfidence: f.water.confidence,
    gridBasisLabel: f.water.gridBasisDefaultLabel,
  };
}

function r6(x) {
  return Math.round(x * 1e6) / 1e6;
}

function fail(msg) {
  throw new Error(`aieds-totals: ${msg}`);
}

function num(v, where) {
  if (typeof v !== "number" || !Number.isFinite(v) || v < 0) fail(`${where} is not a non-negative number`);
  return v;
}

function close(a, b) {
  return Math.abs(a - b) <= REL_TOL * Math.max(Math.abs(a), Math.abs(b), 1e-12);
}

function same(a, b, where) {
  if (!close(a, b)) fail(`${where}: input ${a} disagrees with recomputed ${b}`);
}

// Everything derived from energy, with the standard's constants.
export function derive(energyKWh, f) {
  const gCO2e = energyKWh * f.grid;
  return {
    gCO2e,
    treeTimeMinutes: (gCO2e / f.treeGramsPerYear) * f.minutesPerYear,
    siteL: energyKWh * f.waterSitePerKWh,
    gridL: energyKWh * f.waterGridPerKWh,
    waterL: energyKWh * f.waterPerKWh,
    low: energyKWh * f.waterLowPerKWh,
    high: energyKWh * f.waterHighPerKWh,
  };
}

// Check one input row (company or a site) against the recomputation.
function checkRow(row, where, f) {
  num(row.tokens, `${where}.tokens`);
  num(row.energyKWh, `${where}.energyKWh`);
  const d = derive(row.energyKWh, f);
  same(row.gCO2e, d.gCO2e, `${where}.gCO2e`);
  same(row.treeTimeMinutes, d.treeTimeMinutes, `${where}.treeTimeMinutes`);
  const w = row.water ?? fail(`${where}.water is missing`);
  same(w.siteL, d.siteL, `${where}.water.siteL`);
  same(w.gridL, d.gridL, `${where}.water.gridL`);
  same(w.waterL, d.waterL, `${where}.water.waterL`);
  same(w.rangeL?.low, d.low, `${where}.water.rangeL.low`);
  same(w.rangeL?.high, d.high, `${where}.water.rangeL.high`);
  if (w.gridBasis !== f.gridBasisLabel) fail(`${where}.water.gridBasis is not "${f.gridBasisLabel}"`);
  if (row.confidence !== "low") fail(`${where}.confidence is not "low"`);
}

// Allowlist copy: nothing outside these keys survives.
function pickRow(row) {
  return {
    tokens: row.tokens,
    energyKWh: row.energyKWh,
    gCO2e: row.gCO2e,
    treeTimeMinutes: row.treeTimeMinutes,
    water: {
      siteL: row.water.siteL,
      gridL: row.water.gridL,
      waterL: row.water.waterL,
      rangeL: { low: row.water.rangeL.low, high: row.water.rangeL.high },
      gridBasis: row.water.gridBasis,
    },
    confidence: row.confidence,
  };
}

function sumField(rows, field) {
  return rows.reduce((s, r) => s + (typeof r?.[field] === "number" ? r[field] : 0), 0);
}

// Step 1. Accepts the laptop file ("repos" present) or an already reduced file.
export function reduceInput(input, f) {
  const full = input && typeof input === "object" && "repos" in input;
  const m = input.methodology ?? fail("methodology is missing");
  if (m.name !== "AiEDs") fail("methodology.name is not AiEDs");
  if (m.version !== f.methodologyVersion) fail(`methodology.version ${m.version} is not ${f.methodologyVersion}`);
  if (m.impactModelVersion !== f.impactModelVersion) fail("impactModelVersion differs from the factors file");
  if (m.url !== METHODOLOGY_URL) fail("methodology.url is not the standard's URL");
  if (typeof m.countRule !== "string" || !SAFE_TEXT.test(m.countRule)) fail("methodology.countRule is not plain text");
  if (input.schemaVersion !== SCHEMA_VERSION) fail("unknown input schemaVersion");
  const cov = input.coverage ?? fail("coverage is missing");
  const sessions = cov.sessions;
  for (const k of ["from", "to"]) {
    if (typeof cov[k] !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(cov[k])) fail(`coverage.${k} is not a date`);
  }
  if (!Number.isInteger(cov.machines) || !Number.isInteger(sessions)) fail("coverage counts are not integers");
  if (typeof input.generatedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(input.generatedAt)) {
    fail("generatedAt is not an ISO UTC time");
  }

  checkRow(input.company, "company", f);

  const sourceSites = full ? input.repos : input.sites;
  const sites = {};
  for (const name of SITES) {
    const row = sourceSites?.[name];
    if (row === undefined || row === null) {
      sites[name] = null;
      continue;
    }
    checkRow(row, `sites.${name}`, f);
    sites[name] = pickRow(row);
  }

  if (full) {
    // Parts must add up to the whole: every repository, the other repositories
    // and the unplaced remainder equal the company total.
    const parts = [
      ...Object.values(input.repos),
      ...Object.values(input.otherRepos ?? {}),
      input.sharedUnplaced ?? fail("sharedUnplaced is missing"),
    ];
    for (const field of ["tokens", "energyKWh"]) {
      const total = sumField(parts, field);
      if (!close(total, input.company[field])) {
        fail(`parts sum to ${total} ${field}, company says ${input.company[field]}`);
      }
    }
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: input.generatedAt,
    methodology: {
      name: m.name,
      version: m.version,
      impactModelVersion: m.impactModelVersion,
      countRule: m.countRule,
      url: m.url,
    },
    coverage: { from: cov.from.slice(0, 10), to: cov.to.slice(0, 10), machines: cov.machines, sessions },
    company: pickRow(input.company),
    sites,
  };
}

// ---- display strings -------------------------------------------------------

function sig2(x) {
  return Number(x.toPrecision(2));
}

function fmt(n) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

// Pick a unit step, round to 2 significant figures, and step up again if the
// rounding reached the next unit (960 Wh stays Wh, 999.6 Wh reads 1 kWh).
function step(x, units) {
  const from = (u) => u.from ?? u.size;
  let i = 0;
  while (i + 1 < units.length && x >= from(units[i + 1])) i++;
  let v = sig2(x / units[i].size);
  while (i + 1 < units.length && v * units[i].size >= from(units[i + 1])) {
    i++;
    v = Math.max(from(units[i]) / units[i].size, sig2(x / units[i].size));
  }
  return { v, unit: units[i] };
}

function plural(unit, v) {
  return v === 1 && unit.one ? unit.one : unit.name;
}

function tile(x, units, label = (u) => u.name) {
  const { v, unit } = step(x, units);
  const name = label(unit, v);
  return { value: fmt(v), unit: name, text: `about ${fmt(v)}${name ? " " + name : ""}` };
}

const ENERGY_UNITS = [
  { name: "Wh", size: 1 },
  { name: "kWh", size: 1e3 },
  { name: "MWh", size: 1e6 },
];
const CARBON_UNITS = [
  { name: "g CO2e", size: 1 },
  { name: "kg CO2e", size: 1e3 },
  { name: "t CO2e", size: 1e6 },
];
const TOKEN_UNITS = [
  { name: "", size: 1 },
  { name: "million", size: 1e6 },
  { name: "billion", size: 1e9 },
];
const TREE_UNITS = [
  { name: "minutes", one: "minute", size: 1 },
  { name: "hours", one: "hour", size: 60 },
  { name: "days", one: "day", size: 1440 },
  { name: "years", one: "year", size: 525600 },
];
const WATER_UNITS = [
  { name: "mL", size: 0.001 },
  { name: "L", size: 1, from: 0.1 },
];

// Water: one unit for the central figure, the range shown in the same unit.
function waterTile(w) {
  const { v, unit } = step(w.waterL, WATER_UNITS);
  const low = sig2(w.rangeL.low / unit.size);
  const high = sig2(w.rangeL.high / unit.size);
  return {
    value: fmt(v),
    unit: unit.name,
    low: fmt(low),
    high: fmt(high),
    basis: GRID_BASIS,
    text: `about ${fmt(v)} ${unit.name} (${fmt(low)} to ${fmt(high)})`,
  };
}

export function displayFor(row) {
  if (row === null) return null;
  const tree = tile(row.treeTimeMinutes, TREE_UNITS, (u, v) => plural(u, v));
  return {
    tokens: tile(row.tokens, TOKEN_UNITS),
    energy: tile(row.energyKWh * 1000, ENERGY_UNITS),
    carbon: tile(row.gCO2e, CARBON_UNITS),
    treeTime: { ...tree, note: "(1 tree)", text: `${tree.text} (1 tree)` },
    water: waterTile(row.water),
  };
}

// ---- output ---------------------------------------------------------------

function q(x, digits) {
  const p = 10 ** digits;
  return Math.round(x * p) / p;
}

// A full output row from tokens and energy; everything else is derived.
function outRow(tokens, energyKWh, f) {
  const d = derive(energyKWh, f);
  return {
    tokens: Math.round(tokens),
    energyKWh: q(energyKWh, 6),
    gCO2e: q(d.gCO2e, 3),
    treeTimeMinutes: q(d.treeTimeMinutes, 3),
    water: {
      waterL: q(d.waterL, 4),
      rangeL: { low: q(d.low, 4), high: q(d.high, 4) },
      gridBasis: GRID_BASIS,
    },
    confidence: "low",
  };
}

function nullRow() {
  return { tokens: null, energyKWh: null, gCO2e: null, treeTimeMinutes: null, water: null, confidence: "low" };
}

// Step 2. `reduced` is the output of reduceInput (checked again here).
export function buildTotals(reduced, f) {
  const input = reduceInput(reduced, f);
  const company = outRow(input.company.tokens, input.company.energyKWh, f);

  const sites = {};
  const placed = [];
  for (const name of SITES) {
    const row = input.sites[name];
    if (row === null) {
      sites[name] = nullRow();
    } else {
      sites[name] = outRow(row.tokens, row.energyKWh, f);
      placed.push(row);
    }
  }

  // Shared / unplaced is the company total minus the six sites, from the
  // unrounded input, so the parts add up by construction.
  const sharedEnergy = Math.max(0, input.company.energyKWh - sumField(placed, "energyKWh"));
  const sharedTokens = Math.max(0, input.company.tokens - sumField(placed, "tokens"));
  const sharedUnplaced = outRow(sharedTokens, sharedEnergy, f);

  const display = {
    company: displayFor(company),
    sites: Object.fromEntries(SITES.map((n) => [n, sites[n].energyKWh === null ? null : displayFor(sites[n])])),
    sharedUnplaced: displayFor(sharedUnplaced),
  };

  return {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: input.generatedAt,
    asOf: input.coverage.to,
    methodology: { ...input.methodology },
    meaning: MEANING,
    coverage: {
      from: input.coverage.from,
      to: input.coverage.to,
      machines: input.coverage.machines,
      sessionsRecorded: input.coverage.sessions,
      knownMissing: [...KNOWN_MISSING],
    },
    company,
    sites,
    sharedUnplaced,
    sharedUnplacedMeaning: SHARED_MEANING,
    display,
    requiredSentences: [...REQUIRED_SENTENCES],
  };
}

export function serialize(obj) {
  return JSON.stringify(obj, null, 2) + "\n";
}

// ---- CLI ------------------------------------------------------------------

function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--") || i + 1 >= argv.length) fail(`bad argument ${a}`);
    opts[a.slice(2)] = resolve(argv[++i]);
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const f = loadFactors(opts.factors ?? DEFAULT_FACTORS);
  const inPath = opts.in ?? DEFAULT_IN;
  const input = JSON.parse(readFileSync(inPath, "utf8"));
  const reduced = reduceInput(input, f);
  if ("repos" in input) writeFileSync(opts["reduced-out"] ?? DEFAULT_REDUCED, serialize(reduced));
  const totals = buildTotals(reduced, f);
  writeFileSync(opts.out ?? DEFAULT_OUT, serialize(totals));
  console.log(`aieds-totals: wrote totals, asOf ${totals.asOf}, company ${totals.company.energyKWh} kWh`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
