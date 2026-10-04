import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Move</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>To backlog</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>To project</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Website relaunch</DropdownMenuItem>
            <DropdownMenuItem>Mobile app</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
