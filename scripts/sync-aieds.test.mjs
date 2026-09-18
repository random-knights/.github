// Tests for the AiEDs block sync script.
//
// Each was written to FAIL first against a deliberately broken script; the
// failure output is recorded in the pull request that added this file. A test
// that has never been seen red is a test nobody has checked.
//
// Run: node --test scripts/sync-aieds.test.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  BEGIN,
  END,
  ORG_KEY,
  applyBlock,
  fetchBlock,
  noSessionsBlock,
} from "./sync-aieds.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AIEDS = join(ROOT, "aieds");

test("applyBlock refuses an unmarked README instead of appending to it", async () => {
  assert.throws(() => applyBlock("# hello\n", "BLOCK"), /has no <!-- AIEDS:BEGIN -->/);
});

test("applyBlock replaces only what is between the markers", () => {
  const readme = `# top\n\n${BEGIN}\n\nold\n\n${END}\n\n# bottom\n`;
  const next = applyBlock(readme, "new");
  assert.ok(next.includes("# top"));
  assert.ok(next.includes("# bottom"));
  assert.ok(next.includes("new"));
  assert.ok(!next.includes("old"));
});

test("applyBlock is idempotent, so a second run opens no pull request", () => {
  const readme = `# top\n\n${BEGIN}\n\nold\n\n${END}\n\n# bottom\n`;
  const once = applyBlock(readme, "new");
  assert.equal(applyBlock(once, "new"), once);
});

test("a repository with no generated block gets a sentence, never zeroes", async () => {
  const block = await fetchBlock(AIEDS, "a-repo-that-has-never-been-worked-on");
  assert.match(block, /No sessions recorded yet/);
  assert.ok(!block.includes("<table>"));
  assert.ok(!block.includes("0.0"));
});

test("the organisation block is NOT the org repository's block", () => {
  // org is a repository in this organisation (randomknights.org). Keying the
  // organisation block as "org" published one repository's figures as the whole
  // company's, on the public front page, with nothing red anywhere.
  assert.notEqual(ORG_KEY, "org");
  const organisation = readFileSync(join(AIEDS, "blocks", "organisation.md"), "utf8");
  const org = readFileSync(join(AIEDS, "blocks", "org.md"), "utf8");
  assert.match(organisation, /Random Knights, LLC/);
  assert.match(organisation, /By repository/);
  assert.match(org, /Usage \| org /);
  assert.ok(!org.includes("By repository"));
});

test("the profile README carries the organisation block, in sync", async () => {
  const readme = readFileSync(join(ROOT, "profile", "README.md"), "utf8");
  const block = await fetchBlock(AIEDS, ORG_KEY);
  assert.equal(applyBlock(readme, block), readme, "profile/README.md has drifted");
});

test("every generated block says whose development it measures", () => {
  const organisation = readFileSync(join(AIEDS, "blocks", "organisation.md"), "utf8");
  assert.match(
    organisation,
    /impact of developing every repository in this organisation/,
  );
  for (const name of ["ruok", "xyz", "micr0pad"]) {
    const block = readFileSync(join(AIEDS, "blocks", `${name}.md`), "utf8");
    assert.match(block, /impact of developing this repository/);
    assert.match(block, /Equivalencies/);
  }
});

test("the generated data records the ledgers it consumed, with no local paths", () => {
  const data = JSON.parse(readFileSync(join(AIEDS, "aieds-readme.json"), "utf8"));
  assert.ok(data.ledgerFiles.length > 0);
  for (const f of data.ledgerFiles) {
    assert.ok(f.rows > 0);
    assert.ok(!/[\\/]/.test(f.file), `${f.file} is a path, not a file name`);
  }
  assert.equal(typeof data.rowsWithoutCwd, "number");
  assert.equal(typeof data.generatedAt, "string");
});
