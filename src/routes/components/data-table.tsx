import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines, type ApiPart } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/data-table")({ component: DataTablePage })

const USAGE = `type Issue = { id: string; title: string; priority: number }

const col = createDataTableColumns<Issue>()
const columns = [
  dataTableSelectColumn<Issue>(),
  col.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  }),
  col.accessor("title", { header: "Title" }),
]

// Everything assembled:
<DataTable columns={columns} data={issues} searchPlaceholder="Filter issues…" />

// Or own the table instance and compose the parts:
const table = useDataTable({ columns, data: issues })
const selected = table.getSelectedRowModel().rows

<DataTableToolbar table={table} searchPlaceholder="Filter issues…">
  {selected.length > 0 && <Button>Archive {selected.length}</Button>}
</DataTableToolbar>
<DataTableGrid table={table} />
<DataTablePagination table={table} />`

const tableProp = {
  name: "table",
  type: "DataTableInstance<TData>",
  description: "The instance returned by useDataTable.",
}

const API: ApiPart[] = [
  {
    name: "DataTable",
    description: "Toolbar, grid and pagination assembled. Use the parts when you need the table's state.",
    props: [
      { name: "columns", type: "DataTableColumnDef<TData>[]", description: "Column definitions, usually from createDataTableColumns()." },
      { name: "data", type: "TData[]", description: "The rows." },
      { name: "pageSize", type: "number", default: "10", description: "Rows per page to start with." },
      { name: "searchPlaceholder", type: "string", description: "Shows a search box that filters across all columns." },
      { name: "empty", type: "ReactNode", default: '"No results."', description: "Shown when no rows match." },
    ],
  },
  {
    name: "useDataTable",
    description:
      "Returns the table instance. Accepts every TanStack Table option except features, so state can be controlled and data can come from a server.",
    props: [
      { name: "columns", type: "DataTableColumnDef<TData>[]", description: "Column definitions." },
      { name: "data", type: "TData[]", description: "The rows (or the current page, with manualPagination)." },
      { name: "pageSize", type: "number", default: "10", description: "Initial rows per page." },
      { name: "state", type: "Partial<TableState>", description: "Controlled state: pagination, sorting, rowSelection, columnVisibility, globalFilter…" },
      { name: "on…Change", type: "(updater) => void", description: "Handlers for controlled state, e.g. onPaginationChange, onSortingChange." },
      { name: "manualPagination / manualSorting", type: "boolean", description: "Let the server page or sort; pass rowCount so pagination knows the total." },
      { name: "getRowId", type: "(row: TData) => string", description: "Stable row IDs, so selection survives sorting and refetching." },
    ],
  },
  { name: "DataTableGrid", description: "The table. Headers expose aria-sort; selected rows take the accent tint.", props: [tableProp, { name: "empty", type: "ReactNode", default: '"No results."', description: "Shown when no rows match." }] },
  {
    name: "DataTableToolbar",
    description: "Search, a slot for actions, and the column toggle.",
    props: [
      tableProp,
      { name: "searchPlaceholder", type: "string", description: "Shows the global search box." },
      { name: "children", type: "ReactNode", description: "Actions placed after the search, e.g. bulk actions for selected rows." },
    ],
  },
  {
    name: "DataTablePagination",
    description: "Selection count, rows per page, and first / previous / next / last.",
    props: [tableProp, { name: "pageSizes", type: "number[]", default: "[10, 20, 50]", description: "Options for the rows-per-page select." }],
  },
  { name: "DataTableViewOptions", description: "Toggles columns that allow hiding. Included in the toolbar.", props: [tableProp] },
  {
    name: "DataTableColumnHeader",
    description: "A header menu to sort ascending or descending, clear the sort, or hide the column.",
    props: [
      { name: "column", type: "Column", description: "From the header render function: ({ column }) => …" },
      { name: "title", type: "string", description: "The header label." },
    ],
  },
  {
    name: "dataTableSelectColumn",
    description: "A leading checkbox column. The header checkbox selects the page and is indeterminate when only some rows are selected.",
    props: [],
  },
]

function DataTablePage() {
  return (
    <ComponentDoc
      slug="data-table"
      title="Data table"
      description="Sortable, filterable, selectable rows with pagination, built on TanStack Table (v9) and our Table, Checkbox, Input group and Button. Use it whole, or own the table instance and compose the parts."
      usage={USAGE}
      api={API}
    >
      <Preview name="data-table/demo" align="stretch" />
      <Section
        title="Composed"
        description="useDataTable plus the parts: a bulk action that reads the selected rows, and a row-actions column."
      >
        <Preview name="data-table/composed" align="stretch" />
      </Section>
      <Section
        title="Server-side"
        description="manualPagination and manualSorting with controlled state. While a page loads, the previous one stays visible at reduced opacity rather than flashing empty."
      >
        <Preview name="data-table/server" align="stretch" />
      </Section>
      <Section title="Sorting only" description="Leave out the select column and search for read-only lists.">
        <Preview name="data-table/simple" align="stretch" />
      </Section>
      <Guidelines
        dos={[
          "Put the identifying column first and right-align numbers.",
          "Use getRowId with real IDs so selection survives sorting and refetching.",
          "Keep row actions in a trailing menu column; put actions on many rows in the toolbar.",
        ]}
        donts={[
          "Don't use a data table for a handful of items — a list or cards read better.",
          "Don't make sorting the only way to find something; add search.",
        ]}
      />
      <Accessibility
        items={[
          "Sortable headers are menu buttons, and the header cell exposes aria-sort.",
          "The select-all checkbox is indeterminate when only some rows on the page are selected.",
          "The selection count is announced politely as it changes; a loading grid sets aria-busy.",
          "Row-action buttons are labelled with the row they act on.",
        ]}
      />
    </ComponentDoc>
  )
}
