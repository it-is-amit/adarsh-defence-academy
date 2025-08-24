This is a Next.js project.

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

This project expects Firebase to be configured for App, Auth, and Firestore. Add the following environment variables to `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
# Optional
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Initialization lives in `src/lib/firebase/client.ts`. Firestore `notices` helpers and schema live in `src/lib/firebase/notices.ts`.

Firestore collections:
- `notices`: fields: `title` (string), `description` (string – HTML allowed), `pinned` (boolean, default false), plus `createdAt`/`updatedAt` (server timestamps).
