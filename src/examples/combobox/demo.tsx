import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const LABELS = ["Bug", "Feature", "Improvement", "Design", "Documentation", "Performance", "Security"]

export default function ComboboxDemo() {
  return (
    <Combobox items={LABELS}>
      <ComboboxInput placeholder="Add a label…" aria-label="Label" className="w-60" />
      <ComboboxContent>
        <ComboboxEmpty>No labels found.</ComboboxEmpty>
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
