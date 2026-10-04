import { StarIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" size="sm" aria-label="Star (small)"><StarIcon /></Toggle>
      <Toggle variant="outline" aria-label="Star"><StarIcon /></Toggle>
      <Toggle variant="outline" size="lg" aria-label="Star (large)"><StarIcon /></Toggle>
    </div>
  )
}
