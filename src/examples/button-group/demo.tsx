import { ArchiveIcon, ChevronDownIcon, ClockIcon, FlagIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Message actions">
      <ButtonGroup>
        <Button variant="outline">
          <ArchiveIcon data-icon="inline-start" /> Archive
        </Button>
        <Button variant="outline">
          <FlagIcon data-icon="inline-start" /> Report
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <ClockIcon data-icon="inline-start" /> Snooze
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Snooze options" />}>
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Later today</DropdownMenuItem>
            <DropdownMenuItem>Tomorrow</DropdownMenuItem>
            <DropdownMenuItem>Next week</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
