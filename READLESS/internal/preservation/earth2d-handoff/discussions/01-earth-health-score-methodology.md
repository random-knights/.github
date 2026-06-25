# How rand0m scores Earth's health — methodology, gaps, and where we're taking it

*Opening post for the Earth Health Score discussion · random-knights/xyz-earth · v0.3 (June 2026)*

This is an open, honest account of how the rand0m Earth globe computes its **Health Score**, where that method falls short of the actual science, and the roadmap to close the gap. We're posting it for the earth+ community and for scientists/researchers to pull apart. **The score is an educational, experimental index — not a peer-reviewed scientific instrument** — and we'd rather say so loudly and improve it in the open than overclaim.

If you take one thing from this: our current score is an honest *blend of the environmental signals we can observe live*, and our north star is to re-found it on the **Planetary Boundaries framework** so each component is a principled distance-from-a-scientific-threshold rather than a hand-tuned weight.

---

## 1. How the score works today (v0.3)

The score (`earth.healthscore.v1`, function `earthHealthScoreRefresh`) is a **coverage-weighted average** of per-domain health signals, each normalized to 0–100 (100 = healthiest), computed per region and rolled up globally (population-exposure-weighted):

```
score = Σ(healthᵢ · weightᵢ) / Σ(weightᵢ over the domains present)
```

v0.3 domains and ratified weights:

| Domain | Weight | Signal today | Direction |
| --- | --- | --- | --- |
| land-cover | 0.25 | forest cover % (+ tree-cover vitality) | benefit |
| ocean | 0.20 | sea-surface-temperature **anomaly** (SSTA) | burden |
| fire | 0.20 | wildfire detections | burden |
| air | 0.15 | PM2.5 (primary) + NO₂ | burden |
| cryosphere | 0.10 | glacier mass-balance trend | burden |
| biodiversity | 0.10 | species richness index | benefit |
| conservation | 0.08 | protected-area coverage vs the 30×30 target | benefit |

Design choices we already make and stand by: missing signals **lower coverage/confidence** rather than zeroing the score; representative (fixture) data is **labelled "not current conditions,"** never shown as live; the app's own AI footprint (**AIEDS** — see the companion discussion) is a **separate** metric and is *never* blended into the planetary number.

v0.3 already removed real bugs: it de-double-counted air (PM2.5/NO₂/AQI were triple-counted), folded tree-time into land-cover, anchored PM2.5 to WHO/EPA breakpoints, and fixed the ocean domain to read the **SST anomaly** grid (not absolute temperature vs a flat baseline). Methodology notes live in the repo.

**The honest limitation:** these seven domains are the signals we could ingest live and cheaply — not a derivation from Earth-system science. The weights are expert-set, not framework-derived. That's the gap this discussion is about.

---

## 2. The scientific north star — Planetary Boundaries

Scientists assess planetary health with the **Planetary Boundaries framework** (Rockström 2009; Steffen 2015; Richardson 2023; *Planetary Health Check* 2025): nine Earth-system processes that keep the planet in a "safe operating space," each with a **control variable** and a **boundary threshold**. As of the 2025 assessment, **7 of the 9 are transgressed**:

| # | Boundary | Control variable (illustrative threshold) | 2025 status |
| --- | --- | --- | --- |
| 1 | Climate change | Atmospheric CO₂ **< 350 ppm** / radiative forcing **< +1 W/m²** (now ~420+ ppm) | **breached** |
| 2 | Biosphere integrity | Genetic: extinction rate **< 10 E/MSY** (now 10–100×); Functional: BII | **breached** |
| 3 | Land-system change | % of original **forest cover** remaining (biome-specific) | **breached** |
| 4 | Biogeochemical flows | N fixation **< 62 Tg N/yr** (now ~150+); P flow limit | **breached** |
| 5 | Freshwater change | blue-water (streamflow) + green-water (root-zone soil moisture) | **breached** |
| 6 | Ocean acidification | surface **aragonite saturation Ω_arag** ≥ ~80% pre-industrial (~Ω ≥ 2.75) | **breached (new in 2025)** |
| 7 | Atmospheric aerosols | Aerosol Optical Depth (regional, e.g. monsoon) | safe |
| 8 | Stratospheric ozone | O₃ column **≥ ~275 Dobson Units** | safe (recovering) |
| 9 | Novel entities | synthetic chemicals, plastics, persistent pollutants | **breached** |

The framework's power for *us*: it gives each component a **pre-industrial baseline, a safe boundary, and a high-risk zone**, which is a principled, non-arbitrary way to map a measured value to 0–100 health — exactly what our ad-hoc `valueMin/valueMax` normalization lacks.

---

## 3. Gap analysis — our domains vs the nine boundaries

| Planetary boundary | What v0.3 has | Verdict |
| --- | --- | --- |
| Land-system change | land-cover (forest %) | ✅ direct match |
| Atmospheric aerosols | air → PM2.5 | ✅ good proxy (a *safe* boundary, though) |
| Biosphere integrity | biodiversity (richness), conservation | ⚠️ weak — richness ≠ BII/extinction-rate; conservation is a *response*, not a control variable |
| Climate change | ocean (SSTA), cryosphere (glaciers) | ⚠️ proxies only — we measure symptoms (sea warming, ice loss), **not the boundary's control variable (CO₂ / radiative forcing)** |
| Ocean acidification | — | ❌ **missing** (we have ocean *temperature*, not pH/aragonite — and this is the newest breach) |
| Biogeochemical flows (N/P) | partial (atmospheric NO₂) | ❌ largely missing — no N/P *flow* accounting |
| Freshwater change | — | ❌ missing |
| Novel entities | — | ❌ missing |
| Stratospheric ozone | — | ❌ missing |
| *(not a boundary)* | **fire** (wildfire, 0.20) | ⚠️ wildfire isn't one of the nine — it's a symptom of climate + land change |

So today we meaningfully cover **~2 of the 9** (land-system; aerosols), weakly proxy **2** (climate via SST/ice; biosphere via richness), and **miss 5** — including **four of the seven breached boundaries** (ocean acidification, biogeochemical flows, freshwater, novel entities) and the proper climate control variable. We also weight a non-boundary (wildfire) at 0.20.

---

## 4. The roadmap to close it

**(a) Re-ground normalization on boundary distance.** Replace per-layer `valueMin/valueMax` with the framework's zones: `health = 100` in the safe zone, scaling to `0` at the high-risk threshold, anchored to the published control-variable values. This makes every component a *scientific distance-from-boundary*, not a tuned curve.

**(b) Add the missing boundaries from open data** (live where feasible, honestly labelled representative until then):

| Boundary | Open data source to wire |
| --- | --- |
| Climate (CO₂) | NOAA GML Mauna Loa CO₂; NASA GISTEMP temperature anomaly |
| Ocean acidification | NOAA OA Program / Copernicus Marine surface pH + aragonite Ω |
| Biogeochemical N/P | FAO fertilizer + modeled N/P flow estimates (annual) |
| Freshwater | GRACE/GRACE-FO groundwater; streamflow alteration; Copernicus root-zone soil moisture |
| Aerosols | CAMS / MODIS Aerosol Optical Depth (we already have PM2.5) |
| Stratospheric ozone | NASA OMI/TROPOMI total ozone column (Dobson Units) |
| Novel entities | hardest — proxy via plastic/chemical-release indices; flag as low-confidence |
| Biosphere integrity | BII (NHM PREDICTS), Living Planet Index, IUCN Red List for extinction rate |

**(c) Re-frame the domains as the nine boundaries** (keeping SST/glaciers/wildfire as *contextual* layers, not score-bearing weights), and decide aggregation: equal-weight the nine, or weight by transgression severity / human-life-support criticality — an **open methodological question**.

**(d) Regional & local downscaling — the research frontier.** The nine boundaries are *global*, but local action visibly moves them, and users want a score for *their* place. Approaches in the literature: per-capita "safe and just operating space" allocation, Kate Raworth's **Doughnut** downscaled to cities, and biome/basin-specific boundaries (forest cover, freshwater are already regional). A worked example we like: in Roswell, GA, **municipal waste diversion** maps to *novel entities*, **rooftop solar** to *climate / radiative forcing*, and **native-plant landscaping** to *freshwater* (protecting Big Creek's minimum instream flow). Formalizing "local action → global boundary contribution" is genuinely unsolved and is the single most valuable thing researchers could help us define.

---

## 5. Open questions for scientists & contributors

1. **Aggregation:** equal-weight the nine boundaries, or weight by transgression severity / irreversibility? Should a single breached boundary cap the headline (à la "one breach = unsafe")?
2. **Normalization:** is linear distance-to-high-risk defensible, or should it be non-linear near tipping points?
3. **Novel entities & freshwater** have no clean single global metric — what's the best open proxy?
4. **Downscaling:** what's a credible, citable method to attribute a city/region a share of each global boundary?
5. **Uncertainty:** how should we surface confidence when several boundaries are modeled/representative?

If you have a better control variable, a live data source, or a downscaling method — please reply. We'll version the methodology in the open (v0.3 → v0.4) and credit contributors.

---

## Notable sources

- Planetary Health Check 2025 — Stockholm Resilience Centre / PIK: https://www.planetaryhealthcheck.org/planetary-boundaries/
- Richardson et al. 2023, *Earth beyond six of nine planetary boundaries*, Science Advances
- Steffen et al. 2015, *Planetary boundaries: Guiding human development*, Science: https://www.science.org/doi/10.1126/science.1259855
- Stockholm Resilience Centre — quantitative evolution of the boundaries: https://www.stockholmresilience.org/research/planetary-boundaries.html
- PIK Planetary Boundaries Science Lab: https://www.pik-potsdam.de/en/institute/labs/pbscience
- Globaïa boundaries explainer: https://globaia.org/boundaries/
- Data: NOAA GML (CO₂), NOAA OISST/OA, NASA GISTEMP/OMI, Copernicus Marine/CAMS, GRACE-FO, GBIF, IUCN Red List, WDPA/Protected Planet, NHM PREDICTS (BII)

*Disclosure: the rand0m Earth Health Score is an experimental educational index, not a scientific assessment. Representative layers are labelled as such. This document is a living methodology — corrections welcome.*
