import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuCheckboxRadio() {
  const [showClosed, setShowClosed] = useState(false)
  const [grouping, setGrouping] = useState("status")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>View options</DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuCheckboxItem checked={showClosed} onCheckedChange={setShowClosed}>
          Show closed issues
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Group by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={grouping} onValueChange={setGrouping}>
            <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="assignee">Assignee</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
