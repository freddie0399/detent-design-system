import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxStates() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Label className="font-normal"><Checkbox /> Unchecked</Label>
      <Label className="font-normal"><Checkbox defaultChecked /> Checked</Label>
      <Label className="font-normal"><Checkbox disabled /> Disabled</Label>
      <Label className="font-normal"><Checkbox aria-invalid /> Invalid</Label>
    </div>
  )
}
