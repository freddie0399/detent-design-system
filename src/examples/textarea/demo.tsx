import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" placeholder="Add a description…" />
    </div>
  )
}
