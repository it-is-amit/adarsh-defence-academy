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

interface NoticeMobileCardsProps {
  notices: Notice[]
  onTogglePin: (id: string, pinned: boolean) => void
  onDelete: (id: string) => void
  formatIst: (iso: string) => string
}

export function NoticeMobileCards({ notices, onTogglePin, onDelete, formatIst }: NoticeMobileCardsProps) {
  return (
    <div className="lg:hidden space-y-2">
      {notices.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-8">
          No notices found.
        </div>
      ) : (
        notices.map((n) => (
          <div
            key={n.id}
            className="border rounded-lg p-3 bg-background/70 backdrop-blur hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 pr-2">
                <div className="font-medium text-sm line-clamp-2 mb-1">{n.title}</div>
                <div className="text-xs text-muted-foreground">
                  {formatIst(n.createdAt)}
                </div>
              </div>
              <div className="flex-shrink-0">
                {n.pinned ? (
                  <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-1 inline-flex items-center gap-1">
                    <Pin className="h-3 w-3" /> Pinned
                  </span>
                ) : (
                  <span className="text-xs rounded-full bg-muted px-2 py-1">—</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                    Read
                  </Button>
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
                className="h-7 px-2 text-xs"
              >
                {n.pinned ? (
                  <PinOff className="h-3 w-3" />
                ) : (
                  <Pin className="h-3 w-3" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive h-7 px-2 text-xs"
                onClick={() => onDelete(n.id)}
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
