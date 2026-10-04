import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function InputWithIcon() {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-subtle-foreground" />
      <Input className="pl-8" placeholder="Search issues…" aria-label="Search issues" />
    </div>
  )
}
