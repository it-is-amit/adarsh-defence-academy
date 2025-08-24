"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthInstance } from "@/lib/firebase/client"
import { onAuthStateChanged } from "firebase/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const auth = getAuthInstance()
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login")
      } else {
        setChecking(false)
      }
    })
    return () => unsub()
  }, [router])

  if (checking) {
    return <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground">Checking access…</div>
  }

  return <>{children}</>
}
