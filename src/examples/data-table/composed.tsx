import { useMemo, useState } from "react"
import { ArchiveIcon, CopyIcon, ExternalLinkIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTableColumnHeader,
  DataTableGrid,
  DataTablePagination,
  DataTableToolbar,
  createDataTableColumns,
  dataTableSelectColumn,
  useDataTable,
} from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"

type Payment = { id: string; customer: string; status: "Paid" | "Pending" | "Failed"; amount: number }

const INITIAL: Payment[] = [
  { id: "pay_8a1c", customer: "Acme Inc.", status: "Paid", amount: 1240 },
  { id: "pay_2f9d", customer: "Globex", status: "Pending", amount: 380 },
  { id: "pay_77b0", customer: "Initech", status: "Failed", amount: 99 },
  { id: "pay_c3e4", customer: "Umbrella", status: "Paid", amount: 4120 },
  { id: "pay_5d61", customer: "Hooli", status: "Paid", amount: 760 },
  { id: "pay_9e02", customer: "Stark Industries", status: "Pending", amount: 2300 },
]

const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
const col = createDataTableColumns<Payment>()

export default function DataTableComposed() {
  const [payments, setPayments] = useState(INITIAL)

  // Columns must be stable between renders, or the table rebuilds every cell.
  const columns = useMemo(
    () => [
      dataTableSelectColumn<Payment>(),
    col.accessor("customer", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    }),
    col.accessor("status", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: (info) => {
        const s = info.getValue()
        return <Badge variant={s === "Paid" ? "success" : s === "Pending" ? "warning" : "destructive"}>{s}</Badge>
      },
    }),
    col.accessor("amount", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: (info) => <span className="tabular-nums">{currency.format(info.getValue())}</span>,
    }),
    // Row actions: a display column with no data.
    col.display({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Actions for ${row.original.customer}`} />}>
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => navigator.clipboard?.writeText(row.original.id)}>
              <CopyIcon /> Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLinkIcon /> View customer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setPayments((all) => all.filter((p) => p.id !== row.original.id))}
            >
              <Trash2Icon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
    ],
    [],
  )

  const table = useDataTable({ columns, data: payments, pageSize: 5, getRowId: (row) => row.id })
  const selected = table.getSelectedRowModel().rows

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTableToolbar table={table} searchPlaceholder="Search payments…">
        {selected.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.add({ title: `Archived ${selected.length} payment${selected.length === 1 ? "" : "s"}`, type: "success" })
              table.resetRowSelection()
            }}
          >
            <ArchiveIcon data-icon="inline-start" /> Archive {selected.length}
          </Button>
        )}
      </DataTableToolbar>
      <DataTableGrid table={table} />
      <DataTablePagination table={table} pageSizes={[5, 10]} />
    </div>
  )
}
