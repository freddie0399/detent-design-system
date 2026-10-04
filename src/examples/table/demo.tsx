import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ISSUES = [
  { id: "ENG-1024", title: "Token pipeline emits registry theme", priority: "High" },
  { id: "ENG-1031", title: "Focus ring fails contrast in dark", priority: "Urgent" },
  { id: "ENG-1033", title: "Data table: sticky header", priority: "Medium" },
]

export default function TableDemo() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28 pl-4">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="pr-4 text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ISSUES.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{issue.id}</TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell className="pr-4 text-right">
                <Badge variant={issue.priority === "Urgent" ? "destructive" : "outline"}>{issue.priority}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
