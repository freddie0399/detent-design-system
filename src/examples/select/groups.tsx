import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TEAMS = {
  Product: ["Web", "Mobile", "Growth"],
  Platform: ["Infrastructure", "Security"],
}
const ITEMS = Object.values(TEAMS).flat().map((t) => ({ value: t.toLowerCase(), label: t }))

export default function SelectGroups() {
  return (
    <Select items={ITEMS}>
      <SelectTrigger className="w-52" aria-label="Team">
        <SelectValue placeholder="Choose a team" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TEAMS).map(([group, teams], i) => (
          <SelectGroup key={group}>
            {i > 0 && <SelectSeparator />}
            <SelectLabel>{group}</SelectLabel>
            {teams.map((t) => (
              <SelectItem key={t} value={t.toLowerCase()}>
                {t}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
