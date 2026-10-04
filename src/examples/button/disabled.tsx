import { Button } from "@/components/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>Outline</Button>
    </div>
  )
}
