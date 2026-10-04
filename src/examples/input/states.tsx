import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="filled">Filled</Label>
        <Input id="filled" defaultValue="Homepage redesign feedback" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invalid">Invalid</Label>
        <Input id="invalid" aria-invalid defaultValue="not-an-email" aria-describedby="invalid-hint" />
        <span id="invalid-hint" className="text-xs text-destructive-subtle-foreground">Enter a valid email address.</span>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" disabled placeholder="Read only" />
      </div>
    </div>
  )
}
