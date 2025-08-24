"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Download } from "lucide-react"
import { Enquiry } from "@/lib/firebase/enquiries"

interface EnquiryFiltersProps {
  enquiries: Enquiry[]
  onFiltersChange: (filters: FilterState) => void
  onExportClick: () => void
}

export interface FilterState {
  status: string
  readStatus: string
  searchTerm: string
}

export function EnquiryFilters({ enquiries, onFiltersChange, onExportClick }: EnquiryFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    readStatus: "all",
    searchTerm: "",
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      status: "all",
      readStatus: "all",
      searchTerm: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.status !== "all" || filters.readStatus !== "all" || filters.searchTerm !== ""

  // Get unique statuses from enquiries
  const statuses = Array.from(new Set(enquiries.map(e => e.status)))

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <div className="flex items-center gap-2">
        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.readStatus} onValueChange={(value) => handleFilterChange("readStatus", value)}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Read Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active:</span>
          {filters.status !== "all" && (
            <Badge variant="secondary" className="h-6">
              Status: {filters.status}
            </Badge>
          )}
          {filters.readStatus !== "all" && (
            <Badge variant="secondary" className="h-6">
              {filters.readStatus === "read" ? "Read" : "Unread"}
            </Badge>
          )}
        </div>
      )}

      {/* Excel Export Button - Right side */}
      <div className="ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportClick}
          className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
    </div>
  )
}
