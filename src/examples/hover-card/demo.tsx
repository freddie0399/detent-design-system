import { CalendarIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <p className="text-muted-foreground">
      Assigned to{" "}
      <HoverCard>
        <HoverCardTrigger href="#" className="font-medium text-foreground underline underline-offset-4">
          @alex
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex gap-3">
            <Avatar size="lg">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium text-foreground">Alex Lee</div>
              <p className="text-muted-foreground">Design engineer on the platform team.</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" /> Joined March 2024
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      yesterday.
    </p>
  )
}
