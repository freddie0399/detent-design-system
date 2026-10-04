import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="workspace">Workspace name</Label>
        <Input id="workspace" placeholder="Acme" />
      </div>
      <Label className="font-normal">
        <Checkbox defaultChecked /> Make workspace public
      </Label>
    </div>
  )
}
