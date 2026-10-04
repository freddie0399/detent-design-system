import { CopyIcon } from "lucide-react"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

export default function InputGroupWithButton() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput readOnly defaultValue="sk_live_4f2a91c…" aria-label="API key" className="font-mono" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy API key">
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
