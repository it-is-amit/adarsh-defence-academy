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

let cachedApp: FirebaseApp | null = null
let cachedAuth: Auth | null = null
let cachedDb: Firestore | null = null

export function getFirebaseApp(): FirebaseApp {
  if (cachedApp) return cachedApp
  const config = getFirebaseConfigFromEnv()
  if (!config) {
    throw new Error("Firebase configuration not found. Please set NEXT_PUBLIC_FIREBASE_* environment variables.")
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


