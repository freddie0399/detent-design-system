import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/radio-group")({ component: RadioGroupPage })

function RadioGroupPage() {
  return (
    <ComponentDoc
      slug="radio-group"
      title="Radio group"
      description="Chooses exactly one option from a small, visible set. Unselected options are wells; the chosen one becomes a glossy fill and its dot springs in."
    >
      <Preview name="radio-group/demo" />
      <Section title="Choice cards" description="Wrap each option in a FieldLabel for large, descriptive choices. Cards are raised; the chosen card gets an accent ring.">
        <Preview name="radio-group/cards" />
      </Section>
      <Section title="States">
        <Preview name="radio-group/states" />
      </Section>
      <Guidelines
        dos={[
          "Use for 2–5 mutually exclusive options that people should compare side by side.",
          "Pre-select the most common or safest option when there is one.",
        ]}
        donts={[
          "Don't use radios for a single yes/no — use a checkbox or switch.",
          "Don't use radios for long lists — use a select or combobox.",
        ]}
      />
      <Accessibility
        items={[
          "The group has one tab stop; arrow keys move and select within it.",
          "Give the group an accessible name (a legend or aria-label).",
        ]}
      />
    </ComponentDoc>
  )
}
