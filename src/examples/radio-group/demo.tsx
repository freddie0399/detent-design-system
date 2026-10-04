import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="weekly" aria-label="Digest frequency">
      {[
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "never", label: "Never" },
      ].map((o) => (
        <Label key={o.value} className="font-normal">
          <RadioGroupItem value={o.value} /> {o.label}
        </Label>
      ))}
    </RadioGroup>
  )
}
