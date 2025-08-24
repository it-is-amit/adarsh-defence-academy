"use client"

import { useEffect, useState } from "react"
import { listNotices, updateNotice, deleteNotice, type Notice } from "@/lib/firebase/notices"
import { NoticeHeader } from "@/components/admin/notice-header"
import { NoticeTable } from "@/components/admin/notice-table"
import { NoticeMobileCards } from "@/components/admin/notice-mobile-cards"

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
        try {
          const data = await listNotices()
          if (mounted) setNotices(data)
        } catch (err) {
          console.error(err)
          if (mounted) setError("Failed to load notices. Check Firebase config.")
        } finally {
          if (mounted) setLoading(false)
        }
      })()
    return () => {
      mounted = false
    }
  }, [])

  const handleTogglePin = async (id: string, pinned: boolean) => {
    try {
      await updateNotice(id, { pinned: !pinned })
      setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !pinned } : n))
    } catch (err) {
      console.error("Failed to update pin state:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return
    try {
      await deleteNotice(id)
      setNotices(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error("Failed to delete notice:", err)
    }
  }

  const formatIst = (iso: string) => new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })

  // Sort notices: pinned first, then by creation date (newest first)
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="min-h-[60vh] px-2 sm:px-4 py-4 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <NoticeHeader 
          title="Notices" 
          subtitle="Manage website notices" 
        />

        {loading && (
          <div className="text-sm text-muted-foreground">Loading notices...</div>
        )}
        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}

        {!loading && !error && (
          <>
            <NoticeTable 
              notices={sortedNotices}
              onTogglePin={handleTogglePin}
              onDelete={handleDelete}
              formatIst={formatIst}
            />
            
            <NoticeMobileCards 
              notices={sortedNotices}
              onTogglePin={handleTogglePin}
              onDelete={handleDelete}
              formatIst={formatIst}
            />
          </>
        )}
      </div>
    </div>
  )
}


