import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/tooltip")({ component: TooltipPage })

function TooltipPage() {
  return (
    <ComponentDoc
      slug="tooltip"
      title="Tooltip"
      description="A short label on hover or focus, inverted for contrast."
    >
      <Preview name="tooltip/demo" />
      <Section title="Sides">
        <Preview name="tooltip/sides" />
      </Section>
      <Guidelines
        dos={[
          "Use to name icon-only buttons and show shortcuts.",
          "Keep it to a few words.",
        ]}
        donts={[
          "Don't put essential information or interactive content in a tooltip — it's invisible on touch.",
        ]}
      />
      <Accessibility
        items={[
          "Tooltips open on focus as well as hover, and close on Escape.",
          "They supplement an accessible name; icon-only buttons still need aria-label.",
        ]}
      />
    </ComponentDoc>
  )
}
