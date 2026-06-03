# P10 Render Worker Contract

Date: 2026-06-03

## Scope

This contract defines the production-safe path from the current preview-only
Render page to real render/export execution.

It does not enable rendering, add Firebase Functions, add Cloud Run services,
change Flutter runtime behavior, or deploy.

## Current State

The app already has a preview-only Render plan:

- default videos: `dai1y.mp4`, `knight1y.mp4`
- fallback videos: `_md` and `_xl` variants
- shared sound registry
- duration default: `8` seconds
- output filename field
- safe command preview
- Generate/Export disabled

The merged P10.13 command-builder code proves the request shape and FFmpeg
argument shape without executing anything.

## Architecture Recommendation

Use Cloud Run as the preferred production render worker.

Cloud Run is preferred because it gives the render process a clear server-side
boundary, supports containerized FFmpeg without committing binaries, allows
resource limits, and can scale independently from Firebase Hosting and callable
entrypoints.

Firebase callable may be used as a thin authenticated job submission layer if
the app needs Firebase-native auth/session handling, but the actual render work
should run in Cloud Run or an equivalent isolated worker.

Do not use browser-side FFmpeg for production. Do not use `.exe` files in the
repository. Do not depend on `C:\Projects\dev-kitt\staged-render` or any local
developer folder for hosted behavior.

## Non-Negotiable Rules

- No browser-side FFmpeg execution.
- No local `.exe` binaries in source control.
- No `staged-render` runtime dependency.
- Server-side FFmpeg only.
- Authenticated users only.
- Fixed command template only.
- No arbitrary command input.
- No raw process logs exposed to users.
- Default duration remains `8` seconds.
- Duration must be capped server-side.
- Outputs are temporary unless a future save/favorite flow explicitly keeps
  them.

## MVP Limits

Recommended MVP limits:

- default duration: `8` seconds
- minimum duration: `1` second
- maximum duration: `30` seconds for private MVP
- maximum preset video input: existing app allowlist only
- maximum preset audio input: existing sound registry allowlist only
- custom uploads: disabled for first production worker
- output format: `mp4`
- concurrent jobs per user: `1`
- queued jobs per user: `3`
- daily private-phase jobs per user: `20`
- output TTL: `24` hours

Phase 2 may raise the maximum duration to `60` seconds after cost, CPU, and
storage behavior are measured.

## Render Request Schema

```json
{
  "videoSource": {
    "type": "preset",
    "id": "dai1y",
    "assetPath": "assets/videos/dai1y.mp4"
  },
  "audioSource": {
    "type": "preset",
    "id": "fire",
    "assetPath": "assets/sounds/fire.mp3"
  },
  "durationSeconds": 8,
  "outputFilename": "rand0m-render-preview",
  "requestedFormat": "mp4",
  "userId": "firebase-auth-uid",
  "traceId": "client-generated-correlation-id"
}
```

Validation rules:

- `videoSource.id` must resolve to a server-side allowlist entry.
- `audioSource.id` must resolve to a server-side allowlist entry.
- `assetPath` from the client is advisory only; server allowlist wins.
- `durationSeconds` must be an integer within the configured cap.
- `outputFilename` must be sanitized server-side.
- `requestedFormat` must be `mp4` for MVP.
- `userId` must come from verified auth context, not trusted client input.
- `traceId` must be opaque, length-bounded, and safe for logs.

## Response Schema

Submission response:

```json
{
  "accepted": true,
  "jobId": "render-job-id",
  "status": "queued",
  "safeError": null,
  "outputUrl": null,
  "expiresAt": "2026-06-04T00:00:00Z",
  "traceId": "client-generated-correlation-id"
}
```

Rejected response:

```json
{
  "accepted": false,
  "jobId": null,
  "status": "rejected",
  "safeError": "Render duration is above the current limit.",
  "outputUrl": null,
  "expiresAt": null,
  "traceId": "client-generated-correlation-id"
}
```

Completion response:

```json
{
  "accepted": true,
  "jobId": "render-job-id",
  "status": "succeeded",
  "safeError": null,
  "outputUrl": "signed-temporary-url",
  "expiresAt": "2026-06-04T00:00:00Z",
  "traceId": "client-generated-correlation-id"
}
```

## Lifecycle

- `previewed`: client created a local render plan; no server work exists.
- `submitted`: authenticated request passed client-side checks.
- `queued`: server accepted request and created a job.
- `rendering`: worker started FFmpeg using a fixed template.
- `succeeded`: output exists and has a temporary signed URL.
- `failed`: worker failed and exposes only safe error copy.
- `expired`: output TTL elapsed and storage cleanup completed or is pending.
- `cancelled`: user or operator cancelled before completion.

The app should never claim a render is complete until the worker returns
`succeeded`.

## Storage Policy

Use a temporary output bucket separate from permanent app assets.

Rules:

- write outputs under a user/job scoped prefix
- no public bucket listing
- signed URLs only
- output TTL: `24` hours for MVP
- lifecycle cleanup deletes outputs after TTL
- job metadata may remain longer for abuse/rate-limit accounting
- no permanent storage unless a future user favorite/save flow is designed
- uploaded media, if introduced later, must use a shorter staging TTL

Recommended storage paths:

```text
render-jobs/{uid}/{jobId}/output.mp4
render-uploads/{uid}/{uploadId}/input.mp4
```

## Security Model

Authentication:

- Firebase Auth required.
- Verified email required.
- During the private phase, restrict access to approved accounts or
  `@rand0m.ai` users if the app is not ready for public quota exposure.

Authorization:

- user can read only their own job status
- user can download only their own signed output URL
- operator/admin access is explicit and audited

Execution:

- server-side FFmpeg only
- fixed command template
- no shell interpolation
- no arbitrary arguments
- no client-provided filesystem paths
- no direct command strings from the app
- all preset assets resolved by server allowlist

Logging:

- log job id, uid hash or uid, source ids, duration, status, elapsed time,
  output size, and trace id
- do not log raw tokens
- do not log signed URLs after issuance
- do not expose FFmpeg stderr directly to users

## Abuse Prevention

- per-user daily job quota
- per-user concurrent job cap
- global worker concurrency cap
- strict duration cap
- strict output size cap
- allowlisted preset media for MVP
- uploaded media disabled for MVP
- future uploads require content-type checks, size checks, extension checks,
  malware scanning policy, and temporary staging cleanup
- reject path-like output filenames
- reject unknown video/audio ids
- alert on repeated failures or quota abuse

## Worker Command Template

The worker may use the same command shape proven by the app command builder,
but it must construct arguments as an argument array, not by concatenating a
shell command string.

```text
ffmpeg
  -stream_loop -1 -i <server-resolved-video>
  -stream_loop -1 -i <server-resolved-audio>
  -map 0:v:0
  -map 1:a:0
  -c:v copy
  -c:a aac
  -t <bounded-duration>
  -movflags +faststart
  <server-generated-output-path>
```

The client command preview is informational only. The server must rebuild the
plan from validated ids and limits.

## User-Facing Safe Errors

Recommended safe copy:

- `Render is temporarily unavailable. Try again later.`
- `That render is longer than the current limit.`
- `That video or sound is not available for rendering yet.`
- `Your render queue is full. Wait for one job to finish.`
- `The render finished, but the download link expired. Create it again.`
- `The selected output name is not available. Try a shorter name.`

Never show raw FFmpeg stderr, stack traces, bucket paths, or signed URL internals
as user-facing errors.

## Implementation Phases

### P10.16 Local Worker Proof

- Create local-only tooling outside Flutter runtime.
- Consume a render plan-like JSON fixture.
- Discover user-installed FFmpeg or require an explicitly configured path.
- Generate a tiny output in a gitignored output folder.
- Do not commit FFmpeg binaries or generated renders.

### P10.17 Cloud Run Worker Prototype

- Build a containerized worker with FFmpeg.
- Use preset allowlists only.
- Accept signed/internal job payloads.
- Write temporary outputs.
- Validate CPU, memory, duration, and cost.

### P10.18 Authenticated Render Job Callable

- Add Firebase callable or HTTPS endpoint only as a submission/status boundary.
- Require Firebase Auth and verified email.
- Enforce quotas before enqueueing.
- Return job status and safe errors only.

### P10.19 Render History/Favorites

- Add user-visible render history after worker safety is proven.
- Add favorite/save behavior only with explicit storage policy.
- Keep temporary output cleanup as the default.

## Rollback Strategy

- Keep Generate/Export disabled until worker phases pass validation.
- If worker errors or cost spike, disable submission at the callable/feature-flag
  boundary.
- Existing preview-only Render UI can remain because it does not execute work.
- Delete temporary outputs through lifecycle policy.
- Keep app deployment independent from worker deployment until the worker is
  stable.

## Merge Guidance

The P10.13 preview-only command builder is safe on `main` because it does not
execute rendering. Production render/export must wait for this worker contract
to be implemented in a separate phase.

Do not add runtime render execution to the Flutter web client.
