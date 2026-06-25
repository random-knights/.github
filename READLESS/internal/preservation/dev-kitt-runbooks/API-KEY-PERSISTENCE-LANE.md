# API-key persistence + App Info relocation (pre-prod, separate from Earth)

Runs in parallel with the Earth work — fully disjoint files. Pre-prod priority. Agent runs everything; owner reviews staging.

## What's actually wrong (from the code)
`ByokKeyStore` already **persists** per-provider keys and tracks whether first-login onboarding has shown — so the key the user types at first login is most likely saved. The real gaps:
1. **No visibility/confirmation** — the user has no way to see that their key was saved or what it is, so it *feels* lost.
2. **Scattered + wrong home** — key entry lives at first-login onboarding + the About page; the owner wants it managed in **App Info settings, next to "AI Default Provider."**

## Tasks
1. **Verify persistence end-to-end.** Confirm a key entered in first-login onboarding (`widgets/settings/byok_onboarding.dart`) is written to `ByokKeyStore` and is readable after a reload. Add a regression test. If there's any gap between the onboarding write and the store, fix it. Files: `services/settings/byok_key_store.dart`, `byok_onboarding.dart`, `byok_access.dart`.
2. **Relocate to App Info settings, beside AI Default Provider.** In App Info (`pages/home/shell/home_info_widgets.dart`) add an "AI provider & key" section co-located with the AI Default Provider control (`AgentConfigService` — `services/agents/config.dart` / `pages/agents/settings_dialog.dart`). Per provider show: the **masked** saved key (e.g. `sk-…a1b2`), a **Saved ✓** state, and Update / Clear; plus which provider is the **default**. Make App Info the canonical management surface; keep first-login + `provider_key_pages.dart` working (they write the same store), and point the About-page entry here.
3. **Confirmation on save.** Whenever a key is saved (first-login OR App Info), show a clear inline/toast "Key saved ✓" so the user knows it persisted.

## Security (hard rules)
Never render the full key — always mask. Never log it. Keep it in the existing persisted `ByokKeyStore` (do not move to a less-secure store). This lane only adds visibility + relocation; it does not change where secrets are stored.

## Gate (on-device screenshots)
(a) enter a key → "Saved ✓" confirmation; (b) App Info shows the masked saved key + the default provider; (c) hard reload → the key still shows as saved. `flutter analyze` + tests green.

## Launch (agent runs everything; owner reviews staging, gates prod)
```powershell
cd C:\Projects\dev-kitt\apps\rand0m ; git fetch origin
git worktree add -b app/api-key-persist ../../worktrees/rand0m-apikey origin/main
```
Paste to a fresh agent: "Work ONLY in worktrees/rand0m-apikey (off origin/main). Full spec: C:\Projects\dev-kitt\tooling\scripts\API-KEY-PERSISTENCE-LANE.md. Make the BYOK key visibly persist and manage it in App Info settings beside the AI Default Provider, with a masked saved-key display + Saved✓ confirmation. Mask keys always; never log them; keep the existing persisted store. You run all steps: code → flutter analyze + tests → `flutter run -d chrome` + screenshots (enter-key→saved, App Info masked key, reload-still-saved) → commit → rebase → ff-merge → push → deploy staging (gh workflow run \"80-test-deploy-smoke.yml\" --ref main). Then STOP and report for owner staging review; deploy prod only on the owner's go. Disjoint from Earth — safe in parallel."
```
