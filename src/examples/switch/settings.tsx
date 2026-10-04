import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SETTINGS = [
  { id: "digest", label: "Weekly digest", on: true },
  { id: "mentions", label: "Mentions only", on: false },
  { id: "sounds", label: "Sounds", on: true },
]

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-sm divide-y rounded-xl border bg-card">
      {SETTINGS.map((s) => (
        <div key={s.id} className="flex items-center justify-between px-3 py-2.5">
          <Label htmlFor={s.id} className="font-normal">{s.label}</Label>
          <Switch id={s.id} defaultChecked={s.on} />
        </div>
      ))}
    </div>
  )
}
