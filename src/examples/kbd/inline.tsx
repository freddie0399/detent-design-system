import { Kbd } from "@/components/ui/kbd"

export default function KbdInline() {
  return (
    <p className="text-muted-foreground">
      Press <Kbd>J</Kbd> and <Kbd>K</Kbd> to move between issues, or <Kbd>Esc</Kbd> to close.
    </p>
  )
}
