import { z } from "zod"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type DocumentData,
} from "firebase/firestore"
import { getFirestoreInstance } from "./client"

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/u, "Phone number must be 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
export type Enquiry = z.infer<typeof enquirySchema> & { 
  id: string
  status: string
  read: boolean
  createdAt: string
  createdAtIst?: string
}

const COLLECTION = "enquiries"

export async function createEnquiry(input: EnquiryInput): Promise<string> {
  const db = getFirestoreInstance()
  const parsed = enquirySchema.parse(input)
  const ref = collection(db, COLLECTION)
  // Compute IST time string at write time (client-side)
  const createdAtIst = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  })
  const payload: DocumentData = {
    ...parsed,
    status: "new",
    read: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdAtIst,
  }
  const docRef = await addDoc(ref, payload)
  return docRef.id
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const db = getFirestoreInstance()
  const ref = collection(db, COLLECTION)
  const q = query(ref, orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapDocToEnquiry(d.id, d.data()))
}

export async function markEnquiryAsRead(id: string): Promise<void> {
  const db = getFirestoreInstance()
  const ref = doc(db, COLLECTION, id)
  const updatedAtIst = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  })
  await updateDoc(ref, {
    read: true,
    updatedAt: serverTimestamp(),
    updatedAtIst,
  })
}

export async function deleteEnquiry(id: string): Promise<void> {
  const db = getFirestoreInstance()
  const ref = doc(db, COLLECTION, id)
  await deleteDoc(ref)
}

function mapDocToEnquiry(id: string, data: DocumentData): Enquiry {
  const raw = {
    id,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    message: String(data.message ?? ""),
    status: String(data.status ?? "new"),
    read: Boolean(data.read ?? false),
    createdAt: timestampToIso(data.createdAt) ?? new Date().toISOString(),
    createdAtIst: data.createdAtIst ? String(data.createdAtIst) : undefined,
  }
  return enquirySchema.extend({ 
    id: z.string(), 
    status: z.string(), 
    read: z.boolean(),
    createdAt: z.string(),
    createdAtIst: z.string().optional(),
  }).parse(raw)
}

function timestampToIso(value: unknown): string | null {
  try {
    if (!value) return null
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


