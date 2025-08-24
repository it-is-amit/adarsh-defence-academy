"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SocialSidebar from "@/components/social-sidebar"
import type React from "react"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = pathname.startsWith("/admin") || pathname === "/login"

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <SocialSidebar />
    </>
  )
}


