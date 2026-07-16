// The .github PR gate.
//
// This is the smallest repo with the widest blast radius: profile/README.md IS
// the org's public front page, and assets/ is consumed by OTHER repos over raw
// URLs. Both failure modes are SILENT - nothing errors, the image just vanishes
// from someone else's README.
//
// Dependency-free (node:fs + node:child_process). Workflow YAML parsing is done
// by a separate python3 step in ci.yml.
//
// Checks:
//   1. cross-repo asset guard  ENFORCED, repo-wide. Assets that other repos
//      reference by raw URL must exist. This is the check that matters most
//      here and it cannot be derived at runtime, because the gate cannot see
//      the other repos - the manifest below was produced by scanning the org
//      and must be re-scanned if consumers change (command in the header).
//   2. profile README           ENFORCED, always. It is the public front page,
//      so its links and local assets are checked on every run, changed or not.
//   3. other changed markdown   ENFORCED for files the PR touches. Legacy debt
//      is real (12 of 24 relative links in tracked docs are already broken), so
//      repo-wide enforcement would block every PR on old breakage. Totals are
//      printed each run so the debt is visible and shrinks as files are edited.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const BASE = baseIdx >= 0 ? args[baseIdx + 1] : "";

const sh = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

// Quote the pathspec: unquoted, the SHELL expands it against the cwd and you
// silently get only root-level files.
const tracked = () => sh('git ls-files -- "*.md"').split("\n").filter(Boolean);

function changed() {
  if (!BASE) {
    console.log("::error::--base was not supplied; refusing to check nothing.");
    process.exit(1);
  }
  try {
    return sh(`git diff --name-only --diff-filter=d ${BASE}...HEAD -- "*.md"`)
      .split("\n")
      .filter(Boolean)
      .filter((f) => existsSync(f));
  } catch {
    // FAIL LOUD. A shallow checkout (actions/checkout default fetch-depth: 1)
    // leaves no base ref; swallowing that would make this gate check zero files
    // and report SUCCESS.
    console.log(
      `::error::Cannot diff against '${BASE}' - base ref missing, likely a` +
        ` shallow checkout. Use fetch-depth: 0. Refusing to pass by checking` +
        ` nothing.`,
    );
    process.exit(1);
  }
}

let failures = 0;
const fail = (m) => {
  console.log(`::error::${m}`);
  failures += 1;
};

// -------------------------------------------------- 1. cross-repo asset guard
//
// Re-derive this list with, from C:\rand0m:
//   grep -rhoE "\.github/(raw|blob)/main/assets/[^\"')> ]+" --include="*.md" . \
//     | grep -v "^\./\.github/" | sed -E 's#.*/main/##' | sort -u
//
// Consumers today: abc (many READMEs), xyz, xyz-earth, xyz-tools, xyz-docs.
const CROSS_REPO_ASSETS = [
  "assets/ReadMe-Day.gif",
  "assets/ReadMe-Night.gif",
  "assets/_c1assr00m/ce-drk.gif",
  "assets/_c1assr00m/ce-lte.png",
  "assets/kn1ghts/kn1ghts-drk.gif",
  "assets/kn1ghts/kn1ghts-lte.png",
  "assets/kn1ghts/kn1ghts.gif",
  "assets/orac1es/orac1es-drk.gif",
  "assets/orac1es/orac1es-lte.png",
  "assets/orac1es/orac1es.gif",
  "assets/palette-day.svg",
  "assets/palette-night.svg",
  "assets/r1/r1-drk.gif",
  "assets/r1/r1-lte.png",
  "assets/rand0m/rand0m.gif",
  "assets/ruok-drk.gif",
  "assets/ruok-earth.png",
  "assets/ruok-lte.png",
  "assets/uti1ity/uti1ity-drk.gif",
  "assets/uti1ity/uti1ity-lte.png",
  "assets/uti1ity/uti1ity.gif",
];

// RESOLVED 2026-07-16, so this list is empty and should stay that way.
//
// assets/_c1assr00m/ruok-ce.gif was referenced by BOTH
// READMORE/_c1assr00m/README.md (this repo) and abc/apps/_c1assr00m/README.md
// and had never existed - the raw URL 404'd on the public internet. The owner
// chose to repoint both READMEs at assets/_c1assr00m/ce-drk.gif, which is the
// c1assr00m image those same files already use for their header and which
// serves correctly. Both references are now repointed and nothing refers to
// ruok-ce.gif anywhere.
//
// Keep this empty. An entry here is an asset the guard has been told to stop
// protecting, which is exactly how a silent break becomes permanent. If you are
// tempted to add one, fix the asset instead.
const KNOWN_BROKEN = [];

for (const a of CROSS_REPO_ASSETS) {
  if (!existsSync(a)) {
    fail(
      `cross-repo asset missing: ${a} - other repos load this over a raw URL;` +
        ` deleting or renaming it silently breaks their README with no error`,
    );
  }
}
console.log(`assets: verified ${CROSS_REPO_ASSETS.length} cross-repo asset(s) exist`);

for (const a of KNOWN_BROKEN) {
  if (existsSync(a)) {
    fail(`${a} now exists - remove it from KNOWN_BROKEN so the guard enforces it`);
  } else {
    console.log(
      `::warning::KNOWN BROKEN (pre-existing, owner decision needed): ${a} is` +
        ` referenced by this repo's READMORE and by abc, but does not exist.` +
        ` The public raw URL 404s.`,
    );
  }
}

// -------------------------------------------------- links + local assets
function refs(text) {
  const out = [];
  for (const m of text.matchAll(/\]\(([^)]+)\)/g)) out.push(m[1].split(/\s+/)[0]);
  for (const m of text.matchAll(/(?:src|href)\s*=\s*"([^"]+)"/g)) out.push(m[1]);
  return out
    .map((r) => (r || "").trim())
    .filter(Boolean)
    .filter((r) => !/^(https?:|mailto:|#|data:)/i.test(r))
    .map((r) => r.split("#")[0])
    .filter(Boolean);
}

function brokenIn(file) {
  const broken = [];
  for (const r of refs(readFileSync(file, "utf8"))) {
    const target = normalize(join(dirname(file), decodeURIComponent(r)));
    if (!existsSync(target)) broken.push(r);
  }
  return broken;
}

// 2. The public front page: always enforced.
const PROFILE = "profile/README.md";
if (!existsSync(PROFILE)) {
  fail(`${PROFILE} is missing - that file IS the org's public profile page`);
} else {
  for (const b of brokenIn(PROFILE)) {
    fail(`${PROFILE}: broken reference -> ${b} (this renders on the PUBLIC org page)`);
  }
  console.log(`profile: ${PROFILE} references check out`);
}

// 3. Everything else the PR touched.
const touched = changed().filter((f) => f !== PROFILE);
for (const f of touched) {
  for (const b of brokenIn(f)) fail(`${f}: broken reference -> ${b}`);
}
console.log(
  touched.length
    ? `links: checked ${touched.length} other changed doc(s) against ${BASE}`
    : `links: no other markdown changed in this PR`,
);

// Legacy debt: visible, never blocking.
let legacy = 0;
for (const f of tracked()) legacy += brokenIn(f).length;
if (legacy) {
  console.log(
    `::notice::${legacy} pre-existing broken reference(s) across tracked docs.` +
      ` Not blocking: only the profile page and files a PR TOUCHES are enforced.`,
  );
}

if (failures) {
  console.log(`\nFAILED: ${failures} problem(s).`);
  process.exit(1);
}
console.log("\nOK: cross-repo assets present, public profile intact, changed docs resolve.");
