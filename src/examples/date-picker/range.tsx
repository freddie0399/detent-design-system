import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "@/components/ui/date-picker"

export default function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = new Date()
    return { from, to: addDays(from, 13) }
  })
  return <DateRangePicker value={range} onValueChange={setRange} />
}
