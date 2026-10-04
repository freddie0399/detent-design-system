import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/input-group")({ component: InputGroupPage })

function InputGroupPage() {
  return (
    <ComponentDoc
      slug="input-group"
      title="Input group"
      description="An input with attached addons (icons, text, buttons, a toolbar), all inside one recessed well."
    >
      <Preview name="input-group/demo" />
      <Section title="Text addons" description="Prefixes and suffixes that are part of the value's format.">
        <Preview name="input-group/text" />
      </Section>
      <Section title="With a button">
        <Preview name="input-group/button" />
      </Section>
      <Section title="With a textarea" description="Block addons sit above or below a textarea, like a comment composer.">
        <Preview name="input-group/textarea" />
      </Section>
      <Guidelines
        dos={[
          "Use addons for things that belong to the value: units, prefixes, a copy button.",
          "Keep inline buttons small and icon-only, with an aria-label.",
        ]}
        donts={[
          "Don't put primary form actions inside the input group.",
          "Don't use a text addon as the field's only label.",
        ]}
      />
      <Accessibility
        items={[
          "Clicking an addon focuses the input.",
          "The group shows the focus ring when its input is focused, and error styling when the input is aria-invalid.",
        ]}
      />
    </ComponentDoc>
  )
}
