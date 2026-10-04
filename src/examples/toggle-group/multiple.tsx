import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const DAYS = ["mon", "tue", "wed", "thu", "fri"]

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup variant="outline" spacing={0} multiple defaultValue={["mon", "wed"]}>
      {DAYS.map((day) => (
        <ToggleGroupItem key={day} value={day} className="capitalize">
          {day}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
