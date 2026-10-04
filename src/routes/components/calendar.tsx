import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/calendar")({ component: CalendarPage })

function CalendarPage() {
  return (
    <ComponentDoc
      slug="calendar"
      title={"Calendar"}
      description={"A month grid for picking dates, built on react-day-picker. The selected day is a glossy chip, ranges take the accent tint, and today is a small well."}
    >
      <Preview name="calendar/demo" />
      <Section title="Range" description={"Span two months for ranges."}>
        <Preview name="calendar/range" />
      </Section>
      <Guidelines
        dos={[
          "Use inline when the calendar is the main task (scheduling); otherwise use a date picker.",
          "Disable dates that can't be chosen rather than rejecting them after.",
        ]}
        donts={[
          "Don't use a calendar to enter dates people already know, like a birthday — a text field is faster.",
        ]}
      />
      <Accessibility
        items={[
          "The grid is a table of buttons; arrow keys move by day, Page Up/Down by month, Home/End to the week edges.",
          "Selected and today states are exposed with aria-selected and aria-current.",
        ]}
      />
    </ComponentDoc>
  )
}
