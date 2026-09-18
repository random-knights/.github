// Places a repository's AiEDs disclosure block into its README, and checks it
// has not drifted.
//
// WHY THIS EXISTS. Every repository README is supposed to state the AiEDs
// impact of developing THAT repository, and the org profile page is supposed to
// state the whole organisation's. That is two dozen copies of one measurement.
// A hand-typed figure in any of them is a number nobody can check, and the
// first one to go stale is the one nobody rereads.
//
// WHY IT DOES NOT RENDER. The blocks under aieds/blocks/ are written by the
// generator in the working root (_state/aieds-readme/aieds-readme.mjs) from the
// SessionEnd ledgers, which are local to the developers' machines and are not
// published. If this script re-rendered from aieds/aieds-readme.json it would
// be a SECOND renderer of the same data, and two renderers of one fact is the
// drift condition this workspace keeps paying for. So there is exactly one
// renderer, and this script only splices its output between two markers. The
// JSON is committed beside the blocks as the provenance of what is in them.
//
// Dependency free: node 20 or newer, and nothing else.
//
// Usage:
//   node scripts/sync-aieds.mjs --check --repo ruok README.md
//   node scripts/sync-aieds.mjs --write --repo ruok README.md
//   node scripts/sync-aieds.mjs --check --repo organisation profile/README.md
//   node scripts/sync-aieds.mjs --write --repo abc --source ./aieds README.md
//
// --repo organisation selects the organisation-wide block. It is deliberately
// not called "org", because org IS a repository in this organisation and a
// collision there once published one repo's figures as the whole company's.
//
// Exit codes: 0 in sync (or written), 1 drift found in --check, 2 a real error
// such as a missing marker or an unreachable source. A drift and a breakage
// must not look the same to CI.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const BEGIN = "<!-- AIEDS:BEGIN -->";
export const END = "<!-- AIEDS:END -->";

// The organisation-wide block's name. NOT "org".
export const ORG_KEY = "organisation";

// THE DEFAULT SOURCE IS THIS REPOSITORY ON main, NOT A DEPLOYED SITE.
//
// Same reasoning as sync-standard-versions.mjs: a check that depends on a
// manual deploy having happened hard-fails for a reason no consumer can fix in
// their own repository, and a gate nobody can fix is a gate everybody learns to
// ignore. main is current the moment the generated blocks merge here.
const DEFAULT_SOURCE =
  "https://raw.githubusercontent.com/random-knights/.github/main/aieds";

// The block a repository carries when the hook has attributed no session to it.
// It is a sentence, never a table of zeroes: a zero figure is a claim that the
// work cost nothing, and an absence of measurement is not that claim.
//
// It also says WHY an absence is legitimate, because the first question a
// reader asks of a blank disclosure is whether somebody forgot. The AiEDs
// ledger begins 2026-07-27, so a repository whose work predates the hook has no
// row and never will. The generator emits the same sentence for the same
// reason; the two must not drift, and a test in the generator's suite and the
// one below both read it.
export function noSessionsBlock(repo) {
  const title = repo === ORG_KEY ? "Random Knights, LLC" : repo;
  return [
    '<div align="center">',
    "",
    '## <span style="color:#FF4124"> **Ai Energy Disclosure Standard** </span>',
    "",
    `### <span style="color:#EDC303"> Total **AiEDs** Usage | ${title} </span>`,
    "",
    `**No sessions recorded yet for ${title}.** The <code>SessionEnd</code> hook has not attributed any development session to this repository, so there is no figure to publish. A repository created before the hook began recording, or worked on only from a machine whose ledger is not merged in here, will read this way and that is an absence of measurement, not a claim that the work cost nothing. This block fills in on the next generated sync.`,
    "",
    "</div>",
  ].join("\n");
}

export async function fetchBlock(source, repo) {
  const isUrl = /^https?:/.test(source);
  const path = isUrl ? `${source}/blocks/${repo}.md` : `${source}/blocks/${repo}.md`;
  if (!isUrl) {
    try {
      return readFileSync(path, "utf8").trim();
    } catch {
      return noSessionsBlock(repo);
    }
  }
  const res = await fetch(path, { headers: { accept: "text/plain" } });
  if (res.status === 404) return noSessionsBlock(repo);
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return (await res.text()).trim();
}

/** Replaces the marked region. Returns the new text, or throws if unmarked. */
export function applyBlock(readmeText, block) {
  const start = readmeText.indexOf(BEGIN);
  const end = readmeText.indexOf(END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error(
      `README has no ${BEGIN} / ${END} pair. Add the markers around the AiEDs ` +
        `section once, by hand, then this script owns what is between them. ` +
        `Without markers a script has to pattern-match a markdown block, which ` +
        `is how every hand-maintained copy in this org drifted before.`,
    );
  }
  const head = readmeText.slice(0, start + BEGIN.length);
  const tail = readmeText.slice(end);
  return `${head}\n\n${block}\n\n${tail}`;
}

async function main(argv) {
  const args = argv.slice(2);
  const mode = args.includes("--write") ? "write" : "check";
  const valueOf = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const repo = valueOf("--repo");
  const source = valueOf("--source") ?? DEFAULT_SOURCE;
  if (!repo) {
    process.stderr.write(
      "--repo is required. Without it this script cannot know WHICH repository's " +
        "figures to place, and placing the wrong repository's figures is worse " +
        "than placing none.\n",
    );
    return 2;
  }
  const flagValues = new Set(["--repo", "--source"]);
  const targets = args.filter((a, i) => {
    if (a.startsWith("--")) return false;
    const prev = args[i - 1];
    return !(prev && flagValues.has(prev));
  });
  if (targets.length === 0) targets.push("README.md");

  let block;
  try {
    block = await fetchBlock(source, repo);
  } catch (err) {
    process.stderr.write(`cannot read the AiEDs block: ${err.message}\n`);
    return 2;
  }

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
    examined += 1;
    if (next === text) {
      process.stdout.write(`${target}: in sync (${repo})\n`);
      continue;
    }
    drifted = true;
    if (mode === "write") {
      writeFileSync(target, next, "utf8");
      process.stdout.write(`${target}: updated (${repo})\n`);
    } else {
      process.stdout.write(
        `${target}: AiEDs block OUT OF SYNC with ${source} for ${repo}. Run with --write.\n`,
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

// Entry-point detection by RESOLVED PATH, not by filename: a renamed or copied
// copy of this file must still run, because a gate that silently passes without
// examining anything is worse than no gate. Same comparison as
// sync-standard-versions.mjs, for the same reason and after the same incident.
const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv).then((code) => {
    process.exitCode = code;
  });
}
