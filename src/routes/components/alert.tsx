import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/alert")({ component: AlertPage })

function AlertPage() {
  return (
    <ComponentDoc
      slug="alert"
      title="Alert"
      description="A callout for status that needs attention but not interruption. Status variants use a jelly tint in fixed status hues, so meaning never follows the brand accent."
    >
      <Preview name="alert/demo" align="stretch" />
      <Section title="Variants" description="Default for neutral information; status variants for outcomes.">
        <Preview name="alert/variants" align="stretch" />
      </Section>
      <Section title="With action" description="Pair an alert with the one action that resolves it.">
        <Preview name="alert/action" align="stretch" />
      </Section>
      <Guidelines
        dos={[
          "Lead with the outcome in the title; put detail in the description.",
          "Offer at most one action, and make it resolve the alert.",
        ]}
        donts={[
          "Don't use an alert for transient confirmation — use a toast.",
          "Don't use status colours for emphasis; they carry meaning.",
        ]}
      />
      <Accessibility
        items={[
          "Alerts render with role=\"alert\", so screen readers announce them when they appear. Only render one when something actually happened.",
          "Colour is never the only signal: every variant has an icon and a title.",
        ]}
      />
    </ComponentDoc>
  )
}
