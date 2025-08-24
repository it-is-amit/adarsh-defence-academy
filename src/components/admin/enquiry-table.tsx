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

interface EnquiryTableProps {
  enquiries: Enquiry[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  formatIst: (e: Enquiry) => string
}

export function EnquiryTable({ enquiries, onMarkAsRead, onDelete, formatIst }: EnquiryTableProps) {
  return (
    <div className="hidden lg:block border rounded-lg overflow-hidden bg-background/70 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-sm">Status</th>
              <th className="text-left p-4 font-medium text-sm">Name</th>
              <th className="text-left p-4 font-medium text-sm">Email</th>
              <th className="text-left p-4 font-medium text-sm">Phone</th>
              <th className="text-left p-4 font-medium text-sm">Date</th>
              <th className="text-left p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-sm text-muted-foreground">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr 
                  key={enquiry.id} 
                  className={`hover:bg-muted/30 transition-colors ${
                    !enquiry.read ? 'bg-primary/10 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{enquiry.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{enquiry.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{enquiry.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {formatIst(enquiry)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              if (!enquiry.read) {
                                onMarkAsRead(enquiry.id)
                              }
                            }}
                          >
                            <Eye className="h-4 w-4" />
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
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(enquiry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
