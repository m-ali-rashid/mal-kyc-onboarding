```markdown
You are helping me build a React Native app using React Navigation, TypeScript, Zustand, and mocked APIs.

Generate clean, minimal, production‑ready code using the following architecture and folder structure.

You are helping me build a React Native app using React Navigation, TypeScript, Zustand, and mocked APIs.

Produce clean, minimal, production-ready code following these architecture rules and folder conventions.

========================================================
ARCHITECTURE RULES (COMPLETE)
========================================================

Top-level guidelines:
- Use TypeScript everywhere.
- Functional components only; no classes.
- Keep UI components simple, local-state-only, and testable.
- Small pure helpers and types belong next to the views.

Folder layout for UI features:

molecules/
  reusable/
    ScreenWrapper/
      ScreenWrapper.tsx        → small reusable layout wrapper (no navigation, no API)
      screenWrapperHelper.ts   → small helpers + types
      index.ts                 → re-export
    ProgressBar/
      ProgressBar.tsx          → simple progress UI
      progressBarHelper.ts     → helpers + types
      index.ts                 → re-export

organisms/
  FeatureNameView/
    FeatureNameView.ts        → UI only (no navigation, no API calls)
    featureNameViewHelper.ts  → helper functions + TypeScript types
    index.ts                  → re-export

screens/
  FeatureNameScreen/
    FeatureNameScreen.tsx     → screen-level container
                               → imports `FeatureNameView` from `organisms`
                               → handles navigation + store calls + API triggers
                               → passes callbacks down to the view
    index.ts                  → re-export

Rules (clarified):
- `molecules`: minimal, reusable presentational components and tiny layout wrappers.
- `organisms`: composed UI for a feature — pure UI and helpers only (no navigation).
- `screens`: navigation containers, orchestrating store calls, API calls, and passing handlers to `organisms`.
- Each screen must have an `index.ts` that re-exports the default for consistent imports.

Zustand import pattern (always use this robust pattern):

```ts
import * as zustand from 'zustand'

const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw

// export const useAuthStore = create<AuthState>((set) => ({ ... }))
```

Mocked API layer:
- Provide simple, well-typed mock functions for auth and feature APIs (e.g. `apiLogin`, `apiRegister`, `apiMe`, `apiSubmitDraft`). Keep them in an `/api` folder and small enough to replace with real implementations later.

Internationalization:
- Add flat translation JSONs under `/packages/i18n/translations/en.json` and `/packages/i18n/translations/ar.json` with the provided keys for auth/home flows. Use `useTranslation()` where needed.

Navigation behavior:
- Use React Navigation (native stack) and standard methods: `navigate`, `replace`, `goBack`.

Error handling & loading states:
- Screens (containers) must handle loading and error states from stores and pass them to the `organisms` for display.

Output requirements (when generating a feature):
1. Create files following the architecture exactly (molecules/reusable, organisms, screens with index).
2. Register newly-created screens in the app's navigator (defined in `App.tsx` or a navigator file).
3. Add or update Zustand stores only when required; follow the robust import pattern above.
4. Implement mocked APIs when needed in `/api`.
5. Keep code minimal, typed, and readable.
6. Include loading and error handling for async flows.

Special instructions for this workspace / current phase:
- The app should render the `Login` screen as the entrypoint during development.
- Do NOT create a `Register` screen for now — skip creating it unless requested.
- Any other new screen you create must follow the same architecture: `organisms/FeatureNameView` + `screens/FeatureNameScreen/index.ts` + `screens/FeatureNameScreen/FeatureNameScreen.tsx`.

Phase 2 (Onboarding / KYC):
- When implemented later, follow the same rules: onboarding views under `organisms`, screens under `screens/OnboardingKycStack`, and a `stores/useOnboardingStore.ts` for step management.
- Use same architecture flow as Login and Home screens. Logic inside the helper, UI inside the View, and Screen only calls the View 
End of instructions. Begin implementing features using these conventions.

- Demo / test:
  - On `Home` press `Start Onboarding` to begin; complete steps and press `Submit` on the review screen to simulate upload and return to `Home`.

Phases
======

Phase 1 — Mocked backend in Zustand (current)
----------------------------------------------
- Implement a mocked backend using a dedicated Zustand store (e.g. `useMockBackendStore`) that exposes async functions mirroring real API contracts.
- Keep the mocked backend in `stores/` or `api/` (small helpers + typed interfaces). The mocked backend should:
  - Use Promises with configurable delays to simulate network latency.
  - Return realistic success payloads and realistic error objects (401/400/500-like). Use a small helper to create Error-like responses.
  - Maintain in-memory state for `users`, `sessions`, and `onboardingDrafts` so flows like refresh/retry can be simulated.
  - Expose functions: `apiLogin(email, password)`, `apiRefresh(refreshToken)`, `apiMe(accessToken)`, `apiSubmit(accessToken, draft)`.

Data models (suggested)
-----------------------
You may adjust names/shape, but keep the intent. Provide TypeScript interfaces mirroring these JSON examples.

User
JSON
{
  "id": "USR-001",
  "email": "jane.doe@example.com",
  "fullName": "Jane Doe"
}

Session
JSON
{
  "accessToken": "access_abc",
  "refreshToken": "refresh_def",
  "expiresAt": "2026-01-16T10:30:00.000Z"
}

Onboarding Draft
JSON
{
  "profile": {
    "fullName": "Jane Doe",
    "dateOfBirth": "1990-05-15",
    "nationality": "US"
  },
  "document": {
    "documentType": "PASSPORT",
    "documentNumber": "P12345678"
  },
  "selfie": {
    "hasSelfie": false
  },
  "address": {
    "addressLine1": "123 Main St",
    "city": "Springfield",
    "country": "US"
  },
  "consents": {
    "termsAccepted": false
  }
}

Submission Result
JSON
{
  "submissionId": "SUB-123",
  "status": "RECEIVED" | "FAILED"
}

Mocked API Contracts
--------------------
There is no real backend. Simulate network calls (Promises + delays) and realistic failures. Keep logic small and replaceable with real API clients later.

1) Login — `apiLogin(email, password)`
   - Success: return `{ user, session }` where `user` matches the User model and `session` matches Session.
   - Failures:
     - Invalid credentials → reject with a 401-like error (should be typed so stores can react and show messages).
     - Random transient failure → optional 500-like error (useful for retry UI tests).

   Success payload example:
   {
     "user": { "id": "USR-001", "fullName": "Jane Doe", "email": "jane.doe@example.com" },
     "session": { "accessToken": "access_abc", "expiresAt": "2026-01-16T10:30:00.000Z", "refreshToken": "refresh_def" }
   }

2) Refresh Session — `apiRefresh(refreshToken)`
   - Success: returns a new `Session` object with a later `expiresAt`.
   - Failure: invalid refresh token → reject with 401-like error. When stores receive this, they must clear session and require login.

3) Get Current User — `apiMe(accessToken)`
   - If access token is expired (based on `expiresAt`) → reject with 401-like error.
   - Otherwise return the `User`.

4) Submit Onboarding — `apiSubmit(accessToken, draft)`
   - Server-side validation simulated: if required fields missing → reject with 400-like error and include field hints.
   - If access token expired → reject with 401-like error. Store-level behavior: attempt a single refresh via `apiRefresh` and retry the submit once.
   - Optionally simulate 500-like errors to exercise retry UI.

Implementation guidance
-----------------------
- Use the Zust and import pattern already documented above for any stores you add to the workspace.
- Prefer a single small `useMockBackendStore` for server state and helpers; keep UI stores (auth, onboardingDraft) separate and call into the mock backend functions.
- Keep APIs typed with interfaces and small helper types (e.g., `ApiError`, `ValidationErrorDetails`).
- Add small helper `simulateDelay(ms)` and `maybeFail(probability)` utilities to centralize network simulation.

UX rules enforced by mocked backend
-----------------------------------
- Token expiry: sessions include `expiresAt` and `apiMe` / `apiSubmit` must check it.
- Refresh flow: when a 401 is returned due to expiry, the consuming store should call `apiRefresh(refreshToken)` once; if refresh succeeds, retry the original call once; if refresh fails, force logout.
- Validation errors should include which fields failed so the UI can display per-field hints.

Phase 2 — Auth UI & Onboarding (next)
------------------------------------
- DO NOT create a `Register` screen; registration is out of scope for this assignment.
- Keep only `Login` and `Home` screens for Phase 2 and remove any `Register` references.

- Login screen requirements:
  - Fields: Email + Password with simple client-side validation (required fields, basic email format check).
  - Calls the mocked backend `apiLogin(email, password)` and handles loading/error states.
  - On success navigate to the `Home` screen; on invalid credentials show a clear error message.
  - Unauthorized users must only be able to access the `Login` screen.

- Home screen requirements:
  - Fetch the current user via `apiMe(accessToken)` and display the user's `fullName` and onboarding status (e.g. `Not started`, `In progress`, `Submitted`).
  - Provide an entry point to start or resume onboarding; this will link into Phase 2 onboarding screens.
  - Only authorized users can access `Home` and other protected screens (use route guard logic).

- Session expiry & route guard:
  - If a protected API call returns 401 due to token expiry, clear session and redirect the user to `Login` with a clear "session expired" message.
  - The app should implement a navigator-level guard (or root stack) so protected screens are not reachable without a valid session.

- Navigation & UI rules:
  - Do not show the screen header in the navigation stack (`headerShown: false`).
  - Create a reusable `ScreenWrapper` component under `molecules/reusable/ScreenWrapper` that applies safe-area insets (top notch) and consistent padding; use it across all screens.

- Stores & architecture notes:
  - Keep `auth` and `onboarding` stores separate. `auth` store handles login, logout, session refresh, and exposes `getCurrentUser` flows that call the mocked backend.
  - The mocked backend (Phase 1) should remain the source of truth for simulated server behavior; Phase 2 UI will call into those mocks.

- Developer UX:
  - During development the app entrypoint should remain the `Login` screen.
  - Show loading indicators and per-field validation hints where applicable.

Phase 2 implementation will begin only after Phase 1 (mocked backend + stores) is complete and you've reviewed the code.

Phase Three
-----------
OnboardingKyc Stack Screens
--------------------------
- Step 1: Profile — collect `fullName`, `dateOfBirth`, `nationality`. DateofBirth should be a datePicker and not a TextInput field.
- Step 2: Document — select `documentType` + enter `documentNumber`. Implement proper file picker module here. User should be able to select File from the gallery and show preview here. Restrict to jpg, png, pdf. save uploaded document name
- Step 3: Selfie — placeholder capture flow (no real camera integration required for now).
- Step 4: Address — `addressLine1`, `city`, `country`.
- Step 5: Review & Submit — show final draft and a `Submit` button. trigger apiSubmit call on submitting final draft
- Show a `ProgressBar` at the top indicating step progress across the stack.
- All fields are mandatory. So disable next button on each step unless all fields are entered

Phase 3 implementation will begin only after Phase 2 is complete and tested. And the app is running successfully.

Phase Four
-----------
- Create a `Settings` screen with a Theme toggle (light/dark).
- Implement theme tokenization (design tokens for colors, spacing) to support light and dark modes.
- Use Zustand for theme state management (do not add React Context for theme).

Flow notes
----------
- Once Phase 2 is done, you'll review and run the app; then we'll proceed to Phase 3 on your confirmation.
- Once Phase 3 is done, you'll review and run the app; then we'll proceed to Phase 4 on your confirmation.
- Once each Phase is done, await confirmation before moving to the next Phase
- Do not create a `Register` screen — it's explicitly out of scope for these phases.

End of Phases

Phase Five
-----------
to be handled in Phase 5 of development

- Session persistence & restore on app start (AsyncStorage) and redirect to Home if valid.
- Single refresh-and-retry wrapper for protected API calls (retry exactly once after successful refresh).
- Clear session + `navigate.replace('Login', { reason: 'session_expired' })` and show a localized session-expired message.
- Navigator-level guard that conditionally renders Auth vs App stacks (prevent protected screens without session).
- Ensure `apiMe` is called on Home mount with loading/error UI and retry behavior on 401 via the auth store.
- Per-field validation details for Login (email regex, password min length) and localized validation messages.
- Add onboarding status mapping (Not started / In progress / Submitted) from mock backend state and display on Home.
- Translations: add keys for validation, errors, session-expired, onboarding status in `en.json` + `ar.json`.
- Persist/clear tokens on login/logout; ensure logout replaces nav stack (no back).
- `ApiError` typing (status/code/details) and validation-error payload shape for form hints.
- Accessibility/testIDs on Login fields/buttons and LanguageSwitcher for automated tests.
- Optional but recommended: unit tests for login/home helpers (useOnboardingController/useLoginController).


