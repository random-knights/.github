# Earth data + score program — durable runbook (pre-lockdown record)

The keep-doc for the final Earth program. The per-lane command packs in this folder are throwaway (prune at cleanup); this captures the decisions + specs that shipped.

## Score — v0.5 (lane `earth/score-v05`)
- **Mask ocean inland (approved A):** ocean-warming + ocean-acidification are dropped from a non-global region's score when its centroid is far from any coast (new `OCEAN_APPLICABLE_KM`, mirrors `GLACIER_APPLICABLE_KM=1500`); remaining domains renormalize. Coastal/ocean regions keep them; the population-weighted **global** ring still counts ocean fully. `METHODOLOGY_VERSION → 0.5`.
- **Domains (8, boundary-grounded):** land-cover .25, ocean-warming .10, ocean-acidification .10, fire .20, air .15, cryosphere .10, biodiversity .10, conservation .08 (renormalized; coverage-weighted average; global = population-exposure weighted).
- **Modes = display lens only** — NOT wired to the score (FIX-5 stays). The breakdown UI groups the 8 domains under their Mode for legibility; selecting a Mode never moves the number.
- **Overlay/annotation excluded** from the score (correct).
- **Local = nearest region, labeled** (no downscaling; documented follow-up).
- **View-consistency fixes:** Globe-View states the timeline doesn't move the number; Data-View hero vs ring reconciled/labeled; coverage% threshold unified; trend labeled cryosphere-based.
- Files: `functions/src/earthHealthScore.ts`, `functions/src/index.ts`, `earth_summary_panel.dart`, `earth_overview_sections.dart`, `earth_live_health_score.dart`.

## Data additions (lane `earth/data-v2`, after the visual lane) — FREE open data now, paid premium later
All provider keys SERVER-SIDE (functions/worker env from root `.env`), never in the client, never logged.
| Layer | Source | Auth | Cadence | Notes |
| --- | --- | --- | --- | --- |
| Flights | OpenSky `/states/all` | OAuth2 client-creds (`randomknights-api-client` + secret) | ~5–10 min (credit-safe) | non-commercial free tier; wildfire-lead dot style |
| Boats | aisstream.io websocket | `RANDOM_AIS_STREAM_API_KEY` | snapshots every few min (Cloud Run collector) | terrestrial coverage; open-ocean gaps |
| Satellites | CelesTrak TLE | none | TLE daily; client SGP4 | orbit-band rings in an outer shell; Space mode un-gated; curated notable dots |
| Ozone (O₃) | CAMS (already pulled) | existing | ~2×/day | new scalar overlay |
| Temperature | GFS (already pulled) | existing | ~6h | new scalar overlay |
| Degree-Heating-Weeks | NOAA Coral Reef Watch (already pulled) | existing | per CRW | companion to BAA |

- **BuyMeTacos premium panel** (aspirational Pro unlocks): FlightAware AeroAPI (~$100–1,000/mo), Spire Maritime satellite AIS (~$1,000+/mo), Planet/Maxar daily high-res imagery (~low-thousands/mo).

## Sequencing
Score lane runs in parallel (disjoint). Data lane runs **after** the Earth visual lane (`earth/visual-v2`) — shared renderers/catalog. Docs lane (`earth/docs-refresh`) runs after both. All run-everything, staging → owner review → prod gate.

## Data-freshness (HOLD until the data lane lands)
New live cadences to fold into the 8:08 freshness monitor once shipped: flights (~10 min), boats (~few min), satellites (TLE daily), O₃/temp/DHW (existing CAMS/GFS/CRW). Do NOT touch the monitor now — the data lane is actively changing what's live.
