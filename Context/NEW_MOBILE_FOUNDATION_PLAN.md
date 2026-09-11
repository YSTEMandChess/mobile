# New Mobile Foundation Plan

## Status and decision

**Approved direction:** Option B — create a fresh Expo/React Native TypeScript application and selectively reuse or rebuild useful TritonSE work.

**Implementation status:** The mobile application shell has been implemented and merged through F5. F6, covering the HTTP client, schemas, errors, and logging, is the next planned foundation PR. This document remains the approved architecture roadmap; GitHub Issues, the project board, the current code, and reviewed pull requests are the source of truth for active work and implementation status.

**Design reference:** The approved [Y STEM and Chess Figma file](https://www.figma.com/design/gl5WU4uDZ6X85VYUiK780L/Y-STEM-and-Chess--Copy-?node-id=114-4404&p=f) provides the current visual direction. Because it is primarily website-oriented, mobile-specific layouts, flows, typography, and accessibility states still require explicit review.

The foundation is complete when a contributor can clone the new repository, configure a non-production environment, run a development build, navigate through placeholder public and authenticated shells, exercise a mocked session, and pass the same lint, type-check, and test commands locally and in CI. Lessons, puzzles, chess play, mentoring, chat, profiles, badges, and analytics are feature work and are not part of the foundation definition of done.

## 1. Foundation boundaries

### Required before feature development

1. A supported Expo application using TypeScript in strict mode and a committed lockfile.
2. One documented Node/npm toolchain version and deterministic local/CI commands.
3. A minimal Expo Router shell with public, authenticated, and role-protected route groups.
4. Central environment validation for development, preview, and production endpoints.
5. A small design-token layer and accessible primitive components sufficient for placeholder screens.
6. A typed HTTP client, request cancellation, timeout behavior, bearer-token injection, and normalized errors.
7. A secure token-storage adapter and session state machine, initially testable with a mock authentication gateway.
8. A server-state provider and query-key conventions.
9. A real-time connection interface and lifecycle policy; no chess-specific event implementation yet.
10. Unit, component, navigation, and service-test harnesses plus required CI checks.
11. Root error boundaries, safe user-facing error states, and a redacted logging interface.
12. Contributor documentation covering setup, environments, architecture rules, and pull-request expectations.

### Explicitly feature work

- Production login and password-reset screens.
- Student or mentor home-screen content.
- Lesson selection, lesson gameplay, puzzle gameplay, and progress dashboards.
- Matchmaking, invitations, room membership, chessboard gameplay, Stockfish, chat, draw, resign, rematch, or reconnect UX.
- Profiles, meetings/Agora, badges, streaks, time tracking, analytics, notifications, and app-store release work.
- A complete visual implementation of the Figma designs.

Foundation code may expose interfaces and placeholder routes for these areas, but it must not implement their business behavior.

## 2. Recommended current stack

Use versions selected by the current Expo SDK rather than manually mixing React Native versions.

| Concern                | Recommendation                                                                                                                                        | Why                                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime                | Node.js 24 LTS, pinned with Volta or `.nvmrc`; npm with `package-lock.json`                                                                           | Node 24 is an active LTS line. The old mobile project uses an unpinned legacy workflow, while the website pins end-of-life Node 18. One current LTS version reduces onboarding differences.                     |
| Mobile framework       | Latest stable Expo SDK at initialization; the current official new-project template is SDK 57, paired by Expo with React Native 0.86 and React 19.2.3 | Expo manages compatible native-package versions and simplifies development builds for a student team. Reconfirm the stable release on the day the repository is initialized. Do not adopt beta/canary packages. |
| Development runtime    | `expo-dev-client` development builds; Expo Go only for early smoke tests if compatible                                                                | Expo describes development builds as the production-grade development environment. They avoid being constrained by Expo Go's fixed native modules and make team/device testing reproducible.                    |
| Language               | TypeScript with `strict: true`, no implicit `any`, and typed route/API boundaries                                                                     | The legacy app already uses TypeScript, but many values are effectively untyped. Strict types make student contributions easier to review and safer to refactor.                                                |
| Navigation             | Expo Router using stable `Stack` and `Tabs`, route groups, deep links, and typed routes; do not use `ExperimentalStack`                               | Expo recommends Router for new applications. File-based routes are easier to discover, and typed routes catch broken links. Expo's experimental stack is explicitly not production-ready.                       |
| HTTP                   | Platform `fetch` behind one `ApiClient`; `AbortController` for timeout/cancellation                                                                   | Avoid adding Axios until a demonstrated requirement exists. A wrapper provides one place for base URLs, JSON parsing, auth headers, and error normalization.                                                    |
| Server state           | TanStack Query                                                                                                                                        | It supports React Native and separates cached server state from UI/session state. Configure React Native focus and online managers once in the foundation.                                                      |
| Boundary validation    | Zod for environment variables and untrusted API/socket payloads                                                                                       | TypeScript types disappear at runtime. Schema validation prevents malformed backend data from reaching screens. Keep schemas at integration boundaries, not on every internal object.                           |
| Authentication storage | `expo-secure-store` behind a `TokenStore` interface                                                                                                   | SecureStore uses Android Keystore-backed encrypted storage and iOS Keychain. Store tokens only; never passwords, profile caches, or irreplaceable data.                                                         |
| Real-time              | `socket.io-client` compatible with the website's Socket.IO 4.x service, wrapped by a lazy `RealtimeClient`                                            | The website uses Socket.IO 4.x. A wrapper avoids the legacy global singleton and makes connection/auth/reconnect behavior testable.                                                                             |
| UI styling             | React Native `StyleSheet` plus centralized color, typography, spacing, radius, and motion tokens                                                      | This is dependency-light and maps the approved Figma direction into documented, replaceable mobile tokens. Do not select a utility-CSS or component framework until mobile-specific designs are reviewed.       |
| Forms                  | Defer `react-hook-form` until the first validated form feature; use it with Zod if login/profile complexity warrants it                               | The foundation needs interfaces and placeholders, not a speculative forms dependency.                                                                                                                           |
| Unit/component tests   | Jest through `jest-expo`, React Native Testing Library, and Expo Router testing utilities                                                             | This is Expo's documented test path for React 19-era apps. Tests stay outside `app/`, because every file in `app/` is treated as a route.                                                                       |
| End-to-end tests       | Defer Maestro setup until the first real vertical slice                                                                                               | An empty shell does not justify E2E infrastructure. Add one smoke journey with the first production-like login/learning flow.                                                                                   |
| Lint/format            | Expo ESLint configuration, TypeScript-aware rules, Prettier, and CI enforcement                                                                       | Use CI as the source of truth. Avoid mandatory local Git hooks until the team confirms cross-platform compatibility.                                                                                            |
| Observability          | A small `Logger` interface with redaction; add Sentry or another provider only after account/privacy approval                                         | This prevents vendor coupling and accidental student-data logging while preserving an integration point.                                                                                                        |
| Global client state    | React context/reducer for session and narrow UI state; no Redux/Zustand initially                                                                     | TanStack Query owns server state. Add another state library only after a concrete cross-feature need appears.                                                                                                   |

Current official references:

- [Expo SDK compatibility](https://docs.expo.dev/versions/latest/)
- [Expo Router recommendation](https://docs.expo.dev/router/introduction/)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo unit testing](https://docs.expo.dev/develop/unit-testing/)
- [Expo Router testing](https://docs.expo.dev/router/reference/testing/)
- [Expo environment variables](https://docs.expo.dev/guides/environment-variables/)
- [Node.js release status](https://nodejs.org/en/about/previous-releases)
- [TanStack Query installation and React Native support](https://tanstack.com/query/latest/docs/framework/react/installation)

## 3. Proposed repository structure

```text
mobile/
├── app/                         # Expo Router route files only
│   ├── _layout.tsx              # Root providers, bootstrap gate, root error boundary
│   ├── +not-found.tsx           # Safe unknown-route fallback
│   ├── (public)/
│   │   ├── _layout.tsx          # Public stack
│   │   └── sign-in.tsx          # Foundation placeholder; feature team supplies form
│   └── (app)/
│       ├── _layout.tsx          # Auth guard and role authorization
│       ├── (tabs)/
│       │   ├── _layout.tsx      # Role-aware tab configuration
│       │   ├── index.tsx        # Home placeholder
│       │   ├── learn.tsx        # Learning placeholder
│       │   ├── play.tsx         # Play placeholder
│       │   └── profile.tsx      # Profile placeholder
│       └── mentor/
│           └── index.tsx        # Mentor-only placeholder and guard target
├── src/
│   ├── assets/
│   │   ├── brand/               # Approved logo, app icon, splash, mascots
│   │   ├── chess/               # Approved piece images and board assets
│   │   └── fonts/               # Only licensed, approved local fonts
│   ├── components/
│   │   ├── ui/                  # Button, Text, Screen, Spinner, ErrorState
│   │   └── feedback/            # Inline errors and connection/status banners
│   ├── config/
│   │   ├── env.ts               # Read and validate client-visible configuration
│   │   └── constants.ts         # Non-environment application constants
│   ├── design/
│   │   ├── tokens.ts            # Colors, typography, spacing, radii, motion
│   │   └── theme.ts             # Theme composition and accessibility defaults
│   ├── features/                # Feature-owned code; created only as features begin
│   │   ├── auth/
│   │   ├── lessons/
│   │   ├── puzzles/
│   │   ├── play/
│   │   ├── mentoring/
│   │   └── profile/
│   ├── providers/               # Session, QueryClient, theme, app lifecycle
│   ├── services/
│   │   ├── api/                 # ApiClient, request types, schemas, error mapping
│   │   ├── auth/                # AuthGateway interface and website adapter
│   │   ├── realtime/            # RealtimeClient interface and connection lifecycle
│   │   ├── storage/             # TokenStore and non-sensitive storage adapters
│   │   └── logging/             # Redacted logger and future observability adapter
│   ├── state/                   # Session reducer and narrowly shared client state
│   ├── types/                   # Cross-cutting domain primitives only
│   └── utils/                   # Pure, generic utilities with unit tests
├── test/
│   ├── fixtures/                # Sanitized API/socket fixtures
│   ├── mocks/                   # Fetch, SecureStore, lifecycle, and socket fakes
│   ├── render.tsx               # Shared provider-aware test renderer
│   └── setup.ts                 # Jest/RNTL setup
├── docs/
│   ├── architecture.md          # Decisions and dependency rules
│   ├── environments.md          # Local, preview, production setup
│   └── contributing.md          # Commands and PR expectations
├── .env.example                 # Names and non-secret examples only
├── app.config.ts                # Expo configuration and build variants
├── eas.json                     # Added only after Expo account/project approval
├── eslint.config.js
├── jest.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Directory rules

- `app/` composes routes and layouts. It must not contain API clients, data transformations, or substantial business logic.
- `features/<name>/` owns feature components, hooks, schemas, and tests. A feature may depend on `components`, `services`, `design`, and shared types; features should not import another feature's internal files.
- `services/` owns external boundaries. Screens never call `fetch`, SecureStore, or Socket.IO directly.
- `components/ui/` contains product-neutral primitives. A component used by only one feature remains inside that feature.
- `types/` is not a dumping ground. Keep API response types next to their schema/client.
- Tests are colocated with implementation when practical, except Router integration fixtures and global test utilities, which remain outside `app/`.

## 4. Navigation shell

### Session states

The root layout must model these states explicitly:

1. `bootstrapping` — read the stored token and validate it; show a branded but non-interactive loading surface.
2. `anonymous` — render the public stack.
3. `authenticated` — render the app shell using the server-validated role.
4. `expired` — clear stored credentials and return to sign-in with a session-expired message.
5. `error` — show retry and sign-out/reset actions without trapping the user on a blank screen.

### Route policy

- Public: sign in; password reset is a later feature route.
- Shared authenticated tabs: Home, Learn, Play, Profile.
- Student access: shared tabs and student learning/play routes.
- Mentor access: shared tabs plus mentor-only student/mentoring routes.
- Unknown or missing role: deny protected content, log a redacted contract error, and offer sign-out.
- Every protected route enforces authorization in its nearest layout. Hiding a tab is not authorization.
- The back stack must never expose authenticated screens after logout.

### Foundation deliverable

Each route renders a simple accessible placeholder containing the route name and session/role status. No product data, finalized copy, chessboard, lesson cards, or production login form belongs in the navigation-shell PR.

## 5. API and authentication architecture

### HTTP boundary

`ApiClient` should provide:

- one validated base URL;
- JSON request/response handling;
- bearer-token injection through an asynchronous token provider;
- an explicit timeout and abort signal;
- normalized `AppError` values;
- safe handling of empty/non-JSON responses;
- retry only for explicitly idempotent operations;
- runtime schema validation at external boundaries;
- no logging of passwords, tokens, full response bodies, emails, or student identifiers.

Feature API modules, such as `lessonsApi`, use `ApiClient`; route components use feature hooks; only hooks coordinate TanStack Query keys and cache invalidation.

### Authentication contract

Define an `AuthGateway` interface before writing a login screen:

```text
login(credentials) -> session tokens or typed error
validate(accessToken) -> authenticated user or invalid/expired
logout() -> local cleanup and optional server revocation
refresh(refreshToken) -> new tokens, if the backend supports it
```

Production mobile authentication is blocked until Y STEM approves a reviewed request-body login contract, password-handling policy, and migration plan. Detailed backend security findings are tracked privately with the website owner and are intentionally not reproduced in this public repository.

The existing bearer-validation behavior may provide a compatibility anchor after backend review. Treat decoded JWT claims as display hints only; server validation is authoritative.

### Token storage and lifecycle

- Store access and refresh tokens, if any, through `TokenStore` backed by SecureStore.
- Never store the password.
- Keep the current user in memory and reconstruct it through validation/bootstrap.
- Clear token storage and TanStack Query caches on logout or unrecoverable authentication failure.
- A `401` triggers one controlled refresh attempt if refresh exists, otherwise session expiry. A `403` remains an authorization error and does not automatically destroy the session.
- Prevent concurrent refresh storms with a single in-flight refresh operation.
- Document iOS Keychain persistence across reinstall and provide an explicit local reset path for testers.

### Website data ownership

The mobile app must use the website middleware and database as the system of record:

- users, roles, mentorship, and lesson progress: `YSTEM-Website/middlewareNode/src/models/users.js:8-67`;
- lessons and completion: `YSTEM-Website/middlewareNode/src/routes/lessons.js:78-292`;
- puzzles: `YSTEM-Website/middlewareNode/src/routes/puzzles.js:25-63` and `YSTEM-Website/middlewareNode/src/models/puzzles.js:4-56`;
- time tracking, activities, badges, streaks, and meetings: registered in `YSTEM-Website/middlewareNode/src/server.js:49-61`;
- real-time chess and collaborative puzzle behavior: `YSTEM-Website/chessServer/src/managers/EventHandlers.js:10-175`;
- engine evaluation: `YSTEM-Website/stockfishServer/`.

The mobile application must never connect directly to MongoDB or contain server secrets.

## 6. Environment and configuration architecture

### Client-visible variables

Proposed names:

```text
EXPO_PUBLIC_APP_ENV=development|preview|production
EXPO_PUBLIC_API_BASE_URL=https://...
EXPO_PUBLIC_CHESS_SOCKET_URL=wss://...  # add with PR F8
```

The smallest scaffold needs only `EXPO_PUBLIC_APP_ENV` and `EXPO_PUBLIC_API_BASE_URL`; add the chess socket URL with PR F8. Add Stockfish, analytics, or crash-reporting variables only in the feature/integration PR that actually needs them and after account/privacy approval.

All `EXPO_PUBLIC_*` values are public because Expo inlines them into the app bundle. They may contain endpoint locations and public identifiers, never secrets. Validate URL scheme, required presence, and allowed environment names in `src/config/env.ts`; fail at startup/build with a useful configuration error.

### Server/build-only values

All backend credentials and secrets stay server-side. App-store credentials and source-map upload tokens belong in approved EAS/CI secret storage, not `.env.example` or client code.

Use local `.env.local` files for contributor-specific values and keep them ignored. If Y STEM approves EAS, define matching development, preview, and production environments and map each build profile explicitly. Do not overload `NODE_ENV` to select deployment targets.

## 7. Real-time architecture

The foundation should define a lazy `RealtimeClient` with `connect`, `disconnect`, `subscribe`, `unsubscribe`, `emit`, and observable connection state. It should:

- connect only after a validated session exists;
- authenticate during the Socket.IO handshake, not with a later client-asserted username/role event;
- disconnect and remove listeners on logout;
- own backoff, timeout, reconnect, and app-background behavior;
- expose typed feature-specific events through adapters rather than string literals in screens;
- distinguish `connecting`, `connected`, `reconnecting`, `offline`, `unauthorized`, and `failed` states;
- never accept client-supplied FEN as authoritative without server validation.

This requires coordinated website work. Before mobile chess development begins, the maintained chess service must provide an authenticated handshake, server-authoritative identity, and a documented room protocol. Detailed legacy security findings remain in the private backend review.

## 8. Error handling and logging

Use a single normalized error model:

```text
AppError = configuration | network | timeout | unauthorized | forbidden |
           validation | notFound | conflict | server | unavailable | unknown
```

Each error carries a stable internal code, a safe user message key, an optional HTTP status, and a redacted cause for development logs. Do not surface raw backend messages by default.

- Root render boundary: recoverable fallback with restart/sign-out actions.
- Route-level errors: feature retry and navigation escape.
- API errors: normalized before reaching hooks.
- Query retries: limited to safe transient failures; never retry login or state-changing calls automatically.
- Socket errors: reflected in a connection banner/state, not ad hoc modals from arbitrary screens.
- Logs: no credentials, tokens, emails, chat bodies, full JWTs, or student/mentor identifiers. Production remote logging waits for nonprofit privacy approval.

## 9. Testing and quality gates

### Foundation tests

- environment validation accepts each supported profile and rejects missing/invalid URLs;
- `ApiClient` adds a bearer token, parses success responses, aborts on timeout, and normalizes 401/403/500/network errors;
- `TokenStore` writes, reads, and clears through a mocked SecureStore adapter;
- session reducer covers bootstrap, authentication, expiry, logout, unknown role, and failure;
- Router tests prove anonymous/authenticated redirects and mentor-route denial for students;
- query provider uses deterministic test defaults and no uncontrolled retries;
- real-time client does not connect before authentication and cleans listeners on disconnect/logout;
- root and route error fallbacks remain navigable and accessible.

### Required CI jobs

```text
npm ci
npm run lint
npm run typecheck
npm test -- --runInBand
```

Add a build/config validation job after EAS ownership is confirmed. Do not require a global coverage percentage in the first scaffold; instead require tests for every changed branch in session, configuration, API, storage, and navigation code. Establish a numeric threshold after the first vertical slice provides a meaningful baseline.

### Pull-request standard

- one concern per PR;
- no unrelated dependency additions;
- commands and screenshots/test evidence in the PR description;
- architecture-decision note for a new cross-cutting dependency;
- at least one reviewer other than the author;
- CI green before merge;
- no production credentials or personal student data in fixtures.

## 10. External dependencies and readiness

| Dependency              | Current evidence                                                                                    | Required before implementation                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Middleware API          | Runs separately, normally on port 8000; owns auth/database (`YSTEM-Website/README.md:85-100`)       | Staging HTTPS URL, API owner, versioning policy, CORS/mobile policy, OpenAPI or agreed fixtures, and uptime expectations.                                              |
| Test accounts           | Non-production mentor/student accounts exist in legacy documentation                                | Confirm or rotate them, document roles/expected data, and distribute credentials only through a private onboarding channel.                                           |
| Chess server            | Port 3001 and current Socket.IO service (`YSTEM-Website/README.md:118-128`)                         | WSS staging URL, authenticated handshake, event contract, room lifecycle, server-authoritative move rules, and reconnect behavior.                                     |
| Stockfish server        | Port 8080 (`YSTEM-Website/README.md:130-140`)                                                       | Confirm first-semester need, public/staging WSS URL, rate limits, session protocol, and resource capacity.                                                             |
| MongoDB                 | Middleware connects to MongoDB (`YSTEM-Website/middlewareNode/src/server.js:27-34`)                 | No mobile access. Backend team supplies seeded staging data, backup/reset policy, and non-sensitive fixtures.                                                          |
| Figma/design system     | The approved [Y STEM and Chess Figma file](https://www.figma.com/design/gl5WU4uDZ6X85VYUiK780L/Y-STEM-and-Chess--Copy-?node-id=114-4404&p=f) is available and primarily website-oriented | Confirm mobile-specific flows, typography, responsive behavior, accessibility states, and asset-export ownership before high-fidelity feature work. |
| Brand/assets            | Legacy images exist under `YSC-Mobile-Application/assets/`; MIT notices exist in `LICENSE` and `LICENSE-chessboard` | Nonprofit approval of current brand, source resolution, ownership, attribution, app-icon/splash requirements, and replacement list.                                    |
| Expo/EAS                | No approved new project/account configuration is present                                            | Account owner, organization/project, build budget, device registration, environment owners, and update/release policy.                                                 |
| Apple/Google            | Not represented in the audited repository                                                           | Organization accounts, legal entity, bundle/application IDs, signing roles, privacy disclosures, and supported-device policy.                                          |
| Observability/analytics | Website has analytics and a hard-coded Agora app ID in frontend config                              | Confirm provider, privacy/consent rules, data retention, DSN/project ownership, and whether student-level identifiers may be collected.                                |

## 11. Small, independently reviewable foundation PRs

The PR order is intentional. Each PR should merge before the next one unless the repository owner explicitly approves parallel work on non-overlapping files.

### PR F0 — decision records and repository policy

**Contents:** copy the approved plan/matrix/questions into the new repository; add contribution rules, supported platforms, branch/PR policy, and a record that the TritonSE repository remains external legacy reference.

**Acceptance:** no application scaffold or dependencies; nonprofit has named owners for open blocking decisions.

### PR F1 — Expo TypeScript scaffold

**Contents:** initialize the approved stable Expo Router template, pin Node/npm, commit the lockfile, set bundle identifiers to approved placeholders, and retain only the minimal starter route.

**Acceptance:** development build starts on one iOS and one Android target; README lists exact commands; no product feature code.

### PR F2 — code quality and CI

**Contents:** strict TypeScript, ESLint, Prettier, Jest/RNTL, test setup, and GitHub Actions for install/lint/typecheck/test.

**Acceptance:** one trivial component test and one utility test prove the harness; clean clone passes CI.

### PR F3 — environment and build profiles

**Contents:** `.env.example`, typed validation, development/preview/production model, configuration documentation, and EAS profiles only if account ownership is approved.

**Acceptance:** invalid or missing configuration fails clearly; no secret value is committed; each approved environment resolves the intended endpoints.

### PR F4 — design tokens and UI primitives

**Contents:** tokens plus `Screen`, text variants, button, spinner, inline error, and connection banner. Use the approved Figma file and current website as directional references while keeping mobile-specific values documented and replaceable.

**Acceptance:** light/dark behavior is either intentionally supported or explicitly excluded; primitives meet basic text scaling, contrast, touch-target, and screen-reader requirements.

### PR F5 — navigation and provider shell

**Contents:** public/authenticated route groups, role-aware tabs, bootstrap state, placeholder routes, QueryClient provider, and navigation tests.

**Acceptance:** mocked anonymous/student/mentor sessions reach only permitted placeholders; logout replacement removes protected routes from history.

### PR F6 — HTTP, schemas, errors, and logging

**Contents:** `ApiClient`, Zod boundary helpers, `AppError`, timeout/cancellation, redacted logger, test fixtures, and full unit tests. No feature endpoint modules beyond a health/fixture adapter.

**Acceptance:** all error classes and auth-header paths are tested; no screen calls `fetch` directly.

### PR F7 — secure session foundation

**Contents:** `TokenStore`, session reducer/provider, mock `AuthGateway`, bootstrap/expiry/logout flows, and tests. Add the real website adapter only if the reviewed auth contract is ready.

**Acceptance:** tokens never enter ordinary storage or logs; cold-start, invalid-token, and logout paths are tested; production login remains disabled if the backend contract is unresolved.

### PR F8 — real-time connection foundation

**Contents:** lazy `RealtimeClient`, authenticated-handshake interface, connection-state model, lifecycle cleanup, and fake-socket tests. No room, chess, puzzle, or chat events.

**Acceptance:** no module-level connection is created on import; no connection occurs without a validated session; cleanup and unauthorized states are tested.

### PR F9 — approved legacy assets

**Contents:** only assets approved in the migration matrix, optimized for mobile, with attribution and an inventory documenting source and owner.

**Acceptance:** no unused bulk asset copy; app icon/splash render on both platforms; licensing/brand approval is recorded.

### Foundation exit review

After F0-F9, hold a short architecture review. Feature development may begin when F1-F7 are complete; F8 is additionally required before any chess/mentoring feature, and F9 is required before visual-fidelity work.

The first feature PR should be a narrow vertical slice chosen by the nonprofit: preferably read-only lesson or puzzle retrieval, followed by progress persistence. Chess networking should not be the first feature unless the authenticated socket and server-authority questions are already resolved.

## 12. Assumptions

1. The new mobile repository will be the only active mobile codebase; the TritonSE repository remains read-only reference.
2. iOS and Android are required; web is not an initial product target even though Expo Router can support it.
3. The website middleware, chess server, Stockfish server, and MongoDB remain separately deployed services owned by Y STEM.
4. Mobile uses the same user identities, roles, lesson content, puzzle data, and progress records as the website.
5. The nonprofit will provide a non-production environment and test users before live API work.
6. The student team can use EAS development builds or has an approved alternative for signing and distributing internal builds.
7. The first semester will deliver one learning vertical slice and one chess experience, not feature parity with the website and legacy app.
8. No student personal data is permitted in local fixtures, screenshots, analytics, or logs.
9. Legacy assets are candidates, not automatically approved brand assets.
10. Backend changes needed for mobile security and contract consistency may be scheduled in the website repository by its owner.

Unresolved assumptions and required decisions remain listed in the relevant sections of this plan. Migration treatment is defined in `TRITONSE_MIGRATION_MATRIX.md`.

## 13. Evidence base

- Legacy versions and dependencies: `YSC-Mobile-Application/package.json:16-61`; `YSC-Mobile-Application/backend/package.json:1-38`.
- Legacy environment configuration: `YSC-Mobile-Application/app.config.js:5-35`.
- Legacy authentication behavior: reviewed privately with the website owner.
- Legacy global socket: `YSC-Mobile-Application/src/contexts/SocketContext.tsx:1-14`.
- Legacy navigation and roles: `YSC-Mobile-Application/src/components/Navigator.tsx:45-150`.
- Legacy role actions and matchmaking: `YSC-Mobile-Application/src/screens/HomeScreen.tsx:15-49`; `YSC-Mobile-Application/src/screens/SelectionScreen.tsx:45-110,205-230`.
- Legacy chess/chat behavior: `YSC-Mobile-Application/src/screens/ChessScreen.tsx:25-128,169-207`; `YSC-Mobile-Application/src/components/chess/Board.tsx:68-120`.
- Legacy lessons: `YSC-Mobile-Application/src/components/chess/LessonBoard.tsx:69-130`; `YSC-Mobile-Application/src/const/lessons.ts:1-52`.
- Legacy server behavior and persistence: reviewed privately with the website owner.
- Website service map: `YSTEM-Website/middlewareNode/src/server.js:27-66`.
- Website authentication and session behavior: reviewed privately with the website owner.
- Website users/progress: `YSTEM-Website/middlewareNode/src/models/users.js:8-67`; `YSTEM-Website/middlewareNode/src/routes/lessons.js:78-292`.
- Website puzzle model: `YSTEM-Website/middlewareNode/src/models/puzzles.js:4-56`.
- Website local service topology: `YSTEM-Website/README.md`.
- Website environment and secret-handling requirements: reviewed privately with the website owner.
