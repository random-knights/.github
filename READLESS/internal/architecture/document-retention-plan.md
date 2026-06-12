# Document Retention Plan

Date: 2026-05-30

## Goal

Reduce `docs/architecture` to current operational documentation for the
simplified Random Knights workspace while preserving migration-era context in:

`C:\Projects\qa-kitt\.github\READLESS\architecture`

CM-11 completion update: the approved archive set was moved to
`C:\Projects\qa-kitt\.github\READLESS\architecture`. Active operational docs
and the two review-needed shell contract docs remain in `docs/architecture`.
The READLESS folder is currently ignored by the `.github` repo, so the archived
files are preserved locally unless the archive repo policy changes.

No documents were deleted.

## Current Operating Model

| Area | Current State |
| --- | --- |
| Primary app | `apps/rand0m` |
| App repo | `random-knights/xyz` |
| Product/domain target | `rand0m`, `rand0m.ai` |
| Supporting repo | `random-knights/abc` |
| Firebase project | `randomknights-xyz` |
| Package repos | `rk_core`, `rk_data`, `rk_media`, `rk_agents`, `rk_ai`, `rk_branding`, `rk_ui` |

## Recommended Active Footprint

Keep these in `docs/architecture` after the archive phase:

- `ecosystem-operations-runbook.md`
- `workspace-tooling.md`
- `firebase-randomknights-xyz-local-wiring.md`
- `firebase-production-readiness.md`
- `firebase-single-app-config-plan.md`
- `single-app-naming-consolidation-plan.md`
- `package-repository-closeout.md`
- `shared-packages.md`
- `production-hardening.md`
- `provider-runtime-consolidation.md`
- `document-retention-plan.md`

Optional keep after a stale-reference cleanup pass:

- `ecosystem-shell-contract.md`
- `app-shell-contract.md`

These two are useful contract references, but both should be reviewed because
they were written during the four-app era.

## Retention Table

| Doc | Keep | Archive | Reason |
| --- | --- | --- | --- |
| `agent-definition-registry.md` | No | Yes | Historical agent extraction/registry notes; current contracts live in `rk_agents`. |
| `agent-definition-separation.md` | No | Yes | Migration-era separation plan. |
| `app-shell-contract.md` | Optional | Optional | Useful shell contract reference, but likely stale after single-app consolidation. Keep only after cleanup. |
| `branding-font-system.md` | No | Yes | Historical branding extraction detail; package state is now standalone. |
| `branding-phase1-closeout.md` | No | Yes | Completed closeout. |
| `ecosystem.md` | No | Yes | Four-app ecosystem overview is stale. |
| `ecosystem-foundation.md` | No | Yes | Completed foundation documentation. |
| `ecosystem-operations-runbook.md` | Yes | No | Primary operating handbook. Needs occasional current-state refresh. |
| `ecosystem-shell-closeout.md` | No | Yes | Completed closeout. |
| `ecosystem-shell-contract.md` | Optional | Optional | Useful contract reference, but four-app language must be rationalized before keeping long term. |
| `ecosystem-simplification-audit.md` | No | Yes | Completed audit; superseded by current runbook and naming/Firebase plans. |
| `environment-provider-audit.md` | No | Yes | Snapshot audit; current path is provider runtime and hardening docs. |
| `extraction-boundaries-phase1.md` | No | Yes | Historical extraction boundary notes. |
| `firebase-console-inventory.md` | No | Yes | Inventory snapshot; useful historically but not active operations. |
| `firebase-deployment-rehearsal-auth-gate.md` | No | Yes | Rehearsal log; superseded by production readiness and local wiring docs. |
| `firebase-ecosystem-alignment.md` | No | Yes | Four-app Firebase audit now stale. |
| `firebase-production-readiness.md` | Yes | No | Active pre-domain/pre-production checklist. |
| `firebase-randomknights-xyz-local-wiring.md` | Yes | No | Active Firebase local target and project mapping. |
| `firebase-single-app-config-plan.md` | Yes | No | Active single-app Firebase transition plan until custom domain cutover is complete. |
| `github-cleanup-plan.md` | No | Yes | Completed/obsolete repo cleanup planning; archive for history. |
| `monorepo-transition-closeout.md` | No | Yes | Completed transition closeout. |
| `naming-and-domain-map.md` | No | Yes | Superseded by single-app naming plan and Firebase wiring docs. |
| `package-boundary-map.md` | No | Yes | Superseded by package closeout and standalone package repos. |
| `package-repository-closeout.md` | Yes | No | Current package repo state and extraction closeout. |
| `package-repository-execution-plan.md` | No | Yes | Completed extraction execution plan. |
| `package-repository-strategy.md` | No | Yes | Completed strategy; package repos now exist. |
| `phase6-closeout.md` | No | Yes | Historical phase closeout. |
| `phase8-closeout.md` | No | Yes | Historical phase closeout. |
| `phase8-readiness-audit.md` | No | Yes | Historical readiness audit. |
| `production-hardening.md` | Yes | No | Active security/secret-manager roadmap. |
| `provider-runtime-consolidation.md` | Yes | No | Active provider runtime roadmap. |
| `repo-package-map.md` | No | Yes | Superseded by current runbook and package closeout. |
| `rk_agents-scaffold.md` | No | Yes | Historical scaffold plan; package owns current contracts. |
| `rk_branding-scaffold.md` | No | Yes | Historical scaffold plan; package owns current contracts. |
| `rk_core-scaffold.md` | No | Yes | Historical scaffold plan; package owns current contracts. |
| `rk_ui-shell-scaffold.md` | No | Yes | Historical scaffold plan. |
| `shared-packages.md` | Yes | No | Useful active package responsibility summary. Refresh after archive if stale. |
| `single-app-naming-consolidation-plan.md` | Yes | No | Active until remaining native/Firebase/historical naming decisions are closed. |
| `workspace-tooling.md` | Yes | No | Active tooling reference for one app plus package repos. |

## Final Keep List

Recommended permanent or near-term active docs:

1. `document-retention-plan.md`
2. `ecosystem-operations-runbook.md`
3. `workspace-tooling.md`
4. `firebase-randomknights-xyz-local-wiring.md`
5. `firebase-production-readiness.md`
6. `firebase-single-app-config-plan.md`
7. `single-app-naming-consolidation-plan.md`
8. `package-repository-closeout.md`
9. `shared-packages.md`
10. `production-hardening.md`
11. `provider-runtime-consolidation.md`

## Final Archive List

Recommended archive destination:

`C:\Projects\qa-kitt\.github\READLESS\architecture`

Recommended archive set:

- `agent-definition-registry.md`
- `agent-definition-separation.md`
- `branding-font-system.md`
- `branding-phase1-closeout.md`
- `ecosystem.md`
- `ecosystem-foundation.md`
- `ecosystem-shell-closeout.md`
- `ecosystem-simplification-audit.md`
- `environment-provider-audit.md`
- `extraction-boundaries-phase1.md`
- `firebase-console-inventory.md`
- `firebase-deployment-rehearsal-auth-gate.md`
- `firebase-ecosystem-alignment.md`
- `github-cleanup-plan.md`
- `monorepo-transition-closeout.md`
- `naming-and-domain-map.md`
- `package-boundary-map.md`
- `package-repository-execution-plan.md`
- `package-repository-strategy.md`
- `phase6-closeout.md`
- `phase8-closeout.md`
- `phase8-readiness-audit.md`
- `repo-package-map.md`
- `rk_agents-scaffold.md`
- `rk_branding-scaffold.md`
- `rk_core-scaffold.md`
- `rk_ui-shell-scaffold.md`

Review before archive:

- `app-shell-contract.md`
- `ecosystem-shell-contract.md`

## Recommended Archive Sequence

1. Commit this retention plan in `dev-kitt`.
2. Create `C:\Projects\qa-kitt\.github\READLESS\architecture` if missing.
3. Copy archive candidates to READLESS.
4. Verify copied filenames and file counts.
5. Remove archived docs from `dev-kitt/docs/architecture`.
6. Refresh the active keep docs for stale four-app references.
7. Commit the READLESS archive in `qa-kitt\.github`.
8. Commit the dev-kitt documentation reduction separately.

## Open Decisions

- Whether `app-shell-contract.md` should be rewritten for the single-app shell or
  archived with the rest of the four-app era.
- Whether `ecosystem-shell-contract.md` should remain as a live package contract
  document or move to READLESS after `rk_core`/`rk_ui` README refreshes.
- Whether package-specific architecture notes should live in each standalone
  `rk_*` repo instead of the root `dev-kitt` docs.
