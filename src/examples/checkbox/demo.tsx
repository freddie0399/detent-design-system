import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <Label className="font-normal">
      <Checkbox defaultChecked /> Notify subscribers
    </Label>
  )
}
