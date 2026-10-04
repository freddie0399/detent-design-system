import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ITEMS = [
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
]

export default function SelectSizes() {
  return (
    <div className="flex items-center gap-3">
      <Select defaultValue="board" items={ITEMS}>
        <SelectTrigger size="sm" className="w-32" aria-label="Layout (small)">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ITEMS.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select defaultValue="board" items={ITEMS}>
        <SelectTrigger className="w-32" aria-label="Layout">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ITEMS.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
