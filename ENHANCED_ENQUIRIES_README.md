# Enhanced Enquiries Management System

This document describes the enhanced enquiries management system with advanced sorting, filtering, searching, and Excel export capabilities.

## Features

### 1. Advanced Table with Sorting
- **Sortable Columns**: Click on column headers to sort by Name, Status, Read status, and Date
- **Multi-column Sorting**: Support for complex sorting operations
- **Visual Indicators**: Arrow icons show current sort direction

### 2. Global Search
- **Real-time Search**: Search across all columns (Name, Email, Phone, Message)
- **Instant Results**: Results update as you type
- **Case-insensitive**: Search works regardless of case

### 3. Advanced Filtering
- **Status Filter**: Filter by enquiry status (new, pending, resolved, etc.)
- **Read Status Filter**: Filter by read/unread enquiries
- **Dynamic Status Options**: Automatically detects available statuses from data
- **Filter Indicators**: Visual badges show active filters
- **Clear Filters**: One-click option to reset all filters

### 4. Excel Export
- **Multiple Export Options**:
  - Today's enquiries
  - This month's enquiries
  - This year's enquiries
  - Custom date range
- **Smart Filenames**: Automatically generated filenames with date ranges
- **Formatted Data**: Clean, organized Excel output with proper column widths
- **Date Formatting**: Both human-readable and ISO date formats

### 5. Statistics Dashboard
- **Total Enquiries**: Count of all enquiries
- **Unread Count**: Number of unread enquiries requiring attention
- **New Status**: Count of enquiries with "new" status
- **Today's Count**: Number of enquiries received today

### 6. Responsive Design
- **Desktop Table**: Full-featured table with all columns
- **Mobile Cards**: Optimized mobile view with card layout
- **Responsive Layout**: Adapts to different screen sizes

## Components Structure

```
src/components/admin/
├── enhanced-enquiry-table.tsx    # Main table with sorting/filtering
├── excel-export.tsx              # Excel export functionality
├── enquiry-filters.tsx           # Filter controls
├── enquiry-stats.tsx             # Statistics dashboard
├── enquiry-header.tsx            # Page header
└── enquiry-mobile-cards.tsx      # Mobile view
```

## Required Packages

Install these packages manually:

```bash
npm install @tanstack/react-table date-fns xlsx react-day-picker @radix-ui/react-select @radix-ui/react-popover
```

### Package Details:
- **@tanstack/react-table**: Advanced table functionality with sorting, filtering, and pagination
- **date-fns**: Date manipulation and formatting utilities
- **xlsx**: Excel file generation and export
- **react-day-picker**: Date picker component for custom date ranges
- **@radix-ui/react-select**: Accessible select dropdown component
- **@radix-ui/react-popover**: Accessible popover component

## Usage

### Basic Usage
The enhanced table automatically provides:
- Sortable columns
- Global search
- Responsive design
- Action buttons (Mark as Read, Delete)

### Filtering
```tsx
<EnquiryFilters
  enquiries={enquiries}
  onFiltersChange={setFilters}
/>
```

### Excel Export
```tsx
<ExcelExport
  enquiries={enquiries}
  formatIst={formatIst}
/>
```

### Statistics
```tsx
<EnquiryStats enquiries={enquiries} />
```

## Data Structure

The system expects enquiries with this structure:
```typescript
interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: string
  read: boolean
  createdAt: string
  createdAtIst?: string
}
```

## Best Practices

1. **Component Modularity**: Each feature is in its own component for maintainability
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Performance**: Uses React.memo and useMemo for optimization
4. **Accessibility**: Follows ARIA guidelines and keyboard navigation
5. **Responsive**: Mobile-first design approach
6. **Error Handling**: Graceful error handling for all operations

## Customization

### Adding New Columns
1. Add column definition to the `columns` array in `EnhancedEnquiryTable`
2. Define sorting behavior if needed
3. Add any custom cell rendering logic

### Adding New Filters
1. Extend the `FilterState` interface
2. Add filter controls to `EnquiryFilters` component
3. Update the filtering logic in the table component

### Custom Export Formats
1. Modify the `exportToExcel` function in `ExcelExport`
2. Add new export options to the range selector
3. Customize the Excel worksheet formatting

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Performance Considerations

- **Virtual Scrolling**: For large datasets, consider implementing virtual scrolling
- **Debounced Search**: Global search is optimized for performance
- **Memoized Filters**: Filter calculations are memoized to prevent unnecessary re-renders
- **Lazy Loading**: Components load only when needed

## Future Enhancements

- **Bulk Operations**: Select multiple enquiries for batch actions
- **Advanced Analytics**: Charts and graphs for enquiry trends
- **Email Integration**: Direct email responses from the interface
- **Workflow Management**: Status progression and assignment
- **API Endpoints**: RESTful API for external integrations
