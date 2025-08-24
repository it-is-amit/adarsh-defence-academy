"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

interface NoticeHeaderProps {
  title: string
  subtitle: string
}

export function NoticeHeader({ title, subtitle }: NoticeHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="icon" className="text-primary rounded-full">
          <Link href="/admin/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
      <Button asChild className="w-full sm:w-auto">
        <Link href="/admin/notices/add"><Plus className="h-4 w-4" /> Add Notice</Link>
      </Button>
    </div>
  )
}
