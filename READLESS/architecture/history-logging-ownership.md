# History Logging Ownership

Phase 6L documents current history/logging ownership before any persistence
cleanup. This is an audit and migration plan only. It does not change Hive
schemas, type ids, box names, keys, history UI behavior, request behavior, or
logging semantics.

## Frozen Persistence Contract

### `history_events`

Owner today: `HistoryService`.

Box:

- `history_events`

Model:

- `HistoryEvent`
- Hive `typeId: 7`

Fields:

- `0`: `id`
- `1`: `agent`
- `2`: `timestamp`
- `3`: `type`
- `4`: `message`
- `5`: `durationMs`
- `6`: `metadata`
- `7`: `model`

Do not rename the box, change `typeId: 7`, reorder fields, remove fields, or
change existing event type strings without a migration plan.

## History Read Map

| Reader | API | Purpose |
| --- | --- | --- |
| `HistoryService.eventsForDay(agent, date)` | `Hive.box<HistoryEvent>('history_events').values` | Filters history by exact `agent` and calendar day. |
| `ExpandedBook._computeSeries()` | `HistoryService.eventsForDay()` | Builds 7-day chart series for requests, settings, failures, and speed. |
| `ExpandedBook._summary()` | `HistoryService.eventsForDay()` | Builds daily summary chips for requests, cost, carbon, tree-time, and average response. |
| `AgentsPage._AgentRuntimeStats.forAgent()` | `HistoryService.eventsForDay()` | Builds 30-day per-agent request/cost/carbon/response-time chips. |
| `TerminalBox._historySummaryLines()` | `HistoryService.eventsForDay()` | Builds 30-day terminal runtime journal totals. |
| `widgets/agents/hive.dart` | generic Hive box browser | Can inspect and delete arbitrary box entries, including history, through generic debug/admin UI behavior. |

Read behavior details:

- `HistoryService.eventsForDay()` matches `e.agent == agent`.
- Multi-provider `ChatService` writes `agent: 'user'` for user requests and
  `agent: model` for AI replies, so those entries do not naturally appear in
  per-agent book views unless the selected agent string matches the stored
  model string.
- Agent chat events written by `TransmitService` use `agent: agentName`, so
  they feed the agent history UI and runtime stats.

## History Write Map

| Writer | Writes | Event shape |
| --- | --- | --- |
| `HistoryService.init()` | Opens `history_events` | No event write. |
| `HistoryService.logEvent()` | `_box.put(event.id, event)` | Generates UUID id, stores caller-provided `agent`, `type`, `message`, `durationMs`, `metadata`, and `model`. |
| `HistoryService.appendEvent()` | `_box.add(event)` | Compatibility append path for prebuilt events that must preserve caller-owned ids and existing add semantics. |
| `TransmitService.getAgentAIResponse()` request path | `HistoryService.logEvent()` | `agent: agentName`, `type: 'request'`, `model: cfg.model`. |
| `TransmitService.getAgentAIResponse()` reply path | `HistoryService.logEvent()` | `agent: agentName`, `type: 'reply'`, `model: responseModel`, `durationMs`, metrics in `message`. |
| `TransmitService.getAgentAIResponse()` failure path | `HistoryService.logEvent()` | `agent: agentName`, `type: 'failure'`, `model: cfg.model`, error string in `message`. |
| `SettingVisibility.setAgentVisibility()` | `HistoryService.logEvent()` | `agent: name`, `type: 'setting_change'`, message `visibility_on` or `visibility_off`. |
| `SettingVisibility.agentOrder` setter | `HistoryService.logEvent()` | `agent: 'system'`, `type: 'setting_change'`, message `agent_reorder`. |
| `ChatService._logUserRequest()` | `HistoryService.appendEvent()` | `agent: 'user'`, `type: 'user_request_$model'`, prompt in `message`, `durationMs`, `model`. |
| `ChatService._logAiReply()` | `HistoryService.appendEvent()` | `agent: model`, `type: 'ai_reply_$model'`, reply plus metrics in `message`, `durationMs`, `model`. |

## Direct Hive Usage Found

History-specific direct Hive usage:

- `lib/services/agents/history.dart`
  - `Hive.openBox<HistoryEvent>('history_events')`
  - `Hive.box<HistoryEvent>('history_events')`
  - `_box.put(event.id, event)`
  - `_box.values.where(...)`
- `lib/services/chat/chat.dart`
  - No direct Hive access after Phase 6M.
  - Still constructs the same `HistoryEvent` payloads and delegates append
    storage to `HistoryService.appendEvent()`.

Other Hive usage exists for API keys, agent config, visibility/order, generic
Hive inspection UI, and other app-local persistence. Those are outside this
history cleanup scope.

## Metric Ownership Map

### Request Counts

Source:

- Event `type` strings containing `request`.

Writers:

- `TransmitService`: `type: 'request'`.
- `ChatService`: `type: 'user_request_$model'`.

Readers:

- `ExpandedBook._computeSeries()`.
- `ExpandedBook._summary()`.
- `AgentsPage._AgentRuntimeStats.forAgent()`.
- `TerminalBox._historySummaryLines()`.

### Reply Counts And Average Response

Source:

- Event `type` strings containing `reply`.
- `HistoryEvent.durationMs`.

Writers:

- `TransmitService`: `type: 'reply'`, `durationMs`.
- `ChatService`: `type: 'ai_reply_$model'`, `durationMs`.

Readers:

- `ExpandedBook._computeSeries()` converts average speed to seconds for chart.
- `ExpandedBook._summary()` shows average response in milliseconds.
- `AgentsPage._AgentRuntimeStats.forAgent()` shows average response in
  milliseconds.
- `TerminalBox._historySummaryLines()` shows average response in milliseconds.

### Failures

Source:

- Event `type` strings containing `failure` or `error`.

Writers:

- `TransmitService`: `type: 'failure'`.
- API layer returns typed error responses, but general `ChatService` logs them
  as replies through `_logAiReply()` because it logs the fallback/error text as
  a bot message after receiving an `AiResponse`.

Readers:

- `ExpandedBook._computeSeries()` counts failure/error events.

### Cost

Source:

- `estimatedCostUsd=<value>` embedded in `HistoryEvent.message`.

Writers:

- `TransmitService` reply logs write only metric tokens into `message`.
- `ChatService` AI reply logs append `[inputTokens=... | outputTokens=... |
  estimatedCostUsd=... | estimatedCo2eGrams=...]` after reply text.

Readers:

- `ExpandedBook._summary()`.
- `AgentsPage._AgentRuntimeStats.forAgent()`.
- `TerminalBox._historySummaryLines()`.

### Carbon And Tree-Time

Source:

- `estimatedCo2eGrams=<value>` embedded in `HistoryEvent.message`.

Writers:

- `TransmitService` reply logs.
- `ChatService` AI reply logs.

Readers:

- `ExpandedBook._summary()` displays carbon and derives tree-time.
- `AgentsPage._AgentRuntimeStats.forAgent()` displays carbon and derives
  tree-time.
- `TerminalBox._historySummaryLines()` displays carbon and derives tree-time.

Tree-time formula:

- Current UI assumes one mature tree absorbs `21000.0` grams CO2/year.
- Current UI converts the total grams into minutes per year using `525600.0`.

## Formatted-String Parsing Risks

Metric parsing currently searches `HistoryEvent.message` for text fragments like
`estimatedCostUsd=` and `estimatedCo2eGrams=`, then parses until the next `|`.

Risks:

- If reply text itself contains `estimatedCostUsd=` or `estimatedCo2eGrams=`,
  stats can parse user-visible content as telemetry.
- If metric order, spacing, delimiter, or casing changes, existing parsers can
  silently return `0`.
- `ChatService` appends metrics inside square brackets after reply text, while
  `TransmitService` stores only the metric string. Readers rely on substring
  matching to support both shapes.
- Request and reply counts use `type.contains(...)`, so future event type names
  could be miscounted if they contain `request`, `reply`, `failure`, or `error`
  for another reason.
- General chat failures are not consistently typed as `failure`; typed API
  error responses may be logged as `ai_reply_$model` with error text.
- `HistoryService.eventsForDay()` filters by exact `agent`, while general chat
  stores `agent: model` for AI replies. This makes app-wide provider history
  and per-agent history semantically different even though they share the same
  box.
- `durationMs` on request events in `ChatService` records the full response
  duration, not the time of the initial request action. Existing stats usually
  use reply durations, but the stored request duration can be misleading.
- Tree-time is derived separately in multiple widgets, so a future formula
  change could drift unless centralized.

## Recommended Cleanup Sequence

1. Freeze `history_events`, `HistoryEvent typeId: 7`, and all existing
   `HiveField` numbers.
2. Keep `HistoryService.appendEvent()` as the app-local compatibility append
   facade for prebuilt events.
3. Continue preserving `box.add()` versus `box.put()` behavior where
   observable, event ids, event types, `agent` values, `message` formatting,
   `durationMs`, and `model`.
4. Keep `HistoryService.logEvent()` as the semantic logging implementation until
   all callers are routed through the facade.
5. Keep `HistoryMetrics` as the app-local parser/helper for existing formatted
   metrics. It parses current `message` strings exactly as before and is shared
   by `ExpandedBook`, `AgentsPage`, and `TerminalBox`.
6. Add typed runtime view models for summaries, such as `HistoryMetricSummary`,
   without persisting new fields.
7. Preserve all current display outputs while replacing duplicated parsing
   code with the shared parser.
8. After parser parity is verified, decide whether future events should write
   structured metric JSON to `metadata` while continuing to read old formatted
   strings as fallback.
9. Only after a migration plan exists, consider normalizing general chat events
   and agent chat events under a shared event taxonomy.
10. Keep `HistoryService`, `HistoryEvent`, Hive access, and runtime metrics
    app-local. Do not move history runtime into `rk_agents`.

## Extraction Boundary

Safe for `rk_agents`:

- No history runtime code.
- No Hive models.
- No event logging.
- No metric parsing.

Keep app-local in knight1y:

- `HistoryEvent`.
- `HistoryService`.
- Direct Hive writes should stay isolated inside `HistoryService`.
- `TransmitService` logging.
- `ChatService` logging.
- History UI, book assets, charts, runtime summaries, and stats.

## Phase 6L Verdict

History is not ready for package extraction. Phase 6M isolated the remaining
direct chat writes behind `HistoryService.appendEvent()`. Phase 6N centralized
formatted metric parsing and tree-time labels behind `HistoryMetrics` while
preserving existing formatted-string behavior. The next safe step is typed
runtime summary view models before any event taxonomy cleanup.
