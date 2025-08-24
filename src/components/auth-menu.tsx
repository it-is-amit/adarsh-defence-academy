"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthInstance } from "@/lib/firebase/client"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { LogIn } from "lucide-react"

type AuthMenuProps = {
  compact?: boolean
}

export default function AuthMenu({ compact = false }: AuthMenuProps) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const auth = getAuthInstance()
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setReady(true)
    })
    return () => unsub()
  }, [])

  // Loading placeholder to avoid rectangular Login flicker
  if (!ready) {
    const size = compact ? "h-8 w-8" : "h-10 w-10"
    return (
      <div
        className={`${size} rounded-full bg-accent border border-primary/40 flex items-center justify-center`}
        aria-label="Loading"
      >
        <span className="h-4 w-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <Button asChild size="icon" variant="ghost" className="rounded-full w-10 h-10 bg-accent hover:bg-accent/80 hover:scale-105 border border-primary/40 transition-all" aria-label="">
        <Link href="/login"><LogIn className="h-5 w-5 text-primary" /></Link>
      </Button>
    )
  }

  const userInitial = user.email?.[0]?.toUpperCase() ?? "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            compact
              ? "h-8 w-8 rounded-full bg-accent hover:bg-accent/80 hover:scale-105 border border-primary/40 transition-all text-primary flex items-center justify-center font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              : "h-10 w-10 rounded-full bg-accent hover:bg-accent/80 hover:scale-105 border border-primary/40 transition-all text-primary flex items-center justify-center font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          }
          aria-label="Account"
        >
          {userInitial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={compact ? "w-44" : "w-48"}>
        <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">{user.email}</div>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut(getAuthInstance())}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
