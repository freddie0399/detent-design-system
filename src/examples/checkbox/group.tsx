import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const OPTIONS = [
  { id: "mentions", label: "Mentions", hint: "When someone @mentions you", checked: true },
  { id: "assigned", label: "Assigned to me", hint: "When an issue is assigned to you", checked: true },
  { id: "status", label: "Status changes", hint: "On issues you're subscribed to", checked: false },
]

export default function CheckboxGroup() {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-1 font-medium">Email me about</legend>
      {OPTIONS.map((o) => (
        <div key={o.id} className="flex items-start gap-2">
          <Checkbox id={o.id} defaultChecked={o.checked} className="mt-0.5" />
          <div className="grid gap-0.5">
            <Label htmlFor={o.id}>{o.label}</Label>
            <span className="text-muted-foreground">{o.hint}</span>
          </div>
        </div>
      ))}
    </fieldset>
  )
}
