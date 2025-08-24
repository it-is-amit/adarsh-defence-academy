import { initializeApp, type FirebaseApp, type FirebaseOptions, getApps } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

function getFirebaseConfigFromEnv(): FirebaseOptions | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

  const allPresent = apiKey && authDomain && projectId && storageBucket && messagingSenderId && appId
  if (!allPresent) return null

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    ...(measurementId ? { measurementId } : {}),
  }
}

// Fallback config provided by user (used only if env vars are missing)
const FALLBACK_CONFIG: FirebaseOptions = {
  apiKey: "AIzaSyCaNa1GNGKlQ5qJxlnR6MAT2qVZbRjfBU8",
  authDomain: "adarsh-defence-academy.firebaseapp.com",
  projectId: "adarsh-defence-academy",
  storageBucket: "adarsh-defence-academy.firebasestorage.app",
  messagingSenderId: "993246300332",
  appId: "1:993246300332:web:531ce057cf41ff37ddb709"
}

let cachedApp: FirebaseApp | null = null
let cachedAuth: Auth | null = null
let cachedDb: Firestore | null = null

export function getFirebaseApp(): FirebaseApp {
  if (cachedApp) return cachedApp
  const config = getFirebaseConfigFromEnv() ?? FALLBACK_CONFIG
  if (!getFirebaseConfigFromEnv()) {
    console.warn("Using fallback Firebase config from source. Consider setting NEXT_PUBLIC_FIREBASE_* env vars.")
  }
  cachedApp = getApps().length ? getApps()[0]! : initializeApp(config)
  return cachedApp
}

export function getAuthInstance(): Auth {
  if (cachedAuth) return cachedAuth
  const app = getFirebaseApp()
  cachedAuth = getAuth(app)
  return cachedAuth
}

export function getFirestoreInstance(): Firestore {
  if (cachedDb) return cachedDb
  const app = getFirebaseApp()
  cachedDb = getFirestore(app)
  return cachedDb
}


