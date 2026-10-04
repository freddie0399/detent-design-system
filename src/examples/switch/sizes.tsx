import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchSizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Label className="font-normal"><Switch defaultChecked /> Default</Label>
      <Label className="font-normal"><Switch size="sm" defaultChecked /> Small</Label>
      <Label className="font-normal"><Switch disabled /> Disabled</Label>
    </div>
  )
}
