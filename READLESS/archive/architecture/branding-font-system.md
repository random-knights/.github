# Branding Font System

Knight1y now consumes shared typography helpers from the local
`packages/rk_branding` package. This is a migration-safe extraction of brand
tokens only; it does not redesign layouts, replace body text globally, or change
runtime logic.

## Current Font Roles

### Brand/display

Owner:

- `packages/rk_branding/lib/src/fonts/rk_fonts.dart`
- `RKFonts.display()`

Compatibility:

- `lib/theme/fonts.dart` remains as a Knight1y-local export bridge only.

Font:

- Patrick Hand via `GoogleFonts.patrickHand`

Use for:

- App and brand titles.
- Major page/section titles.
- Agent name/title surfaces.
- Flipcard action labels.
- App bar title slots through the central theme.

### Body

Owner:

- `RKFonts.bodyTextTheme()`

Current behavior:

- Light mode keeps the existing Mulish body text theme.
- Dark mode keeps the existing Inter body text theme.

This preserves readability for dense UI, forms, settings, chat, markdown, and
runtime data.

### Terminal

Owner:

- `RKFonts.terminal()`

Current behavior:

- Exposed as a brand/display-compatible helper for future terminal headings.
- The main terminal output body remains monospace for alignment and scanning.

## Applied Surfaces

Patrick Hand is applied to:

- Theme display/headline/title text slots.
- Theme app bar title text style.
- Sign-in brand title.
- Flipcard action labels.
- Agents page section title.
- Agent name surfaces in the agent list and settings list.
- Agent settings page title.
- Expanded history book title and provider section title.
- Theme card mode title.
- Home/about dialog brand lines.

## Intentionally Untouched

The following stay on the existing readable body/monospace styles:

- Chat message body text.
- Markdown response body text.
- Settings form labels and inputs.
- Model/provider dropdown values.
- Runtime metric chips.
- Terminal output body.
- Code blocks and monospaced technical output.
- Dense Hive/debug surfaces.

## Phase 1A `rk_branding` Extraction

Completed in Branding Phase 1A:

1. `RKFonts` moved into `packages/rk_branding`.
2. `AppColors` moved into `packages/rk_branding`.
3. Knight1y direct font call sites now import `package:rk_branding/rk_branding.dart`.
4. `rk_ui` depends on `rk_branding` and keeps a color compatibility export.
5. No widgets, routes, assets, launcher icons, Hive models, or runtime services
   moved as part of this extraction.

`rk_branding` owns typography and color primitives. Knight1y continues to own
where those tokens are applied in app-specific UI.

## Dependency Direction

Current direction:

- Knight1y app -> `rk_branding`
- Knight1y app -> `rk_ui`
- `rk_ui` -> `rk_branding`

Disallowed direction:

- `rk_branding` -> `rk_ui`

This keeps branding primitives below UI widgets and avoids a circular package
dependency.
