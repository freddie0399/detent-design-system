import { Badge } from "@/components/ui/badge"

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">Done</Badge>
      <Badge variant="warning">At risk</Badge>
      <Badge variant="destructive">Blocked</Badge>
      <Badge variant="info">In review</Badge>
    </div>
  )
}
