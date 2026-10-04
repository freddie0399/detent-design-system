import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/checkbox")({ component: CheckboxPage })

function CheckboxPage() {
  return (
    <ComponentDoc
      slug="checkbox"
      title="Checkbox"
      description="A binary choice that's submitted with a form. Unchecked it's a well; checked it becomes a glossy fill and the tick springs in."
    >
      <Preview name="checkbox/demo" />
      <Section title="States">
        <Preview name="checkbox/states" />
      </Section>
      <Section title="Group" description="A list of independent options with supporting text.">
        <Preview name="checkbox/group" align="start" />
      </Section>
      <Guidelines
        dos={[
          "Use for choices that take effect when a form is submitted.",
          "Group related checkboxes in a fieldset with a legend.",
        ]}
        donts={[
          "Don't use a checkbox for a setting that applies immediately — use a switch.",
        ]}
      />
      <Accessibility
        items={[
          "Every checkbox needs a label; wrapping it in Label (or pairing via htmlFor) makes the text clickable too.",
          "Space toggles a focused checkbox.",
        ]}
      />
    </ComponentDoc>
  )
}
