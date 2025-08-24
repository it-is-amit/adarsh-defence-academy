"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface EnquiryHeaderProps {
  title: string
  subtitle: string
  unreadCount: number
  notificationPermission: NotificationPermission
  onRequestNotificationPermission: () => void
}

export function EnquiryHeader({ 
  title, 
  subtitle, 
  unreadCount, 
  notificationPermission, 
  onRequestNotificationPermission 
}: EnquiryHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6 flex items-center gap-3">
      <div className="flex items-center gap-3 flex-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {subtitle} ({unreadCount} unread)
            {notificationPermission === 'granted' && (
              <span className="ml-2 text-green-600 dark:text-green-400">• Notifications enabled</span>
            )}
            {notificationPermission === 'denied' && (
              <span className="ml-2 text-red-600 dark:text-red-400">• Notifications blocked</span>
            )}
          </p>
        </div>
      </div>

      {notificationPermission !== 'granted' && (
        <Button variant="outline" size="sm" onClick={onRequestNotificationPermission} className="shrink-0">
          <Bell className="h-4 w-4 mr-2" /> Enable notifications
        </Button>
      )}
    </div>
  )
}
