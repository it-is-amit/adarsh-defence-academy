import { z } from "zod"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type DocumentData,
} from "firebase/firestore"
import { getFirestoreInstance } from "./client"

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  pinned: z.boolean().optional().default(false),
})

export type NoticeInput = z.input<typeof noticeSchema>
export type Notice = z.infer<typeof noticeSchema> & { id: string; createdAt: string }

const COLLECTION = "notices"

export async function listNotices(): Promise<Notice[]> {
  const db = getFirestoreInstance()
  const ref = collection(db, COLLECTION)
  const q = query(ref, orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapDocToNotice(d.id, d.data()))
}

export async function getNotice(id: string): Promise<Notice | null> {
  const db = getFirestoreInstance()
  const ref = doc(db, COLLECTION, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return mapDocToNotice(snap.id, snap.data())
}

export async function createNotice(input: NoticeInput): Promise<string> {
  const db = getFirestoreInstance()
  const parsed = noticeSchema.parse(input)
  const ref = collection(db, COLLECTION)
  const payload: DocumentData = {
    title: parsed.title,
    description: parsed.description,
    pinned: parsed.pinned ?? false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const docRef = await addDoc(ref, payload)
  return docRef.id
}

export async function updateNotice(id: string, input: Partial<NoticeInput>): Promise<void> {
  const db = getFirestoreInstance()
  const patch = noticeSchema.partial().parse(input)
  const ref = doc(db, COLLECTION, id)
  await updateDoc(ref, {
    ...patch,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteNotice(id: string): Promise<void> {
  const db = getFirestoreInstance()
  const ref = doc(db, COLLECTION, id)
  await deleteDoc(ref)
}

function mapDocToNotice(id: string, data: DocumentData): Notice {
  const raw = {
    id,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    pinned: Boolean(data.pinned ?? false),
    createdAt: timestampToIso(data.createdAt) ?? new Date().toISOString(),
  }
  return noticeSchema.extend({ id: z.string(), createdAt: z.string() }).parse(raw)
}

function timestampToIso(value: unknown): string | null {
  try {
    if (!value) return null
    // Firestore Timestamp
    if (typeof value === "object" && value !== null && "toDate" in (value as { toDate: () => Date })) {
      return (value as Timestamp).toDate().toISOString()
    }
    if (typeof value === "string") {
      return new Date(value).toISOString()
    }
    return null
  } catch {
    return null
  }
}


