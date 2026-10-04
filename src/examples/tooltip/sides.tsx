import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const SIDES = ["top", "right", "bottom", "left"] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIDES.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="ghost" className="capitalize" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>On the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
