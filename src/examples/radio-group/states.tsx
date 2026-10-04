import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupStates() {
  return (
    <div className="flex flex-wrap gap-8">
      <RadioGroup defaultValue="a" disabled aria-label="Disabled group">
        <Label className="font-normal"><RadioGroupItem value="a" /> Disabled, selected</Label>
        <Label className="font-normal"><RadioGroupItem value="b" /> Disabled</Label>
      </RadioGroup>
      <RadioGroup aria-label="Invalid group" aria-invalid>
        <Label className="font-normal"><RadioGroupItem value="a" aria-invalid /> Invalid</Label>
        <Label className="font-normal"><RadioGroupItem value="b" aria-invalid /> Invalid</Label>
      </RadioGroup>
    </div>
  )
}
