"use client"

import { useState, useMemo } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, Eye, MessageSquare, CheckCircle, Trash2 } from "lucide-react"
import { Enquiry } from "@/lib/firebase/enquiries"

interface EnhancedEnquiryTableProps {
  enquiries: Enquiry[]
  onMarkAsRead: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onViewEnquiry: (enquiry: Enquiry) => void
  onReply: (enquiry: Enquiry) => void
  formatIst: (enquiry: Enquiry) => string
  filters?: {
    status: string
    readStatus: string
    searchTerm: string
  }
}

export function EnhancedEnquiryTable({
  enquiries,
  onMarkAsRead,
  onDelete,
  onViewEnquiry,
  onReply,
  formatIst,
  filters,
}: EnhancedEnquiryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  // Apply filters to enquiries
  const filteredEnquiries = useMemo(() => {
    if (!filters) return enquiries

    return enquiries.filter((enquiry) => {
      // Status filter
      if (filters.status !== "all" && enquiry.status !== filters.status) {
        return false
      }

      // Read status filter
      if (filters.readStatus !== "all") {
        const isRead = filters.readStatus === "read"
        if (enquiry.read !== isRead) {
          return false
        }
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          enquiry.name.toLowerCase().includes(searchLower) ||
          enquiry.email.toLowerCase().includes(searchLower) ||
          enquiry.phone.toLowerCase().includes(searchLower) ||
          enquiry.message.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) {
          return false
        }
      }

      return true
    })
  }, [enquiries, filters])

  const columns: ColumnDef<Enquiry>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const enquiry = row.original
        return (
          <div className="flex items-center gap-3">
            {!enquiry.read && (
              <Badge variant="default" className="px-1 text-[10px]">
                NEW
              </Badge>
            )}
            <div className="font-medium">{enquiry.name}</div>
          </div>
        )
      },
    },
    {
      id: "contact",
      header: "Contact",
      cell: ({ row }) => {
        const enquiry = row.original
        return (
          <div>
            <div className="text-sm font-medium">{enquiry.phone}</div>
            <div className="text-xs text-muted-foreground lowercase">
              {enquiry.email}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const enquiry = row.original
        return <div className="text-sm">{formatIst(enquiry)}</div>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const enquiry = row.original
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewEnquiry(enquiry)}
              className="h-8 px-3 hover:bg-slate-50 transition-colors"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReply(enquiry)}
              className="h-8 px-3 hover:bg-slate-50 transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Reply
            </Button>
            {!enquiry.read && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsRead(enquiry.id)}
                className="h-8 px-3 hover:bg-slate-50 transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark Read
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(enquiry.id)}
              className="h-8 px-3 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredEnquiries,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={!row.original.read ? "bg-blue-50/50 border-l-4 border-l-blue-500" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
