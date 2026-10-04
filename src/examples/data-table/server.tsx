import { useEffect, useState } from "react"
import type { PaginationState, SortingState } from "@tanstack/react-table"

import {
  DataTableColumnHeader,
  DataTableGrid,
  DataTablePagination,
  createDataTableColumns,
  useDataTable,
} from "@/components/ui/data-table"

type Event = { id: number; type: string; actor: string }

// Stand-in for an API: 137 events, sorted and paged on the "server".
const ALL: Event[] = Array.from({ length: 137 }, (_, i) => ({
  id: 1000 + i,
  type: ["issue.created", "issue.closed", "comment.added", "cycle.started"][i % 4],
  actor: ["Alex", "Freddie", "Mika", "Sam"][(i * 3) % 4],
}))
async function fetchEvents(pagination: PaginationState, sorting: SortingState) {
  await new Promise((r) => setTimeout(r, 400))
  const [sort] = sorting
  const rows = sort
    ? [...ALL].sort((a, b) => {
        const av = a[sort.id as keyof Event]
        const bv = b[sort.id as keyof Event]
        return (av < bv ? -1 : av > bv ? 1 : 0) * (sort.desc ? -1 : 1)
      })
    : ALL
  const start = pagination.pageIndex * pagination.pageSize
  return { rows: rows.slice(start, start + pagination.pageSize), total: ALL.length }
}

const col = createDataTableColumns<Event>()
const columns = [
  col.accessor("id", { header: ({ column }) => <DataTableColumnHeader column={column} title="Event" /> }),
  col.accessor("type", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
  }),
  col.accessor("actor", { header: ({ column }) => <DataTableColumnHeader column={column} title="Actor" /> }),
]

export default function DataTableServer() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<{ rows: Event[]; total: number }>({ rows: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let live = true
    fetchEvents(pagination, sorting).then((result) => {
      if (!live) return
      setPage(result)
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [pagination, sorting])

  const table = useDataTable({
    columns,
    data: page.rows,
    // The server sorts and pages; the table just reports what was asked for.
    manualPagination: true,
    manualSorting: true,
    rowCount: page.total,
    state: { pagination, sorting },
    onPaginationChange: (updater) => {
      setLoading(true)
      setPagination(updater)
    },
    onSortingChange: (updater) => {
      setLoading(true)
      setSorting(updater)
    },
  })

  return (
    <div className="flex w-full flex-col gap-3" aria-busy={loading}>
      {/* While a page loads, keep the previous one visible rather than flashing empty. */}
      <DataTableGrid table={table} className={loading ? "opacity-60 transition-opacity" : "transition-opacity"} />
      <DataTablePagination table={table} />
    </div>
  )
}
