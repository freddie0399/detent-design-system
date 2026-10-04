import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumns,
  dataTableSelectColumn,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Issue = {
  id: string
  title: string
  status: "Todo" | "In progress" | "Done"
  priority: 1 | 2 | 3 | 4
  assignee: string
}

const TITLES = [
  "Token pipeline emits registry theme",
  "Focus ring contrast on primary buttons",
  "Sticky header for data table",
  "Document density modes",
  "Combobox keyboard support",
  "Toast swipe on touch devices",
  "Calendar range across months",
  "Chart table view toggle",
  "Glass legibility over images",
  "Sidebar collapse on mobile",
  "Progress indeterminate state",
  "Navigation menu spring timing",
]
const STATUSES = ["Todo", "In progress", "Done"] as const
const PEOPLE = ["Alex Lee", "Freddie H.", "Mika Kato", "Sam Rivera"]
const PRIORITY_LABEL = { 1: "Urgent", 2: "High", 3: "Medium", 4: "Low" } as const

const ISSUES: Issue[] = Array.from({ length: 24 }, (_, i) => ({
  id: `ENG-${1024 + i}`,
  title: TITLES[i % TITLES.length],
  status: STATUSES[(i * 7) % 3],
  priority: (((i * 5) % 4) + 1) as Issue["priority"],
  assignee: PEOPLE[(i * 3) % PEOPLE.length],
}))

const col = createDataTableColumns<Issue>()
const columns = [
  dataTableSelectColumn<Issue>(),
  col.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: (info) => <span className="font-mono text-xs text-muted-foreground">{info.getValue()}</span>,
  }),
  col.accessor("title", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  }),
  col.accessor("status", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: (info) => {
      const s = info.getValue()
      return <Badge variant={s === "Done" ? "success" : s === "In progress" ? "info" : "outline"}>{s}</Badge>
    },
  }),
  col.accessor("priority", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: (info) => PRIORITY_LABEL[info.getValue()],
  }),
  col.accessor("assignee", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assignee" />,
  }),
]

export default function DataTableDemo() {
  return <DataTable columns={columns} data={ISSUES} pageSize={8} searchPlaceholder="Filter issues…" className="w-full" />
}
