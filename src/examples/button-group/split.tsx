import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button>Merge pull request</Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="icon" aria-label="Merge options" />}>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Squash and merge</DropdownMenuItem>
          <DropdownMenuItem>Rebase and merge</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
