import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/date-picker")({ component: DatePickerPage })

function DatePickerPage() {
  return (
    <ComponentDoc
      slug="date-picker"
      title={"Date picker"}
      description={"A Calendar in a Popover behind an outline button that shows the chosen date. Single dates close on selection; ranges stay open until complete."}
    >
      <Preview name="date-picker/demo" />
      <Section title="Range">
        <Preview name="date-picker/range" />
      </Section>
      <Guidelines
        dos={[
          "Show the chosen date in a short, unambiguous format (3 Oct 2026).",
          "Offer presets (Today, Last 7 days) above the calendar for common ranges.",
        ]}
        donts={[
          "Don't hide a date that's required behind an empty placeholder — show it in the label instead.",
        ]}
      />
      <Accessibility
        items={[
          "The trigger announces its value; the popover traps focus and returns it to the trigger on close.",
          "The calendar receives focus on open so arrow keys work immediately.",
        ]}
      />
    </ComponentDoc>
  )
}
