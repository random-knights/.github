# (b) Draft — `earth-ingest` Cloud Run Job + Cloud Scheduler (containerized impact-data refresh)

**Status:** draft spec for owner review. **Not** a prerequisite for the Windows Task Scheduler wrapper — this is the long-term replacement for it.

## The one decision this forces
Today the impact/reference data (species, protected areas, businesses, datacenters, industrial, VCM) ships as **bundled assets** committed to the repo and deployed via wf80. A scheduled container can't cleanly `git commit && deploy`. So the move is to publish these to the **same Cloud Storage bucket the app already reads live layers from**, and have the app fetch them at runtime with the live→representative fallback it already uses for SST/wind/etc. That unifies the live + reference data planes under one self-refreshing mechanism and deletes the commit/deploy step for data. You already accepted this exact trade for the live grids; this extends it.

## Why this is low-risk: you already run the pattern
`earth-worker` is a Cloud Run Job that fetches public APIs (CAMS/forest) and writes grids to GCS on a schedule. The impact ingests are the same shape (fetch public API → write JSON). So we add a **sibling `earth-ingest` job** (or tasks inside `earth-worker`) and reuse its service account, bucket, and deploy flow.

## Scheduled jobs (Cloud Scheduler → Cloud Run Job execution; UTC)
| Group | Ingests | Build | Cron | Cadence |
| --- | --- | --- | --- | --- |
| `protected` | `ingest_protected_areas` | pointsets + records (protected) | `0 6 1 * *` | monthly (WDPA) |
| `slow-quarterly` | `ingest_datacenters`, `ingest_berkeley_vcm` | pointsets + records | `30 6 1 1,4,7,10 *` | quarterly |
| `species` | `ingest_species` → `ingest_species_locations` | pointsets + records (species) | `0 5 15 1,7 *` | biannual (IUCN) |
| `climate-trace` | `ingest_businesses_footprint`, `ingest_industrial_areas` | pointsets + records | `0 5 20 1 *` | annual |

## Container
`apps/rand0m/worker-ingest/Dockerfile`:
```dockerfile
FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir requests openpyxl pycountry google-cloud-storage
COPY tooling/scripts/ /app/scripts/
COPY apps/rand0m/worker-ingest/run_group.py /app/run_group.py
ENTRYPOINT ["python", "/app/run_group.py"]
```
`run_group.py` (sketch — the orchestrator):
```python
import os, subprocess, sys, glob
from google.cloud import storage
GROUP = os.environ.get("INGEST_GROUP", sys.argv[1] if len(sys.argv) > 1 else "")
BUCKET = os.environ["EARTH_BUCKET"]                 # randomknights-xyz.firebasestorage.app
PREFIX = "earth/impact"                             # runtime-fetched impact assets live here
CACHE  = "earth/impact/_cache"                      # resumable caches (species locations etc.)
GROUPS = {
  "protected":      [["ingest_protected_areas"]],
  "slow-quarterly": [["ingest_datacenters"], ["ingest_berkeley_vcm"]],
  "species":        [["ingest_species"], ["ingest_species_locations"]],   # locations runs to completion
  "climate-trace":  [["ingest_businesses_footprint"], ["ingest_industrial_areas"]],
}
gcs = storage.Client(); bkt = gcs.bucket(BUCKET)
# 1) pull resumable caches so species-locations resumes instead of re-scraping ~50k species
for blob in gcs.list_blobs(BUCKET, prefix=CACHE):
    dst = os.path.join("tooling/data/earth-impact", os.path.basename(blob.name)); blob.download_to_filename(dst)
# 2) run the group's ingests, then rebuild the render assets into /tmp/out
for cmd in GROUPS[GROUP]:
    subprocess.run(["python", f"scripts/{cmd[0]}.py", *cmd[1:]], check=True)
subprocess.run(["python", "scripts/build_earth_pointsets.py", "--out", "/tmp/out"], check=True)
subprocess.run(["python", "scripts/build_earth_record_browsers.py", "--out", "/tmp/out"], check=True)
# 3) upload assets + caches (assets are small; this replaces the commit+wf80 step)
for f in glob.glob("/tmp/out/*.json"):
    bkt.blob(f"{PREFIX}/{os.path.basename(f)}").upload_from_filename(f)
for f in glob.glob("tooling/data/earth-impact/_*cache*.json"):
    bkt.blob(f"{CACHE}/{os.path.basename(f)}").upload_from_filename(f)
```
Key wrinkle handled: **species-locations is a long, resumable ~50k-call scrape.** The cache lives in GCS, is pulled at start and pushed at end, so biannual runs resume rather than restart. Set the Cloud Run **task timeout to a few hours** for the `species` group (Jobs allow up to 24h).

## App-side migration (the bundled→runtime flip)
The point layers currently load `assets/earth/points/*.json` (bundled). Migrate each to the live→representative pattern already used by scalar layers:
```
LiveStoragePointSetSource("earth/impact/<kind>-records-v1.json",
    fallback: StaticAssetPointSetSource("assets/earth/points/<kind>-records-v1.json"))
```
The bundled asset stays in the repo as the **representative fallback** (and the "not current conditions" honesty label applies until the live fetch lands), exactly like SST.

## Staged rollout (safe)
1. **Build + schedule the job, writing to GCS *alongside* the existing bundled assets.** Verify the GCS JSON matches what the build produces. App still reads bundled — zero user-facing change.
2. **Flip one layer** (protected areas — monthly, lowest stakes) to `LiveStoragePointSetSource` with bundled fallback. Validate live + fallback.
3. **Flip the rest**, then stop committing regenerated bundled assets (keep one representative snapshot per layer as the fallback).

## Infra checklist (owner-side, name-scoped, staging)
- Service account with `storage.objectAdmin` on the impact prefix (reuse earth-worker's SA if it already has it).
- `gcloud run jobs deploy earth-ingest --source apps/rand0m/worker-ingest --region us-central1 --set-env-vars EARTH_BUCKET=...,INGEST_GROUP=<group> --task-timeout=3h`
- 4× `gcloud scheduler jobs create http ...` (or `--schedule` on a job trigger) per the cron table.
- Add `earth-ingest` runs to `earth-ops.ps1` `verify` so freshness shows impact-asset vintages too.

## Agent command to implement
> **TASK (EARTH — containerize impact ingests, staging only).** Build `apps/rand0m/worker-ingest/` (Dockerfile + `run_group.py` per the spec in `tooling/scripts/EARTH-INGEST-CONTAINERIZATION.md`). Do **Phase 1 only**: deploy the `earth-ingest` Cloud Run Job, wire the 4 Cloud Scheduler crons, and have it write to `gs://<bucket>/earth/impact/` *alongside* the bundled assets — do NOT flip the app to read GCS yet. Add a resumable-cache pull/push for `ingest_species_locations`. Extend `earth-ops.ps1 verify` to list impact-asset vintages. Report the GCS paths written and a diff vs the current bundled assets so the owner can validate parity before any app flip. Name-scoped deploys; never touch production.
