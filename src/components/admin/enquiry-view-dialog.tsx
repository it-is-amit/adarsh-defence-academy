"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Enquiry } from "@/lib/firebase/enquiries"
import { MessageSquare, X } from "lucide-react"

interface EnquiryViewDialogProps {
  enquiry: Enquiry | null
  isOpen: boolean
  onClose: () => void
  onReply: (enquiry: Enquiry) => void
  formatIst: (enquiry: Enquiry) => string
}

export function EnquiryViewDialog({
  enquiry,
  isOpen,
  onClose,
  onReply,
  formatIst,
}: EnquiryViewDialogProps) {
  if (!enquiry) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Enquiry Details</DialogTitle>
            <div className="flex items-center gap-2">
              {!enquiry.read && (
                <Badge variant="default" className="h-6 px-3">
                  NEW
                </Badge>
              )}
              <Badge variant="secondary">
                {enquiry.status}
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Received on {formatIst(enquiry)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-base font-medium">{enquiry.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-base">{enquiry.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-base">{enquiry.email}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2">Message</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-base whitespace-pre-wrap">{enquiry.message}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="text-base">{enquiry.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Read Status</label>
                <p className="text-base">{enquiry.read ? "Read" : "Unread"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date (IST)</label>
                <p className="text-base">{formatIst(enquiry)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date (ISO)</label>
                <p className="text-sm">{enquiry.createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onReply(enquiry)}
            className="hover:bg-slate-50 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-slate-50 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
