# Firebase Single-App Config Plan

Date: 2026-05-30

## Purpose

The ecosystem has simplified to one primary application:

- Product identity: `rand0m`
- Canonical repo: `random-knights/xyz`
- Local folder: `apps/rand0m`
- Firebase project: `randomknights-xyz`

This plan describes the move from the prior four-app Firebase Hosting config
to a single primary app config. CM-8 implemented the local Firebase config
reduction and deployed only the `rand0m` Hosting target. It did not delete
Hosting sites, connect custom domains, migrate Functions, or change secrets.

## Current Root Firebase Files

Root Firebase files audited:

- `.firebaserc`
- `firebase.json`
- `firestore.rules`
- `firestore.indexes.json`

Current project aliases:

| Alias | Project ID |
| --- | --- |
| `default` | `randomknights-xyz` |
| `randomknights-xyz` | `randomknights-xyz` |

Current active Hosting target in `.firebaserc`:

| Target | Site | Status |
| --- | --- | --- |
| `rand0m` | `ai-rand0m` | active primary app target |

Current Hosting entry in `firebase.json`:

| Target | Public path | Status |
| --- | --- | --- |
| `rand0m` | `apps/rand0m/build/web` | active primary app build output |

`firestore.rules` currently allows reads and writes only to verified users whose
email ends with `@rand0m.ai`. This remains conservative enough for the current
single-app plan, but later production rules should be narrowed to the actual
collections used by `xyz`.

`firestore.indexes.json` is currently empty:

```json
{
  "indexes": [],
  "fieldOverrides": []
}
```

## Desired Single-App State

Recommended root Firebase config shape:

- one active Hosting target
- one active build path
- one primary custom domain later
- Firestore rules and indexes remain root-managed

Recommended active target:

| Target | Site | Public path |
| --- | --- | --- |
| `rand0m` | `ai-rand0m` | `apps/rand0m/build/web` |

Why prefer `ai-rand0m` after CM-7:

- It already exists from the previous four-site rehearsal.
- It matches the product/app name, `rand0m`.
- It aligns with the production domain target, `rand0m.ai`.
- It avoids creating a new Hosting site.

Do not rename the GitHub repo. The GitHub repo can remain `xyz` while the
product, local folder, and Firebase target use `rand0m`.

## Default Site Recommendation

Default site:

- `randomknights-xyz`
- URL: `https://randomknights-xyz.web.app`
- URL: `https://randomknights-xyz.firebaseapp.com`

Recommendation:

- Keep it parked/unused for now.
- Do not deploy the primary app to the default site yet.
- Revisit after the primary custom domain decision.

The default site can later become a redirect/landing surface, a maintenance
page, or remain unused. It should not compete with the `rand0m` Hosting site
during the simplification.

## Unused Hosting Site Recommendations

Unused sites from the prior four-app model:

| Site | Previous target | Recommendation |
| --- | --- | --- |
| `ai-rand0m` | `rand0m` | Active primary site |
| `ai-up10ad` | `up10ad` | Park, then delete after custom domain cutover succeeds |
| `ai-out1ine` | `out1ine` | Park, then delete after custom domain cutover succeeds |
| `ai-knight1y` | `knight1y` | Park as rollback, then delete after custom domain cutover succeeds |
| `randomknights-xyz` | default | Keep parked until domain decision |

Do not delete these sites during config simplification. First remove them from
local config, confirm no deploy process references them, complete the primary
domain cutover, and only then schedule live Firebase site deletion as a
separate explicitly approved cleanup phase.

## Custom Domain Decision

Open decision:

| Candidate | Fit | Tradeoff |
| --- | --- | --- |
| `rand0m.ai` | Best match for the current product identity | Uses the root domain for the single primary app |
| `knight1y.rand0m.ai` | Historical app identity | Useful only if the product identity changes back |

Recommendation:

- Use `rand0m.ai` for the first simplified production cutover.
- Keep `knight1y.rand0m.ai` disconnected unless a rollback or legacy access
  plan explicitly needs it.

This matches the single-app product identity chosen in CM-5.

## Future Config Change

CM-8 reduced root `.firebaserc` to:

```json
{
  "projects": {
    "default": "randomknights-xyz",
    "randomknights-xyz": "randomknights-xyz"
  },
  "targets": {
    "randomknights-xyz": {
      "hosting": {
        "rand0m": [
          "ai-rand0m"
        ]
      }
    }
  },
  "etags": {}
}
```

CM-8 reduced root `firebase.json` to:

```json
{
  "firestore": {
    "database": "(default)",
    "location": "nam5",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": [
    {
      "target": "rand0m",
      "public": "apps/rand0m/build/web",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
```

## Validation Commands For Implementation Phase

After config changes are made in a future implementation phase:

```powershell
firebase target --project randomknights-xyz
C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1
```

Build the primary app:

```powershell
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat build web
```

Deploy only after validation:

```powershell
firebase deploy --only hosting:rand0m --project randomknights-xyz
```

CM-8 deployed only `hosting:rand0m` to `randomknights-xyz`.

## Rollback Plan

If the single-app config causes local deployment confusion:

1. Restore the previous `.firebaserc` and `firebase.json`.
2. Re-run `firebase target --project randomknights-xyz`.
3. Confirm `validate-all.ps1` still passes.
4. Do not delete any live Hosting site until a separate live cleanup phase.

## Recommended Next Phase

**Next: Custom Domain Readiness / Firebase Site Cleanup Planning**

Scope:

- manually verify auth on `https://ai-rand0m.web.app`
- connect `rand0m.ai` only after auth verification passes
- keep parked sites until rollback confidence is established
- do not delete Firebase Hosting sites without a dedicated cleanup approval
