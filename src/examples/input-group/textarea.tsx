import { ArrowUpIcon, PaperclipIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea placeholder="Leave a comment…" aria-label="Comment" />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="icon-xs" aria-label="Attach file">
          <PaperclipIcon />
        </InputGroupButton>
        <InputGroupText className="ml-auto">Markdown supported</InputGroupText>
        <InputGroupButton size="icon-xs" variant="default" aria-label="Send">
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
