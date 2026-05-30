# Random Knights, XYZ — Agent Rules

## Overview

Random Knights, XYZ is a Flutter + Firebase ecosystem focused on:

- human-first AI tooling
- transparent AI usage
- environmental awareness
- creative workflows
- privacy and user agency
- modular multi-app architecture

Primary ecosystem apps:

- rand0m
- up10ad
- out1ine
- knight1y

Support modules:

- c1assr00m
- e1even

---

# Core Philosophy

The platform should:

- empower users without hiding AI behavior
- expose AI cost, provider, and environmental impact
- avoid dark patterns
- support AI-enabled and AI-disabled experiences
- prioritize modular architecture over quick hacks
- favor incremental extraction over large rewrites

---

# Security Rules

## Never:

- expose API keys
- modify `.env` files unless explicitly instructed
- print secrets into logs
- bypass Firebase security rules
- weaken auth restrictions
- auto-deploy without approval
- push directly to `main`
- commit generated credentials or local machine state

## Firebase

- Firebase Functions are the backend AI proxy layer.
- Client apps should never call paid AI providers directly in production.
- Firestore rules must remain least-privilege.
- Auth should enforce verified `@rand0m.ai` access during internal development.

---

# Git Workflow

## Always:

- use feature branches
- make small focused commits
- summarize changed files
- explain architectural risks
- prefer incremental migrations

## Never:

- rewrite git history unless explicitly instructed
- perform giant multi-system refactors in one step
- move large asset trees without approval

---

# Development Workflow

After Flutter changes:

- run `flutter analyze`

After Firebase Functions changes:

- run `npm run build` inside `/functions`

Before major extraction:

- confirm imports
- confirm dependency direction
- confirm package boundaries

---

# Architecture Direction

Current extraction order:

1. rk_ai
2. rk_ui
3. rk_connections
4. rk_agents
5. rk_features
6. rk_media
7. rk_platform

Do NOT prematurely extract:

- pages
- Hive adapters
- large assets
- routing systems

---

# Package Philosophy

## rk_ai

Provider contracts, AI models, pricing, usage, telemetry, proxy clients.

## rk_ui

Theme, shared widgets, design system, responsive utilities.

## rk_connections

Authentication, integrations, external services, platform connections.

## rk_agents

Agent definitions, orchestration, history, settings, behaviors.

## rk_features

Composable feature modules shared across apps.

## rk_media

Media rendering, assets, playback, upload pipelines.

## rk_platform

Cross-app platform services and orchestration.

---

# Responsive UI Rules

- Preserve current responsive behavior unless explicitly asked.
- Mobile layouts are critical.
- Rabbit R1 and Razr outer-screen layouts are first-class targets.
- Avoid overflow.
- Preserve split-view resizing behavior.

---

# AI Principles

The platform intentionally exposes:

- provider source
- model
- token usage
- estimated cost
- estimated environmental impact

Do not hide or obscure these metrics.

---

# Code Style

- Prefer explicit naming over clever abstractions.
- Prefer maintainability over premature optimization.
- Prefer composition over inheritance.
- Keep files focused and modular.
- Avoid circular dependencies.

---

# Documentation

Architecture decisions belong in:

- `docs/decisions/`

Platform strategy belongs in:

- `docs/architecture/`

Major architectural changes should include:

- rationale
- risks
- migration impact
- rollback considerations

---

# Long-Term Vision

Random Knights is evolving from:

- a single Flutter app

into:

- a modular AI operating environment
- a creative tooling ecosystem
- a transparent AI experimentation platform
- an open-source community project
