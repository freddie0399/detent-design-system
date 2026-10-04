import { useState } from "react"

import { DatePicker } from "@/components/ui/date-picker"

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date>()
  return <DatePicker value={date} onValueChange={setDate} placeholder="Due date" />
}
