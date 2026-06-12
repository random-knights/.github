# Route Cycle Cleanup

Phase 6B resolved the remaining route-level import cycle without changing the
visible startup, refresh, progress, or sign-out flow.

## Previous Cycle

The route files previously formed this cycle:

```text
pages/auth/sign_in.dart
-> pages/home/splash.dart
-> pages/home/progress.dart
-> pages/home/home.dart
-> pages/auth/sign_in.dart
```

Each page directly imported the next page it navigated to. That made the startup
flow easy to follow locally, but it tied auth, splash, progress, and home into
one import component.

## Decision

Use builder injection for the startup sequence:

- `SignInGate` receives an `authenticatedBuilder`.
- `DoorSplashScreen` receives a `nextPageBuilder`.
- `HomeProgressBar` receives a `homeBuilder`.
- `home.dart` owns the concrete knight1y startup composition through
  `buildHomeStartupFlow()` and `buildHomeProgressFlow()`.

This keeps route behavior the same while moving ownership of the concrete route
chain to the app/home composition layer.

## Behavior Preserved

- Allowed authenticated users still see the door splash inside `SignInGate`.
- Door splash still waits, plays the door animation, then uses
  `pushReplacement`.
- Home progress still advances, plays native audio when applicable, and then
  uses `pushReplacement`.
- Home refresh still opens the same door splash startup sequence.
- Home sign-out still signs out and replaces the stack with `SignInGate`.

## Imports Removed

- `sign_in.dart` no longer imports `pages/home/splash.dart`.
- `splash.dart` no longer imports `pages/home/progress.dart`.
- `progress.dart` no longer imports `pages/home/home.dart`.

## Imports Added

- `home.dart` imports `pages/home/progress.dart` so it can compose the startup
  sequence.
- `main.dart` imports `pages/home/home.dart` so app startup can pass
  `buildHomeStartupFlow` into `SignInGate`.

## Remaining Risks

- `home.dart` still knows about `SignInGate`, `DoorSplashScreen`, and
  `HomeProgressBar` because it owns the app-specific startup composition.
- A future router should move route composition into an app-local routing layer,
  but that should happen separately from package extraction.
- The startup flow remains app-branded and runtime-coupled, so it should not
  move into `rk_agents`.
