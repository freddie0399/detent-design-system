import { CircleDotIcon, FlagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="destructive">
        <FlagIcon data-icon="inline-start" /> High
      </Badge>
      <Badge variant="warning">
        <CircleDotIcon data-icon="inline-start" /> In progress
      </Badge>
    </div>
  )
}
