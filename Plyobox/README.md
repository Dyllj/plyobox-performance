# PLYObox mobile UI

The Expo app is a responsive member and trainer UI prototype for Plyobox Performance Gym. The
screens follow the supplied mobile draft with a charcoal-and-lime visual system, accessible
controls, and a five-item member tab bar.

## Run locally

```bash
npm install
npx expo start
```

Open the app on a device, emulator, or web browser.

## Included flows

- Login, three-step registration, and password reset
- Member home, Daily Session and Monthly Membership, checkout, payment states, and receipts
- QR check-in preview and attendance history
- Trainer directory, profile, booking requests, and bookings
- Workout plans, exercise details, progress, notifications, profile, privacy settings, and community
- Trainer dashboard, booking requests, profile editing, services, availability, and clients

The app is frontend-only. Sample names, dates, status values, and metrics are clearly presented as
preview data. Authentication, camera/QR validation, payment collection, uploads, notifications,
booking persistence, and backend records are not connected. Payment proof does not activate gym
access; membership starts only after authorized verification. Membership options remain Daily
Session and Monthly Membership, with pricing set by the gym.

Routes live in `src/app/`. Shared navigation and UI primitives are in `src/components/`, and the
theme tokens are in `src/constants/`.
