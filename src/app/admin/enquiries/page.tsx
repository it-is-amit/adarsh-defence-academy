"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  markEnquiryAsRead,
  deleteEnquiry,
  type Enquiry
} from "@/lib/firebase/enquiries"
import { ArrowLeft } from "lucide-react"
import { onSnapshot, collection, query, orderBy, Timestamp } from "firebase/firestore"
import { getFirestoreInstance } from "@/lib/firebase/client"
import { EnquiryHeader } from "@/components/admin/enquiry-header"
import { EnhancedEnquiryTable } from "@/components/admin/enhanced-enquiry-table"
import { ExcelExport } from "@/components/admin/excel-export"
import { EnquiryFilters, type FilterState } from "@/components/admin/enquiry-filters"

import { EnquiryViewDialog } from "@/components/admin/enquiry-view-dialog"
import { EnquiryMobileCards } from "@/components/admin/enquiry-mobile-cards"

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    readStatus: "all",
    searchTerm: "",
  })
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isExcelDialogOpen, setIsExcelDialogOpen] = useState(false)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const initialLoadRef = useRef(true)

  const formatIst = (e: Enquiry) => e.createdAtIst ?? new Date(e.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })

  // Notification helpers
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return
    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    } catch {
      // ignore
    }
  }

  const showNotification = useCallback((enquiry: Enquiry) => {
    if (notificationPermission === 'granted' && 'Notification' in window) {
      const notification = new Notification('New Enquiry Received', {
        body: `${enquiry.name} sent a message: ${enquiry.message.substring(0, 100)}${enquiry.message.length > 100 ? '...' : ''}`,
        icon: '/assets/logo.png',
        tag: 'enquiry-notification',
        requireInteraction: false,
      })

      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      setTimeout(() => notification.close(), 5000)
    }
  }, [notificationPermission])

  // Initialize notification permission state
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  // Firestore real-time listener (single subscription)
  useEffect(() => {
    const db = getFirestoreInstance()
    const enquiriesRef = collection(db, 'enquiries')
    const q = query(enquiriesRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Notify only for newly added docs after initial snapshot
      if (!initialLoadRef.current) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data() as Record<string, unknown>
            const newEnquiry: Enquiry = {
              id: change.doc.id,
              name: String(data.name ?? ''),
              email: String(data.email ?? ''),
              phone: String(data.phone ?? ''),
              message: String(data.message ?? ''),
              status: String(data.status ?? 'new'),
              read: Boolean(data.read ?? false),
              createdAt: data.createdAt && typeof data.createdAt === 'object' && 'toDate' in data.createdAt
                ? (data.createdAt as Timestamp).toDate().toISOString()
                : new Date().toISOString(),
              createdAtIst: data.createdAtIst ? String(data.createdAtIst) : undefined,
            }
            showNotification(newEnquiry)
          }
        })
      }

      // Update UI with full current list
      const all: Enquiry[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, unknown>
        return {
          id: doc.id,
          name: String(data.name ?? ''),
          email: String(data.email ?? ''),
          phone: String(data.phone ?? ''),
          message: String(data.message ?? ''),
          status: String(data.status ?? 'new'),
          read: Boolean(data.read ?? false),
          createdAt: data.createdAt && typeof data.createdAt === 'object' && 'toDate' in data.createdAt
            ? (data.createdAt as Timestamp).toDate().toISOString()
            : new Date().toISOString(),
          createdAtIst: data.createdAtIst ? String(data.createdAtIst) : undefined,
        }
      })
      setEnquiries(all)
      setLoading(false)
      initialLoadRef.current = false
    }, (err) => {
      console.error('Firestore listener error:', err)
      setError("Failed to load enquiries. Check Firebase config.")
      setLoading(false)
    })

    unsubscribeRef.current = unsubscribe
    return () => unsubscribe()
  }, [showNotification])

  const handleMarkAsRead = async (id: string) => {
    try {
      await markEnquiryAsRead(id)
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: true } : e))
    } catch (err) {
      console.error("Failed to mark as read:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return
    try {
      await deleteEnquiry(id)
      setEnquiries(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      console.error("Failed to delete enquiry:", err)
    }
  }

  const handleViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsViewDialogOpen(true)
  }

  const handleReply = (enquiry: Enquiry) => {
    window.open(`mailto:${enquiry.email}?subject=Re: Enquiry from ${enquiry.name}`, '_blank')
  }

  const handleExcelExportClick = () => {
    setIsExcelDialogOpen(true)
  }

  const unreadCount = enquiries.filter(e => !e.read).length

  return (
    <div className="min-h-[60vh] px-2 sm:px-4 py-4 sm:py-8 container mx-auto">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex gap-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <Button asChild variant="outline" size="icon" className="text-primary rounded-full">
              <a href="/admin/dashboard"><ArrowLeft className="h-4 w-4" /></a>
            </Button>
          </div>

          <EnquiryHeader
            title="Enquiries"
            subtitle="Manage contact form submissions"
            unreadCount={unreadCount}
            notificationPermission={notificationPermission}
            onRequestNotificationPermission={requestNotificationPermission}
          />
        </div>

        {loading && (
          <div className="text-sm text-muted-foreground">Loading enquiries...</div>
        )}
        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <ExcelExport
                enquiries={enquiries}
                formatIst={formatIst}
                isOpen={isExcelDialogOpen}
                onOpenChange={setIsExcelDialogOpen}
              />
            </div>

            <div className="mb-6">
              <EnquiryFilters
                enquiries={enquiries}
                onFiltersChange={setFilters}
                onExportClick={handleExcelExportClick}
              />
            </div>

            {/* Show table only on larger screens */}
            <div className="hidden md:block mb-6">
              <EnhancedEnquiryTable
                enquiries={enquiries}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                onViewEnquiry={handleViewEnquiry}
                onReply={handleReply}
                formatIst={formatIst}
                filters={filters}
              />
            </div>

            {/* Show mobile cards only on smaller screens */}
            <div className="md:hidden mb-6">
              <EnquiryMobileCards
                enquiries={enquiries}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                formatIst={formatIst}
              />
            </div>

          </>
        )}

        {/* View Enquiry Dialog */}
        <EnquiryViewDialog
          enquiry={selectedEnquiry}
          isOpen={isViewDialogOpen}
          onClose={() => {
            setIsViewDialogOpen(false)
            setSelectedEnquiry(null)
          }}
          onReply={handleReply}
          formatIst={formatIst}
        />
      </div>
    </div>
  )
}


