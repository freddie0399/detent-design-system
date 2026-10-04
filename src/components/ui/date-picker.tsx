import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/** A single date in a popover. Closes once a day is chosen. */
function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  className,
}: {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-picker-trigger"
            className={cn("w-56 justify-start font-normal", !value && "text-muted-foreground", className)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {value ? format(value, "d MMM yyyy") : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onValueChange?.(date)
            setOpen(false)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** A date range across two months. Stays open until the range is complete. */
function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Pick a range",
  className,
}: {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
}) {
  const label = value?.from
    ? value.to
      ? `${format(value.from, "d MMM")} – ${format(value.to, "d MMM yyyy")}`
      : format(value.from, "d MMM yyyy")
    : placeholder
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-range-picker-trigger"
            className={cn("w-64 justify-start font-normal", !value?.from && "text-muted-foreground", className)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={value} onSelect={onValueChange} numberOfMonths={2} autoFocus />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
