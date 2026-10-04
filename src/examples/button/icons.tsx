import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon data-icon="inline-start" /> New issue
      </Button>
      <Button variant="outline">
        Continue <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}
