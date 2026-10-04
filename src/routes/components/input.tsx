import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/input")({ component: InputPage })

function InputPage() {
  return (
    <ComponentDoc
      slug="input"
      title="Input"
      description="A single-line text field, recessed into the surface."
    >
      <Preview name="input/demo" />
      <Section title="States">
        <Preview name="input/states" />
      </Section>
      <Section title="With icon" description="Position a leading icon absolutely and pad the input to clear it.">
        <Preview name="input/icon" />
      </Section>
      <Guidelines
        dos={[
          "Always pair an input with a visible label.",
          "Show errors below the field, in words.",
        ]}
        donts={[
          "Don't use placeholder text as a label — it disappears on input and fails contrast as body text.",
        ]}
      />
      <Accessibility
        items={[
          "Link error text with aria-describedby and set aria-invalid on the input.",
          "Use the right type (email, url, number) so mobile keyboards adapt.",
        ]}
      />
    </ComponentDoc>
  )
}
