import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
        <span className="font-medium">3 linked issues</span>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Toggle linked issues" />}>
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="grid gap-2">
          {["ENG-1031", "ENG-1033", "ENG-1040"].map((id) => (
            <div key={id} className="rounded-lg border bg-card px-3 py-2 font-mono text-xs">{id}</div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
