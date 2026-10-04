import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/combobox")({ component: ComboboxPage })

function ComboboxPage() {
  return (
    <ComponentDoc
      slug="combobox"
      title="Combobox"
      description="An input that filters a list as you type, for choosing from many options. Single values or multiple values as raised chips. The list is glass with the raised highlight."
    >
      <Preview name="combobox/demo" />
      <Section title="Multiple" description="Chosen values become removable chips inside the recessed well.">
        <Preview name="combobox/multiple" />
      </Section>
      <Guidelines
        dos={[
          "Use when there are too many options to scan (more than ~15), or when people know what they're looking for.",
          "Show an empty state that says what was searched for.",
        ]}
        donts={[
          "Don't use for a handful of options — a select or radio group is faster.",
        ]}
      />
      <Accessibility
        items={[
          "The input exposes role=\"combobox\" with aria-expanded and aria-activedescendant; arrow keys move through results and Enter selects.",
          "Chips can be removed with Backspace from the input or by their remove buttons.",
        ]}
      />
    </ComponentDoc>
  )
}
