// Regenerates the STANDARD version table in a README from the one published
// source of truth, https://standard.rand0m.ai/versions.json.
//
// WHY THIS EXISTS. The same four-row table is rendered in the README template,
// the org profile page, and three repo READMEs. On 2026-09-15 every copy agreed
// on the versions and two of them had already drifted on the DESCRIPTION
// column, which is the column nobody rereads. Meanwhile the published site
// itself announced K13 at 1.1.0 against a real 2.0.0, from a literal typed into
// a build script. Six hand-maintained copies of one fact is the drift condition
// this workspace keeps paying for.
//
// So: the versions come from one URL, the block is delimited by markers, and
// this script rewrites what is between them. It never parses a markdown table,
// because parsing the table is what let the description column drift in the
// first place.
//
// Dependency free: node 20 or newer, and nothing else.
//
// Usage:
//   node scripts/sync-standard-versions.mjs --check README.md
//   node scripts/sync-standard-versions.mjs --write README.md
//   node scripts/sync-standard-versions.mjs --write --source ./local.json README.md
//
// Exit codes: 0 in sync (or written), 1 drift found in --check, 2 a real error
// such as a missing marker or an unreachable source. A drift and a breakage
// must not look the same to CI.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BEGIN = "<!-- STANDARD:BEGIN -->";
const END = "<!-- STANDARD:END -->";
// THE DEFAULT SOURCE IS THE REPOSITORY, NOT THE PUBLISHED SITE.
//
// standard.rand0m.ai is deployed BY HAND, owner identity only, per the standard
// repo CONTRIBUTING.md. Pointing this check at the published site would make
// every consumer pull request depend on a manual deploy having happened: the
// check would hard-fail with a 404 until someone ran a deploy, which is a red
// check nobody can fix by fixing their own repo. That is how a gate teaches
// people to ignore it.
//
// So the default reads standard main, which is current the moment a version
// PR merges and needs no deploy. The published URL below is the one EXTERNAL
// consumers pin to, and it is what the site serves; pass --source to use it.
const DEFAULT_SOURCE =
  "https://raw.githubusercontent.com/random-knights/standard/main/spec/v2/standard-versions.json";
export const PUBLISHED_SOURCE = "https://standard.rand0m.ai/versions.json";

// PRESENTATION LIVES HERE, not in versions.json. That file is in the standard
// repo, which runs an ASCII gate with a deliberately near-empty exception list,
// so an emoji there would either break the gate or force a numeric-entity
// encoding into a data file. These marks are decoration and they do not change;
// the versions do, and those come from the source.
const EMOJI = {
  eplus: "\u{1F30E}",
  aieds: "⚡",
  k13: "\u{1F451}",
  "ai-for-good": "❤️",
};

export async function fetchVersions(source) {
  if (!/^https?:/.test(source)) {
    return JSON.parse(readFileSync(source, "utf8"));
  }
  const res = await fetch(source, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`${source} returned ${res.status}`);
  }
  return res.json();
}

/**
 * Renders the block between the markers.
 *
 * The column widths are padded so the committed markdown stays readable as
 * source, which is how the hand-written tables looked and is worth keeping: a
 * generated file that is ugly to read invites someone to "tidy" it by hand.
 */
export function renderBlock(versions) {
  const rows = versions.standards.map((s) => ({
    name: s.name,
    emoji: EMOJI[s.id] ?? "",
    version: s.version,
    description: s.description,
  }));
  const width = (pick) =>
    Math.max(...rows.map((r) => [...pick(r)].length), 0);
  const nameW = Math.max(width((r) => r.name), "Name".length);
  const versionW = Math.max(width((r) => r.version), "Version".length);
  const descW = Math.max(width((r) => r.description), "Description".length);

  const centre = (text, w) => {
    const pad = w - [...text].length;
    const left = Math.floor(pad / 2);
    return " ".repeat(left) + text + " ".repeat(pad - left);
  };

  const lines = [
    `| ${"Name".padEnd(nameW)} | :chipmunk: | ${centre("Version", versionW)} | ${centre("Description", descW)} |`,
    `| ${"-".repeat(nameW)} | :--------: | ${":".repeat(1)}${"-".repeat(Math.max(versionW - 2, 1))}${":"} | ${":"}${"-".repeat(Math.max(descW - 2, 1))}${":"} |`,
  ];
  for (const r of rows) {
    lines.push(
      `| ${r.name.padEnd(nameW)} |     ${r.emoji}     | ${centre(r.version, versionW)} | ${centre(r.description, descW)} |`,
    );
  }
  return lines.join("\n");
}

/** Replaces the marked region. Returns the new text, or throws if unmarked. */
export function applyBlock(readmeText, block) {
  const start = readmeText.indexOf(BEGIN);
  const end = readmeText.indexOf(END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error(
      `README has no ${BEGIN} / ${END} pair. Add the markers around the ` +
        `STANDARD table once, by hand, then this script owns what is between ` +
        `them. Without markers a script has to pattern-match a markdown ` +
        `table, which is how the table drifted in the first place.`,
    );
  }
  const head = readmeText.slice(0, start + BEGIN.length);
  const tail = readmeText.slice(end);
  return `${head}\n\n${block}\n\n${tail}`;
}

async function main(argv) {
  const args = argv.slice(2);
  const mode = args.includes("--write") ? "write" : "check";
  const sourceIdx = args.indexOf("--source");
  const source = sourceIdx >= 0 ? args[sourceIdx + 1] : DEFAULT_SOURCE;
  const targets = args.filter(
    (a, i) => !a.startsWith("--") && !(sourceIdx >= 0 && i === sourceIdx + 1),
  );
  if (targets.length === 0) targets.push("README.md");

  let versions;
  try {
    versions = await fetchVersions(source);
  } catch (err) {
    process.stderr.write(`cannot read ${source}: ${err.message}\n`);
    return 2;
  }

  const block = renderBlock(versions);
  let drifted = false;
  let examined = 0;
  for (const target of targets) {
    let text;
    try {
      text = readFileSync(target, "utf8");
    } catch (err) {
      process.stderr.write(`cannot read ${target}: ${err.message}\n`);
      return 2;
    }
    let next;
    try {
      next = applyBlock(text, block);
    } catch (err) {
      process.stderr.write(`${target}: ${err.message}\n`);
      return 2;
    }
    // Counted only once the file has been read AND the markers found, so
    // "examined" means what it says: this file was really compared.
    examined += 1;
    if (next === text) {
      process.stdout.write(`${target}: in sync\n`);
      continue;
    }
    drifted = true;
    if (mode === "write") {
      writeFileSync(target, next, "utf8");
      process.stdout.write(`${target}: updated\n`);
    } else {
      process.stdout.write(
        `${target}: OUT OF SYNC with ${source}. Run with --write.\n`,
      );
    }
  }
  if (examined === 0) {
    process.stderr.write(
      "examined no files, so there is nothing to report. Refusing to exit 0: " +
        "a check that cannot tell in-sync from never-ran is worse than no " +
        "check, because it is trusted.\n",
    );
    return 2;
  }
  if (mode === "check" && drifted) return 1;
  return 0;
}

// Entry-point detection by RESOLVED PATH, not by filename.
//
// This used to test `process.argv[1].endsWith("sync-standard-versions.mjs")`.
// A renamed or copied file then failed that test, main() never ran, and node
// exited 0: a gate that silently passes without examining anything. That was
// found by a verification harness that downloaded this file as `sync.mjs` and
// got four confident green results from a script that had done nothing.
//
// A check that cannot tell "in sync" from "never ran" is worse than no check,
// because it is trusted. This is the same comparison build-site.mjs and
// summarise.mjs in the standard repo already use, and it survives renaming.
const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv).then((code) => {
    process.exitCode = code;
  });
}
