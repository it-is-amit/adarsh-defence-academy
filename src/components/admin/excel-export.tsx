"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, parseISO } from "date-fns"
import { Enquiry } from "@/lib/firebase/enquiries"
import * as XLSX from "xlsx"

interface ExcelExportProps {
  enquiries: Enquiry[]
  formatIst: (enquiry: Enquiry) => string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type ExportRange = "today" | "thisMonth" | "thisYear"

export function ExcelExport({ enquiries, formatIst, isOpen, onOpenChange }: ExcelExportProps) {
  const [exportRange, setExportRange] = useState<ExportRange>("today")

  const getFilteredEnquiries = () => {
    const now = new Date()
    let startDate: Date
    let endDate: Date

    switch (exportRange) {
      case "today":
        startDate = startOfDay(now)
        endDate = endOfDay(now)
        break
      case "thisMonth":
        startDate = startOfMonth(now)
        endDate = endOfMonth(now)
        break
      case "thisYear":
        startDate = startOfYear(now)
        endDate = endOfYear(now)
        break
      default:
        return enquiries
    }

    return enquiries.filter((enquiry) => {
      const enquiryDate = parseISO(enquiry.createdAt)
      return isWithinInterval(enquiryDate, { start: startDate, end: endDate })
    })
  }

  const exportToExcel = () => {
    const filteredEnquiries = getFilteredEnquiries()
    
    if (filteredEnquiries.length === 0) {
      alert("No enquiries found for the selected date range.")
      return
    }

    // Prepare data for export
    const exportData = filteredEnquiries.map((enquiry) => ({
      Name: enquiry.name,
      Email: enquiry.email,
      Phone: enquiry.phone,
      Message: enquiry.message,
      Status: enquiry.status,
      Read: enquiry.read ? "Yes" : "No",
      "Created Date": formatIst(enquiry),
      "Created Date (ISO)": enquiry.createdAt,
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // Auto-size columns
    const columnWidths = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 50 }, // Message
      { wch: 10 }, // Status
      { wch: 8 },  // Read
      { wch: 20 }, // Created Date
      { wch: 25 }, // Created Date ISO
    ]
    worksheet["!cols"] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries")

    // Generate filename with date range
    const now = new Date()
    let filename = "enquiries"
    
    switch (exportRange) {
      case "today":
        filename += `_${format(now, "yyyy-MM-dd")}`
        break
      case "thisMonth":
        filename += `_${format(now, "yyyy-MM")}`
        break
      case "thisYear":
        filename += `_${format(now, "yyyy")}`
        break
      default:
        break
    }
    
    filename += ".xlsx"

    // Export file
    XLSX.writeFile(workbook, filename)
    
    // Close dialog
    onOpenChange(false)
  }

  const getExportRangeLabel = () => {
    switch (exportRange) {
      case "today":
        return "Today"
      case "thisMonth":
        return "This Month"
      case "thisYear":
        return "This Year"
      default:
        return "Select Range"
    }
  }

  const getFilteredCount = () => {
    return getFilteredEnquiries().length
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Export to Excel</DialogTitle>
          <DialogDescription>
            Choose a date range to export enquiries
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Select value={exportRange} onValueChange={(value: ExportRange) => setExportRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select export range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">
                {getExportRangeLabel()}
              </span>
              <Badge variant="secondary">
                {getFilteredCount()} enquiries
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            onClick={exportToExcel}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
