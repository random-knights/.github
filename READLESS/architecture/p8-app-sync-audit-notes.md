# P8 App Sync Audit Notes

Last audited: 2026-05-30

## P7.5 Terminal Status

- Home back flipcard terminal animation is capped by a dynamic typing step that targets about 90 frames, which should complete in under 2 seconds at normal web frame rates.
- The terminal still uses its session cache, so the full animation runs only once per app load.
- The active-agent line keeps the existing format:

```text
>_ active agent: @agent
```

- Active-agent display now listens to favorite and visibility changes and stores the resolved agent in widget state, so updates do not require refresh or flip-away/flip-back.
- Later active-agent changes update the line without replaying the terminal animation.

## Live-Sync Findings For P8

### Agent Provider And Model Settings

- Agent settings are stored through the existing Hive-backed agent config/settings services.
- Agent list rows refresh after settings dialogs close, but several dashboard/Home summaries still use `FutureBuilder`-style snapshots for settings-like data.
- The default AI provider Settings/App Info row updates itself after selection, but other open surfaces may not automatically listen for provider/model setting changes.
- P8 should audit settings surfaces for a shared listenable or lightweight refresh bus so provider/model changes can update active views without a reload.

### App Icon And App Info Settings

- App icon settings on Home/App Info currently reload their own futures after selection.
- This works locally for the current surface, but it is not an app-wide live-sync pattern.
- P8 should decide whether app settings need a small shared notifier instead of isolated future reloads.

### Active Agent

- Active favorite agent live-sync is now the healthiest pattern: it uses the favorites/visibility listeners and avoids stale future snapshots.
- P8 can use this as the model for other settings that need immediate cross-surface updates.

## Weather Finding

- Weather currently loads directly from the browser using OpenWeatherMap endpoints in `lib/services/weather/weather.dart`.
- The page can show "Unable to load weather" when location succeeds but the API request fails.
- Location permission/service failure returns a separate "Location permission unavailable" message.
- The code reads `Env.weatherApiKey`, which is generated from `WEATHER_API_KEY`.
- The root `.env.example` currently documents `RANDOM_WEATHER_API_KEY`, so the weather env contract should be clarified before deeper debugging.
- P8 should verify whether weather should remain client-side or move behind the Firebase Functions proxy to avoid exposing provider key material in web builds.

## About Video Finding

- About video playback is driven by `lib/widgets/about/themecard.dart`.
- It loads bundled assets from `apps/rand0m/assets/videos`.
- The large web paths are:
  - `assets/videos/stranger_days_xl.mp4`
  - `assets/videos/stranger_nights_xl.mp4`
- The medium web paths are:
  - `assets/videos/stranger_days_md.mp4`
  - `assets/videos/stranger_nights_md.mp4`
- Current selection uses XL videos when viewport width is over 900px, which can be expensive for web startup and in-page loading.
- Video files are tracked through Git LFS via `.gitattributes`, so they are GitHub-safe from a repository-size perspective.
- Web-load safety is still questionable because the XL files are over 100 MB each.
- P8 should consider using smaller web-optimized video assets by default, lazy loading the video region, or using a hosted media/CDN path for large motion assets.

## Recommended P8 Follow-Up

1. Define a small app-local settings sync mechanism for settings that must update across open surfaces.
2. Clarify Weather key naming and decide whether weather calls belong behind Functions.
3. Profile About video loading on `rand0m.ai` and replace default web playback with safer asset sizes if needed.
4. Review existing `FutureBuilder` snapshots for settings/config surfaces that should react live.
5. Keep Home terminal interactivity out of scope until Agent Command Architecture begins.
