# Workspace Tooling

This workspace uses lightweight root-owned PowerShell scripts for repeated
validation across the primary app and shared packages. The scripts are explicit
on purpose: they call the local Flutter SDK at
`C:\Projects\dev-kitt\flutter\bin\flutter.bat` and target the known app and
package folders directly.

## Scripts

Run commands from the root workspace, `C:\Projects\dev-kitt`.

```powershell
.\tooling\scripts\pub-get-all.ps1
```

Runs `flutter pub get` in:

- `apps/rand0m`
- `packages/rk_branding`
- `packages/rk_ui`
- `packages/rk_agents`
- `packages/rk_ai`
- `packages/rk_core`
- `packages/rk_media`
- `packages/rk_data`

```powershell
.\tooling\scripts\analyze-all.ps1
```

Runs `flutter analyze` in the same apps and packages.

```powershell
.\tooling\scripts\status-app-repos.ps1
```

Runs `git status --short --branch` for each nested app repository:

- `apps/rand0m`

```powershell
.\tooling\scripts\validate-all.ps1
```

Runs the full local validation sequence:

1. pub get the primary app and all packages
2. analyze the primary app and all packages
3. show nested primary app repository status

Each script stops on the first failed command and prints which project was
running when the failure occurred.

## Ownership

The root repository owns these scripts and this documentation. The scripts do
not change app source, package paths, Firebase configuration, environment
files, git remotes, or repository boundaries.

The primary app repository is `random-knights/xyz`. It remains checked out
locally under `apps/rand0m` for now. The package repositories also remain
independent nested git repos under `packages/rk_*`.

The root repository ignores both nested repo groups and owns only root workspace
docs/tooling. The scripts still validate the nested package repos by explicit
path; they do not require package source files to be tracked by the root repo.

## Future Melos Option

Melos may become useful after the workspace needs package graph awareness,
version orchestration, bootstrap hooks, or CI matrix generation. It is not
needed yet for this phase because the current requirement is simple validation
across a fixed set of apps and packages.

Revisit Melos after the next shared extraction wave creates more inter-package
dependencies or when root CI is ready to own workspace validation.
