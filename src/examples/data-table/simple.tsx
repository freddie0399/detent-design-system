import { DataTable, DataTableColumnHeader, createDataTableColumns } from "@/components/ui/data-table"

type Member = { name: string; role: string; issues: number }

const MEMBERS: Member[] = [
  { name: "Alex Lee", role: "Design engineer", issues: 42 },
  { name: "Freddie H.", role: "Product lead", issues: 17 },
  { name: "Mika Kato", role: "Engineer", issues: 63 },
  { name: "Sam Rivera", role: "Engineer", issues: 38 },
  { name: "Jordan Park", role: "Designer", issues: 21 },
]

const col = createDataTableColumns<Member>()
const columns = [
  col.accessor("name", { header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> }),
  col.accessor("role", { header: "Role", enableSorting: false }),
  col.accessor("issues", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Issues" className="ml-auto" />,
    cell: (info) => <div className="text-right tabular-nums">{info.getValue()}</div>,
  }),
]

export default function DataTableSimple() {
  return <DataTable columns={columns} data={MEMBERS} className="w-full" />
}
