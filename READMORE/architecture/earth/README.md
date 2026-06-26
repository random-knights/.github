# Earth — how it works

> The living globe at the heart of rand0m.ai.

This document covers the four public-facing layers of the Earth feature: the six spheres that organize the data, the Planet Health Score, the live data layers and their sources, and the rendering approach. For research discussions and data proposals, see the [xyz-earth repository](https://github.com/random-knights/xyz-earth) and its [Discussions](https://github.com/random-knights/xyz-earth/discussions).

---

## The six spheres

Earth organizes every signal through the six spheres of the natural world:

| Sphere | What it covers |
| --- | --- |
| **Atmosphere** | Air, wind, temperature, storms, air quality |
| **Hydrosphere** | Oceans, sea-surface temperature, currents |
| **Cryosphere** | Ice extent and glacier mass |
| **Biosphere** | Forest cover, biodiversity, fire |
| **Lithosphere** | Land cover, terrain context |
| **Anthroposphere** | Human pressure, infrastructure, land modification |

The globe filter lets you isolate any sphere and see the planet re-color by that signal alone.

---

## Planet Health Score — v0.6

A single index per region, rolled up to a global number, that says how healthy things look right now. It is an estimate, not a certified assessment. Every signal carries a confidence label.

### Nine domains

| Domain | What it measures | Primary source |
| --- | --- | --- |
| **Land** | Tree-cover health, forest loss rate | GLAD Hansen / VCF5KYR |
| **Fire** | Active hotspot burden, 24 h window | NASA FIRMS |
| **Atmosphere** | Air-quality burden, AQI-weighted | CAMS |
| **Ocean temperature** | SST anomaly vs 1991–2020 WMO baseline | NOAA OISST / Open-Meteo Marine |
| **Ocean acidification** | pH trend stress signal | _(open for community proposals)_ |
| **Cryosphere** | Sea-ice extent and anomaly | _(expanding)_ |
| **Biodiversity** | Species pressure and habitat integrity proxy | GBIF |
| **Conservation** | Protected-area coverage signal | IUCN / WDPA |
| **Anthroposphere** | Human-pressure index, gHM-grounded | Global Human Modification index |

### Score ramp

The score runs 0–100 with four bands:

| Band | Range | Reading |
| --- | --- | --- |
| Critical | 0–25 | Systems under severe, sustained stress |
| Stressed | 26–50 | Significant pressure across multiple domains |
| Fair | 51–75 | Moderate signals; some domains healthy |
| Healthy | 76–100 | Most domains near or within safe bounds |

Each domain is anchored against **planetary boundary thresholds** (Rockström et al.) — the limits beyond which Earth systems risk crossing into qualitatively different states. Normalizers are locked at ratification, not floating with observed data ranges.

The Anthroposphere domain is grounded on the **Global Human Modification (gHM)** index — a peer-reviewed geospatial synthesis of infrastructure, agriculture, and urban footprint. Ratified in v0.6.

Score methodology: [xyz-earth Discussion #1](https://github.com/random-knights/xyz-earth/discussions/1) · [TIMELINE](../../../TIMELINE.md)

---

## Live layers — sources and licenses

| Layer | Data source | Refresh cadence | License / terms |
| --- | --- | --- | --- |
| **Wind / temperature / storms** | NOAA / NCEP GFS (global forecast) | ~6 h | Public domain (US government) |
| **Air quality** | CAMS — Copernicus Atmosphere Monitoring Service | ~12 h | [Copernicus licence](https://ads.atmosphere.copernicus.eu/licences/licence-to-use-copernicus-products/) |
| **Sea-surface temperature** | NOAA OISST / Open-Meteo Marine | Daily | NOAA open data |
| **Ocean currents** | Copernicus Marine | Daily | [Marine Service licence](https://marine.copernicus.eu/user-corner/service-commitments-and-licence) |
| **Active fire / hotspots** | NASA FIRMS | ~3 h (VIIRS) | Public domain (US government) |
| **Forest cover / land** | GLAD Hansen Global Forest Watch | Annual | CC BY 4.0 |
| **Biodiversity proxy** | GBIF occurrence data | Periodic | CC BY 4.0 |
| **Protected areas** | IUCN / WDPA | Periodic | Free for research and non-commercial use |
| **Human modification** | Global Human Modification (gHM) | Static (versioned) | CC BY 4.0 |
| **Movement density** | OpenSky (flights) / AIS public (vessels) | ≥24 h delay (aggregate only) | Respective open-data terms |

All movement layers are **aggregated to coarse geographic cells** — no individual tracking, callsigns, or vessel names enter the pipeline at any stage. Identity suppression is enforced at ingest, not at display time.

For data questions, source proposals, or license clarifications, open a thread in [xyz-earth Discussions #2](https://github.com/random-knights/xyz-earth/discussions/2).

---

## Rendering

The globe runs two renderers side by side:

**3D globe** — a spinnable, zoomable sphere. Pan and zoom to any region, apply a sphere filter, and the score and data overlay update in real time.

**2D map** — a full-bleed canvas map with the flowing, animated visuals you'd expect from the best weather maps: wind trails that move with the forecast, ocean temperatures that shift, fire detections that pulse. The 2D renderer uses the same data pipeline as the 3D globe; it is optimized for fluid performance on the web.

Both renderers share the same layer, score, and filter state. Switching between them is instant.

---

*For the open AIEDS standard (AI energy disclosure), see [architecture/aieds/](../aieds/).*  
*For research and data discussions, see [xyz-earth Discussions](https://github.com/random-knights/xyz-earth/discussions).*
