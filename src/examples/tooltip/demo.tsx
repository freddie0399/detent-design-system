import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Search</TooltipTrigger>
      <TooltipContent>
        Search issues <Kbd>⌘K</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
