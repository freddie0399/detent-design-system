import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export default function ButtonGroupWithInput() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <ButtonGroup className="w-full">
        <Input placeholder="Search issues…" aria-label="Search issues" />
        <Button variant="outline" size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="w-full">
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="acme.dev" aria-label="Domain" />
      </ButtonGroup>
    </div>
  )
}
