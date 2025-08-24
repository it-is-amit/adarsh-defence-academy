"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type Enquiry } from "@/lib/firebase/enquiries"
import { Mail, Eye, Trash2, Reply } from "lucide-react"

interface EnquiryMobileCardsProps {
  enquiries: Enquiry[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  formatIst: (e: Enquiry) => string
}

export function EnquiryMobileCards({ enquiries, onMarkAsRead, onDelete, formatIst }: EnquiryMobileCardsProps) {
  return (
    <div className="lg:hidden space-y-2">
      {enquiries.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-8">
          No enquiries found.
        </div>
      ) : (
        enquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className={`border rounded-lg p-3 bg-background/70 backdrop-blur ${
              !enquiry.read ? 'bg-primary/10 dark:bg-blue-950/20 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {!enquiry.read && (
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  enquiry.read 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-white text-primary dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {enquiry.read ? 'Read' : 'New'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatIst(enquiry)}
              </div>
            </div>
            
            <div className="space-y-1 mb-2">
              <div className="font-medium text-sm">{enquiry.name}</div>
              <div className="text-xs text-muted-foreground">{enquiry.email}</div>
              <div className="text-xs text-muted-foreground">{enquiry.phone}</div>
            </div>

            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => {
                      if (!enquiry.read) {
                        onMarkAsRead(enquiry.id)
                      }
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-xl lg:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl leading-7 pr-8">{enquiry.name}</DialogTitle>
                    <DialogDescription>
                      <div className="space-y-2 text-sm">
                        <div><strong>Email:</strong> {enquiry.email}</div>
                        <div><strong>Phone:</strong> {enquiry.phone}</div>
                        <div><strong>Date:</strong> {formatIst(enquiry)}</div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Message:</h4>
                    <div className="bg-muted/30 p-3 sm:p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {enquiry.message}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${enquiry.email}`, '_blank')}
                      className="flex-1 sm:flex-none"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    {!enquiry.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMarkAsRead(enquiry.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`mailto:${enquiry.email}`, '_blank')}
                className="flex-1 h-8 text-xs"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(enquiry.id)}
                className="text-destructive hover:text-destructive h-8 text-xs"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
