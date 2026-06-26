# TIMELINE — how RAND0M got built

> The story of a planet-scale app built in the open, fast.
> **Under 30 days. Under 1,500 deploys.** One app, one globe, a small crew of
> agents, and a lot of real environmental data.

---

## The build, in a nutshell

RAND0M (**rand0m.ai**) started as a single idea: take the messy, scattered,
hard-to-read state of the planet and turn it into one living globe you can read at
a glance. No dashboards-of-dashboards. One Earth, honest numbers, and a score that
tells you how the planet is doing today.

It came together in a sprint — **fewer than 30 days, fewer than 1,500 deploys** —
shipping continuously the whole way: build, validate, deploy, repeat. Every change
went out small and often, with automated checks guarding each step and a human
keeping the final "go" on anything that touches the live site.

## The Planet Health Score: v0.3 → v0.6

The heart of RAND0M is the **Planet Health Score** — a single index, computed per
region and rolled up to the whole planet, that says how healthy things look right
now.

It grew up fast:

- **v0.3** — the first honest attempt: a handful of environmental signals blended
  into one number.
- **v0.4** — split the ocean into *warming* and *acidification*, and started
  labeling which signals are true planetary-boundary measures vs context.
- **v0.6** — **nine domains**: land cover, fire, air, ocean warming, ocean
  acidification, cryosphere (ice), biodiversity, conservation, and a new one —
  **human pressure (the Anthroposphere)**. That last domain — how much a place is
  shaped by people — is now **grounded and ratified**: anchored on the Global Human
  Modification (gHM) index, a peer-reviewed geospatial synthesis of infrastructure,
  agriculture, and urban footprint. Science-backed, planetary-boundary anchored.

Every score is stamped with the methodology version it was computed under, so the
numbers stay comparable as the science improves.

## Six spheres, one globe

RAND0M reads the planet through its **six spheres** — atmosphere, hydrosphere,
cryosphere, biosphere, lithosphere, and the anthroposphere (us). The globe lets
you filter and color the Earth by any of them.

You can explore it two ways: a **3D globe** you can spin and zoom, and a fast
**2D map** with the kind of flowing, full-bleed visuals you'd expect from the best
weather maps — wind that moves, oceans that shimmer, color ramps tuned to the data.

## The live layers

The globe is fed by real, current science — not stock imagery:

- **Atmosphere:** live wind, temperature, and storm-energy (CAPE / instability)
  from global forecast models (**NOAA / NCEP GFS**).
- **Air:** particulate and NO₂ loading from **CAMS** (Copernicus Atmosphere).
- **Ocean:** sea-surface temperature anomalies and surface currents from **NOAA**
  and Copernicus Marine.
- **Fire:** active-fire detections.
- **Movement:** **aggregated** flight and maritime activity — shown as density,
  never as tracking of individual aircraft or vessels — plus governed satellite
  context.

Layers refresh on a schedule so the globe reflects the world as it is, not a
snapshot frozen in time.

## The crew

RAND0M isn't built by one monolith — it's run by a small crew of **agents**:
`rand0m`, `dai1y`, `knight1y`, and `aut0mate`, each with a role, one of them
"active" at a time. They're the personality layer on top of the machine — your way
in to the data, the chat, and the tools.

## 0RAC1ES on the R1

Along the way, RAND0M reached off-screen: **0RAC1ES**, a creation for the
**Rabbit R1**, bringing a piece of the RAND0M world onto a dedicated little device.
A side-quest that proved the ecosystem travels.

## How it ships

RAND0M runs on a **continuous-delivery** model: a **staging** world for trying
things live, and a **production** world (rand0m.ai) that only goes out on a
deliberate, human-approved release. Automated validation runs on every change;
the globe you see is always the latest thing that passed the gates.

## Where it's going

- Deeper time: scrub the timeline back through years of reanalysis data and watch
  regions change.
- More autonomy: infrastructure that heals and refreshes itself.
- More spheres of the story, told well.

This is RAND0M: a planet you can read, built in the open, shipping every day.
