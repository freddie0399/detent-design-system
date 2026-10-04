import { useState } from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

const PEOPLE = ["Alex Lee", "Freddie H.", "Mika Kato", "Sam Rivera", "Jordan Park"]

export default function ComboboxMultiple() {
  const [value, setValue] = useState<string[]>(["Alex Lee", "Mika Kato"])
  const anchor = useComboboxAnchor()
  return (
    <Combobox items={PEOPLE} multiple value={value} onValueChange={setValue}>
      <ComboboxChips ref={anchor} className="w-full max-w-sm">
        <ComboboxValue>
          {value.map((person) => (
            <ComboboxChip key={person}>{person}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder={value.length ? "" : "Add assignees…"} aria-label="Assignees" />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No one found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
