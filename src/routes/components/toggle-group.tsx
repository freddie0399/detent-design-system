import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines, type ApiPart } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

// Variants live in Toggle's source, so the group documents them here.
const API: ApiPart[] = [
  {
    name: "ToggleGroup",
    props: [
      { name: "variant", type: '"default" | "outline" | "segmented"', default: '"default"', description: "Applied to every item. Segmented is a recessed tray with the selection raised." },
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Applied to every item." },
      { name: "spacing", type: "number", default: "2", description: "Gap between items in spacing units; 0 joins them into one control." },
      { name: "multiple", type: "boolean", default: "false", description: "Allow more than one item to be pressed." },
    ],
  },
]

export const Route = createFileRoute("/components/toggle-group")({ component: ToggleGroupPage })

function ToggleGroupPage() {
  return (
    <ComponentDoc
      slug="toggle-group"
      api={API}
      title="Toggle group"
      description="A set of toggles. The segmented variant is a recessed tray with the selection raised."
    >
      <Preview name="toggle-group/demo" />
      <Section title="Multiple" description="An outline group where several can be on.">
        <Preview name="toggle-group/multiple" />
      </Section>
      <Guidelines
        dos={[
          "Use the segmented variant for switching views (2–5 options).",
          "Use multiple for independent filters.",
        ]}
        donts={[
          "Don't use a segmented control for more than five options — use a select.",
        ]}
      />
      <Accessibility
        items={[
          "Arrow keys move focus between items; each item announces its pressed state.",
        ]}
      />
    </ComponentDoc>
  )
}
