# AiEDs totals file

`aieds-totals.json` is a public file of counts. It says how much energy, carbon
and water the AI agent sessions that built our sites used. Our sites read it
when a page loads.

It is a modeled estimate, not a meter reading. It comes from one laptop. The
dates it covers are in `coverage.from` and `coverage.to`. Work on other
computers is not in it, and some sessions are not recorded yet, so the real
figure is not known. Cached text is counted in full, as AiEDs 2.5.0 requires,
which makes the number high.

AiEDs has no rule for splitting AI work across websites. The split is ours:
each site gets the work placed on it. `sharedUnplaced` is everything else, so
the six sites plus `sharedUnplaced` equal `company`.

## What is in it

- `company`, the six `sites` (rand0m, randomly, knightly, xyz, llc, org) and
  `sharedUnplaced`: tokens, energy in kWh, carbon in gCO2e, Tree-Time in
  minutes and water in liters with a low to high range.
- `display`: the same numbers already rounded to 2 significant figures, with
  units, for the five tiles. Show these strings; do not round again.
- `asOf`: the last day of data. `generatedAt`: when the file was made.
- `requiredSentences`: the three sentences AiEDs requires beside any energy,
  carbon or water figure. Show them.
- Counts only. No folder, session, lane, branch, prompt or model name is in it.
  `aieds-totals.schema.json` lists every allowed key and rejects any other.

## Rules for sites that read it

1. Fetch with `credentials: "omit"` and a `no-referrer` policy.
2. A site whose values are `null` has no placed work. Show "coming soon ...".
   Never show zero.
3. If the fetch fails or the JSON is not valid, show "coming soon ..." too.
4. Always show the `asOf` date, even when it is old.
5. Water always shows its range and the words "US avg".
6. Do not call any of it a measurement, an offset or a saving.

## Where to fetch it

`https://raw.githubusercontent.com/random-knights/.github/main/aieds/aieds-totals.json`

## How to regenerate

From the laptop file (the full file is cut down to the six sites and checked
first; the private repository names never reach this repo):

    node scripts/aieds-totals.mjs --in <path to aieds-repo-totals.json>

That rewrites `aieds/input/aieds-totals-input.json` and
`aieds/aieds-totals.json`. With no `--in`, it rebuilds the output from the
committed input. The build fails if the input disagrees with a recomputation
from energy, or if the parts do not add up to the company total. The constants
come from `aieds/input/aieds-factors.json`, a copy of
`standard/spec/v2/aieds-factors.json`. Refresh that copy from the standard,
never edit it.

Test, offline: `node --test scripts/aieds-totals.test.mjs`

Open a pull request with the three changed files. No workflow runs this
script yet.
