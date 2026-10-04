import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaInvalid() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="summary">Summary</Label>
      <Textarea id="summary" aria-invalid aria-describedby="summary-hint" defaultValue="Too short" />
      <span id="summary-hint" className="text-xs text-destructive-subtle-foreground">Write at least 20 characters.</span>
    </div>
  )
}
