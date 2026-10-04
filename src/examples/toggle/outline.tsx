import { BellIcon, PinIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <div className="flex gap-2">
      <Toggle variant="outline" defaultPressed>
        <PinIcon /> Pinned
      </Toggle>
      <Toggle variant="outline">
        <BellIcon /> Watch
      </Toggle>
    </div>
  )
}
