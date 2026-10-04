import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const SIDES = ["top", "right", "bottom", "left"] as const

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIDES.map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="ghost" className="capitalize" />}>{side}</PopoverTrigger>
          <PopoverContent side={side} className="w-48 text-muted-foreground">
            Opens on the {side}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
