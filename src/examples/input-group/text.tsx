import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"

export default function InputGroupTextExample() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="acme" aria-label="Workspace URL" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.acme.app</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
