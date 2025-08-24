"use client"

import Link from "next/link"
import Image from "next/image"
import { ClipboardList, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-[70vh] px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="Adarsh Defence and Sports Academy Logo"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Choose a section to manage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <Link href="/admin/notices" className="group">
            <div className="border rounded-xl p-5 md:p-6 bg-background/70 backdrop-blur hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ClipboardList className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-medium text-lg">Notices</h2>
                  <p className="text-muted-foreground text-sm">Create and manage website notices</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">Open Notices</Button>
              </div>
            </div>
          </Link>

          <Link href="/admin/enquiries" className="group">
            <div className="border rounded-xl p-5 md:p-6 bg-background/70 backdrop-blur hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-medium text-lg">Enquiries</h2>
                  <p className="text-muted-foreground text-sm">View and manage contact enquiries</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">Open Enquiries</Button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}


