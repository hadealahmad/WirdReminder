# مُذكِّر الوِرد اليومي - Wird Reminder

[![itqan: ناقش](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMCI+PGcgZmlsbD0iI2ZmZiI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTBiOTgxIi8+PHJlY3QgeD0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjIwIiB5PSIxNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPml0cWFuPC90ZXh0Pjx0ZXh0IHg9IjYwIiB5PSIxNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2Y4ZmFmYyI+2YbYp9mC2LQ8L3RleHQ+PC9nPjwvc3ZnPg==)](https://community.itqan.dev/d/180)

A humble companion for your journey with the Holy Quran. **Wird Reminder** is a cross-platform application (Chrome, Firefox, PWA, and Android) designed to help you maintain a consistent daily or weekly Quran reading habit through gentle reminders and a beautiful reading experience.

---

## 🌟 What is Wird Reminder?

In our busy lives, consistency can be a challenge. This project was born out of a simple need: a tool that stays out of the way but reminds us of our most important daily goal—connecting with the Words of Allah.

We've tried to make it as simple, privacy-focused, and beautiful as possible. It is completely free, open-source, and contains no advertisements.

## ✨ Key Features

- **Cross-Platform**: Available as a Browser Extension (Chrome/Firefox), a Progressive Web App (PWA), and a Native Android App.
- **Personalized Reminders**: Set goals for specific Surahs, Ayah ranges, or an entire Juz.
- **Smart Scheduling**: Choose between daily reminders or weekly sessions (like Surah Al-Kahf on Fridays).
- **Beautiful Reader**: A focused, Mushaf-style reading view using the traditional Uthmani script.
- **Progress Tracking**: A simple calendar view to visualize your consistency and history.
- **Smart Bookmarking**: Remembers exactly where you left off in each wird across your sessions.
- **Privacy-First**: All your data—reminders, bookmarks, and history—stays strictly on your local machine.
- **Offline Capable**: Works without an internet connection once the Quran text is cached.

---

## 🏗️ Multi-Platform Architecture

This project uses a **"Write Once, Sync Everywhere"** architecture to maintain a unified codebase across all platforms.

### 1. The Core (`/core`)
The **Single Source of Truth**. All business logic, CSS design systems, Quranic data, and UI components live here.
- **`/core/js/adapter`**: Unified abstractions for Storage, Notifications, and Environment detection.
- **`/core/js/logic`**: Core reminder and history management.
- **`/core/js/renderer`**: The Mushaf-style rendering engine.

### 2. The Wrappers
- **`/chrome` & `/firefox`**: Extension shells using Manifest V3/V2.
- **`/www`**: The web host for the PWA and Capacitor.
- **`/android`**: The native Android wrapper powered by Capacitor.

---

## 🚀 Development Workflow

To ensure changes are propagated correctly across all platforms, follow this workflow:

### 1. Setup
```bash
git clone https://github.com/hadealahmad/WirdReminder.git
npm install
```

### 2. Modifying Code
**NEVER** edit files inside `chrome/src/core`, `firefox/src/core`, or `www/core` directly. These are generated copies. Always edit the files in the root **`/core`** directory.

### 3. Synchronizing Changes
After making changes to the core or assets, run:
```bash
npm run sync
```
This script propagates your core changes to all platform-specific source directories.

### 4. Building Artifacts
To generate production-ready packages for all platforms:
```bash
npm run build
```
This will create a `/build` directory containing:
- Chrome & Firefox Extension Zips
- Android APK (Debug)
- Android AAB (Release)

---

## 🧪 Testing Guidelines

### Extension Testing
1. Run `npm run sync`.
2. **Chrome**: Load `chrome/` (unpacked) via `chrome://extensions`.
3. **Firefox**: Load `firefox/manifest.json` via `about:debugging`.

### Web/PWA Testing
1. Run `npm run sync`.
2. Serve the `www/` directory using any local server (e.g., `npx serve www`).

### Android Testing
1. Ensure `ANDROID_HOME` is set.
2. Run:
```bash
npm run android:refresh
```
This will sync the latest web code into the Android project and launch it on your connected device/emulator.

---

## 🛠️ Updating Guidelines

### 1. Versioning
We use `scripts/version-sync.js`. To update the project version:
1. Update `"version"` in the root `package.json`.
2. Run `npm run build` (or just `npm version <new_version>`). The script will automatically update all manifest files (`chrome`, `firefox`, `www`, `capacitor.config`).

### 2. Platform Adapters
When adding new platform-specific features (like a new storage engine), update the adapters in `core/js/adapter/`. This ensures the logic remains identical while the implementation adapts to the environment.

### 3. Dependencies
- **Android**: Requires **JDK 17, 21, or 25**.
- **Build Tools**: Uses Gradle 9.2.1 and AGP 8.13.0.

---

## 🤝 Contribution

We welcome any humble contributions to this project. Whether it's a bug fix, a new feature, or an improvement to the Arabic translations, feel free to open a Pull Request. Always ensure your changes are made in the `/core` directory and that you've run `npm run sync` before submitting.