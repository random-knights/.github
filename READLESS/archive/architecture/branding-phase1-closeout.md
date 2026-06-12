# Branding Phase 1 Closeout

Branding Phase 1 proved minimal shared branding adoption across the four current
apps without moving root folders, assets, Firebase config, or app-specific
routes/widgets.

## Completed

`rk_branding` now lives in:

- `kn1ghts/packages/rk_branding`

It owns:

- `AppColors`
- `RKFonts`
- `RKFonts.bodyTextTheme()`
- `RKFonts.display()`
- `RKFonts.terminal()`

Adoption status:

- Knight1y consumes `rk_branding` through its local workspace path.
- Rand0m consumes `rk_branding` through `../kn1ghts/packages/rk_branding`.
- Out1ine consumes `rk_branding` through `../kn1ghts/packages/rk_branding`.
- Up10ad consumes `rk_branding` through `../kn1ghts/packages/rk_branding`.

Shared adoption is proven for:

- The shared `AppColors` constants.
- Light body font behavior through Mulish.
- Dark body font behavior through Inter.

Patrick Hand exists in `rk_branding` through `RKFonts.display()`, but broad
display-font adoption in the supporting apps has not started.

## Verification

Phase 1G scans found:

- `AppColors` is defined only in `kn1ghts/packages/rk_branding`.
- All four apps reference `rk_branding`.
- Supporting apps use the temporary sibling path:
  `../kn1ghts/packages/rk_branding`.
- `rk_branding` has no app imports from Knight1y, Rand0m, Out1ine, or Up10ad.
- `rk_branding` has no Hive imports.
- `rk_branding` has no Firebase imports.
- `rk_branding` has no runtime services.
- `rk_branding` has no routes, pages, widgets, or app asset references.

## Temporary Path Strategy

The sibling path strategy is acceptable short-term because:

- It proves all apps can compile against the same shared package.
- It avoids physical folder moves while app/package boundaries are still being
  normalized.
- It keeps each app repo independently recoverable.
- It avoids introducing root workspace assumptions too early.

It is not the final shape because:

- It crosses separate git repo boundaries.
- It depends on the current local folder layout.
- It makes CI and fresh checkout setup fragile unless every repo is present in
  the same relative location.
- It keeps the shared package physically owned by Knight1y even though it is now
  used by all apps.

Final target:

- Move shared packages to a root-level package area only after dependency and
  analyzer normalization is complete.
- Keep app folders stable until package consumers are known and validated.
- Do not physically restructure repos while supporting apps still have stale
  dependency, analyzer, or generated-config drift.

Hard rule:

- No physical folder restructure until package/dependency normalization is
  complete.

## Stays App-Local

The following remain app-local for now:

- Concrete `AppTheme` implementations.
- App shell `ThemeData` assembly.
- Launcher icon configuration.
- App icons and image/video/audio assets.
- App-specific routes and pages.
- Widgets and feature UI.
- Firebase configuration.
- `.env` files.
- Hive schemas, adapters, boxes, and runtime services.
- Emoji-specific `GoogleFonts.notoColorEmoji()` usage.

## Next Larger Workload

Recommended larger Codex workload sequence for supporting apps:

1. Normalize SDK constraints and Flutter tool assumptions.
2. Clean existing analyzer warnings without mixing in feature work.
3. Align `analysis_options.yaml` across apps.
4. Identify stale Firebase/deploy state and generated config differences.
5. Normalize dependency declarations, especially direct imports from packages
   that are currently only transitive.
6. Gradually adopt `rk_branding` display helpers where visually appropriate.
7. Audit duplicated UI/progress widgets for future `rk_ui` adoption.
8. Identify cross-app core helpers that could become `rk_core`.
9. Preserve app-specific assets, launcher icons, routes, and Firebase config
   until explicitly migrated.

Recommended supporting-app modernization order:

1. Up10ad, because it has a smaller analyzer surface and already has explicit
   `hive`/`path` style dependencies.
2. Out1ine, because it is close to Up10ad structurally and has fewer findings
   than Rand0m.
3. Rand0m, because it has the broadest stale lint/dependency surface.

## Risks Before Root Package Move

Risks to resolve before moving `rk_branding` or other packages to root:

- Separate git remotes and branch states across app repos.
- Supporting apps have existing analyzer findings.
- Supporting apps have different SDK constraints.
- Some apps rely on local generated files and `.env` assets.
- Firebase config ownership has not been normalized.
- Launcher icons and app assets are app-specific and should not be swept into a
  shared package move.
- CI assumptions for multi-repo path packages are not yet documented.

## Recommended Next Command

Begin the supporting app modernization phase with:

```text
Begin Supporting Apps Modernization Phase 2A: read-only SDK, analyzer, Firebase,
and dependency normalization audit across rand0m, orac1es, and uti1ity. Do not
change runtime behavior, assets, Firebase config, or package locations.
```
