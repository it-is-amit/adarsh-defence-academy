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
import { type Notice } from "@/lib/firebase/notices"
import { Trash2, Pin, PinOff } from "lucide-react"

interface NoticeTableProps {
  notices: Notice[]
  onTogglePin: (id: string, pinned: boolean) => void
  onDelete: (id: string) => void
  formatIst: (iso: string) => string
}

export function NoticeTable({ notices, onTogglePin, onDelete, formatIst }: NoticeTableProps) {
  return (
    <div className="hidden lg:block border rounded-lg overflow-hidden bg-background/70 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-sm">Title</th>
              <th className="text-left p-4 font-medium text-sm">Pinned</th>
              <th className="text-left p-4 font-medium text-sm">Date & Time</th>
              <th className="text-left p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {notices.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-sm text-muted-foreground">
                  No notices found.
                </td>
              </tr>
            ) : (
              notices.map((n) => (
                <tr key={n.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 align-top">
                    <div className="font-medium line-clamp-2">{n.title}</div>
                  </td>
                  <td className="p-4 align-top">
                    {n.pinned ? (
                      <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5 inline-flex items-center gap-1">
                        <Pin className="h-3.5 w-3.5" /> Pinned
                      </span>
                    ) : (
                      <span className="text-xs rounded-full bg-muted px-2 py-0.5">—</span>
                    )}
                  </td>
                  <td className="p-4 align-top">
                    <div className="text-sm text-muted-foreground">
                      {formatIst(n.createdAt)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Read</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[90vw] sm:max-w-xl lg:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto mx-auto">
                          <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl leading-7 pr-8">{n.title}</DialogTitle>
                            <DialogDescription>
                              <span className="inline-flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                  {formatIst(n.createdAt)}
                                </span>
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-2 text-sm leading-7 prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: n.description }} />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onTogglePin(n.id, n.pinned)}
                      >
                        {n.pinned ? (<><PinOff className="h-4 w-4 mr-2" /> Unpin</>) : (<><Pin className="h-4 w-4 mr-2" /> Pin</>)}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDelete(n.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
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
