# Start the app (clears cache automatically)
pnpm start

# Run on Android emulator
pnpm android

# Run on iOS simulator
pnpm ios

# Run on web browser
pnpm web

# Run tests
pnpm test

# Lint your code
pnpm lint

# Reset project to fresh state
pnpm run reset-project

# Update dependencies to latest allowed by semver
pnpm run update

/
├─ app/             # Main app code (Expo Router pages)
├─ assets/          # Images, icons, fonts, and SVGs
├─ components/      # Reusable React Native components
├─ utils/           # TypeScript interfaces, helpers, and constants
├─ scripts/         # Custom scripts (e.g., reset-project.js)
├─ package.json     # Project dependencies and scripts
└─ pnpm-lock.yaml   # Locked dependency versions (keep in Git)