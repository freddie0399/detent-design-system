import { CheckCircle2Icon, CircleDashedIcon, CircleDotIcon } from "lucide-react"

/** Sample content shared by previews, component pages and blocks. */
export const ISSUES = [
  { id: "ENG-1024", title: "Token pipeline emits registry theme", status: "done", assignee: "FH", priority: "High" },
  { id: "ENG-1031", title: "Focus ring fails contrast on primary buttons in dark", status: "progress", assignee: "AL", priority: "Urgent" },
  { id: "ENG-1033", title: "Data table: sticky header and column resize", status: "progress", assignee: "MK", priority: "Medium" },
  { id: "ENG-1040", title: "Document density modes (compact / comfortable)", status: "todo", assignee: "FH", priority: "Low" },
  { id: "ENG-1042", title: "Add Combobox and Command components", status: "todo", assignee: "SR", priority: "Medium" },
] as const

export const STATUS = {
  done: { icon: CheckCircle2Icon, className: "text-primary", label: "Done" },
  progress: { icon: CircleDotIcon, className: "text-warning", label: "In progress" },
  todo: { icon: CircleDashedIcon, className: "text-subtle-foreground", label: "Todo" },
}

export const PRIORITIES = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]
