# MAL Onboarding App

A React Native mobile application for KYC (Know Your Customer) onboarding with a mocked backend, built with TypeScript, Zustand state management, and React Navigation.

## 📱 About the App

The MAL Onboarding App is a comprehensive user onboarding solution that guides users through:

- **Authentication**: Email/password-based login with session management
- **User Profile Management**: Display authenticated user information
- **KYC Onboarding Flow**: Multi-step form for collecting user documents and information
- **Theme Support**: Light and dark mode support with persistent theme preferences
- **Internationalization**: English and Arabic language support

### Key Features

- ✅ Mocked backend with simulated API calls and realistic error handling
- ✅ Session management with token refresh logic
- ✅ Multi-step onboarding wizard with progress tracking
- ✅ Type-safe codebase with full TypeScript support
- ✅ Clean, modular component architecture (molecules, organisms, screens)
- ✅ Form validation and error handling on all steps
- ✅ Accessible UI with semantic components

## 🛠️ Tech Stack

- **React Native** — Cross-platform mobile framework
- **Expo** — Managed React Native development platform
- **React Navigation** — Navigation library for native and web apps
- **TypeScript** — Static type checking
- **Zustand** — Lightweight state management
- **react-i18next** — Internationalization support
- **React Native Safe Area Context** — Safe area support for notched devices

## 📋 System Requirements

- **Node.js** (v18+)
- **pnpm** (v9+)
- **iOS**: Xcode (for iOS development)
- **Android**: Android Studio and Android SDK (for Android development)

## 🚀 Getting Started

### Installation

1. **Clone the repository or navigate to the project directory**

2. **Install dependencies using pnpm**

   ```bash
   pnpm install
   ```

### Running the App

#### **Start Development Server**

```bash
pnpm start
```

This launches the Expo development server. You'll see a QR code and options to run on iOS, Android, or web.

#### **Run on iOS Simulator**

```bash
pnpm ios
```

Requires Xcode and iOS simulator to be set up.

#### **Run on Android Emulator**

```bash
pnpm android
```

Requires Android Studio and Android emulator to be configured.

#### **Run on Web (Browser)**

```bash
pnpm web
```

Launches the app in your default web browser.

### Clean Installation (if needed)

If you encounter dependency issues, perform a hard clean:

```bash
pnpm clean:hard
pnpm install
pnpm start
```

## 📂 Project Structure

```
mal-onboarding-app/
├── molecules/
│   └── reusable/              # Reusable UI components
│       ├── LanguageSwitcher/
│       ├── ProgressBar/
│       ├── ScreenWrapper/
│       ├── ThemeText/
│       └── ThemeToggle/
├── organisms/                 # Feature-specific UI views
│   ├── AddressView/
│   ├── DocumentView/
│   ├── HomeView/
│   ├── LoginView/
│   ├── ProfileView/
│   ├── ReviewView/
│   ├── SelfieView/
│   └── SettingsView/
├── screens/                   # Screen containers with navigation
│   ├── HomeScreen/
│   ├── LoginScreen/
│   ├── OnboardingKycStack/
│   └── SettingsScreen/
├── stores/                    # Zustand state management
│   ├── useAuthStore.ts
│   ├── useI18nStore.ts
│   ├── useMockBackendStore.ts
│   ├── useOnboardingStore.ts
│   └── useThemeStore.ts
├── packages/
│   ├── i18n/                  # Internationalization
│   │   ├── i18n.ts
│   │   └── translations/
│   │       ├── en.json
│   │       └── ar.json
│   └── theme/                 # Theme tokens
│       └── tokens.ts
├── App.tsx                    # Root app component & navigation
├── app.json                   # Expo app configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔄 Workflow

### Development Flow

1. Start the Expo development server
2. Scan the QR code with Expo Go app (iOS/Android) or use an emulator
3. Changes auto-refresh as you edit files
4. Use browser DevTools or Flipper for debugging

### Login Credentials (Demo)

The app uses a mocked backend. Try logging in with:

- **Email**: any valid email format (e.g., `demo@example.com`)
- **Password**: any password (mocked validation is minimal for demo purposes)

### Onboarding Flow

After login, you can:

1. **Start Onboarding** from the Home screen
2. Complete each step sequentially:
   - Profile information
   - Document upload
   - Selfie capture
   - Address details
   - Final review and submission

## 🗂️ Architecture

### Component Layers

- **Molecules**: Small, reusable UI components (buttons, inputs, wrappers)
- **Organisms**: Feature-specific views combining molecules (no navigation or API calls)
- **Screens**: Container components managing navigation, state, and API integration
- **Stores**: Zustand stores for global state management

### State Management

- `useAuthStore` — Authentication state and login/logout logic
- `useThemeStore` — Theme (light/dark) management
- `useI18nStore` — Language selection
- `useOnboardingStore` — Onboarding draft and step tracking
- `useMockBackendStore` — Simulated API endpoints

## 📝 Development Notes

- All code is written in **TypeScript** with strict type checking
- Use **functional components** exclusively
- Keep UI logic close to components; move business logic to helpers
- Refer to `COPILOT_INSTRUCTIONS.md` for detailed architecture guidelines

## 🤝 Contributing

Follow the project structure and coding standards defined in `COPILOT_INSTRUCTIONS.md`:

- Use the provided Zustand import pattern for store creation
- Create screens with corresponding organism views
- Add translations for new strings in `en.json` and `ar.json`
- Keep helper functions small and co-locate with components

## 📄 License

This is a private project for MAL onboarding implementation.

---

**For more details**, refer to `COPILOT_INSTRUCTIONS.md` in the project root.
