import * as React from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ReactTable,
  type RowData,
  type TableOptions,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EyeOffIcon,
  SearchIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

/**
 * The features every DataTable supports. TanStack Table v9 tree-shakes
 * anything not registered here, so only the sort and filter functions the
 * built-in behaviour needs are included (string/number/date sorting and
 * case-insensitive text search).
 */
const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text, datetime: sortFn_datetime, basic: sortFn_basic },
})

type DataTableFeatures = typeof dataTableFeatures
// Columns in one table hold different value types (string IDs, numeric priorities…).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataTableColumnDef<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>
type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>

/** Typed column helper for a DataTable of TData. */
function createDataTableColumns<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}

/**
 * The table instance behind a DataTable. Use it when the app needs the state:
 * reading selected rows, controlled sorting or paging, or server-side data
 * (manualPagination / manualSorting with rowCount).
 */
function useDataTable<TData extends RowData>({
  pageSize = 10,
  initialState,
  columns,
  ...options
}: Omit<TableOptions<DataTableFeatures, TData>, "features" | "columns"> & {
  /** Columns of any value type (accessors typed to their value). */
  columns: DataTableColumnDef<TData>[]
  pageSize?: number
}): DataTableInstance<TData> {
  return useTable({
    features: dataTableFeatures,
    initialState: { pagination: { pageIndex: 0, pageSize }, ...initialState },
    // Typed accessor columns are narrower than TanStack's `unknown` value slot.
    columns: columns as TableOptions<DataTableFeatures, TData>["columns"],
    ...options,
  })
}

const humanize = (id: string) =>
  id
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (c) => c.toUpperCase())

/** A column's display name: its string header, or a humanised id. */
function columnLabel<TData extends RowData, TValue>(column: Column<DataTableFeatures, TData, TValue>) {
  return typeof column.columnDef.header === "string" ? column.columnDef.header : humanize(column.id)
}

/** Header menu: sort ascending/descending, clear, and hide the column. */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}) {
  const canSort = column.getCanSort()
  const canHide = column.getCanHide()
  if (!canSort && !canHide) return <span className={cn("eyebrow", className)}>{title}</span>
  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ArrowUpDownIcon
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="xs"
            className={cn("-ml-2 h-7 eyebrow", sorted ? "text-foreground" : "text-muted-foreground", className)}
          />
        }
      >
        {title}
        {canSort && <Icon data-icon="inline-end" className={cn(!sorted && "opacity-50")} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {canSort && (
          <>
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon /> Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon /> Descending
            </DropdownMenuItem>
            {sorted && (
              <DropdownMenuItem onClick={() => column.clearSorting()}>
                <XIcon /> Clear sort
              </DropdownMenuItem>
            )}
          </>
        )}
        {canSort && canHide && <DropdownMenuSeparator />}
        {canHide && (
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon /> Hide column
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** A leading checkbox column that selects rows (header selects the whole page). */
function dataTableSelectColumn<TData extends RowData>(): DataTableColumnDef<TData> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
      />
    ),
  }
}

/** Show or hide columns that allow hiding. */
function DataTableViewOptions<TData extends RowData>({ table }: { table: DataTableInstance<TData> }) {
  const hideable = table.getAllColumns().filter((c) => c.getCanHide())
  if (!hideable.length) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        <Settings2Icon data-icon="inline-start" /> Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {hideable.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(visible) => column.toggleVisibility(!!visible)}
            >
              {columnLabel(column)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Search across all columns, a slot for actions (e.g. bulk actions), and the column toggle. */
function DataTableToolbar<TData extends RowData>({
  table,
  searchPlaceholder,
  children,
  className,
}: {
  table: DataTableInstance<TData>
  searchPlaceholder?: string
  children?: React.ReactNode
  className?: string
}) {
  const globalFilter = (table.state.globalFilter as string | undefined) ?? ""
  return (
    <div data-slot="data-table-toolbar" className={cn("flex flex-wrap items-center gap-2", className)}>
      {searchPlaceholder && (
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
        </InputGroup>
      )}
      {children}
      <div className="ml-auto">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

/** The table itself: sortable headers expose aria-sort; selected rows take the accent tint. */
function DataTableGrid<TData extends RowData>({
  table,
  empty = "No results.",
  className,
}: {
  table: DataTableInstance<TData>
  empty?: React.ReactNode
  className?: string
}) {
  const rows = table.getRowModel().rows
  return (
    <div data-slot="data-table-grid" className={cn("overflow-hidden rounded-xl border bg-card", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    className="first:pl-4 last:pr-4"
                    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className="data-[state=selected]:bg-primary-subtle"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="first:pl-4 last:pr-4">
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-24 text-center text-muted-foreground"
              >
                {empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

/** Selection count, rows per page, and first/previous/next/last. Works with server-side (manual) pagination too. */
function DataTablePagination<TData extends RowData>({
  table,
  pageSizes = [10, 20, 50],
  className,
}: {
  table: DataTableInstance<TData>
  pageSizes?: number[]
  className?: string
}) {
  const { pagination } = table.state
  const hasSelection = table.getAllColumns().some((c) => c.id === "select")
  const total = table.getRowCount()
  const sizes = pageSizes.map((n) => ({ value: String(n), label: String(n) }))
  return (
    <div
      data-slot="data-table-pagination"
      className={cn("flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground", className)}
    >
      <span aria-live="polite">
        {hasSelection ? `${table.getSelectedRowModel().rows.length} of ${total} selected` : `${total} rows`}
      </span>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select items={sizes} value={String(pagination.pageSize)} onValueChange={(v) => v && table.setPageSize(Number(v))}>
            <SelectTrigger size="sm" className="w-16" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="tabular-nums">
          Page {pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" aria-label="First page" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeftIcon />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Previous page" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Next page" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRightIcon />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Last page" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Everything assembled: toolbar, grid and pagination. For anything that needs
 * the table's state, build the same layout from useDataTable and the parts.
 */
function DataTable<TData extends RowData>({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder,
  empty,
  className,
}: {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  pageSize?: number
  /** Shows a search box that filters across all columns. */
  searchPlaceholder?: string
  empty?: React.ReactNode
  className?: string
}) {
  const table = useDataTable({ columns, data, pageSize })
  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-3", className)}>
      <DataTableToolbar table={table} searchPlaceholder={searchPlaceholder} />
      <DataTableGrid table={table} empty={empty} />
      <DataTablePagination table={table} />
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableGrid,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  createDataTableColumns,
  dataTableSelectColumn,
  useDataTable,
  type DataTableColumnDef,
  type DataTableInstance,
}
