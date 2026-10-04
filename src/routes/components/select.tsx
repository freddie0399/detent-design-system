import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/select")({ component: SelectPage })

function SelectPage() {
  return (
    <ComponentDoc
      slug="select"
      title="Select"
      description="Chooses one option from a list. The trigger is a raised button; the list is glass with a raised highlight."
    >
      <Preview name="select/demo" />
      <Section title="Groups" description="Label and separate groups of options.">
        <Preview name="select/groups" />
      </Section>
      <Section title="Sizes">
        <Preview name="select/sizes" />
      </Section>
      <Guidelines
        dos={[
          "Pass items to Select so the trigger shows the label, not the raw value.",
          "Use for 5–15 options; fewer fit a segmented control, more need search.",
        ]}
        donts={[
          "Don't use a select for actions — use a dropdown menu.",
        ]}
      />
      <Accessibility
        items={[
          "Give the trigger a visible label or an aria-label.",
          "Arrow keys move through options and typing jumps to matches.",
        ]}
      />
    </ComponentDoc>
  )
}
